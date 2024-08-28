import React from 'react'
import { genreInterface } from '../interfaces/interfaces'

const SelectGenreComponent: React.FC<{genres: genreInterface[], handleSelectGenre: any}> = ({genres, handleSelectGenre}) => {
    return (
        <select
            className='bg-darkerGray text-white rounded p-2 outline-none font-semibold'
            onChange={handleSelectGenre}>
            <option value={0}>None</option>
            {genres.map(c => {
                return <option key={c.id} value={c.id}>{c.name}</option>
            })}
        </select>
    )
}

export default SelectGenreComponent
