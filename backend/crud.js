let movies = [];

export function addMovieData(title, director) {
  movies.push({ title, director });
}

export function getMovies() {
  return movies;
}