const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read" : "not read"
  }.`;
};
Book.prototype.changeRead = function () {
  this.textContent = this.info();
};
function addBookToLibrary(Book) {
  myLibrary.push(Book);
}

/* The adding book logic */
const booklist = document.querySelector("#booklist");
const addButton = document.querySelector("#add");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
addButton.addEventListener("click", () => {
  // Check that all fields are filled out
  if (
    title.value.trim() === "" ||
    author.value.trim() === "" ||
    pages.value.trim() === ""
  ) {
    alert("Please fill out all fields");
    return; // Exit the function if any field is empty
  }
  let book = new Book(title.value, author.value, pages.value, read.checked);
  displayNewBooks(book);
  addBookToLibrary(book);
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
});
/* Helper */
function displayNewBooks(book) {
  const newBookDiv = document.createElement("div"); // This div will hold the book info and checkbox

  // Create and set the book info text
  const bookInfoText = document.createElement("span");
  bookInfoText.textContent = book.info();
  newBookDiv.appendChild(bookInfoText);

  // Create the checkbox for the read status
  const readCheck = document.createElement("input");
  readCheck.type = "checkbox";
  readCheck.checked = book.read;
  newBookDiv.appendChild(readCheck);

  /* Remove logic */
  const removeButton = document.createElement("button");
  removeButton.textContent = "Delete";
  removeButton.addEventListener("click", () => {
    booklist.removeChild(newBookDiv);
  });
  newBookDiv.appendChild(removeButton);

  // Event listener for changes in checkbox
  readCheck.addEventListener("change", () => {
    // Update the book's read status
    book.read = readCheck.checked;

    // Update the book info text
    bookInfoText.textContent = book.info(); // Refresh the text display
  });

  // Append elements to the newBookDiv and then to the booklist
  booklist.appendChild(newBookDiv);
}
