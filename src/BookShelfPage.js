import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from "./components/BookShelf";

/**
 * @description Page containing all book shelves.  Available at '/' route.
 */
class BookShelfPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired,
        shelves: PropTypes.object.isRequired
    };

    render = () => {
        const shelves = this.props.shelves;

        return (
            <div className="list-books">
                 <div className="list-books-title">
                       <h1>MyReads</h1>
                 </div>
                 <div className="list-books-content">
                       <div>
                           {
                               /*
                                * loop through shelves and create bookshelf with books on that shelf
                                */
                               Object.keys(shelves).map((shelfName) => (
                                   <BookShelf key={shelfName} books={this.props.books.filter((book) => (book.shelf === shelfName))}
                                              shelfTitle={shelves[shelfName]}
                                              updateBook={this.props.updateBook}
                                              shelves={this.props.shelves}
                                   />
                               ))
                           }
                       </div>
                 </div>
                <div className="open-search">
                    <Link to='/search'>
                        <button className='open-search'>Add a Book</button>
                    </Link>
                </div>
            </div>
        );
    };
}

export default BookShelfPage;