import React, { Component } from 'react';
import LineItemRowDisplay from './LineItemRowDisplay'
import LineItemRowEdit from './LineItemRowEdit'

// React Component to display a table of lineItems.  Manages state for which row is being edited.
// Events:
//  onLineItemUpdate(lineItem, newValues): fired when an update to a lineItem is made
//    lineItem: the lineItem which is being updated
//    newValues: an object that contains the updated values.  Property names match the lineItem's properties
//  onLineItemRemove(lineItem): fired when a lineItem is to be removed from the order
//    lineItem: the lineItem which should be removed
//  onLineItemEdit(lineItem): fired when a lineItem is being edited
//    lineItem: the lineItem which is to be edited
//  onLineItemEditCancel(): fired when a cancel is called on a lineItem.  Used to notify parents of the state change.
// props:
//  lineItems: an array of lineItems to render in the table
class LineItemTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      editing: -1
    };

    this.handleDisplayRowEditRequest = this.handleDisplayRowEditRequest.bind(this);

    this.handleRemoveRow = this.handleRemoveRow.bind(this);

    this.handleEditRowCancel = this.handleEditRowCancel.bind(this);
    this.handleEditRowCommit = this.handleEditRowCommit.bind(this);

  }

  handleDisplayRowEditRequest(editIndex){
    this.props.onLineItemEdit(this.props.lineItems[editIndex]);
    this.setState({editing: editIndex});
  }

  handleRemoveRow(lineItem){
    this.props.onLineItemRemove(lineItem);
    this.props.onLineItemEditCancel();
    this.setState({editing: -1});
  }

  handleEditRowCancel(){
    console.log('handleEditRowCancel');
    this.props.onLineItemEditCancel();
    this.setState({editing: -1});
  }
  handleEditRowCommit(lineItem, newValue){
    console.log(lineItem);
    if (!newValue.ASIN){
      alert("Cannot commit with no ASIN");
    } else {
      this.props.onLineItemUpdate(lineItem, newValue);
      this.setState({editing: -1});
    }
  }


  componentWillReceiveProps(nextProps){
    // Check to see if there is a lineItem which doesn't have an ASIN
    //  if there is one, then we want to automatically set that row
    //  in edit mode instead of display mode.
    // This prevents adding a row and having it be empty
    nextProps.lineItems.forEach((item, n) => {
      if(!item.ASIN) {
        this.setState({
          editing: n,
        });
      }
    });
  }

  renderEditNewRow(lineItem, n){
    return <LineItemRowEdit key={lineItem.ASIN} index={n} lineItem={lineItem}
                            onCancel={this.handleRemoveRow}
                            onCommit={this.handleEditRowCommit}/>
  }
  renderEditExistingRow(lineItem, n){
    return <LineItemRowEdit key={lineItem.ASIN} index={n} lineItem={lineItem}
                            onCancel={this.handleEditRowCancel}
                            onCommit={this.handleEditRowCommit}/>
  }
  renderDisplayRow(lineItem, n){
    return <LineItemRowDisplay key={lineItem.ASIN} index={n} lineItem={lineItem}
                               onEditRequest={this.handleDisplayRowEditRequest}
                               onRemoveRequest={this.handleRemoveRow} />
  }
  renderLineItems(){
    return this.props.lineItems.map((lineItem, n) => {
      if (this.state.editing === n) {
        // editing, so decide if we render a new or an existing row
        if (!lineItem.ASIN) {
          return this.renderEditNewRow(lineItem, n);
        }
        return this.renderEditExistingRow(lineItem, n)
      }
      return this.renderDisplayRow(lineItem, n);
    });
  }

  render() {
    return(
      <table className="table table-condensed">
        <thead>
        <tr>
          <th>#</th>
          <th>Description</th>
          <th>ASIN</th>
          <th>Price</th>
          <th>Shipping</th>
          <th>Tax</th>
          <th>Quantity</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          {this.renderLineItems()}
        </tbody>
      </table>
    )
  }

}

export default LineItemTable;