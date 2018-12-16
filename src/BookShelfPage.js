import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BookShelfPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    };

    render() {
        return (
            <div className="list-books">
                 <div className="list-books-title">
                       <h1>MyReads</h1>
                 </div>
                 <div className="list-books-content">
                       <div>
                           //TODO: Book shelves go here
                       </div>
                 </div>
            </div>
        );
    }
}

export default BookShelfPage;