import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { RecoilRoot } from 'recoil'
import DiscoverMoviesPage from './pages/DiscoverMoviesPage'
import DiscoverTvPage from './pages/DiscoverTvPage'
import TopRatedPage from './pages/TopRatedPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/discover-movies' element={<DiscoverMoviesPage />} />
          <Route path='/discover-tv' element={<DiscoverTvPage/>}/>
          <Route path='/top-rated' element={<TopRatedPage/>}/>
          
          {/* <Route path='/details' element={<Temp/>}/> */}
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
