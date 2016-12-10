/**
 * Created by damian on 12/4/16.
 */
define(function(){
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
  var renderedOrder = function(order, lineItemTable, orderDisplay) {
    var that = {
      order: order,
      lineItemTable: lineItemTable,
      orderDisplay: orderDisplay
    };

    // Private Variables
    var tableBody = lineItemTable.find('tbody');
    var lineItemSumCell = lineItemTable.find('#line-item-sum');
    var rowUnderEdit = null;
    // Order display elements
    var orderSubtotalInput = orderDisplay.find('#order-subtotal');
    var orderTaxInput = orderDisplay.find('#order-tax');
    var orderShippingInput = orderDisplay.find('#order-shipping');
    var orderTotalInput = orderDisplay.find('#order-total');

    // row management functions
    var generateStaticRow = function(lineItemIndex){
      var lineItem = that.order.lineItems[lineItemIndex];
      var newRowObj = $('<tr>');
      newRowObj.lineItem = lineItem;
      newRowObj.index = lineItemIndex;
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

      // make the delete link
      var deleteLink = $('<a>');
      deleteLink.attr('class', 'btn btn-sm btn-danger glyphicon glyphicon-remove');
      deleteLink.removeThisRow = function(){ that.removeRow(lineItemIndex) };
      deleteLink.click(deleteLink.removeThisRow);
      newRowObj.append($('<td>').append($('<span>').append(deleteLink)));

      return newRowObj;
    };
    var generateEditRow = function(lineItemIndex){
      var lineItem = that.order.lineItems[lineItemIndex];
      var newRowObj = $('<tr>').addClass('danger');
      newRowObj.lineItem = lineItem;
      newRowObj.index = lineItemIndex;
      // make the cancel link
      var cancelLink = $('<a>');
      cancelLink.attr('class', 'btn btn-sm btn-danger glyphicon glyphicon-arrow-left');
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
      newRowObj.append($('<td>'));

      // make the edit link
      var editLink = $('<a>');
      editLink.attr('class', 'btn btn-sm btn-success glyphicon glyphicon-ok-circle');
      editLink.saveThisRow = function(){ that.saveRow(newRowObj) };
      editLink.click(editLink.saveThisRow);
      newRowObj.append($('<td>').append($('<span>').append(editLink)));
      return newRowObj;
    };
    var parseRow = function(rowToValidate) {
      var that = {};
      that.index = rowToValidate.index;
      that.lineItem = rowToValidate.lineItem;
      that.description = rowToValidate.find('.description').val();
      that.ASIN = rowToValidate.find('.ASIN').val();
      that.price = Number(rowToValidate.find('.price').val());
      that.quantity = Number(rowToValidate.find('.quantity').val());
      if (that.description || that.ASIN || that.price || that.quantity ){
        return that;
      }

      return null;
    };

    // order display management
    var refreshOrderTotal = function() {
      orderTotalInput.val(that.order.total());
      order.updateLineItems();
      that.refreshTable();
    };
    var wireUpOrderUI = function() {
      orderSubtotalInput.on('input',function(e) {
        that.order.subtotal = Number(orderSubtotalInput.val());
        refreshOrderTotal()
      });
      orderTaxInput.on('input', function() {
        that.order.tax = Number(orderTaxInput.val());
        refreshOrderTotal()
      });
      orderShippingInput.on('input', function() {
        that.order.shipping = Number(orderShippingInput.val());
        refreshOrderTotal()
      });
    };

    // Public Methods
    that.refreshTable = function() {
      rowUnderEdit = null;
      tableBody.empty();
      var orderLineItemSum = 0;
      for (var i = 0; i < order.lineItems.length; i++){
        tableBody.append(generateStaticRow(i));
        orderLineItemSum += order.lineItems[i].cost.price();
      }
      // manage the line item sum cell
      if (order.lineItems.length === 0){
        lineItemSumCell.hide();
      } else {
        lineItemSumCell.text(orderLineItemSum);
        if (orderLineItemSum === order.subtotal){
          lineItemSumCell.removeClass('danger').addClass('success');
        } else {
          lineItemSumCell.removeClass('success').addClass('danger');
        }
        lineItemSumCell.show();
      }
    };
    that.editRow =  function(i) {
      if (!rowUnderEdit){
        var editRow = generateEditRow(i);
        rowUnderEdit = editRow;
        tableBody.find('tr').eq(i).replaceWith(editRow);
        editRow.find('.focused').focus();
      }
    };
    that.saveRow = function(rowToSave){
      var rowData = parseRow(rowToSave);
      if ( ! rowData ) {
        that.removeRow(rowToSave.index);
      }
      // save the changes to the lineitem
      rowToSave.lineItem.item.description = rowData.description;
      rowToSave.lineItem.item.ASIN = rowData.ASIN;
      rowToSave.lineItem.item.cost.price = rowData.price;
      rowToSave.lineItem.quantity = rowData.quantity;
      order.updateLineItems();
      that.refreshTable();
    };
    that.addRow = function(lineItem){
      if (!rowUnderEdit){
        order.lineItems.push(lineItem);
        isEditMode = true;
        var editRow = generateEditRow(order.lineItems.length - 1);
        rowUnderEdit = editRow;
        tableBody.append(editRow);
        editRow.find('.focused').focus();
      }
    };
    that.removeRow = function(i){
      order.lineItems.splice(i, 1);
      that.refreshTable()
    };
    that.handleKeyPress = function(e) {
      switch (e.keyCode){
        case 27:  // escape key
          if (rowUnderEdit){
            if(!parseRow(rowUnderEdit) && !rowUnderEdit.lineItem.isValid()){
              that.removeRow(rowUnderEdit.index);
            } else {
              that.refreshTable();
            }
          }
          break;
        case 13:  // enter key
          if (rowUnderEdit){
            that.saveRow(rowUnderEdit);
          }
          break;
        case 187:  // plus key (no shift)
          break;
        default:
          // nothing
      }
    };
    that.updateOrderUI = function(){
      orderSubtotalInput.val(that.order.subtotal);
      orderTaxInput.val(that.order.tax);
      orderShippingInput.val(that.order.shipping);
      refreshOrderTotal();
    };
    // wireup the UI for orders
    wireUpOrderUI();
    // and update them so that they are current
    that.updateOrderUI();
    return that;
  };



  // window.lineItemRenderer = {
  //   renderEditLineItem: renderEditLineItem,
  //   renderExistingLineItem: renderExistingLineItem,
  //   renderedOrder: renderedOrder
  // }

  //AMD
  return {
    renderEditLineItem: renderEditLineItem,
    renderExistingLineItem: renderExistingLineItem,
    renderedOrder: renderedOrder
  }

});
