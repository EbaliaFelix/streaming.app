function renderMovies(movies) {
  const list = document.getElementById("movie-list");
  list.innerHTML = "";


  const role = localStorage.getItem("role");


  movies.forEach((movie, index) => {
    const li = document.createElement("li");


    li.innerHTML = `
      <span>${movie.title} - ${movie.director}</span>
      ${
        role === "admin"
          ? `
        <div>
          <button onclick="editMovie(${index})">✏️</button>
          <button onclick="deleteMovie(${index})">🗑️</button>
        </div>
      `
          : ""
      }
    `;


    list.appendChild(li);
  });
}
