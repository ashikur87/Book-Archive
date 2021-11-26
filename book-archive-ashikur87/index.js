// declaring global variables...

const searchField = document.querySelector('#search-field');
const searchResult = document.querySelector('#search-result');
const displayMessageDiv = document.querySelector('#display-message');

// calling api through arrow function

const searchBook = () => {
    const searchFieldText = searchField.value;

    //clear value of search field

    searchField.value = '';

    //error handling

    if (searchFieldText === '') {
        displayMessageDiv.innerHTML = `<h1><span class="error-font-color" ">Search field cannot be empty</span> ❌</h1>`;
        searchResult.textContent = '';
        return;
    } else {
        // showing search result for input value keyword in search field
        displayMessageDiv.innerHTML = `<h4>you have searched for <span class="search-keyword">${searchFieldText}</span> related books </h4>`;

        // declaring api url in a constant variable

        const url = `HTTPS://openlibrary.org/search.json?q=${searchFieldText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }
};

let count = 0;

const displaySearchResult = books => {
    if (books.docs.length === 0) {
        displayMessageDiv.innerHTML = ` <h1><span class="text-danger">OH!</span> Search is not found ❌</h1>`;


        searchResult.textContent = '';
    } else {
        displayMessageDiv.innerHTML = `<h1><span class="text-primary"> Total </span>  <span class="text-warning">${books.numFound}</span><span class="text-warning"> Search Results found </span></h1>`;


        searchResult.textContent = '';


        const booksAll = books.docs;


        booksAll?.forEach(book => {

            const bookTitle = book.title;
            const bookFirstPublish = book.first_publish_year;
            const authorName = book.author_name;

            const bookCover = book.cover_i;
            const coverImageUrl = `https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`;
            let publisherName = '';
            book.publisher ? (publisherName = book.publisher[0]) : '';


            const div = document.createElement('div');


            div.classList.add('col');


            div.innerHTML = `
    
  
        <div class="card h-100 m-3 text-dark bg-light border border-dark">
            <img src="${coverImageUrl}" class="img-thumbnail h-75 mx-auto mt-3" alt="">
            
            <hr>
            <div class="card-body">
                <h5 class="card-title text-warning">Book Name: ${bookTitle}</h5>
                <p class="card-text">Author Name: ${authorName ? authorName : ' No Author Name Found '
                } </p>
               
               
                <p class="card-text">First Publish Year: ${bookFirstPublish
                    ? bookFirstPublish
                    : ' No Book Publish Year Found Found '
                } </p>
                <p class="card-text"> Publisher Name: ${publisherName} </p>
            </div>
        </div>
   

    `;
            searchResult.appendChild(div);
            count++
        });
    }
    const searchResult1 = document.getElementById('search-result');
    const div1 = document.createElement('div1');
    div1.classList.add('col');

    div1.innerHTML = `<h2 class="text-light">Total-Result=${count}`;
    searchResult1.appendChild(div1);
};