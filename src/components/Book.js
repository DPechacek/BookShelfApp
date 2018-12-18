import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
    const book = props.book;

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="move" disabled>Move to...</option>
                            {
                                Object.keys(props.shelves).map((shelfName) => (
                                    <option key={shelfName} value={shelfName} selected={book.shelf == shelfName}>{props.shelves[shelfName]}</option>
                                ))
                            }
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">${book.title}</div>
                <div className="book-authors">${book.authors.toString()}</div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
    shelves: PropTypes.object.isRequired
};

export default Book;






