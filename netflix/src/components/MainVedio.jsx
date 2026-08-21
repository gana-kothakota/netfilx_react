import React from 'react'
import { HERO_MOVIE } from '../utils/mock_data'

const MainVedio = ({ movie = HERO_MOVIE }) => {
  const { title, description, youtubeId, embedUrl, rating, year, genre, match, ageRating, duration } = movie

  const videoSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0`
    : embedUrl

  return (
    <div className="relative w-screen aspect-video bg-neutral-950 overflow-hidden">
      {/* Background Video */}
      <iframe
        className="w-screen aspect-video scale-125 pointer-events-none"
        src={videoSrc}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      {/* Dark Overlay Gradients & Info */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-16 md:pb-24 pointer-events-auto">
        <div className="max-w-2xl space-y-4">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold capitalize tracking-wide text-white drop-shadow-lg">
            {title}
          </h1>

          {/* Badges / Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base font-semibold text-emerald-400">
            <span className="text-emerald-400 font-bold">{match}</span>
            <span className="border border-neutral-600 px-2 py-0.5 rounded text-xs text-neutral-300">
              {ageRating}
            </span>
            <span className="text-neutral-300">{year}</span>
            {duration && <span className="text-neutral-300">{duration}</span>}
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold">
              ★ {rating}
            </span>
            <span className="text-neutral-400">{genre}</span>
          </div>

          {/* Description */}
          <p className="text-neutral-300 text-base md:text-lg line-clamp-3 leading-relaxed drop-shadow">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-2">
            <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-2.5 md:px-8 md:py-3 rounded hover:bg-white/80 transition shadow-lg text-sm md:text-base cursor-pointer">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </button>
            <button className="flex items-center gap-2 bg-neutral-600/70 text-white font-bold px-6 py-2.5 md:px-8 md:py-3 rounded hover:bg-neutral-600/50 transition backdrop-blur text-sm md:text-base cursor-pointer">
              <svg className="w-6 h-6 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4m0-4h.01" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainVedio
