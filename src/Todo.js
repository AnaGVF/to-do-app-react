import React, { useState } from 'react';
import './Todo.css';
import { Button, Input, List, ListItem, ListItemText, Modal } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import db from './firebase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      border: '20px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));


function Todo(props) {
    const classes = useStyles();
    const[open, setOpen] = useState(false);
    const[input, setInput] = useState();

    const updateTodo = () => {
        // Update the Todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true });

        setOpen(false);
    }

    return (
        <>
        <Modal
            open={open}
            onClose={e => setOpen(false)}
            className="myModal"
        >
            <div className={classes.paper} className="editModal">
                <h1>Edit this To Do</h1><br/>
                <Input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                <br/>
                <Button onClick={updateTodo} variant="outlined" type="submit" color="secondary">Update To Do</Button>
            </div>
        </Modal>
        <List className="todo_list">
            <ListItem className="inner_list" style={{alignItems: "flex-start"}}>
                <ListItemText disableTypography style={{ fontSize: '20px', overflowWrap: 'anywhere', fontWeight: 'bold' }} primary={props.todo.todo} />
                <ListItemText disableTypography secondary="Deadline ⏱"/>
            </ListItem>
            <div className="configure">
                <EditIcon style={{fontSize: '32px'}} className="edit" onClick={e => setOpen(true)}>Edit</EditIcon>
                <DeleteIcon style={{fontSize: '32px'}} className="delete" onClick={event => db.collection('todos').doc(props.todo.id).delete()}>❌</DeleteIcon>
            </div>
        </List>
        </>
    )
}

export default Todo;
