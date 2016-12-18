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