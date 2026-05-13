// ================= LOGIN =================
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    document.getElementById("login-section").classList.add("d-none");
    document.getElementById("app-section").classList.remove("d-none");
    showSection("read");
  } else {
    alert("Credenciales incorrectas");
  }
});

function logout() {
  document.getElementById("app-section").classList.add("d-none");
  document.getElementById("login-section").classList.remove("d-none");
}

// ================= NAVEGACIÓN =================
function showSection(sectionId) {
  ["create", "read", "update", "delete"].forEach(id => {
    document.getElementById(id).classList.add("d-none");
  });

  document.getElementById(sectionId).classList.remove("d-none");

  if (sectionId === "read") renderMovies();
}

//////////////////// AGREGAR (POST)
async function addMovie(e) {
  e.preventDefault();

  const titulo = document.getElementById("new-title").value;
  const director = document.getElementById("new-director").value;
  const anio = document.getElementById("new-year").value;
  const genero = document.getElementById("new-genre").value;

  await fetch("http://localhost:3000/peliculas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ titulo, director, anio, genero })
  });

  alert("Película agregada");
  renderMovies();
}

//////////////////// LEER (GET)
async function renderMovies() {
  const res = await fetch("http://localhost:3000/peliculas");
  const movies = await res.json();

  const list = document.getElementById("movie-list");
  list.innerHTML = "";

  movies.forEach(movie => {
    const item = document.createElement("li");
    item.className = "list-group-item";

    item.textContent =
      `${movie.id}: ${movie.titulo} - ${movie.director} - ${movie.anio} - ${movie.genero}`;

    list.appendChild(item);
  });
}

//////////////////// ACTUALIZAR (PUT)
async function updateMovie(e) {
  e.preventDefault();

  const id = document.getElementById("edit-index").value;
  const titulo = document.getElementById("edit-title").value;
  const director = document.getElementById("edit-director").value;
  const anio = document.getElementById("edit-year").value;
  const genero = document.getElementById("edit-genre").value;

  await fetch(`http://localhost:3000/peliculas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ titulo, director, anio, genero })
  });

  alert("Película actualizada");
  renderMovies();
}

//////////////////// ELIMINAR (DELETE)
async function deleteMovie(e) {
  e.preventDefault();

  const id = document.getElementById("delete-index").value;

  await fetch(`http://localhost:3000/peliculas/${id}`, {
    method: "DELETE"
  });

  alert("Película eliminada");
  renderMovies();
}