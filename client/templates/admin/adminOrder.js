Template.adminOrder.helpers({

    'orders': function(){
        return Orders.find({}, {sort: {status: -1}}).fetch();  
    },

    'getRelativeCreatedTime': function(){

        return moment(Orders.findOne().createdAt).startOf('minute').fromNow();
    },

    'getStatus': function(){
        if(this.status == 0){
            return 'status-new';
        }else if(this.status == 1){
            return 'status-accepted';
        }else if(this.status == 2){
            return 'status-completed';
        }
    },

    'areDocketsComplete': function(){

        var incompleteCount = OrderItems.find({orderId:  Router.current().params.id, completed: 0}).count();
        // console.log(incompleteCount);
        if(incompleteCount == 0){
            return 'js-set-order-complete';
        }

        return 'disabled'
    },

    'getTableNo': function(){

        var tableId = Orders.findOne({_id: this._id}).tableId;

        return Tables.findOne({_id: tableId}).no;
    }

});