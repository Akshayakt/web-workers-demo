var results = [];

function messageHandler(e) {
	if (e.data > 0) {
		postMessage("Starting..");
		generateFibonacciSeries(e.data);
	}
}

function generateFibonacciSeries(n) {
	for (var i = 0; i <= n-1; i++) {
		results.push(calculateNextFibonacciValue(i));
	}
	postMessage(results);
	postMessage("Completed");
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

addEventListener("message", messageHandler, true);
