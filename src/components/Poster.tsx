import React, { useState } from "react"

const Poster: React.FC<{ poster_path: string, display_name: string, type: string, year: string }> = ({ poster_path, display_name, type, year }) => {
    const [isMouseInside, setIsMouseInside] = useState(false)

    return (
        <div className='relative cursor-pointer min-w-[15vw]' onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}>
            <img className=' w-[15vw] rounded-md' src={poster_path} alt="Poster" />

            <div className={`rounded absolute bottom-0 z-10 w-full mb-2 p-2 ${isMouseInside ? "bg-white bg-opacity-30" : ""}`} >
                <div>
                    <span className=' text-sm font-semibold rounded text-white bg-blue-500 bg-opacity-30 px-2 py-1 mx-2 mb-1'>{type}</span>
                    <span className=' text-sm font-semibold rounded text-white bg-blue-500 bg-opacity-30 px-2 py-1 mx-2 mb-1'>{year}</span>
                </div>
                <div className='text-white font-bold text-lg'>{display_name}</div>
            </div>
        </div >
    )
}

export default Poster