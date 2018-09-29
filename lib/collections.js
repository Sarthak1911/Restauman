Restaurants = new Mongo.Collection("restaurants");
Dishes = new Mongo.Collection("dishes");
Tables = new Mongo.Collection("tables");
Orders = new Mongo.Collection("orders");
OrderItems = new Mongo.Collection("orderitems");
Inventory = new Mongo.Collection("inventory");

RestaurantSchema = new SimpleSchema({
	"name": {
		type: String,
		max: 50,
		min: 1,
		label: "Name of your Restaurant"
	},

	"categories": {
		type: [String]
	}
});

TableSchema = new SimpleSchema({
	"restaurantId":{
		type: String,
	},
	"no":{
		type: Number,
		max: 300,
		label: "Table Number"
	},
	"status":{
		type: String,
		defaultValue: "false"
	},

	"capacity":{
		type: Number,
		max: 20
	}
});

OrderSchema = new SimpleSchema({
	"waiterId":{
		type: String
	},
	
	"restaurantId": {
		type: String
	},

	"tableId": {
		type: String
	},

	"tableNo": {
		type: Number
	},

	"total": {
		type: Number,
		defaultValue: 0
	},

	"status": {
		type: Number
	},

	"createdAt": {
		type: Date
	}

});

OrderItemSchema = new SimpleSchema({
	
	"orderId": {
		type: String
	},
	"waiterId":{
		type: String
	},
	"restaurantId": {
		type: String
	},

	"tableId": {
		type: String
	},  

	tableNo: {
		type: Number
	},

	"orderItems": {
		type: [Object],
		optional: true
	},

	"orderItems.$.id":{
		type: String
	},

	"orderItems.$.name":{
		type: String
	},

	"orderItems.$.quantity":{
		type: Number
	},

	"orderItems.$.price":{
		type: Number
	},

	"orderItems.$.innerTotal":{
		type: Number
	},

	"price": {
		type: Number
	},

	"orderNote": {
		type: String,
		optional: true
	},

	"completed": {
		type: Number
	},

	createdAt: {
		type: Date
	},

	"accepted":{
		type: Number
	}

});

InventorySchema = new SimpleSchema({

	"restaurantId": {
		type: String
	},

	"name": {
		type: String,
	},

	"unit" : {
		type: String,
	},

	"available": {
		type: Number
	},

	"transactions": {
		type: [Object],
		optional: true,
	},

	"transactions.$.type": {
		type: String
	},

	"transactions.$.quantity": {
		type: Number
	},

	"transactions.$.price": {
		type: Number
	},

	"transactions.$.date": {
		type: Date
	},

	"transactions.$.boughtAmount": {
		type: Number
	},

	"typicalBuyQuantityUnit": {
		type: String,
	},
	
	"createdAt": {
		type: Date
	},

	"updatedAt": {
		type: Date,
	}

});

OrderItems.attachSchema(OrderItemSchema);

OrderItems.after.insert(function(userId, doc){

	var currentOrder = Orders.findOne({_id: doc.orderId});
	
	var currentPrice = doc.price + currentOrder.total;

	Orders.update({_id: doc.orderId }, {$set:{total: currentPrice}});

});

Inventory.attachSchema(InventorySchema);
Orders.attachSchema(OrderSchema);
Restaurants.attachSchema(RestaurantSchema);
Tables.attachSchema(TableSchema);


