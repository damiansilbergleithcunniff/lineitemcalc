import React, { Component } from 'react';
import LineItemRowDisplay from './LineItemRowDisplay'
import LineItemRowEdit from './LineItemRowEdit'

class LineItemTable extends Component {
  constructor(props){
    super(props);
  }

  render(){
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
        <LineItemRowDisplay index="1" name="first" id="1234"
                            cost="100" tax="5" shipping="10"
                            quantity="2"/>
        <LineItemRowEdit index="2" name="Second" id="1234"
                         cost="100" tax="5" shipping="10"
                         quantity="2"/>
        </tbody>
      </table>
    )
  }

}

export default LineItemTable;