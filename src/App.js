import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  
  // When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // This code loads when the app.js loads 
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    })
  }, []);

  const addTodo = (event) => {
    event.preventDefault(); // Stop the refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput(""); // Clear the input after submitting
  }

  return (
    <div className="App">
      <h1>My To Do List!</h1>

      <form>
        <FormControl>
          <InputLabel>✔ Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">Add Todo</Button>
        <br/><br/>      
      </form>

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>

    </div>
  );
}

export default App;
