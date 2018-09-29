Template.waitingNav.events({
	"click .js-logout": function(){
		logoutUser();
	}
});


Template.waitingNav.rendered = function(){

	$('ul.tabs').tabs();

}