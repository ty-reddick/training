/*
// Simple way to create a new empty object
var o = {};

o.name = 'Saito';
o.occupation = 'marksman';
o.cyberizedPercentage = 20;
*/

function Ninja(){}

Ninja.prototype.swingSword = function(){
	return true;
};

var ninja1 = Ninja();
assert(ninja1 === undefined, 'No, instance of Ninja created');

var ninja2 = new Ninja();
assert(ninja2 && ninja2.swingSword && ninja2.swingSword(), 'Instance exists and method is callable');