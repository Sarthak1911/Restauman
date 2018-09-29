Template.register.events({

	'click .js-register-submit': function(event, template){

		var data = {
			username: $('#username').val(),
			email: $('#email').val(),
			password: $('#password').val(),
			repass: $('#re_password').val(),
			restaurantInfo: $('#resto_name').val()
		};

		//spinner 
		Meteor.call('createNewUser', data, function(error, result){

			if(error){

				Session.set('errorRegister', error.reason);
				return;
			}

			Meteor.call('createRestaurant',result, data.restaurantInfo, function(error, result){

					if(error){
						console.log(error);
						return
					}else{
						Meteor.loginWithPassword(data.email, data.password, function(error){
							if(error){
								console.log(error);
							}else{

								Router.go('/adminHome');
								Bert.alert("You are now logged in!","success");
							}
						});
					}
			});

		});	
	}


});


Template.register.helpers({
	'errorRegister': function(){
		var temp = Session.get('errorRegister');	

		if(temp == null)
		{

		}
		else
		{
			Bert.alert(temp,"danger");
		}
	}
});