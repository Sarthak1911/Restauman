Meteor.methods({

	createNewUser: function(data){

		if(!this.isSimulation){

			var userId = Accounts.createUser({email: data.email, password: data.password});
			
			Roles.addUsersToRoles(userId, ['admin']);	

			return userId;
		}

	},

	createRestaurant: function(userId, restauName){
		
		var restau = Restaurants.insert({name: restauName , categories: [], tables: [{}]});

		var asd = Meteor.users.update({ _id: userId }, { $set: {restaurantId: restau } });

		return true;
	}

});