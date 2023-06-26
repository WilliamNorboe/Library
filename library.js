let myLibrary = [];
let books = document.querySelector(".books");
let newBookButton = document.querySelector("#newBook");

newBookButton.addEventListener("click", addBookToLibrary);

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function(){
    let read = "not read yet"
    if(this.read){
        read = "read"
    }
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + read;
}

function addBookToLibrary(){
    let title = window.prompt("Enter Title of the Book: ");
    let author = window.prompt("Enter Author of the Book: ");
    let pages = window.prompt("How many pages is the Book?: ");
    let read = window.prompt("Have you read the book y/n: ");
    if(read == 'y'){
        read = true;
    }
    else{
        read = false;
    }
    const newBook = new Book(title, author, pages, read); 

    myLibrary.push(newBook);
    displayBooks();
}

function removeAllChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function displayBooks(){
    removeAllChildNodes(books);
    for(let i = 0; i < myLibrary.length; ++i){
        let card = document.createElement("div");
        card.classList.add("card");
        card.id = "card" + i; 
        let title = document.createElement("p");
        title.textContent = "Title: " + myLibrary[i].title;
        card.appendChild(title);

        let author = document.createElement("p");
        author.textContent = "Author: " + myLibrary[i].author;
        card.appendChild(author);

        let pages = document.createElement("p");
        pages.textContent = "# of Pages: " + myLibrary[i].pages;
        card.appendChild(pages);

        let read = document.createElement("p");
        read.id = "read";
        read.textContent = "Read: " + myLibrary[i].read;
        let toggle = document.createElement("button"); // addign the toggle button to read
        toggle.classList.add("toggle");
        toggle.textContent = "Toggle";
        read.appendChild(toggle);

        card.appendChild(read);
        let close = document.createElement("button");
        close.classList.add("close");
        close.textContent = "Remove Book";
        card.append(close);
        books.appendChild(card);

        toggle.addEventListener("click", ()=>{readToggle(card.id)});
        close.addEventListener("click", ()=>{removeBook(card.id)});
    }
}

function removeBook(cardID){
    let location = cardID[4];
    myLibrary.splice(location, 1);
    displayBooks();
}
function readToggle(cardID){
    let location = cardID[4];
    if(!myLibrary[location].read){
        myLibrary[location].read = true;
    } 
    else{
        myLibrary[location].read = false;
    }

    displayBooks();
}

const hobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, false);
myLibrary.push(hobbit);
displayBooks();
