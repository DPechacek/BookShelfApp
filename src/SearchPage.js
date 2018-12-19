import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from "./components/Book";
import * as BooksAPI from './BooksAPI';
import * as _ from "underscore";

class SearchPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired,
        shelves: PropTypes.object.isRequired
    };

    componentWillMount() {
        this.updateSearchTerm = _.debounce(function() {
            let trimmedQuery = this.state.searchTerm.trim();

            if(trimmedQuery.length === 0) {
                this.updateSearchResults([]);
            } else {
                BooksAPI.search(trimmedQuery)
                    .then((books) => {
                        if(!books.error) {
                            this.updateSearchResults(books)
                        }
                        else {
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

    handleOnChange = (event) => {
        let query = event.target.value;

        this.setState({
            searchTerm: query
        });

        this.updateSearchTerm();
    };

    updateSearchResults = (results) => {
        let mergedResults = [];

        results.forEach((searchResult) => {
            let index = this.props.books.findIndex((book) => (book.id === searchResult.id));

            if(index > -1) {
                let mergedBook = searchResult;
                mergedBook.shelf = this.props.books[index].shelf;
                mergedResults.push(mergedBook);
            } else {
                searchResult.shelf = 'none';
                mergedResults.push(searchResult);
            }
        });

        this.setState({
            filteredBooks: mergedResults
        });
    };

    updateBook = (book, updatedShelf) => {
        this.props.updateBook(book, updatedShelf);
        this.setState((currentState) => ({
            filteredBooks: currentState.filteredBooks.map((currentBook) => (currentBook.id === book.id ?
                Object.assign({}, currentBook, {shelf: updatedShelf}) : currentBook))
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
                        {/*
                           NOTES: The search from BooksAPI is limited to a particular set of search terms.
                           You can find these search terms here:
                           https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                           However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                           you don't find a specific author or title. Every search is limited by search terms.
                        **/}
                        <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={this.handleOnChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
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