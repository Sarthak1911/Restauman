toggleLoading = function(){
	$('body').toggleClass('loading')
}

logoutUser = function(){
	Meteor.logout();
	Router.go('/');
	Bert.alert("You have been logged out", "success");
}

// playNotification = function(){
//     var s = new buzz.sound('/notify.mp3');
//     s.play();
// }