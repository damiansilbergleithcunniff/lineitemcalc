/**
 * Created by damian on 12/4/16.
 */
(function(){
  var renderExistingLineItem = function(targetID, lineItem, index){
    var target = $('#theTableBody');
    var newRow = "<tr>" +
      "<td><span>" + index + "</span></td>" +
      "<td><span>" + lineItem.description + "</span></td>" +
      "<td><span>" + lineItem.ASIN + "</span></td>" +
      "<td><span>" + lineItem.item.cost.price + "</span></td>" +
      "<td><span>" + lineItem.item.cost.shipping + "</span></td>" +
      "<td><span>" + lineItem.item.cost.tax + "</span></td>" +
      "<td><a class='btn btn-sm btn-default glyphicon glyphicon-edit' onclick='lineItemRenderer.renderEditLineItem()'/></td>" +
      "</tr>";
    target.append(newRow);

  };
  var renderEditLineItem = function(targetID, lineItem) {
    //find the table
    var target = $('#theTableBody');
    var newRow = "<tr>" +
      "<td><a class='btn btn-sm btn-danger glyphicon  glyphicon-remove' onclick='removeThisRow()'/></td>" +
      "<td><input type='text' value='" + lineItem.description + "' class=''></td>" +
      "<td><input type='text' value='" + lineItem.ASIN + "' class=''></td>" +
      "<td><input type='text' value='" + lineItem.item.cost.price + "' class=''></td>" +
      "<td><input type='text' value='" + lineItem.item.cost.shipping + "' class=''></td>" +
      "<td><input type='text' value='" + lineItem.item.cost.tax + "' class=''></td>" +
      "<td><a class='btn btn-sm btn-success glyphicon  glyphicon-ok-circle' onclick='removeThisRow()'/></td>" +
      "</tr>"
    target.append(newRow);
  };
  var addLineItem = function(targetID){
    renderEditLineItem(targetID, lineItem)
  }


  window.lineItemRenderer = {
    renderEditLineItem: renderEditLineItem,
    renderExistingLineItem: renderExistingLineItem
  }
})();
