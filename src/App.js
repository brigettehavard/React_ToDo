import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';
import { VisibilityControl } from './VisibilityControl';
import { TodoRow } from './TodoRow';
import { TodoBanner } from './TodoBanner';
import { TodoCreator} from './TodoCreator';
import 'bootstrap/dist/css/bootstrap.min.css';





export default class App extends Component{
  //above we have created a class called App that extends the functionality of the Component class in the react package.  The export keyword makes the class available for use outside of where it is created (like an access modifier in C#)

  //We are going to create state data for our component.  to do that we need to create a constructor method.  This method will get called when an object is created using this class.  Said another way, this method will be called when the component is initialized.

  constructor(props){

    //To ensure we have all of the necessary features from React to create a stateful component, we need to call the super().  Tis called the constructor for the component class
     super(props);

    //React components have a special property called state which is what we will use to define state data
    this.state = {
      userName: "Brigette",
      todoItems: [
        {action: "Buy Candy", done: false},
        {action: "Make Costume", done: false},
        {action: "Carve Pumpkins", done: true},
        {action: "Go to Party", done: false}
      ],
     
      showCompleted: true
    }
  }
changeStateData = () => {
  this.setState(
    {
      userName: this.state.userName === "Brigette" ? "Cody" : "Brigette"
      //We use setState() here because state data shouldnt be updated directly
      //When setState() is called, the component's state data is updated with new values and then the render() is called so that the UI will be updated
    }
  );
}



createNewTodo = (task) => {
  if(!this.state.todoItems.find(x => x.action === task)){
    this.setState({
      todoItems: [...this.state.todoItems, {action:  task, done: false}]
    },
    () => localStorage.setItem("todo", JSON.stringify(this.state))
    );
  }


  //FIRST VERSION BELOW
  // if(!this.state.todoItems.find(item => item.action === this.state.newItemText)){
  //   this.setState({
  //     todoItems: [...this.state.todoItems,
  //     {action: this.state.newItemText, done:false}
  //     ],
  //     newItemText: ""
  //   });
    //the above setState() recreates the todoItems property on our state data object.  It uses the spread operator to insure all previous items that were already listed in the todoItems collection are added back in.  Then a new item is added to the collection.  Finally we update the newItemText property to an empty string.
  //}
}

//map() is mapping each item in the todoItems collection to a fragment of HTML.
//When JSX gets transpile into a backwards compatible version of JS this will just be a collection of props in the object.  We do not want to ultilize the default numbered key that is assigned in the <tr>, but want to utilize a unique key for each item in the object.  Therefore, we define the key by its action.
todoTableRows = (doneValue) => this.state.todoItems.filter(
  
    item => item.done === doneValue


  ).map(item =>  
    <TodoRow key={item.action} item={item} callback={this.toggleTodo}/>
    );

    componentDidMount = () => {
      let data = localStorage.getItem("todos");
      this.setState(data != null ? JSON.parse(data) : 
        {
          userName: "Brigette",
          todoItems: [
            {action: "Buy Candy", done: false},
            {action: "Make Costume", done: false},
            {action: "Carve Pumpkins", done: true},
            {action: "Go to Party", done: false}
          ],
         
          showCompleted: true
        }
        );
    }

  toggleTodo = (todo) => this.setState({
    todoItems: this.state.todoItems.map(
      item => item.action === todo.action ? {...item, done: !item.done} : item
    )
  })

    //when we use the fat arrow syntax, you do NOT have to use the return keyword or put {} around the body of the function.
    render = () =>
    <div>
     <TodoBanner name={this.state.userName} tasks={this.state.todoItems}/>
      <button className="btn btn-primary m-2" onClick={this.changeStateData}>
        Switch User
      </button>
      
      <div className="container-fluid">
      <TodoCreator callback={this.createNewTodo}/>
        <table className="table table-striped table-border">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {this.todoTableRows(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">

      
        <VisibilityControl description="Completed Task" isChecked={this.state.showCompleted} callback={(checked) => this.setState({ showCompleted: checked})}/>
        </div>

        { this.state.showCompleted &&  <table className="table table-striped table-border">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {this.todoTableRows(true)}
          </tbody>
        </table>

        }

      </div>
    </div>

  
  
}