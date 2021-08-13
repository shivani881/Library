console.log("this is ES6 version of library project");
showbooks();

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
//create a ShowBoook function..
function showbooks() {
    let getbook = localStorage.getItem('book');
    let bookobj;
    if (getbook == null) {
        bookobj = [];
    }
    else {
        bookobj = JSON.parse(getbook);
    }
    let Row = "";
    bookobj.forEach(function (element, index) {
        Row += `<tr>
                          <td>${element.name}</td>
                         <td>${element.author}</td>
                          <td>${element.type}</td>
                     
        
         <td> <button id="${index}" onclick= "deletebooks(this.id)" class="btn btn-danger">Delete Book</button></td>
          </tr>`;
    });
    let tableBody = document.getElementById('tableBody');
    if (bookobj.length != 0) {
        tableBody.innerHTML = Row;
    }
    else {
        bookobj.innerHTML = "";
    }
}

//create a delete book function..
function deletebooks(index) {
    let getbook = localStorage.getItem('book');
    if (getbook == null) {
        bookobj = [];
    }
    else {
        bookobj = JSON.parse(getbook);
    }
    bookobj.splice(index, 1);     //splice fun. is used to insert or remove values.
    localStorage.setItem('book', JSON.stringify(bookobj));
    showbooks();
}

class Display {
    add(book) {
        let getbook = localStorage.getItem('book');
        let bookobj;
        if (getbook == null) {
            bookobj = [];
        }
        else {
            bookobj = JSON.parse(getbook);
        }

        bookobj.push(book);
        localStorage.setItem('book', JSON.stringify(bookobj));
        showbooks();
    }
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }
    show(type, message) {
        let messagebook = document.getElementById('message');
        let boldtext;
        if (type === 'success') {
            boldtext = 'Success!';
        }
        else {
            boldtext = 'Error!';
        }
        messagebook.innerHTML += `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <strong>${boldtext}</strong> ${message}
                       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
        setTimeout(function () {
            messagebook.innerHTML = '';
        }, 5000)
    }
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    // console.log('my form is submitted');
    let data = localStorage.getItem('data');
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let motivational = document.getElementById('motivational');
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    if (motivational.checked) {
        type = motivational.value;
    }

    let book = new Book(name, author, type);
    // console.log(book);
    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', ' Your book has been successfully added');
    }
    else {
        //show error
        display.show('danger', ' Sorry you cannot add this book');
    }
    e.preventDefault();
}
