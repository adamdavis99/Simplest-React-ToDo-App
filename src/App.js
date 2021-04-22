
import './App.css';
import React,{useState,useRef} from "react";

function App() {
  const [todos,updateTodos]=useState([
    {id:1,task:"Wash clothes",done:false},
    {id:2,task:"iron shirts",done:false},
    {id:3,task:"make tea",done:false}
  ]);
  return (
    <div className="App">
      <h1 className="heading">To Do App</h1>
      <TodoList todos={todos} updateTodos={updateTodos}/>
      <AddTodo  updateTodos={ updateTodos}/>
    </div>
  );
}

function TodoList({todos,updateTodos}){
  // this function strikes through a particular task when double clicked on it
  function toggler(todo){
   const updatedTodos = todos.map((t)=>
   t.id===todo.id ? { ...t,done:!t.done} : t
   );
   updateTodos(updatedTodos);
  }
  if(!todos.length){
    return <p>No Todos Left! Yay</p>
  }
  return(
    <ul>
      {todos.map((todo)=>(
        <li key={todo.id} onDoubleClick={()=>toggler(todo)} style={{textDecoration: todo.done?"line-through":""}}>
          {todo.task} 
          <DeleteTodo todo={todo} updateTodos={updateTodos}/>
        </li>
        
      ))}
    </ul>
  )
}

function DeleteTodo({todo,updateTodos}){
  function handleDelete(){
    const confirmed=window.confirm("Do you want to delete this ?");
    if(confirmed){
        updateTodos((prev)=>{
          return prev.filter((t)=>t.id!==todo.id);
        });
    }
  }
  return (
    <span onClick={handleDelete} role="button" style={{color:'red',fontWeight:'bold',marginLeft:10}}>X</span>
  )
}

function AddTodo({ updateTodos}){
  const inputRef = useRef(); // ref is a feature that React provides to reference to a given DOM element
  function handleAddTodo(event){
      event.preventDefault();
      const text = (event.target.elements.addTodo.value);
      const newtodo={
        id:Math.random(),task:text,done:false
      };
      updateTodos(prevTodos=>{return prevTodos.concat(newtodo)});
      inputRef.current.value="";

  }
  // using inputRef, we can create a reference to our input element which we can access wherever we like by 
  // using the built in ref prop by setting ref={inputRef}
  // you can now use the DOM element wherever you want, and update it on occurence of specific events
  // here, we are setting the input.addTodo.value to empty string using inputRef
  return (
    <form onSubmit={handleAddTodo}>
    <input name="addTodo" placeholder="Add Task" ref={inputRef}/>
    
    <button type="submit">Submit</button>
  </form>
  )
 
}



export default App;
