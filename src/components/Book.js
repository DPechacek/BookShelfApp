import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: '' }}></div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title"></div>
                <div className="book-authors"></div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired
};

export default Book;





