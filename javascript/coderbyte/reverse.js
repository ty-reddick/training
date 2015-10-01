/* Reverse A String */
function reverse (string) {
	string = string.split("");
	string = string.reverse();
	string = string.join("");
	return string;
}

/* Reverse Best Practice */
function reverseBP (string) {
	return string.split("").reverse().join("");
}

console.log(reverse("tyquan"));

console.log(reverseBP("tyquantwo"));