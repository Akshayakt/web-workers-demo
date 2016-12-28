var results = null,
	worker;
$(document).ready(function() {
	var inputField = $("#series-length"),
		errorField = $(".error-message");
	results = $("#results");

	inputField.on("focusin", function () {
      errorField.empty();
    });

	$("#generate-button").click(function () {
		var seriesLen = inputField.val().trim(),
			errorFlag = false;
		//validations
		if (seriesLen == "") {
	        errorField.html("Please enter a number.");
	        errorFlag = true;
	    }
	    else {
			if (!numberValidation(seriesLen)) {
				errorField.html("Please enter a valid number.");
				errorFlag = true;
			}
			else {
				errorField.empty();
			}
		}
		if (errorFlag) {
			return false;
		}
		else {
			seriesLen = parseInt(seriesLen),
			results.html("");
			// Check browser support of worker
			if(window.Worker) {
				worker = new Worker("./js/worker.js");
				worker.onmessage = messageHandler;
				worker.onerror = errorHandler;
				worker.postMessage(seriesLen);
			}
			else {
				document.getElementById("results").innerHTML = "Sorry, your browser does not support Web Workers...";
			}
	    }
	});
// Animation code
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		raf;

	var ball = {
		x: 100,
		y: 100,
		vx: 5,
		vy: 2,
		radius: 25,
		color: 'blue',
		draw: function() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
			ctx.closePath();
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	};

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ball.draw();
		ball.x += ball.vx;
		ball.y += ball.vy;

		if (ball.y + ball.vy > canvas.height ||
		  ball.y + ball.vy < 0) {
		ball.vy = -ball.vy;
		}
		if (ball.x + ball.vx > canvas.width ||
		  ball.x + ball.vx < 0) {
		ball.vx = -ball.vx;
		}

		raf = window.requestAnimationFrame(draw);
	}

	canvas.addEventListener('mouseover', function(e) {
		raf = window.requestAnimationFrame(draw);
	});

	canvas.addEventListener("mouseout", function(e) {
		window.cancelAnimationFrame(raf);
	});

	ball.draw();

});

function messageHandler(e) {
	var resultFromWorker = e.data;
	if (resultFromWorker == "Starting.." || resultFromWorker == "Stopping..") {
		$("#info").html(resultFromWorker);
	}
	else {
		$.each(resultFromWorker, function () {
			showResults(this);
		});
	}
}

function errorHandler(e) {
	showResults(e.message);
}

function showResults(message) {
	results.append("<li>" + message + "</li>");
}
function numberValidation(number) {
	var intRegex = /^\d+$/;
	return intRegex.test(number);
}
