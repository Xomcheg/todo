import React, { Component } from "react";

import './add-new-item.css';

export default class AddNewItem extends Component {
    constructor() {
        super();
    }

    render () {
        const { addItem } = this.props;
        return (
            <div>
                <button className="btn__test"
                        onClick = { () => { addItem('Hello') } }
                >
                    New Item
                </button>
            </div>
        )
    }
}