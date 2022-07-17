import React, {Component} from "react";
import TodoListItem from "./todo-list-item";

import './todo-list.css';

export default class TodoList extends  Component{

    render () {
        const { data, delItem, onToggleDone } = this.props;
        const elements = data.map((item)=> {
            const {id} = item;
            return  (
                <TodoListItem key = { id } 
                                data = { item } 
                                delItem = { () => { delItem(id) }} 
                                onToggleDone = { () => { onToggleDone(id) }}
                />
            )
        
        });
        return (
            <ul className="todo-list">
                { elements }
            </ul>
        )
    }

}