Template.reviewOrderDocket.events({

  'click .confirm-order': function(event, template){

    
    },

    'click .js-place-order': function(event) {
            
        var allItems = [];

        Session.get('orderItems').forEach(function(elem, index){

            allItems.push(elem);
        });


        Meteor.call('addDocketToOrder', Session.get('orderItems'), $('#note').val(), Router.current().params.id, function(err, res){
            if(err){
                console.log(err);
                Session.set('orderItems',[]);
            }
        });

        Session.set('orderItems',[]);
         Bert.alert("The order has been placed!", "success");
         Router.go('/');
    }
    
});

Template.reviewOrderDocket.helpers({

    'getCurrentOrder': function(){

        return Session.get('orderItems');

   },

   'getOrderTotal': function(){

     var  orderItems = Session.get('orderItems');
     var total = 0;

     orderItems.forEach(function(elem){
        total +=  elem.quantity * elem.price
     });

     return total;

   }


});

Template.reviewOrderDocket.onCreated(function(){

    serverMessages.listen('orderAccepted:' + Meteor.userId() , function (subject, message, options) {
            var s = new buzz.sound('/accepted.mp3');
            s.play();
            Bert.alert(message, 'success')
        // Bert.alert(message);
    });

        serverMessages.listen('orderCompleted:' + Meteor.userId() , function (subject, message, options) {
            var s = new buzz.sound('/completed.mp3');
            s.play();
            Bert.alert(message, 'success')
        // Bert.alert(message);
    });

        serverMessages.listen('pingWaiter:' + Meteor.userId() , function (subject, message, options) {
            var s = new buzz.sound('/ping-waiter.mp3');
            s.play();

            Bert.alert(message, 'success')
        // Bert.alert(message);
    });
});