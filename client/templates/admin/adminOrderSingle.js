Template.adminOrderSingle.helpers({


    'getTableNo': function(){
        return OrderItems.findOne().tableNo;
    },

    'getTotal': function(){
        return Orders.findOne().total;
    },

    'areDocketsComplete': function(){

        var incompleteCount = OrderItems.find({orderId:  Router.current().params.id, completed: 0}).count();
        // console.log(incompleteCount);
        if(incompleteCount == 0){
            return 'js-set-order-complete';
        }

        return 'disabled'
    },

    'getRelativeCreatedTime': function(){

        return moment(Orders.findOne().createdAt).startOf('minute').fromNow();
    },

    'getRelativeCreatedTimeDocket': function(){

        return moment(OrderItems.find({_id: this._id}).fetch().createdAt).startOf('minute').fromNow();
    },

    'singleDocketItems': function(){

        var id = Orders.findOne();
        return OrderItems.find({orderId: id._id},{sort: { createdAt: -1 }});
    },

    'getStatus': function(){
        if(this.accepted == 1 && this.completed == 1){
            return 'status-completed';
        }else if(this.accepted == 0 && this.completed == 0){
            return 'status-new';
        }else if(this.accepted == 1 && this.completed == 0){
            return 'status-accepted';
        }
    }

});

Template.adminOrderSingle.events({


    'click .js-print-invoice': function(){
        
        Router.go('/invoicePrint/' + Router.current().params.id);

    }

});