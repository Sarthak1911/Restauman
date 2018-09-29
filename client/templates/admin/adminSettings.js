import validate from 'jquery-validation';
import $ from 'jquery';

Template.adminSettings.events({
	'submit .add-employee': function(event, template){
		event.preventDefault();
		
		var form = template.find('.form-add-employee');

		var data = {
			email: $('[name="email"]').val().trim(),
			password: $('[name="password"]').val().trim(),
			staffType: $('[name="staffType"]:checked').val(),
		}
		
		toggleLoading();

		Meteor.call('createNewEmployee', data, function(error, result){
			toggleLoading();

			if(error){
				Bert.alert( error.reason, 'danger', 'fixed-top', 'fa-warning' );
			}else{
				Bert.alert(data.email + " with " + data.staffType + " has been added successfully.","success");
			}

		});
	},
	'submit .add-category': function(event, template){
		event.preventDefault();

		var dishCategory = $('[name="dishCategory"]').val().trim();

		var fetchedCats = Restaurants.find({_id: Meteor.user().restaurantId }, {categories: 1}).fetch();


		if(fetchedCats[0].categories == null)
		{
			toggleLoading();
			Meteor.call('addDishCategory', dishCategory, function(err, result){

				toggleLoading();
				if(err){
					console.log(err);
				}else{
					Bert.alert("Added " +dishCategory+ " into categories.","success");

				}
			});
		}
		else
		{
			if((fetchedCats[0].categories.indexOf(dishCategory)) >= 0){
				Bert.alert("Seems like this category is already present.","danger");
				return;
			}
			
			toggleLoading();
			Meteor.call('addDishCategory', dishCategory, function(err, result){

				toggleLoading();
				if(err){
					console.log(err);
				}else{
					Bert.alert("Added " +dishCategory+ " into categories.","success");
				}
			});
		}

		return;
	},

	'submit .add-dish': function(event, template){

		event.preventDefault();

		var dish = {
			name: $('[name="dishName"]').val(), 
			type: $('[name="dishType"]').val(), 
			category: $('[name="dishCategory"]').val(), 
			description: $('[name="dishDescription"]').val(), 
			price: $('[name="dishPrice"]').val(), 
		};
		
		toggleLoading();

		Meteor.call('addDish', dish , function(err, result){

			toggleLoading();

			if(result == false){
				Bert.alert('The dish is already present.', 'danger');
			}else{
				Bert.alert('The dish ' + dish.name + ' was added successfully', 'success');
			}
		});

		return;
	},

	'submit .add-table': function(event, template){
		
		event.preventDefault();
		
		var data = {
			capacity: $('[name="seats"]').val(),
			no: $('[name="tableNo"]').val()
		}

		Meteor.call('addTable', data, function(err, res){

			if(err) {
				Bert.alert(err.reason, 'danger');
			}
			else{
				Bert.alert('Table no. ' + data.no + ' with capacity ' + data.capacity + ' was added successfully', 'success');
			}
		});

		return;

	}


});

Template.adminSettings.helpers({
	'getCategories': function(){
		var fetchedCats =  Restaurants.find({_id: Meteor.user().restaurantId }, {categories: 1}).fetch();

		return fetchedCats;
	}
});

Template.adminSettings.onRendered(function(){
	this.$('.add-employee').validate({
		errorElement: "div",
		errorPlacement: function(error, element){
			error.insertAfter($(element).parent())
		},
		rules: {
			email: {
				required: true,
				email: true,
			},
			password: {
				required: true,
			},
			staffType: {
				required: true,
			}
		}
	});

	this.$('.add-category').validate({
		errorElement: "div",
		errorPlacement: function(error, element){
			error.insertAfter($(element).parent())
		},
		rules: {
			dishCategory: {
				required: true,
			},
		}
	});

	this.$('.add-dish').validate({
		errorElement: "div",
		errorPlacement: function(error, element){
			error.insertAfter($(element).parent())
		},
		rules: {
			dishName: {
				required: true,
			},
			dishCategory: {
				required: true,
			},
			dishPrice: {
				required: true,
				number: true
			}
		}
	});

	this.$('.add-table').validate({
		errorElement: "div",
		errorPlacement: function(error, element){
			error.insertAfter($(element).parent())
		},
		rules: {
			tableNo: {
				required: true,
			},
			seats: {
				required: true,
				number: true
			}
		}
	});

});




