import React from 'react';
import PropTypes from 'prop-types';
import Book from "./Book";

function BookShelf(props) {
    return (
        <div className="bookshelf">
            {props.shelfTitle && (
                <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            )}
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        props.books.map(book => (
                            <Book key={book.id}
                                  book={book}
                                  updateBook={props.updateBook}
                                  shelves={props.shelves}
                            />
                        ))
                    }
                </ol>
            </div>
        </div>
    );
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    updateBook: PropTypes.func.isRequired,
    shelves: PropTypes.object.isRequired
};

export default BookShelf;