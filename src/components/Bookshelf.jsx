import { useState } from "react"

function Bookshelf() {

    const [books, setBooks] = useState([
        { title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin' },
    ])

    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
    })

    const [filterValue, setFilterValue] = useState(null)

    function handleInput(e) {
        const copyNewBook = structuredClone(newBook)
        copyNewBook[e.target.name] = e.target.value
        setNewBook(copyNewBook)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const copyBooks = structuredClone(books)
        copyBooks.push(newBook)
        setBooks(copyBooks)

        setNewBook({
            title: '',
            author: ''
        })
    }

    function clearLibrary() {
        setBooks([])
    }

    function removeBook(index) {
        const copyBooks = structuredClone(books)
        copyBooks.splice(index, 1)
        setBooks(copyBooks)
    }

    function handleFilterValue(e) {
        setFilterValue(e.target.value)        
    }

    const filteredBooks = books.filter((book) => {
        
        if (!filterValue) {
            return book
        } else {
            const regex = new RegExp(`${filterValue}`, 'i')
            return regex.test(book.title) || regex.test(book.author)
        }

    }) 

    return <div className="bookshelfDiv">
        
        <div className="formDiv">
        <h3>Add a Book</h3>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input name='title' value={newBook.title}  onChange={handleInput}></input>
            <label>Author</label>
            <input name='author' value={newBook.author} onChange={handleInput}></input>
            <button>Add Book</button>
        </form>
        </div>
        
        <input placeholder="search" onChange={handleFilterValue} ></input>

        <div className="bookCardsDiv">{filteredBooks.map((book, index) => {
            return <div key={index} className='bookCard'>
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <button value={book.title} onClick={() => removeBook(index)}>Remove Book</button>
            </div>
        })}
        </div>

        <button onClick={clearLibrary}>Clear Library</button>
    </div>
}

export default Bookshelf