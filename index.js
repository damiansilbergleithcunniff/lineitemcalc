requirejs.config({
  //Pass the top-level main.js/index.js require
  //function to requirejs so that node modules
  //are loaded relative to the top-level JS file.
  nodeRequire: require,
  baseUrl: 'src/',
  paths: {
    // the left side is the module ID,
    // the right side is the path to
    // the jQuery file, relative to baseUrl.
    // Also, the path should NOT include
    // the '.js' file extension. This example
    // is using jQuery 1.9.0 located at
    // js/lib/jquery-1.9.0.js, relative to
    // the HTML page.
    jquery: 'vendor/jquery-3.1.1.min',
    accounting: '../node_modules/accounting/accounting.min'
  }
});



define(['jquery','lineitem','renderer'],(function($,lineItemLib, lineItemRenderer) {
  var candle1 = lineItemLib.item('111625166', 'Roasted Chestnut & Cherries 3-Wick Candle', 8.5);
  var candle2 = lineItemLib.item('86718036','Midnight Blue Citrus 3-Wick Candle', 8.5);
  var candle3 = lineItemLib.item("111625186", "Frosty Air 3-Wick Candle", 8.5);
  var candle4 = lineItemLib.item("111625156", "Smoked Vanilla 3-Wick Candle", 8.5);
  var candle5 = lineItemLib.item("111625146", "Iced Vanilla Woods 3-Wick Candle", 8.5);
  var other = lineItemLib.item("105391086", "White Barn Fresh 6-Pack Wallflowers Sampler", 22.50);

  var lineItems = [
    lineItemLib.lineItem(candle1, 2),
    lineItemLib.lineItem(candle2, 3),
    lineItemLib.lineItem(candle3, 2),
    lineItemLib.lineItem(candle4, 2),
    lineItemLib.lineItem(candle5, 2),
    lineItemLib.lineItem(other, 1)];

  var order = lineItemLib.order(lineItems, 116.00, 5.99, 8.54);

  //        for (var i = 0; i < lineItems.length; i++){
//          lineItemRenderer.renderExistingLineItem('theTableBody', lineItems[i], i+1)
//        }

  var renderedOrder = lineItemRenderer.renderedOrder(order, $('#theTable'), $('#order-display'));
  $(document).keyup(renderedOrder.handleKeyPress);
  $('#button_add_row').click(function(){renderedOrder.addRow(lineItemLib.lineItem(lineItemLib.item('','',0),0))});
  renderedOrder.refreshTable();
}));