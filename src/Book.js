import React, { Component } from "react";
import * as BooksAPI from './BooksAPI.js';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: [],
      title: '',
      thumbnail: 'url("")',
      shelf: '',
      id: ''
    }
  }
  componentDidMount() {
    BooksAPI.get(this.props.id).then((book) => {
      this.setState((prevState) => ({
        author: book.authors,
        title: book.title,
        thumbnail: 'url(' + book.imageLinks.thumbnail + ')',
        shelf: book.shelf,
        id: book.id
      }))
    })
  }

  render() {
    const { id, author, title, thumbnail, shelf } = this.state;
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbnail }}></div>
            <div className="book-shelf-changer">
              <select value={ shelf || "none" } onChange={(event) => this.props.handleChange(id, event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    )
  }
}

export default Book;
