import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { movieInterface, tvShowInterface } from '../interfaces/interfaces'
import { API_READ_ACCESS_TOKEN, BASE_URL, IMAGE_BASE_URL } from '../config'
import axios from 'axios'
import Poster from '../components/Poster'
import Pagination from '../components/Pagination'
import { getYear } from '../functions/functions'

function useMoviesAndTv(page: number, currentMedia: string): [movieInterface[], tvShowInterface[], boolean] {
	const [movies, setMovies] = useState([])
	const [tvShows, setTvShows] = useState([])
	const [loading, setLoading] = useState(true)

	const fetchMedia = (str: string) => {
		useEffect(() => {
			axios.get(`${BASE_URL}/${str}/top_rated?language=en-US&page=${page}`, {
				headers: {
					"Authorization": `Bearer ${API_READ_ACCESS_TOKEN}`
				}
			})
				.then(res => {
					if (str === "movie") setMovies(res.data.results)
					else if (str === "tv") setTvShows(res.data.results)
				})
				.finally(() => {
					setLoading(false)
				})
		}, [page, currentMedia])
	}

	fetchMedia(currentMedia)

	return [movies, tvShows, loading]
}

const TopRatedPage = () => {
	const [mediaPage, setMediaPage] = useState(1)
	const [currentMedia, setCurrentMedia] = useState("movie")

	const [movies, tvShows, mediaLoading] = useMoviesAndTv(mediaPage, currentMedia)

	if (mediaLoading){
		return (<div>Loading...</div>)
	}

	return (<div className='bg-darkGray min-w-[100vw] min-h-[100vh] text-white'>
		<Navbar />

		<div className='flex px-6 py-4 gap-10'>
            <button onClick={() => setCurrentMedia("movie")} className={`${currentMedia==="movie" ? "bg-accentBlue" : "bg-darkerGray"} rounded-lg px-4 py-2 font-semibold `}>MOVIES</button>
            <button onClick={() => setCurrentMedia("tv")} className={`${currentMedia==="tv" ? "bg-accentBlue" : "bg-darkerGray"} rounded-lg px-4 py-2 font-semibold `}>TV</button>
        </div>

		<div className=' px-6 py-4 flex flex-wrap gap-3'>
			{currentMedia==="movie" && movies.map(c => {
				return <Poster
					key={c.id}
					poster_path={`${IMAGE_BASE_URL}${c.poster_path}`}
					display_name={c.title}
					type='Movie'
					year={getYear(c.release_date)} /> // TODO
			})}
			{currentMedia==="tv" && tvShows.map(c => {
				return <Poster
					key={c.id}
					poster_path={`${IMAGE_BASE_URL}${c.poster_path}`}
					display_name={c.name}
					type='TV Series'
					year={getYear(c.first_air_date)} /> // TODO
			})}
		</div>

		{/* Pages */}
        <div className=' flex justify-center items-center pt-4 pb-10' >
            <Pagination setFunction={setMediaPage} />
        </div>
	</div>
	)
}

export default TopRatedPage
