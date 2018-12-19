import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description Component for each book displayed.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
function Book(props) {
    const book = props.book;
    const thumbnailUrl = props.book.imageLinks ?
                (props.book.imageLinks.thumbnail ? props.book.imageLinks.thumbnail : './icons/book-icon.png') : './icons/book-icon.png';
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${thumbnailUrl})` }} />
                    <div className="book-shelf-changer">
                        {
                         /*
                          * Call passed in updateBook function when value changes
                          */
                        }
                        <select value={book.shelf} onChange={(event) => (props.updateBook(props.book, event.target.value))}>
                            <option value="move" disabled>Move to...</option>
                            {
                                /*
                                 * Loop through each shelf and add option to select
                                 */
                                Object.keys(props.shelves).map((shelfName) => (
                                    <option key={shelfName} value={shelfName}>{props.shelves[shelfName]}</option>
                                ))
                            }
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                {book.title && (<div className="book-title">{book.title}</div>)}
                {book.authors && (<div className="book-authors">{book.authors.toString()}</div>)}
            </div>
        </li>
    );
}

/**
 * @description PropTypes declaration
 *
 * @type {{book: (shim|*|e), updateBook: (shim|*|e), shelves: (shim|*|e)}}
 */
Book.propTypes = {
    book: PropTypes.object.isRequired,
    updateBook: PropTypes.func.isRequired,
    shelves: PropTypes.object.isRequired
};

export default Book;






