

var addToDocket = function(item){
	if(Array.isArray(Session.get('orderItems'))){

		var innerTotal = item.quantity * item.price;

		var tempItems = Session.get('orderItems');

		tempItems.push({id: item.id, name: item.name, quantity: item.quantity, price: item.price, innerTotal: innerTotal});

		Session.set('orderItems', tempItems);

		return;
	}

	var innerTotal = item.quantity * item.price;

	Session.set('orderItems', [{id: item.id, name: item.name, quantity: item.quantity, price: item.price, innerTotal: innerTotal}]);

	console.log("Items not present");
}

Template.waitingHome.helpers({
	'dishes': function(){
		return Dishes.find({},{category: -1}).fetch();
	},

	'getOrders': function(){
		return Orders.find().fetch();
	},

	'getStatus': function(){
		if(this.status == 0){
			return 'status-new';
		}else if(this.status == 1){
			return 'status-accepted';
		}else if(this.status == 2){
			return 'status-completed';
		}
	},

	'getSingleOrderItems': function(id){
		return OrderItems.find({orderId: id }).fetch();
	},

	'getOrders': function(){

		return Orders.find({},{ sort: { createdAt: -1 , completed: 1}});

	},

	'getTables': function(){

		return Tables.find({}, {fields: {'no': 1, 'capacity': 1, 'status': 1}}).fetch();
	},

	'getRelativeCreatedTime': function(){

		return moment(this.createdAt).startOf('minute').fromNow();
	},

	'createOrderButton': function(){
		var orderItems = Session.get('orderItems');

		if(orderItems === undefined || orderItems[0] === undefined)
			return 'disabled';   

		return 'js-create-order';
	},

	'getTableNo': function(){
		return Tables.findOne({_id: this.tableId }).no;
	}
})

Template.waitingHome.events({

	'click .hit': function(event){

		event.preventDefault();

		toggleLoading();

		Meteor.call('toggleStatus', this._id, function(error, result){

			toggleLoading();

			if(error){
				Bert.alert( error.reason, 'danger', 'fixed-top', 'fa-warning' );
			}else
			console.log(result);
		});

	},

	'click li.current__item': function(event){

		var currentItem = $(event.target),
		currentId = this._id,
		currentDish = this.name,
		currentPrice = this.price;

		if(currentItem.hasClass('current__item_selected')){

			swal({
				title: "Remove " + currentDish + " ?",
				type: "warning",
				showCancelButton: false,
				showConfirmButton: true,
				closeOnConfirm: false,   
				closeOnCancel: false
			},
			function(isConfirm){

				if(isConfirm) {    

					var newTempArray = Session.get('orderItems').filter(function(elem){
						return elem.id != currentId;
					});

					Session.set('orderItems', newTempArray);

					currentItem.toggleClass('current__item_selected');
					swal({title: currentDish +  " removed!", type: "success", timer: 1000, showConfirmButton: false});  
				} 
			});

			return;
		}

		swal({   
			title: this.name,
			text: this.description,
			type: "input",
			customClass: "addItemAlert",
			showCancelButton: false,
			closeOnConfirm: false,
			closeOnCancel: true,
			inputPlaceholder: "Select quantity",
			inputType: "number",
			inputValue: 1
		},function(inputValue){   

			if (inputValue === false) return false;    

			if (inputValue === "" || isNaN(inputValue)) {     
				swal.showInputError("You need to write something!");     
				return false;
			}     

			var item = {id: currentId, name: currentDish, quantity: inputValue, price: currentPrice};
			addToDocket(item);
			currentItem.toggleClass('current__item_selected');
			swal({ title: inputValue + " portions of " + currentDish + " added." ,  timer: 1000,   showConfirmButton: false });
		});
	},

	'click .js-create-order': function(){

		var orderItems = Session.get('orderItems');

		if(orderItems === undefined || orderItems[0] === undefined){
			alert('You must add something to the order');
		}else{
			Router.go('/reviewOrder');
		}

	}

})

Template.waitingHome.onCreated(function(){
	var self = this;
	Tracker.autorun(function(){


		self.subscribe('getOrderItems', Meteor.user().restaurantId);
		self.subscribe('getOrders', Meteor.user().restaurantId);


	});



		serverMessages.listen('orderAccepted:' + Meteor.userId() , function (subject, message, options) {
			var s = new buzz.sound('/accepted.mp3');
			s.play();
			Bert.alert(message, 'success')
		// Bert.alert(message);
	});

		serverMessages.listen('orderCompleted:' + Meteor.userId() , function (subject, message, options) {
			var s = new buzz.sound('/completed.mp3');
			s.play();
			Bert.alert(message, 'success')
		// Bert.alert(message);
	});

		serverMessages.listen('pingWaiter:' + Meteor.userId() , function (subject, message, options) {
			var s = new buzz.sound('/ping-waiter.mp3');
			s.play();

			Bert.alert(message, 'success')
		// Bert.alert(message);
	});

	});


