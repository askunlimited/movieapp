
import './index.css'
import Search from "./components/Search.jsx";
import {useState, useEffect} from "react";
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';

const API_BASE_URL = 'https://api.themoviedb.org/3'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

function App() {
    const [searchTerm, setSearchTerm] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchMovies  = async () => {
        setIsLoading(true)
        setErrorMessage('')

        try {
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
        const response = await fetch(endpoint, API_OPTIONS)
        
        if (!response.ok) {
            throw new Error('Failed to fetch movies')
        }

        const data = await response.json()

        if (data.response === 'False') {
            setErrorMessage(data.Error || 'Failed to fetch movies')
            setMovieList([])
            return;
        }

        setMovieList(data.results || [])
        console.log(movieList)

        } catch (error) {
            console.log(`Error fetching movies: ${error}`)
            setErrorMessage(`Error fetching movies, Please try again later`)   
        } finally {
            setIsLoading(false)
        }
    } 

    useEffect(() => {
        fetchMovies()
    }, [])

  return (
      <>
          <div className="pattern">
              <div className="wrapper">
                  <img src="./hero.png" alt="hero banner"/>
                  <header>
                  <h1> Find <span className="text-gradient">Movies</span>  you can watch without the hassle</h1>
                  <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </header>
              <section className='all-movies'>
                <h2 className='mt-[40px]'>All Movies</h2>

                {isLoading ? (
                    <Spinner />
                ): errorMessage ? (
                    <p className='text-red-500'>{errorMessage}</p>
                ): (
                    <ul>
                        {movieList.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ul>
                )}
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
              </section>
              </div>

          </div>
      </>
  )
}

export default App
