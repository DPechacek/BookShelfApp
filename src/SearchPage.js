import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from "./components/Book";
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired,
        shelves: PropTypes.object.isRequired
    };

    state = {
        searchTerm: '',
        filteredBooks: []
    };

    updateSearchTerm = (event) => {
        let query = event.target.value;

        this.setState({
            searchTerm: query
        });

        if(query.length === 0) {
            this.updateSearchResults([]);
        }
        else {
            BooksAPI.search(query.trim())
                .then((books) => {
                    if(!books.error) {
                        this.updateSearchResults(books)
                    }
                    else {
                        this.updateSearchResults([]);
                    }
                });
        }
    };

    updateSearchResults = (results) => {
        let mergedResults = [];

        results.forEach((searchResult) => {
            console.log(searchResult);
            let merged = false;

            this.props.books.forEach((book) => {
                if(book.id === searchResult.id) {
                    let mergedBook = {...searchResult, ...book};
                    mergedResults.push(mergedBook);
                    merged = true;
                    return false;
                }
            });

            if(!merged) {
                searchResult.shelf = 'none';
                mergedResults.push(searchResult);
            }
        });

        this.setState({
            filteredBooks: mergedResults
        });
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
                        <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={this.updateSearchTerm}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.filteredBooks.map(book => (
                                <Book key={book.id}
                                      book={book}
                                      updateBook={this.props.updateBook}
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