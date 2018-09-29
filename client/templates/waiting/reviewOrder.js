Template.reviewOrder.events({

    'click .confirm-order': function(event, template){

    
    },

    'click .js-place-order': function(event) {
            
        var allItems = [];

        Session.get('orderItems').forEach(function(elem, index){

            allItems.push(elem);
        });

       
       
        Meteor.call('placeOrder',  $('#table').val(), Session.get('orderItems'), $('#note').val(), $('#table :selected').text() ,function(err, res){
            if(err){
                console.log(err);
                Session.set('orderItems',[]);
            }else{
                Bert.alert("The order has been placed for Table " + res, "success");
                Session.set('orderItems',[]);
            }
        });

         Router.go('/');
         Bert.alert("The order has been placed for Table " + $('#table :selected').text(), "success");
         console.log( $('#table :selected').text());
    }

});

Template.reviewOrder.helpers({

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

   },

   'getTables': function(){
        return Tables.find({status: "false"}).fetch();
   }
});


Template.reviewOrder.onCreated(function(){

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