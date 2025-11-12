'use client'


import React, { useEffect, useState } from "react";
import Image from "next/image";
import TeamList from "./components/TeamList";
import GameList from "./components/GameList";
import LeagueCarousel from "./components/LeagueCarousel";
import Leagues from "./res/leagues.json"
import DateCarousel from "./components/DateCarousel";
import NewsCard from "./components/NewsCard";

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState<string>("basketball/nba");
  const [date, setDate] = useState<string>("");
  const leaguesListUtil: League[] = [...Leagues];

  const handleLeagueSelect = (league: string) => {
    setSelectedLeague(league)
  }

  const handleDateSelect = (date: string) => {
    setDate(date)
  }


  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-black">
      <main className="flex min-h-screen min-w-screen max-h-700 max-w-800 flex-col items-center justify-between px-10 py-2 bg-slate-900 border text-white">

        {/* League Carousel */}
        <div className="mb-3">
          <LeagueCarousel leagues={leaguesListUtil} onLeagueSelect={handleLeagueSelect} />
        </div>

        {/* Date Carousel */}
        <div className="justify-around mb-3">
          <DateCarousel onDateSelect={handleDateSelect} />
        </div>

        {/* Game List/> */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <GameList League={selectedLeague} Date={date} />
        </div>

        {/* league news */}
        {/* <div>
          <NewsCard League={selectedLeague}/>
        </div> */}
      </main>
    </div>
  );
}
