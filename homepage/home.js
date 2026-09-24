/* =========================================
   READHUB BOOK MANAGEMENT
========================================= */


/* Get elements */

const popupOverlay =
    document.getElementById("popupOverlay");

const bookForm =
    document.getElementById("bookForm");

const bookList =
    document.getElementById("managementBookList");


/* =========================================
   LOAD BOOKS
========================================= */

let books =
    JSON.parse(localStorage.getItem("readHubBooks")) || [];


/* =========================================
   OPEN FORM
========================================= */

function openBookForm() {

    document.getElementById("bookFormTitle").textContent =
        "Add New Book";

    document.getElementById("editBookIndex").value = "";

    bookForm.reset();

    popupOverlay.style.display = "flex";

}


/* =========================================
   CLOSE FORM
========================================= */

function closeBookForm() {

    popupOverlay.style.display = "none";

    bookForm.reset();

    document.getElementById("editBookIndex").value = "";

}


/* =========================================
   CLOSE OUTSIDE
========================================= */

function closePopupOutside(event) {

    if (event.target === popupOverlay) {

        closeBookForm();

    }

}


/* =========================================
   SAVE / UPDATE BOOK
========================================= */

bookForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const bookId =
        document.getElementById("bookid").value.trim();

    const bookName =
        document.getElementById("bookName").value.trim();

    const bookAuthor =
        document.getElementById("bookAuthor").value.trim();

    const bookCategory =
        document.getElementById("bookCategory").value;

    const bookUrl =
        document.getElementById("bookUrl").value.trim();

    const description =
        document.getElementById("bookDescription").value.trim();


    const book = {

        id: bookId,

        name: bookName,

        author: bookAuthor,

        category: bookCategory,

        url: bookUrl,

        description: description

    };


    const editIndex =
        document.getElementById("editBookIndex").value;


    /* UPDATE */

    if (editIndex !== "") {

        books[Number(editIndex)] = book;

        alert("Book updated successfully! 📚");

    }


    /* ADD */

    else {

        books.push(book);

        alert("Book added successfully! 📚");

    }


    /* Save */

    localStorage.setItem(
        "readHubBooks",
        JSON.stringify(books)
    );


    /* Refresh table */

    displayBooks();


    /* Close popup */

    closeBookForm();

});


/* =========================================
   DISPLAY BOOKS
========================================= */

function displayBooks() {

    bookList.innerHTML = "";


    if (books.length === 0) {

        bookList.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center; padding:25px;">
                    No books added yet 📚
                </td>
            </tr>
        `;

        return;
    }


    books.forEach(function(book, index) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                ${index + 1}
            </td>

            <td>
                ${escapeHTML(book.id)}
            </td>

            <td>
                ${escapeHTML(book.name)}
            </td>

            <td>
                ${escapeHTML(book.author)}
            </td>

            <td>
                ${escapeHTML(book.category)}
            </td>

            <td>

                ${
                    book.url
                    ?
                    `<a
                        href="${escapeAttribute(book.url)}"
                        target="_blank"
                        class="view-btn"
                    >
                        View
                    </a>`
                    :
                    `<span>No Link</span>`
                }

            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editBook(${index})"
                >
                    Edit
                </button>


                <button
                    class="delete-btn"
                    onclick="deleteBook(${index})"
                >
                    Delete
                </button>

            </td>

        `;


        bookList.appendChild(row);

    });

}


/* =========================================
   EDIT BOOK
========================================= */

function editBook(index) {

    const book = books[index];


    document.getElementById("bookFormTitle").textContent =
        "Edit Book";


    document.getElementById("editBookIndex").value =
        index;


    document.getElementById("bookid").value =
        book.id;


    document.getElementById("bookName").value =
        book.name;


    document.getElementById("bookAuthor").value =
        book.author;


    document.getElementById("bookCategory").value =
        book.category;


    document.getElementById("bookUrl").value =
        book.url || "";


    document.getElementById("bookDescription").value =
        book.description || "";


    popupOverlay.style.display = "flex";

}


/* =========================================
   DELETE BOOK
========================================= */

function deleteBook(index) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this book?"
        );


    if (!confirmDelete) {

        return;

    }


    books.splice(index, 1);


    localStorage.setItem(
        "readHubBooks",
        JSON.stringify(books)
    );


    displayBooks();


    alert("Book deleted successfully! 🗑️");

}


/* =========================================
   SEARCH
========================================= */

document
    .getElementById("bookSearch")
    .addEventListener("input", filterBooks);


document
    .getElementById("categoryFilter")
    .addEventListener("change", filterBooks);


function filterBooks() {

    const searchValue =
        document
            .getElementById("bookSearch")
            .value
            .toLowerCase();


    const categoryValue =
        document
            .getElementById("categoryFilter")
            .value
            .toLowerCase();


    const rows =
        bookList.querySelectorAll("tr");


    books.forEach(function(book, index) {

        const row = rows[index];

        if (!row) {
            return;
        }


        const matchesSearch =

            book.name
                .toLowerCase()
                .includes(searchValue)

            ||

            book.author
                .toLowerCase()
                .includes(searchValue);


        const matchesCategory =

            categoryValue === "all"

            ||

            book.category.toLowerCase()
                === categoryValue;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    });

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeAttribute(value) {

    return String(value)
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   INITIAL LOAD
========================================= */

displayBooks();