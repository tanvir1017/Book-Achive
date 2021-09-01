// global variable
const inputField = document.getElementById('input-field')
const find = document.getElementById('find')
const row = document.getElementById('row')
const searchNumber = document.getElementById('search-number')
const error = document.getElementById('error')

find.addEventListener('click', () => {
    row.textContent = ''
    const fieldValue = inputField.value;
    inputField.value = ''
    if (fieldValue === "") {
        error.innerHTML = `
        <h3 class="mt-3 text-danger">You shouldn't empty the search field !!</h3>
        `
        return;
    }
    const url = `http://openlibrary.org/search.json?q=${fieldValue}`
    // spinner for realtime loading
    spinner.classList.remove("d-none")
    fetch(url)
        .then(res => res.json())
        .then(data => showSearchResult(data))
})

showSearchResult = searchData => {
    if (searchData.numFound === 0) {
        error.innerHTML = `
          <h3 class="mt-3 text-danger">No result found. Please search with valid keywords</h3>
        `
        spinner.classList.add("d-none")
    }
    else {
        error.innerHTML = ''
    }
    const search = searchData.docs
    search.forEach(info => {
        console.log(info)
        searchNumber.innerHTML = `
            <span class="text-muted fst-italic">About (${searchData.numFound}) results</span>
            <hr>
        `
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

    })
}