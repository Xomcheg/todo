import React from "react";
import Filters from "./filters";
import './footer.css';

function Footer(props) {
    const {clearComplated, todoCounter} = props;
    return(
        <footer className="footer">
            <span className="todo-count">{ todoCounter } items left</span>
            <Filters {...props} />
            <button className="clear-completed"
                    onClick = { clearComplated }
            >Clear completed</button>
        </footer>
    )
}

export default Footer;