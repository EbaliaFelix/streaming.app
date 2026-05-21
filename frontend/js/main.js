// LOGIN
document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  // GUARDAR TOKEN Y ROL
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.rol);

  console.log("ROL:", data.user.rol);

  console.log("TOKEN GUARDADO:", data.token);

  document.getElementById("login-section").classList.add("d-none");
  document.getElementById("app-section").classList.remove("d-none");
  
  applyRolePermissions();

  showSection("read");
  renderMovie();
});

// NAVEGACIÓN 
function showSection(sectionId) {
  ["create", "read", "update", "delete"].forEach(id => {
    document.getElementById(id).classList.add("d-none");
  });

  document.getElementById(sectionId).classList.remove("d-none");

  if (sectionId === "read") renderMovie();
}

//AGREGAR (POST)
async function addMovie(e) {
  e.preventDefault();

  const titulo = document.getElementById("new-title").value;
  const director = document.getElementById("new-director").value;
  const anio = document.getElementById("new-year").value;
  const genero = document.getElementById("new-genre").value;

  await fetch("http://localhost:3000/peliculas", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  },
  body: JSON.stringify({ titulo, director, anio, genero })
});

  alert("Película agregada");
  renderMovie();
}

//LEER (GET)
async function renderMovie() {

  const token = localStorage.getItem("token");

  console.log("TOKEN ENVIADO:", token);

  const res = await fetch("http://localhost:3000/peliculas", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const movies = await res.json();

  console.log(movies);

  const list = document.getElementById("movie-list");

  list.innerHTML = "";

  movies.forEach(movie => {

    const card = document.createElement("div");

    card.className = "col-md-4 mb-4";

    card.innerHTML = `
    
      <div class="card h-100 shadow movie-card">

        <img
          src="https://picsum.photos/400/250?random=${movie.id}"
          class="card-img-top"
          alt="Película"
        >

        <div class="card-body">

          <h5 class="card-title">
            ${movie.titulo}
          </h5>

          <p class="card-text">
            <strong>Director:</strong> ${movie.director || "No disponible"}
          </p>

          <p class="card-text">
            <strong>Año:</strong> ${movie.anio || "N/A"}
          </p>

          <p class="card-text">
            <strong>Género:</strong> ${movie.genero || "N/A"}
          </p>

        </div>

      </div>
    
    `;

    list.appendChild(card);

  });

}
//ACTUALIZAR (PUT)
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
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token")
  },
  body: JSON.stringify({ titulo, director, anio, genero })
});

  alert("Película actualizada");
  renderMovie();
}

//ELIMINAR (DELETE)
async function deleteMovie(e) {
  e.preventDefault();

  const id = document.getElementById("delete-index").value;

  await fetch(`http://localhost:3000/peliculas/${id}`, {
  method: "DELETE",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
});

  alert("Película eliminada");
  renderMovie();
}
function logout() {
 //BORRAR SESIÓN 
  localStorage.removeItem("token");
  localStorage.removeItem("role");
 //OCULTAR APP
  document.getElementById("app-section").classList.add("d-none");
 //MOSTRAR LOGIN
  document.getElementById("login-section").classList.remove("d-none");
 //LIMPIAR INPUTS
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function applyRolePermissions() {

  const role = localStorage.getItem("role");

  // BOTONES
  const createBtn = document.getElementById("btn-create");
  const updateBtn = document.getElementById("btn-update");
  const deleteBtn = document.getElementById("btn-delete");

  // SECCIONES
  const createSection = document.getElementById("create");
  const updateSection = document.getElementById("update");
  const deleteSection = document.getElementById("delete");

  // USER
  if (role === "user") {

    createBtn.style.display = "none";
    updateBtn.style.display = "none";
    deleteBtn.style.display = "none";

    createSection.style.display = "none";
    updateSection.style.display = "none";
    deleteSection.style.display = "none";
  }

  // EDITOR
  if (role === "editor") {

    deleteBtn.style.display = "none";

    deleteSection.style.display = "none";
  }

}
// DARK/LIGHT MODE
// DARK/LIGHT MODE
function toggleTheme() {

	document.body.classList.toggle("light-mode");

}

// CARGAR TEMA GUARDADO
window.onload = () => {

  const theme = localStorage.getItem("theme");

  if (theme === "light") {

    document.body.classList.add("light-mode");

  }

};

// DARK/LIGHT MODE

const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {

	document.body.classList.toggle("light-mode");

});