// global variable
const inputField = document.getElementById('input-field')
const find = document.getElementById('find')
const row = document.getElementById('row')
const searchNumber = document.getElementById('search-number')
const spinner = document.getElementById('spinner')
const error = document.getElementById('error')


find.addEventListener('click', () => {
    //clear the all content
    row.textContent = ''

    const fieldValue = inputField.value;
    //clear the search field
    inputField.value = ''

    // Handle the unexpected error
    if (fieldValue === "") {
        error.innerText = `You shouldn't empty the search field !!`
        searchNumber.classList.add("d-none")
        return;
    }

    const url = `http://openlibrary.org/search.json?q=${fieldValue}`
    
    // spinner for realtime loading
    spinner.classList.remove("d-none")
    error.innerText = ''
    searchNumber.classList.add("d-none")
    fetch(url)
        .then(res => res.json())
        .then(data => showSearchResult(data))
})

showSearchResult = searchData => {
    const search = searchData.docs
    // Handle the unexpected error
    if (searchData.numFound === 0) {
        error.innerText = `No result found. Please search with valid keywords`
        spinner.classList.add("d-none")
    }
    // Handle the unexpected error
    else {
        error.innerHTML = ''
    }

    // how much result we got
    searchNumber.innerHTML = `<p>About (${searchData.numFound}) results </p>`

    search.forEach(info => {
        const col = document.createElement('div')
        col.classList.add('col')
        col.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${info.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title mb-3 text-center fw-bold">${info.title.slice(0, 50)}</h5>
                    <p class="card-text mb-0"><strong>Author</strong> : ${info.author_name[0]}</p>
                    <p class="card-text mb-0"><strong>Publisher</strong> : ${info.publisher[0]}</p>
                    <p class="card-text mb-0"><strong>First release</strong> : ${info.first_publish_year}</p>
                </div>
        </div>
        `
        row.appendChild(col)
        spinner.classList.add("d-none")
        searchNumber.classList.remove("d-none")

    })
}