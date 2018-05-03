import React, {Component} from 'react';
import ReactDOM from "react-dom";
import ModalWindow from "./ModalWindow";

class UsersPanel extends Component {
    render() {
        return (
            <div className="admin-panel">
                <ul>
                    <li>User1</li>
                    <li>User2</li>
                    <li>User3</li>
                    <li>User4</li>
                    <li>User5</li>
                </ul>
            </div>
        );
    }
}

export default UsersPanel;