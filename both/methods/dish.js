Meteor.methods({

	'addDishCategory': function(dishCategory){
		if(!this.isSimulation){

			// var doesExist = Restaurants.find({ categories:{ $elemMatch: dishCategory } });
			Restaurants.update( {_id: Meteor.user().restaurantId } ,
				{ $addToSet: { categories: dishCategory  }});
		}
	},

	'addDish': function(dish){
		
		if(!this.isSimulation)
		{
			var check = Dishes.find({ name: dish.name, restaurantId: Meteor.user().restaurantId }).fetch();

			if(check.length > 0){
				return false;
			}else{
				var d = Dishes.insert({
					restaurantId: Meteor.user().restaurantId,
					name: dish.name,
					type: dish.type,
					category: dish.category,
					description: dish.description,
					price: dish.price
				});

				return true;
			}

		}

	},


	'setDishInProcessing': function(){

	},

	'setDishPartialComplete': function(){
		
	},

	'setDishCompleted': function(){

	},

	'removeDish':function(dishId){
		if(!this.isSimulation)
		{
			Dishes.remove(dishId);
		}
	},

	'editDish':function(dish){
			console.log(dish);

		if(!this.isSimulation) {
			
			var check = Dishes.findOne({ 
				name: dish.name, 
				restaurantId: Meteor.user().restaurantId, 
				_id: { $ne: dish.id } 
			});

			if(check){
				throw new Meteor.Error(500, 'There\'s already a dish present with this name.');
			}

			Dishes.update({ 
				_id: dish.id, 
				restaurantId: Meteor.user().restaurantId 
				}, 
				{ 
					$set: {
					name: dish.name,
					type: dish.type,
					category: dish.category,
					description: dish.description,
					price: dish.price
				}
			});

			return true;
		}

	}

});	