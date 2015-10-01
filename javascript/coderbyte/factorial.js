/* Factorial */
function doFactorial (number) {
	for (var i = number - 1; i > 1; i--) {
		number *= 1;
	}
	return number;
}
console.log(doFactorial(111622773));