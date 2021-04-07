import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GenreContextProviderProps {
  children: ReactNode;
}

interface GenreContextData {
  selectedGenreId: number;
  setSelectedGenreId: (n: number) => void;
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export const GenreContext = createContext({} as GenreContextData)

export function GenreContextProvider({ children }: GenreContextProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <GenreContext.Provider value={{
      selectedGenreId,
      setSelectedGenreId,
      selectedGenre,
      movies,
    }}>
      {children}
    </GenreContext.Provider>
  )
}