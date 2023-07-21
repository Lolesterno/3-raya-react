import { useEffect, useState, useRef } from "react";

export function useSearch() {
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede encontrar una pelicula Vacia");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 letras");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}
