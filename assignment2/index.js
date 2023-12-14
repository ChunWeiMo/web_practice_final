// set global variables
var current_page = 1;
var movies_per_page = 10;
const PAGE_SIZE = 10;
var page_count = undefined;
var movies_count = undefined;
var movies_array = undefined;

// fetch yts movie
async function getMovies() {
    resp = await fetch(`https://yts.mx/api/v2/list_movies.json?limit=10&page=${current_page}`);
    if (!resp.ok) {
        throw new Error("Failed to connect yts API.");
    }
    else {
        jsonResp = await resp.json();
    }
    // console.log(jsonResp.data);
    movies_count = jsonResp.data.movie_count;
    console.log(movies_count);
    page_count = Math.ceil(movies_count / movies_per_page);
    console.log(page_count);
    return jsonResp;
}

// create a display pagination controls
function display_pagination_controls() {
    document.getElementById("buttons").innerHTML = ""
    document.getElementById("buttons").innerHTML += '<button id="first">First</button>'
    // show prev button if current page > 1
    if (current_page > 1) {
        document.getElementById("buttons").innerHTML += '<button id="prev"">Prev</button>'
    }
    // show 10 page buttons
    for (let i = current_page; i < current_page + PAGE_SIZE; i++) {
        className = ""
        if (i == current_page) {
            className = "currentBtn";
        }
        else {
            className = "other_page_btn"
        }
        if (i <= page_count)
            document.getElementById("buttons").innerHTML += `<button class="${className}"> ${i} </button>  `;
    }

    // show next button if current page < page count
    if (current_page < page_count) {
        document.getElementById("buttons").innerHTML += '<button id="next"">Next</button>'
    }

    document.getElementById("buttons").innerHTML += '<button id="last">Last</button>'
}

// display movies
async function show_movies() {
    movies_json = await getMovies();
    movies_array = movies_json.data.movies;

    // special case: last page with under 10 movies
    if (movies_array.length < 10) {
        display_movie_count = movies_array.length;
    } else {
        display_movie_count = 10;
    }

    console.log(`display_movie_count is ${display_movie_count}`);

    let movies = document.getElementById("movies_row");
    movies.innerHTML = "";
    for (let i = 0; i < movies_per_page; i++) {
        movies.innerHTML += `<div class="movie">
            <img src="${movies_array[i].medium_cover_image}">
            <div class="movie_info">
                <h3>${movies_array[i].title}</h3>
                <p>${movies_array[i].year}</p>
                <p>Rating: ${movies_array[i].rating}</p>
            </div>
        </div>`
    }
}


// add event listener to buttons
async function add_event_listener_to_buttons() {
    movies_json = await getMovies();
    console.log(movies_json);
    document.addEventListener("click", async function (e) {
        // click first button to page 1
        target = e.target.closest("#first");
        if (target) {
            current_page = 1;
            display_pagination_controls();
            show_movies(movies_json);
        }

        // click prev button to prev page
        target = e.target.closest("#prev");
        if (target) {
            current_page--;
            display_pagination_controls();
            show_movies(movies_json);
        }


        // click next button to next page
        target = e.target.closest("#next");
        if (target) {
            current_page++;
            display_pagination_controls();
            show_movies(movies_json);
        }


        // click last button to last page
        target = e.target.closest("#last");
        if (target) {
            current_page = page_count;
            display_pagination_controls();
            show_movies(movies_json);
        }
        console.log(`current_page: ${current_page}`);
    });
}

// setup function
async function setup() {
    movies_json = await getMovies();
    display_pagination_controls();
    show_movies();
    add_event_listener_to_buttons();

}

// when document ready, call setup function
$(document).ready(setup);
