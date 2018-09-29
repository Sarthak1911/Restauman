import validate from 'jquery-validation';
import $ from 'jquery';


Template.menuEdit.helpers({
	getCategories(){
		if(Meteor.user()){
			return Restaurants.find({_id: Meteor.user().restaurantId }, { categories: 1 }).fetch();
		}

		return []
	},

	getDish(){
		return Dishes.findOne({ _id: Router.current().params.id });
	},
	
	checkType(type, dish){
		return dish.type == type;
	},
	
	checkCategory(category, dish){
		return dish.category == category;
	}
});

Template.menuEdit.events({

	'submit .edit-dish': (event) => {

		event.preventDefault();

		var dish = {
			id: Router.current().params.id,
			name: $('[name="dishName"]').val().trim(), 
			type: $('[name="dishType"]').val().trim(), 
			category: $('[name="dishCategory"]').val().trim(), 
			description: $('[name="dishDescription"]').val().trim(), 
			price: $('[name="dishPrice"]').val().trim(), 
		};

		toggleLoading();

		Meteor.call('editDish', dish, (err, result) => {

			toggleLoading();

			if(err){ 
				Bert.alert(err.reason, 'danger');
			}
			else{
				Bert.alert('Success', 'success');
				Router.go('/home/menu');
			}
		});
	}

});

Template.menuEdit.onRendered(() => {
	console.log(this.currentData);
	this.$('.edit-dish').validate({ 
		errorPlacement: function(error, element){
			error.insertAfter($(element).parent())
		},
		rules: {
			dishName: {
				required: true,
			},
			dishType: {
				required: true,
			},
			dishCategory: {
				required: true,
			},
			dishPrice: {
				required: true,
			}
		}

	});



})