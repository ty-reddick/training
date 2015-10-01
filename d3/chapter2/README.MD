/* SELECTION */
One of the most fundamental tasks that you need to perform with any data visualization project using D3 is selection. Selection helps you target certain visual elements on the page.

Selector support has been standardized by W3C so all modern web
browsers have built-in support for the selector API. However the basic W3C selector API has its
limitations when it comes to web development, especially in the data visualization realm. The
standard W3C selector API only provides selector but not selection. What this means is that
the selector API helps you to select element(s) in your document, however, to manipulate the
selected element(s) you still need to loop through each element, in order to manipulate the
selected element(s). Consider the following code snippet using the standard selector API:
var i = document.querySelectorAll("p").iterator();
var e;
while (e = i.next()) {
	// Do something with each element
	console.log(e);
}
The preceding code essentially selects all <p> elements in the document and then iterates
through each element to perform some task. This can obviously get tedious quickly, especially
when you have to manipulate many different elements on the page constantly, which is
what we usually do in data visualization projects. This is why D3 introduced its own selection
API, making development less of a chore

CSS3 selector basics: D3's selection API is built based on the level-3 selector or more commonly known as the CSS3 selector support example:
f #foo: select element with foo as the value of id
<div id="foo">
f foo: select element foo
<foo>
f .foo: select elements with foo as the value of class
<div class="foo">
f [foo=goo]: select elements with the foo attribute value and set it to goo
<div foo="goo">
f foo goo: select the goo element inside the foo element
<foo><goo></foo>
f foo#goo: select the foo element set goo as the value of id
<foo id="goo">
f foo.goo: select the foo element with goo as the value of class
<foo class="goo">
f foo:first-child: select the first child of the foo elements
<foo> // <-- this one
<foo>
<foo> 
f foo:nth-child(n): select the nth child of the foo elements
<foo>
<foo> // <-- foo:nth-child(2)
<foo> // <-- foo:nth-child(3)

==Run single-selection.html==