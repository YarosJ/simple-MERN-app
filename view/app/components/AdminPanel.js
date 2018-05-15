import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import UsersList from "./UsersList";
import TestimonialsCarousel from "./TestimonialsCarousel";

class AdminPanel extends Component {

    render() {

        return (
            <div className="admin-panel">
                <Provider store={this.props.store}>
                    <div>
                        <Route exact path="/admin/users" component={UsersList}/>
                        <Route exact path="/admin/employees" component={TestimonialsCarousel}/>
                    </div>
                </Provider>
            </div>
        );
    }
}

export default AdminPanel;