var lineItemLib = require('./src/lineitem');

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
lineItems.forEach(function(lineItem){
  console.log(lineItem.description + ': ' + lineItem.ASIN);
  console.log(lineItem.item.cost.total())
});