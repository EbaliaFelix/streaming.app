    let movies = [];
///////////////
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

    function showSection(sectionId) {
      ["create", "read", "update", "delete"].forEach(id => {
        document.getElementById(id).classList.add("d-none");
      });
      document.getElementById(sectionId).classList.remove("d-none");
      if (sectionId === "read") renderMovies();
    }
    ///////////////////////////// AGREGAR (POST)
    function addMovie(e) {
    /////////////////////////////
      e.preventDefault();
      const title = document.getElementById("new-title").value;
      const director = document.getElementById("new-director").value;
      
      /////////////////////////////
       movies.push({ title, director });
      document.getElementById("new-title").value = "";
      document.getElementById("new-director").value = "";
      ////////////////////////////

      alert("Película agregada");
    }

    function renderMovies() {
      const list = document.getElementById("movie-list");
      list.innerHTML = "";
      movies.forEach((movie, index) => {
        const item = document.createElement("li");
        item.className = "list-group-item";
        item.textContent = `${index}: ${movie.title} - ${movie.director}`;
        list.appendChild(item);
      });
    }

    function updateMovie(e) {
      e.preventDefault();
      const index = parseInt(document.getElementById("edit-index").value);
      const title = document.getElementById("edit-title").value;
      const director = document.getElementById("edit-director").value;
      if (movies[index]) {
        movies[index] = { title, director };
        alert("Película actualizada");
      } else {
        alert("Índice inválido");
      }
    }

    function deleteMovie(e) {
      e.preventDefault();
      const index = parseInt(document.getElementById("delete-index").value);
      if (movies[index]) {
        movies.splice(index, 1);
        alert("Película eliminada");
      } else {
        alert("Índice inválido");
      }
    }
