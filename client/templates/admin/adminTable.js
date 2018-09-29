Template.adminTable.helpers({

	'getTables': function(){
		return Tables.find({}, {fields: {'no': 1, 'capacity': 1, 'status': 1}}, { sort: {no: 1}}).fetch();
	}
});
