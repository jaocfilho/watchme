import { useContext, useEffect, useState } from "react"
import { GenreContext } from "../contexts/GenreContext";
import { api } from "../services/api"
import { MovieCard } from "./MovieCard";

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

export function Content() {
  const { selectedGenre, movies } = useContext(GenreContext)

  return (
    <main>
      <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>
      </div>

      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  )
}