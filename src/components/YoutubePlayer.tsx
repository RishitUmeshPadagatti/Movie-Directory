import React from 'react'
import ReactPlayer from 'react-player/youtube'

const YoutubePlayer: React.FC<{ youtubeKey: string, width?: number }> = ({ youtubeKey, width = 500 }) => {
    const ratio = 640/360;
    const height = width/ratio;
    return (
        <ReactPlayer url={`https://www.youtube.com/watch?v=${youtubeKey}`} width={width} height={height}/>
    );
};

export default YoutubePlayer