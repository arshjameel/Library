const myLibrary = [];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.read = read;
}

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

    p.innerHTML += '<br> Read: ';

    const readLabel = document.createElement('label');
    readLabel.className = "read-switch";
    
    const readInput = document.createElement('input');
    readInput.type = "checkbox";
    readInput.checked = book.read;
    readLabel.appendChild(readInput);
    
    const readSlider = document.createElement('span');
    readSlider.className = 'read-slider';
    readLabel.appendChild(readSlider);

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

function renderAllBooks() {
    container.innerHTML = ''; // Clear the container
    myLibrary.forEach(renderBook);
}

// Initial books
const book1 = new Book(crypto.randomUUID(), "1984", "George Orwell", 328, true);
const book2 = new Book(crypto.randomUUID(), "To Kill a Mockingbird", "Harper Lee", 281, false);
const book3 = new Book(crypto.randomUUID(), "The Great Gatsby", "F. Scott Fitzgerald", 180, true);
const book4 = new Book(crypto.randomUUID(), "Moby Dick", "Herman Melville", 635, false);
const book5 = new Book(crypto.randomUUID(), "Pride and Prejudice", "Jane Austen", 279, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);

const container = document.querySelector('.contentBox');
renderAllBooks();

const openBtn = document.querySelector('.btnDisplayForm');
const closeBtn = document.querySelector('.close-dialog-btn');
const dialog = document.querySelector('.dialog');
const form = dialog.querySelector('form');

// Show dialog on button click
openBtn.addEventListener('click', () => {
    dialog.show();
});

// Close dialog after submitting the form
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission
    dialog.close();
});

// Hide dialog
closeBtn.addEventListener('click', () => dialog.close());

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const author = document.querySelector('#author').value.trim();
    const pages = parseInt(document.querySelector('#pages').value);
    const read = document.querySelector('input[name="read"]').checked;

    const newBook = new Book(crypto.randomUUID(), title, author, pages, read);
    addBookToLibrary(newBook);
    renderBook(newBook);

    dialog.close();
    form.reset();
});