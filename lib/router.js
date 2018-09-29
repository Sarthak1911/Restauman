import { Meteor } from 'meteor/meteor';

Router.configure({
	layoutTemplate: "mainLayout"
});


Router.route('/', function(){
	this.render('login');
},{ name: 'login'});

Router.route('/register', function(){
	this.render('register');
},{
	name: 'register'
});

Router.route('/home', function(){
	this.subscribe('restoId').wait();
	this.subscribe('getTables', Meteor.user().restaurantId).wait();

	this.wait(Meteor.subscribe('getDishes', Meteor.user().restaurantId));
	this.wait(Meteor.subscribe('getOrderItems', Meteor.user().restaurantId));
	this.wait(Meteor.subscribe('getOrders', Meteor.user().restaurantId));

	this.render('home');
},
{
	name:'home'
});


Router.route('/home/menu', function(){
	this.render('menu');

	this.subscribe('restoId').wait();
	this.wait(Meteor.subscribe('getDishes', Meteor.user().restaurantId));
},
{
	name: 'menu'
});



Router.route('/home/inventory', function(){
	this.render('inventory');

	this.subscribe('restoId').wait();

	this.wait(Meteor.subscribe('getDishes', Meteor.user().restaurantId));
},
{
	name: 'inventory'
});


Router.route('/home/adminTable', function(){
	this.subscribe('restoId').wait();
	this.subscribe('getTables', Meteor.user().restaurantId).wait();

	
	this.render('adminTable');
},
{
	name: 'adminTable'
});


Router.route('/home/adminKitchen', function(){
	this.render('adminKitchen');
},
{
	name: 'adminKitchen'
});


Router.route('/home/adminOrder', function(){
	
	this.render('adminOrder');
	this.subscribe('restoId').wait();
	this.subscribe('getOrders', Meteor.user().restaurantId);
	this.subscribe('getTables', Meteor.user().restaurantId).wait();
	this.wait(Meteor.subscribe('getOrderItems', Meteor.user().restaurantId));
},
{
	name: 'adminOrder'
});

Router.route('/home/adminOrder/:id', function(){
	
	this.render('adminOrderSingle');
	this.subscribe('restoId').wait();
	this.subscribe('getSingleOrder', Meteor.user().restaurantId, Router.current().params.id).wait();
	this.subscribe('getTables', Meteor.user().restaurantId).wait();
	this.subscribe('getSingleOrderItems', Meteor.user().restaurantId, this.params.id).wait();
},{

	name: 'adminOrderSingle'

});

Router.route('/invoicePrint/:id', function(){
	
	this.render('invoicePrint');
	this.subscribe('restoId').wait();
	this.subscribe('getSingleOrder', Meteor.user().restaurantId, Router.current().params.id).wait();
	this.subscribe('getTables', Meteor.user().restaurantId).wait();
	this.subscribe('getSingleOrderItems', Meteor.user().restaurantId, this.params.id).wait();
},{
	name: 'invoicePrint'
});

Router.route('/home/adminEmployees', function(){
	this.render('adminEmployees');
},
{
	name: 'adminEmployees'
});

Router.route('/home/adminSettings', function(){
	this.subscribe('restoId').wait();
	this.subscribe('getCategories', Meteor.user().restaurantId).wait();
	this.subscribe('getTables', Meteor.user().restaurantId).wait();
	this.render('adminSettings');
},
{
	name: 'adminSettings'
});

Router.onBeforeAction(function(){
	if(Meteor.userId()){
		this.next();
	}else{
		Router.go('/');
	}
},{
	except: ['register','login']
});

Router.onBeforeAction(function(){
	if(Meteor.userId() == null){
		this.next();
	}else{
		Router.go('/home');
	}
},{
	only: ['register','login']
});

Router.route('/createOrder', function(){
	this.render('waitingCreateOrder')
},{
	name: 'createOrder'
});

Router.route('/reviewOrder', function(){

	this.render('reviewOrder');
	this.subscribe('restoId').wait();
	this.subscribe('getTables', Meteor.user().restaurantId).wait();
},{
	'name': 'confirmOrder'
});

Router.route('/reviewOrderDocket/:id', function(){

	this.render('reviewOrderDocket');
	this.subscribe('restoId').wait();
	// this.subscribe('getSingleOrder', Meteor.user().restaurantId, Router.current().params.id).wait();
},{
	'name': 'confirmOrderDocket'
});

// Router.route('/menu/edit/:id', function(){


// },{
// 	'name': ''
// });


Router.route('/menu/edit/:id', {

	action: function() {
		this.render('menuEdit', {
			data: function(){
				return { dishId: this.params.id }
			}
		});
	},
	
	waitOn: function() {
		if(Meteor.user()){
			return [
				Meteor.subscribe('restoId'), 
				Meteor.subscribe('getCategories', Meteor.user().restaurantId), 
				Meteor.subscribe('getSingleDish', this.params.id, Meteor.user().restaurantId)
			];
		}

		return [];
	},
	name: 'editDish'
});


Router.route('/order/:id', function(){

	this.render('order');
	this.subscribe('restoId').wait();
	this.subscribe('getSingleOrderItems', Meteor.user().restaurantId, this.params.id).wait();
	this.subscribe('getSingleOrder', Meteor.user().restaurantId, this.params.id).wait();
	this.subscribe('getTables', Meteor.user().restaurantId).wait();

},{
	'name': 'order'
});

Router.route('/addToOrder/:id', function(){

	this.render('addToOrder');
	this.subscribe('restoId').wait();
	this.wait(Meteor.subscribe('getDishes', Meteor.user().restaurantId));
	// this.subscribe('getSingleOrderItems', Meteor.user().restaurantId, this.params.id).wait();
	// this.subscribe('getSingleOrder', Meteor.user().restaurantId, this.params.id).wait();
	this.subscribe('getTables', Meteor.user().restaurantId).wait();

},{
	'name': 'addToOrder'
});