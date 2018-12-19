import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from "./components/Book";
import * as BooksAPI from './BooksAPI';
import * as _ from "underscore";

/**
 * @description Page for searching for books to add to shelves.  Available at '/search' route.
 */
class SearchPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired,
        shelves: PropTypes.object.isRequired
    };

    /**
     * Loads on component creation
     *
     * Learned from https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
     */
    componentWillMount() {
        /**
         * Takes a search term and either erases results if term is empty or searches and sets results.  Will wait until
         * half a second after the last call to run.
         */
        this.updateSearchTerm = _.debounce(function() {
            const trimmedQuery = this.state.searchTerm.trim();

            /**
             * Clears results if query is empty
             */
            if(trimmedQuery.length === 0) {
                this.updateSearchResults([]);
            } else {
                /**
                 * Otherwise searches for books based on query
                 */
                BooksAPI.search(trimmedQuery)
                    .then((books) => {
                        /**
                         * If there is no error, display the results
                         */
                        if(!books.error) {
                            this.updateSearchResults(books)
                        } else {
                            this.updateSearchResults([]);
                        }
                    });
            }
        }, 500)
    }

    state = {
        searchTerm: '',
        filteredBooks: []
    };

    /**
     * @description Updates the search term as the user types
     */
    handleOnChange = (event) => {
        const query = event.target.value;

        this.setState({
            searchTerm: query
        });

        this.updateSearchTerm();
    };

    /**
     * @description Updates the state with the returned results
     */
    updateSearchResults = (results) => {
        this.setState({
            filteredBooks: results.map((currentBook) => {
                /*
                 * Set the correct shelf for the book.
                 */
                const bookIndex = this.props.books.findIndex((book) => (book.id === currentBook.id));

                return (bookIndex > -1 ? Object.assign({}, currentBook, this.props.books[bookIndex])
                    : Object.assign({}, currentBook, {shelf: 'none'}));
            })
        });
    };

    /**
     * Updates the main state and the local state
     */
    updateBook = (book, updatedShelf) => {
        this.props.updateBook(book, updatedShelf);
        this.setState((currentState) => ({
            filteredBooks: currentState.filteredBooks.map((currentBook) => (currentBook.id === book.id ?
                Object.assign({}, currentBook, {shelf: updatedShelf}) : currentBook))
            /*
             * Above Object.assign call from https://stackoverflow.com/questions/28121272/whats-the-best-way-to-update-an-object-in-an-array-in-reactjs
             */
        }));
    };

    render = () => {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className='close-search'>Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={this.handleOnChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            /*
                             * Display each book in the results
                             */
                            this.state.filteredBooks.map(book => (
                                <Book key={book.id}
                                      book={book}
                                      updateBook={this.updateBook}
                                      shelves={this.props.shelves}
                                />
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;