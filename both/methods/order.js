Meteor.methods({

    'placeOrder': function(tableId, allItems, note, tableNo){


        var orderId = Orders.insert({
            waiterId: Meteor.userId(),
            restaurantId: Meteor.user().restaurantId,
            tableId: tableId,
            tableNo: tableNo,
            status: 0,
            createdAt: new Date(),
        });   

        orderItemsTotal = allItems.map(e => Number(e.price) * Number(e.quantity)).reduce((acc, currVal) => acc + currVal);

        OrderItems.insert({
            orderId: orderId,
            tableId: tableId,
            tableNo: tableNo,
            waiterId: Meteor.userId(),
            restaurantId: Meteor.user().restaurantId,
            orderItems: allItems,
            price: orderItemsTotal,
            orderNote: note || '',
            accepted: 0,    
            completed: 0,
            createdAt: new Date(),
        });

        Tables.update({ _id: tableId }, { $set: { status: "true" } });
        
        return tableNo;
    },

    'addDocketToOrder':function(allItems, note, orderId){

        var currentOrder = Orders.findOne({ _id: orderId });
        var currentTable = Tables.findOne({ _id: currentOrder.tableId });

        var orderItemsTotal = 
        allItems.map(e => Number(e.price) * Number(e.quantity)).reduce((acc, currVal) => acc + currVal);

        var itemInserted = OrderItems.insert({
            orderId: orderId,
            tableId: currentOrder.tableId,
            tableNo: currentTable.no,
            waiterId: Meteor.userId(),  
            restaurantId: Meteor.user().restaurantId,
            orderItems: allItems,
            price: orderItemsTotal,
            orderNote: note || '',
            accepted: 0,
            completed: 0,
            createdAt: new Date(),
        });

    },

    'acceptOrder': function(data){

        OrderItems.update({ _id: data.orderItemsId, orderId: data.orderId},{$set:{accepted: 1}});
        
        //check if the order status is already set to 1
        if(!Orders.findOne({ _id: data.orderId }).status)
            Orders.update({_id: data.orderId}, {$set: { status: 1 }});

        if(!this.isSimulation){
            serverMessages.notify('orderAccepted:' + data.waiterId, 'Order Accepted', 'Order No. ' + data.orderId + ' for Table ' + data.tableNo + 'has been accepted' , {});
        }

        return true;
    },

    'setOrderComplete': function(data){
        OrderItems.update({ _id: data.orderItemsId, orderId: data.orderId },{ $set:{ completed: 1 } });
        if(!this.isSimulation){
            serverMessages.notify('orderCompleted:'+data.waiterId, 'Order Completed', 'Order No. ' + data.orderId + ' for Table ' + data.tableNo + ' has been completed' , {});
        }
        return true;
    },

    'pingWaiter': function(data){
        if(!this.isSimulation){
            serverMessages.notify('pingWaiter:' + data.waiterId, 'Ping', 'Call out for order on Table ' + data.tableNo , {});
        }
    },

    'setMasterOrderComplete': function(id){
        let currentOrder = Orders.findOne({_id: id});
        Orders.update({_id: id},{$set:  { status: 2 }});
        Tables.update({ _id: currentOrder.tableId }, { $set: { status: "false" } });
    }
});