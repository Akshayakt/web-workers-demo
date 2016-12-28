var results = null,
	resultsAry = [],
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
			seriesLen = parseInt(seriesLen);
			results.html("");
			resultsAry = [],
			resultsAry = generateFibonacciSeries(seriesLen);
			displayHandler(resultsAry);
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

function displayHandler(data) {
	$.each(data, function () {
		results.append("<li>" + this + "</li>");
	});
}

function generateFibonacciSeries(n) {
	for (var i = 0; i <= n-1; i++) {
		resultsAry.push(calculateNextFibonacciValue(i));
	}
	return resultsAry;
}

function calculateNextFibonacciValue(n) {
	var s = 0,
		returnValue;
	if (n == 0) {
		return (s);
	}
	else if (n == 1) {
		s += 1;
		return (s);
	}
	else {
		return (calculateNextFibonacciValue(n - 1) + calculateNextFibonacciValue(n - 2));
	}
}

function numberValidation(number) {
	var intRegex = /^\d+$/;
	return intRegex.test(number);
}