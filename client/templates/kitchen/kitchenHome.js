Template.kitchenHome.helpers({

	'getStatus': function(){
		if(this.accepted == 1 && this.completed == 1){
			return 'status-completed';
		}else if(this.accepted == 0 && this.completed == 0){
			return 'status-new';
		}else if(this.accepted == 1 && this.completed == 0){
			return 'status-accepted';
		}
	},

	'getOrderItems': function(){
		return OrderItems.find({},{sort: { createdAt: -1 }});
	},

	'getRelativeCreatedTime': function(){

		return moment(this.createdAt).startOf('minute').fromNow();
	}
})

Template.kitchenHome.events({
	'click .js-setdish-inprocess': function(event, template){
		
		var data = {
			orderId: this.orderId,
		}

	},

	'click .js-accept-order': function(event, template){
		
			
		var data = {
			waiterId: this.waiterId,
			orderItemsId: this._id,
			orderId: this.orderId,
			tableNo: this.tableNo,
			restaurantId: this.restaurantId
		};


		Meteor.call('acceptOrder', data, function(err, result){
			if(err){
				console.log(err);
			}else{
				console.log(result)
			}
		});

	},

	'click .js-setdish-completed': function(event, template){		

		var data = {
			waiterId: this.waiterId,
			orderItemsId: this._id,
			orderId: this.orderId,
			tableNo: this.tableNo,
			restaurantId: this.restaurantId
		};

		Meteor.call('setOrderComplete', data, function(err, result){
			if(err){
				console.log(err);
			}else{
				console.log(result)
			}
		});

	},
	'click .js-setdish-partialcomplete': function(event, template){		

		var data = {
			waiterId: this.waiterId,
			orderItemsId: this._id,
			orderId: this.orderId,
			tableNo: this.tableNo,
			restaurantId: this.restaurantId
		};

		Meteor.call('pingWaiter', data);

	}
})

Template.kitchenHome.onCreated(function(){
	var self = this;

	self.autorun(function(){

		self.subscribe('getOrderItems', Meteor.user().restaurantId)

	});

});