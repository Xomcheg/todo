import React, { Component } from "react";
import Header from '../header';
import Main from '../main';
import Footer from "../footer/footer";

import './todoapp.css';

export  default class App extends Component  {

  constructor () {
    super();
    this.counter = 100;

    this.state = {
        data: [
            // {description: 'Completed task', created: 'created 17 seconds ago', id: 1},
            // {description: 'Editing task', created: 'created 5 minutes ago', id: 2},
            // {description: 'Active task', created: 'created 5 minutes ago', id: 3},
            this.createItem('Completed task'),
            this.createItem('Editing task'),
            this.createItem('Active task')
        ]
    };

    this.onToggleDone = (id) => {
        this.setState(({data}) => {
            const idx = data.findIndex((el) => el.id ===id);
            const oldItem = data[idx];
            const newItem = { ...oldItem, done: !oldItem.done};
            const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
            return {
                data: newArr
            }
        })
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
            const newArr = [...data, newItem];
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
        done: false
    };
}


  render () {
    return (
      <section className='todoapp'>
            <Header newTodo = { this.newTodo }
            />
            <Main 
                data = { this.state.data } 
                delItem = { this.delItem }
                onToggleDone = { this.onToggleDone }
            />
            <Footer />
      </section>
    )
  }
}
