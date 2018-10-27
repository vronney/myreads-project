import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.fetchBooks();
  }
  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    });
  }

  getShelfBooks(shelfName) {
    return this.state.books.filter((b) => b.shelf === shelfName)
  }

  changeShelf = (newBook, newShelf) => {
    BooksAPI.update(newBook, newShelf).then(response => {
      newBook.shelf = newShelf;

      var updatedBooks = this.state.books.filter(book => book.id !== newBook.id)

      // add book to array and set new state
      updatedBooks.push(newBook);
      this.setState({
        books: updatedBooks
      })
    })
  }

  render() {
    const {
      books
    } = this.state

    return ( <
      div className = "app" >
      <
      Route path = "/search"
      render = {
        ({
          history
        }) => ( <
          Search books = {
            books
          }
          changeShelf = {
            this.changeShelf
          }
          />
        )
      }
      /> <
      Route exact path = "/"
      render = {
        () => ( <
          div className = "list-books" >
          <
          div className = "list-books-title" >
          <
          h1 > MyReads < /h1> <
          /div> <
          BookList books = {
            books
          }
          changeShelf = {
            this.changeShelf
          }
          /> <
          div className = "open-search" >
          <
          Link to = "/search" > Search < /Link> <
          /div> <
          /div>
        )
      }
      /> <
      /div>
    )
  }
}

export default BooksApp;