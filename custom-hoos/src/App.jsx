import "./App.css";
import { useCallback, useState } from "react";
import { Movies } from "./components/Movies.jsx";
import { useMovies } from "./hooks/useMovies.js";
import { useSearch } from "./hooks/useSearch.js";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });
  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log("search", search);
      getMovies({ search });
    }, 300),
    []
  );

  const handleChange = (event) => {
    const newQuery = event.target.value;

    if (newQuery.startsWith(" ")) return;

    setSearch(newQuery);
    debouncedGetMovies(newQuery);
    // getMovies({ search: newQuery })
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  return (
    <div className="page">
      <header>
        <h3>App de Peliculas</h3>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="query"
            value={search}
            onChange={handleChange}
            placeholder="Matrix, Avengers, El castillo Vagabundo..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
