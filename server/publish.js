Meteor.publish("restoId", function () {
	return Meteor.users.find({ _id: this.userId },{
		fields: {'restaurantId': 1}
	})
});

Meteor.publish("getCategories", function(restId){
	return Restaurants.find({_id: restId},{fields: {'categories': 1}})
});

Meteor.publish("getTables", function(restId){

	return Tables.find({restaurantId: restId}, {fields: {'no': 1, 'capacity': 1, 'status': 1}});
});


Meteor.publish('getDishes', function(restId){
	return Dishes.find({restaurantId: restId});
});

Meteor.publish('getSingleDish', function(dishId, restId){
	return Dishes.find({ _id: dishId, restaurantId: restId});
});


Meteor.publish('getOrderItems', function(restId){

    return OrderItems.find({restaurantId: restId});

});

Meteor.publish('getOrders', function(restId){

    return Orders.find({restaurantId: restId});

});

Meteor.publish('getSingleOrder', function(restId, orderId){

    return Orders.find({restaurantId: restId, _id: orderId});

});

Meteor.publish('getSingleOrderItems', function(restId, orderId){

    return OrderItems.find({restaurantId: restId, orderId: orderId});

});