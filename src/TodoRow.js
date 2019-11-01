import React, {Component} from 'react';

export class TodoRow extends Component{
    //Below we define the value for the onChange event prop as a callback()
    //This is how child components are able to communicate with parents, as they cannt update the value of props passed to them from a parent component
    //React only supports a one-way data flow from parent to child
    //However, the parent can provide a function property (prop) that children can call upon whenever something important happens.
    //Two different types of properties: 
        //data properties: allow the paren to pass data to the child
        //function properties: allows the child to communicate to the parent
    render = () =>
    <tr>
        <td>
            {this.props.item.action}
        </td>
        <td>
            <input type="checkbox" checked={this.props.item.done}
            onChange={() => this.props.callback(this.props.item)}/>
        </td>
    </tr>
}