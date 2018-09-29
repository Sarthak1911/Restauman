Meteor.methods({

	'createNewEmployee': function(data){
		
		if(!this.isSimulation){

			var empId = Accounts.createUser({email: data.email, password: data.password});
			console.log(empId);
			
			Roles.addUsersToRoles(empId, [data.staffType]);

			Meteor.users.update({ _id: empId },{ $set:{ restaurantId: Meteor.user().restaurantId }});

			return empId;
		}

	},

	'addTable': function(data){
		if(!this.isSimulation){


			var check = Tables.find({ restaurantId: Meteor.user().restaurantId, no: parseInt(data.no, 10) }).fetch();

			console.log(check);
			if(check.length > 0) 
			{
				throw new Meteor.Error(500, "There's already a table present with this number");
			}


			var add = Tables.insert({
				restaurantId: Meteor.user().restaurantId,
				no: data.no,
				capacity: data.capacity
			});

			return add;
		}
	}


});