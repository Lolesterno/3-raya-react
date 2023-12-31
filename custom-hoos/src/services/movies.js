const API_KEY = "c9959fa6";

export const searchMovies = async ({ search }) => {
  if (search === "") return;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    );

    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      image: movie.Poster,
      year: movie.Year,
    }));
    
  } catch (error) {
    throw new Error("Error al Buscar Peliculas");
  }
};
