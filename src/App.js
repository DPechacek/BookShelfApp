import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import BooksShelfPage from './BookShelfPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';

/**
 * @description Application that manages books on shelves
 */
class BooksApp extends React.Component {
    shelves = {'currentlyReading': 'Currently Reading',
                'wantToRead': 'Want To Read',
                'read': 'Read'};

    state = {
        books: []
    };

    /**
     * @description Load the books when the component loads
     */
    componentDidMount() {
        this.loadBooks();
    }

    /**
     * @description Loads all books assigned to a shelf
     */
    loadBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            });
        })
    };

    /**
     * @description Updates the passed in book to be assigned to the given shelf
     *
     * @param updatedBook
     * @param updatedShelf
     */
    updateBook = (updatedBook, updatedShelf) => {
        BooksAPI.update(updatedBook, updatedShelf)
            .then(() => {
                /*
                 * If the book is not already in the list
                 */
                if(this.state.books.findIndex((book) => (book.id === updatedBook.id)) === -1) {
                    this.setState((currentState) => ({
                        books: currentState.books.concat([Object.assign({}, updatedBook, {shelf: updatedShelf})])
                    }));
                } else {
                    /*
                     * Otherwise update it.
                     */
                    this.setState((currentState) => ({
                        /*
                         * Go through each book, if it is the one modified, update it before returning.
                         * Otherwise just pass back.
                         */
                        books: currentState.books.map((currentBook) => (currentBook.id === updatedBook.id ?
                            Object.assign({}, currentBook, {shelf: updatedShelf}) : currentBook))
                    }));
                }

            });
    };

    render() {
        return (
          <div className='app'>
              <Route exact path='/' render={() => (
                  <BooksShelfPage books={this.state.books}
                                  updateBook={this.updateBook}
                                  shelves={this.shelves}
                  />
              )}/>
              <Route path='/search' render={() => (
                  <SearchPage books={this.state.books}
                              updateBook={this.updateBook}
                              shelves={this.shelves}
                  />
              )}/>
          </div>
        )
    }
}

export default BooksApp;
