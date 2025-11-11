'use client'


import React, { useEffect, useState } from "react";
import Image from "next/image";
import TeamList from "./components/TeamList";
import GameList from "./components/GameList";
import LeagueCarousel from "./components/LeagueCarousel";
import Leagues from "./res/leagues.json"
import DateCarousel from "./components/DateCarousel";

export default function Home() {
  const [selectedLeague, setSelectedLeague] = useState<string>("basketball/nba");
  const [date, setDate] = useState<string>("");
  const leaguesListUtil: League[] = [...Leagues];

  const handleLeagueSelect = (league: string) => {
    setSelectedLeague(league)
  }

  const handleDateSelect = (date: string) => {
    setDate(date)
    console.log(date)
  }
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        {/* League Carousel */}
        <div>
          <LeagueCarousel leagues={leaguesListUtil} onLeagueSelect={handleLeagueSelect} />
        </div>

        {/* Date Carousel */}
        <div>
          <DateCarousel onDateSelect={handleDateSelect}/>
        </div>

        {/* <TeamList League={{}}/> */}
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <GameList League={selectedLeague} Date={date} />
        </div>

      </main>
    </div>
  );
}
