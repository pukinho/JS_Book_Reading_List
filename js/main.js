// listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBook);

function saveBook(e) {

	// Get form values
	var bookName = document.getElementById('bookName').value;
	var bookURL = document.getElementById('bookURL').value;
	var bookComment = document.getElementById('bookComments').value;

	// Check if the form is valid
	if (!formValidation(bookName, bookURL)) {
		return false;
	}

	// Create object to store values
	var bookListItem = {
		name: bookName,
		url: bookURL,
		comment: bookComment
	}

	// Test if book list is null
	if (localStorage.getItem('bookListItems') === null) {
		// Init array
		var bookListItems = [];
		// Add to array
		bookListItems.push(bookListItem);
		// Set to local sotrage
		localStorage.setItem('bookListItems', JSON.stringify(bookListItems));
	} else {
		// Fetch from local storage
		var bookListItems = JSON.parse(localStorage.getItem('bookListItems'));
		// Add book to array
		bookListItems.push(bookListItem);
		// Set back to local storage
		localStorage.setItem('bookListItems', JSON.stringify(bookListItems));
	}

	// Clear form
	document.getElementById('myForm').reset();

	// Prevent form from default submitting
	e.preventDefault();

	// Re-fetch books
	fetchBooks();
}

// Delete book from the list
function deleteBook(url) {
	// Get books from local storage
	var bookListItems = JSON.parse(localStorage.getItem('bookListItems'));
	// Loop through books
	for (var i = 0; i < bookListItems.length; i++) {
		if (bookListItems[i].url === url) {
			// Remove from array
			bookListItems.splice(i, 1);
		}
	}

	// Reset local storage
	localStorage.setItem('bookListItems', JSON.stringify(bookListItems));

	// Re-fetch books
	fetchBooks();
}

// Fetch books
function fetchBooks() {
	// Fetch from local storage
	var bookListItems = JSON.parse(localStorage.getItem('bookListItems'));
	// Get output ID
	var booksResults = document.getElementById('booksResults');
	// Build output
	booksResults.innerHTML = '';

	for (var i = 0; i < bookListItems.length; i++) {
		var name = bookListItems[i].name;
		var url = bookListItems[i].url;
		var comment = bookListItems[i].comment;

		// Check if comment was added
		if (comment === '') {
			comment = 'No comments were added';
		}

		booksResults.innerHTML += '<div class="card card-body text-center" style="margin-bottom: 20px; background: #fff;">' +
			'<h4>' + '<strong>' + name + '</strong>' +
			' <a class="btn btn-default" target="_blank" href="' + url + '">View Book</a> ' +
			' <a onclick="deleteBook(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
			'<hr>' + '<p style="font-size: 17px; margin-bottom: 0;">' + comment + '</p>' +
			'</h4>'; +
				'</div>';
	}
}

// Validate the form
function formValidation(bookName, bookURL) {
	// Check if the form is filled
	if (!bookName || !bookURL) {
		alert('Please fill in the fields');
		return false;
	}

	// Check for valid URL adress
	var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
	var regex = new RegExp(expression);

	if (!bookURL.match(regex)) {
		alert('Please insert a valid URL adress.');
		return false;
	}

	return true;
}