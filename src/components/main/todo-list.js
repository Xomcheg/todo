import React, {Component} from "react";
import TodoListItem from "./todo-list-item";

import './todo-list.css';

export default class TodoList extends  Component{

    constructor () {
        super();

        this.state = {
            label: '',
    
        }

        this.newTextEditTask = (e) => {

            this.setState({
                label: e.target.value
            })
        }

        this.newEditTask = (e, test) => {
            if (e.key === 'Enter') {
                this.props.newTodo(this.state.label)
                this.props.clearEditTodo();
            }
        }
    }

    render () {
        const { data, delItem, onToggleDone, filterStatus, editElement } = this.props;

        const elements = data.filter((el) => {
            if(filterStatus === 'all') {
                return true;
            }
            if (filterStatus === 'active') {
                return !el.done;
            } 
            if (filterStatus === 'completed'){
                return el.done;
            }
        }).map((item)=> {
            const {id, done, edit } = item;
            let classNames = '';
        
            if (done) {
                classNames += 'completed';
            }
            
            if (edit) {
                classNames += 'editing';
                return  ( 
                    <li key = { id }  className = { classNames }>
                        <input  type="text"  className="edit"  defaultValue="Editing task"  
                                onChange = { this.newTextEditTask }
                                onKeyPress = { this.newEditTask}
                                 />
                    </li>
                )

            }  else {
                return  ( 
                    <li key = { id }  className = { classNames }>
                        <TodoListItem   data = { item } 
                                        delItem = { () => { delItem(id) }} 
                                        onToggleDone = { () => { onToggleDone(id) }}
                                        editElement = { () => { editElement(id) }}
                        />
                    </li>
                )
            }
            
        });
        return (
            <ul className="todo-list">
                { elements }
            </ul>
        )
    }

}

