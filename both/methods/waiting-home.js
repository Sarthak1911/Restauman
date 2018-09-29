Meteor.methods({

	'toggleStatus': function(data){

		if(!this.isSimulation)
		{
			var temp = Tables.find(data).fetch()[0].status;

			if(temp == "false")
			{
				Tables.update(data, {

					$set: { status: "true"}

				});
			}

			if(temp == "true")
			{

				Tables.update(data, {

					$set: { status: "false"}

				});
			}

		}

	}

});