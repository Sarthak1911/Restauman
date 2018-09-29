Template.home.events({

	

})

Template.home.helpers({


	'getTotalTables': function(){

	 var totaltables = Tables.find().count();

	 return totaltables;

	},

	'getTotalOccupiedTables': function(){

	 var totaloccupiedtables = Tables.find({status: 'true'}).count();

	 return totaloccupiedtables;

	},

	'getFirstOrders': function(){

		return first = Orders.find({ status: 1}, {limit: 5}).fetch();

	},

	'getKitchenOrders': function(){

		return OrderItems.find({accepted: 1, completed: 0}, {limit: 5}).fetch();

	},

	'getRevenueDaily': function(){

		var start = new Date();
		start.setSeconds(0);
		start.setHours(0);
		start.setMinutes(0);

		var end = new Date(start);
		end.setSeconds(59);
		end.setHours(23);
		end.setSeconds(59);

	

		var orders = Orders.find({ status: 2, createdAt: {$gte: start, $lt: end} },{ fields: { total: 1 } }).fetch();

		var orderTotal = 0;
	  return orders.forEach(function(elem, index){
			orderTotal += elem.total;
		});

	}

});

Template.home.onRendered(function(){


  
	        
});