import React, { Component } from "react";
import './todo-list-item.css';


export default class TodoListItem extends Component {
    constructor () {
        super();

        this.onSpanClick = () => {
            console.log(this.props.data.description);
        };
    }

    render() {
        const {data, delItem, onToggleDone, editElement} = this.props;
        const { description, created, id, check } = data;
        
        return (
                <div className="view">
                    <input className="toggle" type="checkbox" id={id} 
                    defaultChecked = {check}
                    onClick = { onToggleDone }/>
                    <label htmlFor= {id}>
                        <span className="description">
                            { description }
                        </span>
                        <span className="created">{ created }</span>
                    </label>
                    <button className="icon icon-edit"
                            onClick = { editElement }
                            ></button>
                    <button className="icon icon-destroy"
                            onClick = { delItem }
                            ></button>
                </div>
        )
    }

}


