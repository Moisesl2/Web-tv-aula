'use client'

import { useContext } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaPause, FaPlay } from "react-icons/fa";
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
    configCurrentTime,
    configVideo,
    configFilter
  } = useContext(HomeContext);
  return (
    <div className="w-full bg-black">
    <main className="mx-auto w-[80%] mt-2 flex">
      <div className="w-[65%] mr-1">
        <video className="w-full" ref={videoRef} src={videoURL} hidden></video>
        <canvas className="w-full h-[380px]" ref={canvasRef}></canvas>

        <div className="bg-black">
          <input
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onChange={(e) => configCurrentTime(Number(e.target.value))}
          >
          </input>
          <button className="text-white" onClick={playPause}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
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
        {
          videos.map((video:Video, index) => {
            return (
              <button key={index} className="w-full" onClick={(e) => configVideo(index)}>
                <img className="w-full h-[200px] mb-1" src={video.imageURL}></img>
              </button>

            )
          })
        }
      </div>
    </main>
    </div>
  );
}