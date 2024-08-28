import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from '../config'
import { genreInterface, movieInterface } from '../interfaces/interfaces'
import Pagination from '../components/Pagination'
import Poster from '../components/Poster'
import SelectGenreComponent from '../components/SelectGenreComponent'
import { getYear } from '../functions/functions'

function useGenres(): genreInterface[] {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
            .then(res => {
                setGenres(res.data.genres)
            })
    }, [])

    return genres
}

function useMovies(page: number, genreId: number): [movieInterface[], boolean] {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchMovies = () => {
        useEffect(() => {
            axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en&page=${page}${genreId != 0 ? `&with_genres=${genreId}` : ""}`)
                .then(res => {
                    setMovies(res.data.results)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, [page, genreId])
    }

    fetchMovies()

    return [movies, loading]
}

const DiscoverMoviesPage = () => {
    const genres = useGenres()
    const [selectGenre, setSelectGenre] = useState(0)

    const [moviesPage, setMoviesPage] = useState(1)
    const [movies, moviesLoading] = useMovies(moviesPage, selectGenre)

    if (moviesLoading) {
        return (<div>Loading...</div>)
    }

    const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectGenre(parseInt(e.target.value))
    }

    return (<div className='bg-darkGray min-w-[100vw] min-h-[100vh]'>
        <Navbar />

        {/* Filter */}
        <div className='flex px-6 py-4 gap-10'>
            <div className='text-3xl text-white font-semibold cursor-default'>Movies</div>
            <SelectGenreComponent genres={genres} handleSelectGenre={handleSelectGenre}/>
        </div>

        {/* Posters */}
        <div className='px-6 py-4 flex flex-wrap gap-3'>
            {movies.map(c => {
                return <Poster
                    key={c.id}
                    poster_path={`${IMAGE_BASE_URL}${c.poster_path}`}
                    display_name={c.title}
                    type='Movie'
                    year={getYear(c.release_date)} />
            })}
        </div>

        {/* Pages */}
        <div className=' flex justify-center items-center pt-4 pb-10' >
            <Pagination setFunction={setMoviesPage} />
        </div>
    </div>
    )
}

export default DiscoverMoviesPage;