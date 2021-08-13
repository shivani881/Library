console.log("Welcome to John's Library");

//constructor function
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() { }

//add methods to display prtotype
//implementing add function
Display.prototype.add = function (book) {
    console.log("addding to UI");
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                      <td>${book.name}</td>
                      <td>${book.author}</td>
                      <td>${book.type}</td>
                </tr>`;
    tableBody.innerHTML += uiString;
}

//implementing clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//implementing validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, message) {
    let messagebook = document.getElementById('message');
    messagebook.innerHTML += `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>Message!</strong> ${message}
                   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
    setTimeout(function () {
        messagebook.innerHTML = '';
    }, 2000)
}

//add submit event listener to libraryForm..
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    console.log('my form is submitted');
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
    console.log(book);
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
