import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import BooksShelfPage from './BookShelfPage';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
    shelves = {'currentlyReading': 'Currently Reading',
                'wantToRead': 'Want To Read',
                'read': 'Read'};

    state = {
        books: []
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            });
        })
    };

    updateBook = (book, updatedShelf) => {
        BooksAPI.update(book, updatedShelf)
            .then(() => {
                //let updatedBook = book;
                //updatedBook.shelf = shelf;

                this.setState((currentState) => ({
                    books: currentState.books.map((currentBook) => (currentBook.id === book.id ?
                            Object.assign({}, currentBook, {shelf: updatedShelf}) : currentBook))
                }));
                //this.loadBooks();
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
