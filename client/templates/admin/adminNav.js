Template.adminNav.events({

	'click .js-logout': function(event){
		logoutUser();
	}
});


Template.adminNav.onRendered(function(){

	$(".button-collapse").sideNav();

	$('#slide-out li').click(() => {
		$('#sidenav-overlay').css('opacity', 0);
	})
	
});