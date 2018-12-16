import React from 'react';
import PropTypes from 'prop-types';

function BookShelf(props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                </ol>
            </div>
        </div>
    );
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    bookListTitle: PropTypes.string.isRequired
};

export default BookShelf;