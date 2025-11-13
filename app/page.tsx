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
    <div className="flex min-h-screen overflow-x-hidden bg-slate-950 items-center justify-start font-sans ">
      <main className="flex flex-col min-h-screen min-w-screen items-center justify-start px-10 py-5 bg-slate-950 border text-white">

        {/* League Carousel */}
        <div className="mb-3 flex items-center justify-center">
          <LeagueCarousel leagues={leaguesListUtil} onLeagueSelect={handleLeagueSelect} />
        </div>

        {/* Date Carousel */}
        <div className="flex items-center justify-center pb-2">
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
