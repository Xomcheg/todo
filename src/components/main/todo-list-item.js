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
        const {data, delItem, onToggleDone} = this.props;
        const { description, created, done, id } = data;

        let classNames = '';

        if (done) {
            classNames += 'completed';
        }
        
        return (
            <li  className = { classNames }>
                <div className="view">
                    <input className="toggle" type="checkbox" id={id}
                    onClick = { onToggleDone }/>
                    <label for= {id}>
                        <span className="description" 
                        
                        >
                            { description }
                        </span>
                        <span className="created">{ created }</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"
                            onClick = { delItem }
                            ></button>
                </div>
            </li>
        )
    }

}




// function TodoListItem(props) {
//     const {description, created} = props.data;
//     return (
//         <div className="view">
//             <input className="toggle" type="checkbox"/>
//             <label>
//                 <span className="description"
//                         onClick = {onSpanClick}>{ description }</span>
//                 <span className="created">{ created }</span>
//             </label>
//             <button className="icon icon-edit"></button>
//             <button className="icon icon-destroy"></button>
//         </div>
//     )
// }

// export default TodoListItem;