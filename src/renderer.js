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


  // Factory Function
  // Returns a renderedOrder which is used to control
  //  the UI
  // Pass in the order and the target JQuery table element
  var renderedOrder = function(order, targetTable) {
    var that = {
      order: order,
      targetTable: targetTable
    };

    // Private Variables
    var tableBody = targetTable.find('tbody');
    var generateStaticRow = function(lineItemIndex){
      var lineItem = that.order.lineItems[lineItemIndex];
      var newRowObj = $('<tr>');
      newRowObj.lineItem = lineItem;
      newRowObj.append($('<td>').append($('<span>').html(lineItemIndex)));
      newRowObj.append($('<td>').append($('<span>').html(lineItem.description)));
      newRowObj.append($('<td>').append($('<span>').html(lineItem.ASIN)));
      newRowObj.append($('<td>').append($('<span>').html(lineItem.item.cost.price)));
      newRowObj.append($('<td>').append($('<span>').html(lineItem.item.cost.shipping)));
      newRowObj.append($('<td>').append($('<span>').html(lineItem.item.cost.tax)));
      newRowObj.append($('<td>').append($('<span>').html(lineItem.quantity)));
      // make the edit link
      var editLink = $('<a>');
      editLink.attr('class', 'btn btn-sm btn-default glyphicon glyphicon-edit');
      editLink.editThisRow = function(){ that.editRow(lineItemIndex) };
      editLink.click(editLink.editThisRow);
      newRowObj.append($('<td>').append($('<span>').append(editLink)));

      return newRowObj;
    };
    var generateEditRow = function(lineItemIndex){
      var lineItem = that.order.lineItems[lineItemIndex];
      var newRowObj = $('<tr>').addClass('danger');
      newRowObj.lineItem = lineItem;
      // make the cancel link
      var cancelLink = $('<a>');
      cancelLink.attr('class', 'btn btn-sm btn-danger glyphicon glyphicon-remove');
      cancelLink.abortEdit = function(){ that.refreshTable() };
      cancelLink.click(cancelLink.abortEdit);

      newRowObj.append($('<td>').append($('<span>').append(cancelLink)));
      newRowObj.append($('<td>').append($('<span>').append($('<input>').attr('class','description focused form-control').attr('type','text').attr('value',lineItem.description))));
      newRowObj.append($('<td>').append($('<span>').append($('<input>').attr('class','ASIN form-control').attr('type','text').attr('value',lineItem.ASIN))));
      newRowObj.append($('<td>').append($('<span>').append($('<input>').attr('class','price form-control').attr('type','text').attr('value',lineItem.item.cost.price))));
      // newRowObj.append($('<td>').append($('<span>').html(lineItem.item.cost.shipping)));
      // newRowObj.append($('<td>').append($('<span>').html(lineItem.item.cost.tax)));
      newRowObj.append($('<td>').append($('<span>').html('')));
      newRowObj.append($('<td>').append($('<span>').html('')));
      newRowObj.append($('<td>').append($('<span>').append($('<input>').attr('class','quantity form-control').attr('type','text').attr('value',lineItem.quantity))));

      // make the edit link
      var editLink = $('<a>');
      editLink.attr('class', 'btn btn-sm btn-success glyphicon glyphicon-ok-circle');
      editLink.saveThisRow = function(){ that.saveRow(newRowObj) };
      editLink.click(editLink.saveThisRow);
      newRowObj.append($('<td>').append($('<span>').append(editLink)));

      return newRowObj;
    };
    // Public Methods
    that.refreshTable = function() {
      tableBody.empty();
      for (var i = 0; i < order.lineItems.length; i++){
        tableBody.append(generateStaticRow(i));
      }
    };
    that.editRow =  function(i) {

      var editRow = generateEditRow(i);
      tableBody.find('tr').eq(i).replaceWith(editRow);
      editRow.find('.focused').focus();
      // editRow.hide();
      // tableBody.append(editRow);
      // console.log(editRow.parent());
      // rowToEdit.replaceWith(editRow);
    };
    that.saveRow = function(rowToSave){
      var lineItem = rowToSave.lineItem;
      var newDesc = rowToSave.find('.description').val();
      var newASIN = rowToSave.find('.ASIN').val();
      var newPrice = rowToSave.find('.price').val();
      var newQty = rowToSave.find('.quantity').val();
      lineItem.item.description = newDesc;
      lineItem.item.ASIN = newASIN;
      lineItem.item.price = newPrice;
      lineItem.quantity = newQty;

      that.refreshTable();
    };

    return that;
  };



  window.lineItemRenderer = {
    renderEditLineItem: renderEditLineItem,
    renderExistingLineItem: renderExistingLineItem,
    renderedOrder: renderedOrder
  }
})();
