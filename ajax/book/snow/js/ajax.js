(function(){
	console.log('Work');
	var request = null;
	function createRequest(){
		try {
			request = new XMLHttpRequest();
		} catch (trymicrosoft) {
			try {
				request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (othermicrosoft) {
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (failed) {
					request = null;
				}
			}
		}

		if (request == null) {
			alert("Error Creating Request Please Check Your Backend");
		}
	}
	console.log('Work2');

	function getBoardsSold () {
		createRequest();
	}
})();