Template.order.helpers({


	'getTableNo': function(){
		return OrderItems.findOne().tableNo;
	},

	'getTotal': function(){
		return Orders.findOne().total;
	},

	'areDocketsComplete': function(){

		var incompleteCount = OrderItems.find({orderId:  Router.current().params.id, completed: 0}).count();
		// console.log(incompleteCount);
		if(incompleteCount == 0){
			return 'js-set-order-complete';
		}

		return 'disabled'
	},

	'getRelativeCreatedTime': function(){

		return moment(Orders.findOne().createdAt).startOf('minute').fromNow();
	},

	'getRelativeCreatedTimeDocket': function(){

		return moment(OrderItems.find({_id: this._id}).fetch().createdAt).startOf('minute').fromNow();
	},

	'singleDocketItems': function(){

		var id = Orders.findOne();
		return OrderItems.find({orderId: id._id},{sort: { createdAt: -1 }});
	},

	'getStatus': function(){
		if(this.accepted == 1 && this.completed == 1){
			return 'status-completed';
		}else if(this.accepted == 0 && this.completed == 0){
			return 'status-new';
		}else if(this.accepted == 1 && this.completed == 0){
			return 'status-accepted';
		}
	}

});

Template.order.events({

	'click .js-add-to-order': function(){

		Router.go('/addToOrder/' + Router.current().params.id);
		
	},

	'click .js-set-order-complete': function(){

		Meteor.call('setMasterOrderComplete', Router.current().params.id, function(err, res){

			console.log(res);
			console.log(err);

			if(!err){
				swal({ 
					title: "Order complete", 
					text: "Please pay the bill at the counter", 
					timer: 2000, 
					type: "success",
					showConfirmButton: false
				}
				);

				Meteor.setTimeout(function(){
					Router.go('/');
				},2000);
				
			}


		});

	}

});

Template.order.onCreated(function(){

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