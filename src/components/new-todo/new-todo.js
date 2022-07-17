import React, { Component } from "react";

import './new-todo.css';

export default class NewTodo extends Component {
    constructor () {
        super();
        this.state = {
            label: ''
        }

        this.onChangeText = (e) => {
            this.setState({
                label: e.target.value
            })    
        }
        this.clickEnter = (e) => {
            if(e.key == 'Enter') {
                this.props.newTodo(this.state.label)
                this.setState({
                    label: ''
                })
            }
            
        }
    }

    render() {
        console.log(this.state.label)
        const { newTodo } = this.props;
        return (
            <input 
                type='text'
                className='new-todo'
                placeholder='What needs to be done?'
                value = { this.state.label}
                autoFocus 
                onChange = { this.onChangeText }
                onKeyPress = { this.clickEnter }
                />
               
        );
    }

};
