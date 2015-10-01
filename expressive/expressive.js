/* Expressive Javascript Library */

(function(window){
    'use strict';

    // A function that Defines the Expressive Library
    // first I created an empty object then included a name and a simple greeting
    function define_expressive(){
        var Expressive = {};
        Expressive.name = "Expressive";
        Expressive.greet = function(){
            alert("Hello from the " + Expressive.name + " library.");
        }
        return Expressive;
    }
    // I define it globally if it doesnt already exist
    if(typeof(Expressive) === 'undefined'){
        window.Expressive = define_expressive();
    }
    else{
        console.log("Expressive already defined.");
    }

    // Quick check to make sure expressive loads on when the
    // window loads
    Expressive.greet();
    console.log('Expressive Works');

    Expressive.module = function() {
        console.log('module activated');
    };
    Expressive.controller = function() {
        console.log('controller activated');
    };
    Expressive.model = function() {
        console.log('model activated');
    };
})(window);