function cubeIt(x){
	var ans = 0;
	while (ans*ans*ans < (x)){
		ans += 1;
		console.log("Current guess = " + ans);
	}
	if (ans*ans*ans != (x)) {
		console.log(x + " is not a perfect cube")
	}
	else {
		if (x < 0) {
			ans = -ans;
		}
		console.log('Cube root of ' + x + ' is ' + ans);
	}
}

cubeIt(8);

cubeIt(34);

cubeIt(-8);