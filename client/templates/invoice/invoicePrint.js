Template.invoicePrint.events({



});


Template.invoicePrint.helpers({

    getOrderItems: function(){

        return OrderItems.find().fetch();

    },

    getOrderTotal: function(){

        return Orders.findOne({ _id: Router.current().params.id }).total;

    },

    'getTableNumber': function(){

        var tableId =  Orders.findOne({ _id: Router.current().params.id }).tableId;

        return Tables.findOne({_id: tableId}).no;

    }


});


Template.invoicePrint.onCreated(function(){

    toggleLoading();
    window.setTimeout(function(){
        toggleLoading();
        window.print();
    },2000);

});


