import React, { Component } from "react";
import Header from '../header';
import Main from '../main';
import Footer from "../footer";

import './todoapp.css';

export  default class App extends Component  {

  constructor () {
    super();
    this.counter = 100;

    this.state = {
        data: [
            this.createItem('Completed task'),
            this.createItem('Editing task'),
            this.createItem('Active task')
        ],
        filterStatus: 'all'
    };

    this.filtersElements = (e) => {
        const target = e.target;
        if(target.nodeName === 'BUTTON'){
            this.setState({
                filterStatus: target.textContent.toLowerCase()
            });
        }
    };

    this.editElement = (id) => {
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id === id);
            const oldItem = data[idx];
            const newItem = { ...oldItem, edit: !oldItem.edit, done: oldItem.done ? false : false };
            const newArr = [ ...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
            return {
                data: newArr
            }
        })
    }

    this.clearComplated = () => {
        this.setState(({ data }) => {
            const newArr = data.filter((el) => !el.done );
            return {
                data: newArr
            }
        });
    };

    this.onToggleDone = (id) => {
        this.setState(({data}) => {
            const idx = data.findIndex((el) => el.id ===id);
            const oldItem = data[idx];
            const newItem = { ...oldItem, done: !oldItem.done, check: !oldItem.check};
            const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
            return {
                data: newArr
            };
        });
    };

    this.delItem = (id) => {
        this.setState(({ data }) => {
            const idx = data.findIndex((el) => el.id ===id );
            const newArr = [ ...data.slice(0, idx), ...data.slice(idx + 1)];
            return {
                data: newArr
            };
        });
    };

    this.newTodo = (text) => {
        this.setState(({ data }) => {
            const newItem = this.createItem(text);
            const newArr = [newItem, ...data ];
            return {
                data: newArr
            };
        });
    };

    this.clearEditTodo = (id, text) => {
        this.setState(({ data }) => {
            const newArr = data.filter((el) => !el.edit)
            return {
                data: newArr
            }
        })
    }
}

createItem (text) {
    return {
        description: text, 
        created: 'created 17 seconds ago', 
        id: this.counter++, 
        done: false,
        edit: false,
        check: null
    };
}


  render () {
    const todoCounter = this.state.data.filter((el) => !el.done).length;
    return (
      <section className='todoapp'>
            <Header newTodo = { this.newTodo }
            />
            <Main 
                data = { this.state.data } 
                filterStatus = { this.state.filterStatus}
                delItem = { this.delItem }
                onToggleDone = { this.onToggleDone }
                editElement = { this.editElement }
                clearEditTodo = { this.clearEditTodo }
                newTodo = { this.newTodo }
            />
            <Footer filtersElements = { this.filtersElements }
                    filterStatus = {this.state.filterStatus}
                    clearComplated = { this.clearComplated }
                    todoCounter = { todoCounter }/>
      </section>
    )
  }
}
