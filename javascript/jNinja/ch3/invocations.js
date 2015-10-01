// Invocation as a function Examples
function ninja(){};
ninja();
var samurai = function(){};
samurai();
// When invoked in this manner, the function context is the global context; that is, the
//window object.

// Invocation as a method Examples
var o = {};
o.whatever = function(){};
o.whatever();
// When we invoke the function as the method of an object, that object
// becomes the function context and is available within the function via the this parameter.

// Test Examples of method functions, regular functions and anonymous functions.
// put this in HTML to test.
function creep (argument) {
	return this;
}
assert(creep() === window, "Creeping in the window (method invocation)");

var sneak = creep;
assert(sneak() === window, "Sneaking in the window (method invocation)");

var ninja1 = {
	skulk: creep
};
assert(ninja1.skulk() === ninja1, "The first ninja is skulking (method invocation)");

var ninja2 = {
	skulk: creep
};
assert(ninja2.skulk() === ninja2, "The second ninja is skulking (method invocation)");

// Invocation as a constructor Examples
function Ninja () {
	this.skulk = function(){ return this; };
}

var ninja3 = new Ninja();
var ninja4 = new Ninja();

assert(ninja3.skulk() === ninja3, "The third ninja is skulking (constructor invocation)");
assert(ninja4.skulk() === ninja4, "The forth ninja is skulking (constructor invocation)");