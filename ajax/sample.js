// JQuery Ajax

// Imagine the api is /api/oders

$.(function() {

	var $orders = $('#orders');
	var $name = $('#name');
	var $drink = $('#drink');

	function addOrder (order) {
		$orders.append('<li>Name ' + order.name + ', Drink ' + order.drink + '</li>');
	}

	// GET Request
	$.ajax({
		type: 'GET',
		url: '/api/orders',
		success: function(orders){
			$.each(orders, function(i, order){
				addOrder(order);
			});
		},
		error: function(){
			alert('Error loading the orders');
		}
	});

	$('#addOrder').on('click', function(){
		var order = {
			name: $name.val(),
			drink: $drink.val()
		};

		// POST Request
		$.ajax({
			type: 'POST',
			url: '/api/orders',
			data: order,
			success: function(newOrder){
				addOrder(newOrder);
			}
		});
	});
});