import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from '../config'
import { genreInterface, tvShowInterface } from '../interfaces/interfaces'
import Pagination from '../components/Pagination'
import Poster from '../components/Poster'
import SelectGenreComponent from '../components/SelectGenreComponent'
import { getYear } from '../functions/functions'

function useGenres(): genreInterface[] {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`)
            .then(res => {
                setGenres(res.data.genres)
            })
    }, [])

    return genres
}

function useTvShows(page: number, genreId: number): [tvShowInterface[], boolean] {
    const [tvShows, setTvShows] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTvShows = () => {
        useEffect(() => {
            axios.get(`${BASE_URL}/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&language=en&page=${page}${genreId != 0 ? `&with_genres=${genreId}` : ""}`)
                .then(res => {
                    setTvShows(res.data.results)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, [page, genreId])
    }

    fetchTvShows()

    return [tvShows, loading]
}

const DiscoverTvPage = () => {
    const genres = useGenres()
    const [selectGenre, setSelectGenre] = useState(0)

    const [tvShowsPage, setTvShowsPage] = useState(1)
    const [tvShows, tvShowsLoading] = useTvShows(tvShowsPage, selectGenre)

    if (tvShowsLoading) {
        return (<div>Loading...</div>)
    }

    const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectGenre(parseInt(e.target.value))
    }

    return (<div className='bg-darkGray min-w-[100vw] min-h-[100vh]'>
        <Navbar />

        {/* Filter */}
        <div className='flex px-6 py-4 gap-10'>
            <div className='text-3xl text-white font-semibold cursor-default'>TV Shows</div>
            <SelectGenreComponent genres={genres} handleSelectGenre={handleSelectGenre}/>
        </div>

        {/* Posters */}
        <div className='px-6 py-4 flex flex-wrap gap-3'>
            {tvShows.map(c => {
                return <Poster
                    key={c.id}
                    poster_path={`${IMAGE_BASE_URL}${c.poster_path}`}
                    display_name={c.name}
                    type='TV Series'
                    year={getYear(c.first_air_date)} />
            })}
        </div>

        {/* Pages */}
        <div className=' flex justify-center items-center pt-4 pb-10' >
            <Pagination setFunction={setTvShowsPage} />
        </div>
    </div>
    )
}

export default DiscoverTvPage;