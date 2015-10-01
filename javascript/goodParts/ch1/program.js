/* 
Chapter 1
*/
//document.write('Hello World');


// Used to define new methods
/*
Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};
*/

/*
Chapter 3
*/
/*
var flight = {
	airline: "JFK",
	number: 815,
	deparure: {
		IATA: "NYC",
		time: "2015-09-13 09:00",
		city: "New Yok City"
	},
	arrival: {
		IATA: "LAX",
		time: "2015-09-13 02:00",
		city: "Los Angeles"
	}
};

document.write("Deparure IATA: " + flight.deparure.IATA);

flight.equipment = {
	model: 'Boeing 777'
};

flight.status = 'Ovedue';

document.write("<br> Model: " + flight.equipment.model);

document.write("<br> Status: " + flight.status);

flight.status = 'On-Time';

document.write("<br> Status2: " + flight.status);

var x = {};
x.nickname = 'Curly';
var nick = x.nickname;
document.write("<br>Nickname: " + nick);

if (typeof Object.create !== 'function') {
	Object.create = function(o){
		var F = function(){};
		F.prototype = o;
		return new F();
	};
}
var another_flight = Object.create(flight)

another_flight.airline = "SYD";

document.write("<br> New Flight Depating From: " + another_flight.airline);

another_flight.name = "Tys Flight";

document.write("<br> <b>New Flight Name:</b> " + another_flight.name);

var name;
for (name in another_flight) {
	if (typeof another_flight[name] !== 'function') {
		document.write('<br>' + name + ':' + another_flight[name]);
	}
}
*/

/*
// Global Abatement
var MYAPP = {};

MYAPP.stooge = {
	"first-name": "Joe",
	"last-name": "Howard"
};
MYAPP.flight = {
	airline: "JFK",
	number: 815,
	deparure: {
		IATA: "NYC",
		time: "2015-09-13 09:00am",
		city: "New Yok City"
	},
	arrival: {
		IATA: "LAX",
		time: "2015-09-13 10:am",
		city: "Los Angeles"
	}
};
var name;
for (name in MYAPP) {
	if (typeof MYAPP[name] !== 'function') {
		document.write('<br>' + name + ':' + MYAPP[name]);
	}
}
*/



/* Chapter 4 Functions */

// Function Literal
// add variable with a function that adds two numbers
var add = function(a, b){
	return a + b;
};

// Method invocation
var myObject = {
	value: 0,
	increment: function(inc){
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment();
document.write(myObject.value + "<br>"); // 1

myObject.increment(2);
document.write(myObject.value + "<br>"); // 3

// Augment myObject with a double method
myObject.double = function(){
	var that = this; // workaround

	var helper = function(){
		that.value = add(that.value, this.value);
	};

	helper(); // Invoke helper as a function.
};
// Invoke double as a method.
myObject.double();
// document.writeIn(myObject.getValue()); // 6

// Create a constructor function called Quo.
// It makes an object with a status popety.

var Quo = function(string){
	this.status = string;
};

// Give all instances of Quo a public method called get_status
Quo.prototype.get_status = function(){
	return this.status;
};

// Make an instance of Quo
var myQuo = new Quo("confused");
document.write(myQuo.get_status()); // confused

// Make an array of 2 numbers and add them.
var array = [3, 4];
var sum = add.apply(null, array); // Sum is 7

// Make an object with a status member.
var statusObject = {
	status: 'A-Ok'
};
// statusObject does not inherit from Qou.protoype,
// But we can invoke the get_status methods on
// statusObject even though statusObject does not have
// a get_status method.

var status = Quo.prototype.get_status.apply(statusObject); // status is 'A-OK'
document.write("<br>" + status);

// ARGUMENTS

// make a function that adds a lot of stuff.
var sum = function(){
	var i, sum = 0;
	for (i=0; i<arguments.length; i++) {
		sum += arguments[i];
	}
	return sum;
};
document.write("<br> Sum function at work: " + sum(2, 3, 4, 8, 2, 8, 4, 22, 33, 94) + "<br>"); // 180

// Page 31

//Exceptions
var add = function(a, b){
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError',
			message: 'add needs numbers'
		};
	}
	return a + b;
};
// Make a try_it function that calls the new add
// function incorrectly
var try_it = function(){
	try {
		add("seven");
	} catch (e) {
		document.write(e.name + ': ' + e.message);
	}
};
try_it();

// Augmented Types
// by augmenting Function.prototype we can make a method
// available to all functions
Function.prototype.method = function(name, func){
	this.prototype[name] = func;
	return this;
};