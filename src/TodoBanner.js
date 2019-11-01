import React, {Component} from 'react';

export class TodoBanner extends Component{
    render = () =>
    <h4 className="bg-primary text-white text-center p-2">
    {this.props.name}'s To Do List
    {/* The curly braces here denote an expression
      When the render() is called, the expression is evaluated, and its result is included in the content presented to the user.  This is very similar to the way Razor works in a .cshtml file
    */}
    ({this.props.tasks.filter(t => !t.done).length} items to do)
  </h4>
}