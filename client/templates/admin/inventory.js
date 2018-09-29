Template.menu.helpers({

	'getInventoryItems': function(){

		return Inventory.find({ restaurantId: Meteor.user().restaurantId});
	
	}

});

Template.menu.events({

	'click .js-delete-inventory': function(event, template){

		event.preventDefault();

		Meteor.call('removeInventory',this._id, function(err,result){
			
			if(err) 
			{
				Bert.alert(err.reason, 'danger');
			}
			else
			{
				Bert.alert('Dish was removed from Menu successfully', 'success');
			}
		});
	},

	'click .js-edit-dish-menu': function(event, template){

		event.preventDefault();

		var dishId = this._id;

		Router.go('/menu/edit/' + dishId , { _dishId: dishId });
	}

});