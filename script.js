const myLibrary = []; // all books are stored in this array

// constructor
function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// push each book into the array to "add" them to the library
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function renderBook(book) {
    // create .item div for each book
    const item = document.createElement('div');
    item.classList.add('item');

    // Create book icon img
    const bookImg = document.createElement('img');
    bookImg.src = './assets/book-open-svgrepo-com.svg';
    bookImg.alt = 'book_icon'; 

    // create paragraph element
    const p = document.createElement('p');

    // create spans and set text
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('title');
    titleSpan.textContent = book.title;

    const authorSpan = document.createElement('span');
    authorSpan.classList.add('author');
    authorSpan.textContent = book.author;

    const pagespan = document.createElement('span');
    pagespan.classList.add('pages');
    pagespan.textContent = book.pages;

    // add all spans to paragraph element
    p.innerHTML = 'Title: ';
    p.appendChild(titleSpan);

    p.innerHTML += '<br>Author: ';
    p.appendChild(authorSpan);

    p.innerHTML += '<br>Pages: ';
    p.appendChild(pagespan);

    p.innerHTML += '<br>';

    const readLabel = document.createElement('label');
    readLabel.className = "read-switch";
    readLabel.htmlFor = `read-${book.id}`; // Unique ID for each book
    
    const readInput = document.createElement('input');
    readInput.type = "checkbox";
    readInput.id = `read-${book.id}`; // Match with label's for attribute
    readInput.checked = book.read;
    readInput.className = "toggle-checkbox";
    readLabel.appendChild(readInput);

    // Create the button-like appearance
    const toggleButton = document.createElement('span');
    toggleButton.className = "toggle-button";
    toggleButton.textContent = book.read ? "READ" : "UNREAD";
    readLabel.appendChild(toggleButton);

    readInput.addEventListener('change', function() {
        toggleButton.textContent = this.checked ? "READ" : "UNREAD";
        book.read = this.checked;
    });      

    p.appendChild(readLabel);

    // Create delete button (cross icon)
    const deleteBtn = document.createElement('img');
    deleteBtn.src = './assets/close-cross-remove-delete-svgrepo-com.svg';
    deleteBtn.alt = 'delete_book_icon';
    deleteBtn.classList.add('delete-btn');

    // Add delete functionality
    deleteBtn.addEventListener('click', () => {
        item.remove();
        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1) myLibrary.splice(index, 1);
        console.log(`Book with ID ${book.id} removed`);
    });

    item.appendChild(bookImg);
    item.appendChild(p);
    item.appendChild(deleteBtn);

    container.appendChild(item);
}

// method to render all initial books
function renderAllBooks() {
    container.innerHTML = ''; // Clear the container
    myLibrary.forEach(renderBook);
}

// create the initial books
const book1 = new Book(crypto.randomUUID(), "1984", "George Orwell", 328, true);
const book2 = new Book(crypto.randomUUID(), "After the Quake", "Haruki Murakami", 192, true);
const book3 = new Book(crypto.randomUUID(), "The Almanack of Naval Ravikant", "Eric Jorgenson", 242, true);
const book4 = new Book(crypto.randomUUID(), "Crime and Punishment", "Fyodor Dostoevsky", 527, false);
const book5 = new Book(crypto.randomUUID(), "The Castle", "Franz Kafka", 352, false);

// add the initial books
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);

const container = document.querySelector('.contentBox');
renderAllBooks();

const openBtn = document.querySelector('.btnDisplayForm');
const dialog = document.querySelector('.dialog');
const form = dialog.querySelector('form');

const addButtonText = openBtn.textContent; // "Add a Book"

// Show dialog on button click
openBtn.addEventListener('click', () => {
    if (dialog.open) {
        dialog.close();
        openBtn.innerHTML = addButtonText;
        openBtn.classList.remove('close-dialog-btn');
    } else {
        dialog.show();
        // replace button text with an image of a cross (X)
        openBtn.innerHTML = '<img src="./assets/close-cross-remove-delete-svgrepo-com.svg" alt="close-dialog-icon" class="close-dialog-icon">';
        openBtn.classList.add('close-dialog-btn');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // get info from user
    const title = document.querySelector('#title').value.trim();
    const author = document.querySelector('#author').value.trim();
    const pages = parseInt(document.querySelector('#pages').value);
    const read = document.querySelector('input[name="read"]').checked;

    // add info to the library with a unique ID for each book
    const newBook = new Book(crypto.randomUUID(), title, author, pages, read);
    addBookToLibrary(newBook);
    renderBook(newBook);

    // disable that annoying message to confirm form resubmission
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }    

    // reset the close button to prompt user to add another book
    openBtn.textContent = addButtonText;
    openBtn.classList.remove('close-dialog-btn');
    // reset form to add a new book
    form.reset();
    // close the dialog to all added books
    dialog.close();
});