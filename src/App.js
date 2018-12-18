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
        BooksAPI.getAll().then((books) => {
            this.setState({
                books: books
            });
        })
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((book) => {
                this.setState((currentState) => ({
                    books: currentState.books.concat([book])
                }))
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
