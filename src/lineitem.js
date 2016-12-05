/**
 * Created by damian on 12/4/16.
 */
(function() {

  var roundCurrency = function(val) {
    var tmp = val * 100;
    tmp = Math.ceil(tmp);
    return tmp / 100;
  };
  // type: Factory Function
  // desc: Creates a price object
  var cost = function() {
    var thisCost =  {
      price: 0.00,
      tax: 0.00,
      shipping: 0.00,
      total: function() { return roundCurrency(thisCost.price + thisCost.tax + thisCost.shipping); }
    };

    return thisCost;
  };

  // type: Factory Function
  // desc: Creates an item
  var item = function(ASIN, description, price){
    var thisItem = {
      ASIN: ASIN,
      description: description,
      cost: cost()
    };
    thisItem.cost.price = price;
    return thisItem;
  };

  // type: Factory Function
  // desc: Creates a line item which is an item and quantity
  //  The line item uses the item it was given as a prototype
  //  this allows it to inherit ASIN and Description
  //  it then overrides price to reflect the sum from the items
  var lineItem = function(item, quantity) {
    var thisLineItem = Object.create(item);
    thisLineItem.item = item;
    thisLineItem.quantity = quantity;
    thisLineItem.cost = {
      price: function() { return thisLineItem.item.cost.price * thisLineItem.quantity },
      tax: function() { return thisLineItem.item.cost.tax * thisLineItem.quantity },
      shipping: function() { return thisLineItem.item.cost.shipping * thisLineItem.quantity }
    };

    return thisLineItem;
  };

  // type: Factory Function
  // desc: An order is made of line items with shipping and tax
  var order = function(lineItems, baseOrderTotal, shipping, tax) {

    //// Input validation
    // lineitems must be an array
    // TODO: Validate
    // if (typeof(lineItems) !== 'Array'){
    //   throw new Error('lineItems must be an array')
    // }
    // // verify that the order is properly priced
    // // and that all of our line items are included
    var lineItemPriceTotal = 0.00;
    var totalItemCount = 0;
    lineItems.forEach(function(lineItem) {
      lineItemPriceTotal += lineItem.cost.price();
      totalItemCount += lineItem.quantity;
    });
    if (lineItemPriceTotal !== baseOrderTotal){
      throw new Error('Line item price total (' + lineItemPriceTotal +
        ') does not equal base order price (' + baseOrderTotal + ') ')
    }

    //// Create order object
    var thisOrder = {
      lineItems: lineItems,
      baseOrderTotal: baseOrderTotal,
      shipping: shipping,
      tax: tax,
      total: function(){ return this.baseOrderTotal + this.shipping + this.tax },
      totalItemCount: totalItemCount
    };

    // get the shipping cost per item and the tax rate that the order was taxed at
    var perItemShipping = thisOrder.totalItemCount && ( thisOrder.shipping / thisOrder.totalItemCount );
    var taxRate = ( thisOrder.baseOrderTotal + thisOrder.shipping )  &&
                    thisOrder.tax / ( thisOrder.baseOrderTotal + thisOrder.shipping ) ;

    // assign to the item in each of the lineItems
    lineItems.forEach(function(lineItem) {
      lineItem.item.cost.shipping = perItemShipping ;
      lineItem.item.cost.tax = (lineItem.item.cost.price + perItemShipping) * taxRate;
    });

    return thisOrder;
  };

  if (typeof(module) === 'undefined'){
    window.lineItemLib = {
      cost: cost,
      item: item,
      lineItem: lineItem,
      order: order
    }
  } else {
    module.exports.cost = cost;
    module.exports.item = item;
    module.exports.lineItem = lineItem;
    module.exports.order = order;
  }

}());