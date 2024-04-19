'use client'

import { useContext, useState } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaBackward, FaForward, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import videos, { Video } from './data/video';
import { convertTimeToString } from "./utils/Utils";

export default function Home() {
  const {
    videoURL,
    playing,
    totalTime,
    currentTime,
    videoRef,
    canvasRef,
    playPause,
    volume,
    setVolume,
    changeVolume,
    volumeMute,
    unMute,
    playNextVideo,
    configCurrentTime,
    configVideo,
    configFilter
  } = useContext(HomeContext);

  const formatTime = (time: number): string =>{
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const [selectedVideo, setselectedVideo] = useState<Video | null>(null);

  const handleVolumeChange = (e: { target: { value: string; }; }) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume); 
  };

  const handleVideoSelection = (index: number) => {
    setselectedVideo(videos[index]);
    configVideo(index);
  };

  const handlePlayNextVideo = () => {
    const nextIndex = (videos.findIndex(video => video === selectedVideo) + 1) % videos.length;
    setselectedVideo(videos[nextIndex]);
    configVideo(nextIndex);
  };

  const handlePlayPreviousVideo = () => {
    const previousIndex = (videos.findIndex(video => video === selectedVideo) - 1 + videos.length) % videos.length;
    setselectedVideo(videos[previousIndex]);
    configVideo(previousIndex);
  };


  return (
    <div className="w-full bg-black">
      <main className="mx-auto w-[80%] mt-2 flex">
        <div className="w-[65%] mr-1">
        {selectedVideo && (
        <h1 style={{fontSize: '24px'}}>{selectedVideo.description}</h1>
      )}
          <video className="w-full" ref={videoRef} src={videoURL} hidden></video>
          <canvas className="w-full h-[380px]" ref={canvasRef}></canvas>
          <div className="bg-black flex flex items-center space-x-2 px-2">
            <input
              type="range"
              min={0}
              max={totalTime}
              value={currentTime}
              onChange={(e) => configCurrentTime(Number(e.target.value))}
              className="flex-grow video-progress mt-2"
            >
            </input>
          </div>
          <div className="bg-black flex flex justify-between px-2">
            <button className="text-white" onClick={playPause}>
              {playing ? <FaPause /> : <FaPlay />}
              </button>
              <span className="text-white mx-2">{formatTime(currentTime)}</span>
              <button className="text-white"onClick={handlePlayPreviousVideo}>
                <FaBackward></FaBackward>
              </button>
              <button className="text-white" onClick={handlePlayNextVideo}>
                <FaForward></FaForward>
          </button>
              <button className="text-white mx-2" onClick={volumeMute}>
              {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => {
                    const novoVolume = Number(e.target.value);
                    changeVolume(novoVolume);
                    if (novoVolume === 0) {
                      volumeMute();
                    } else {
                      unMute();
                    }
                  }
                }
                >
              </input> 
            <select onChange={(e) => configFilter(Number(e.target.value))} >
              <option selected value={0}>Sem filtro</option>
              <option value={1}>Verde</option>
              <option value={2}>Azul</option>
              <option value={3}>Vermelho</option>
              <option value={4}>Preto e branco</option>
            </select>
            <span className = "text-blue-600" >
            {convertTimeToString(currentTime)}/{convertTimeToString(totalTime)}
            </span>
            
          </div>
        </div>
        <div className="w-[35%] h-[100vh]">
          {videos.map((video:Video, index) => (
            <button key={index} className="w-full" onClick={() => handleVideoSelection(index)}>
              <h2>{video.description}</h2>
              <img className="w-full h-[200px] mb-1" src={video.imageURL} alt={video.description}></img>
            </button>
          ))}       
        </div>
        <style jsx>{`
            input[type="range"]::-webkit-slider-runnable-track {
              background: linear-gradient(to right, #00a8ff ${volume * 100}%, #ccc ${volume * 100}%);
              }
            input.video-progress::-webkit-slider-runnable-track{
              background: linear-gradient(to right, #00a8ff ${currentTime / totalTime * 100}%, #ccc ${currentTime / totalTime * 100}%);
              }
            `}
        </style>
      </main>
    </div>
  );
}