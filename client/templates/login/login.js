import validate from 'jquery-validation';
import $ from 'jquery';

Template.login.events({

	'submit .login': function(e){

		e.preventDefault();

		var data = {
			email: $('#email').val(),
			password: $('#password').val()
		};

		Meteor.loginWithPassword(data.email, data.password, function(err){
			if(err){
				Bert.alert( err.reason, 'danger', 'fixed-top', 'fa-warning' );
				return;
			}
			
			Router.go('/adminHome');
			Bert.alert("You are now logged in", "success");
		});

		return;

	}

});

Template.login.onRendered(function(){
	this.$('.login').validate({
		rules: {
			email: {
				required: true,
				email: true,
			},
			password: {
				required: true,
			}
		}
	});


})