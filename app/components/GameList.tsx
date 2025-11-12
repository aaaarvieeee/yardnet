'use client'

import React, { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'

interface Game {
    id: string
    date: string
    status: {
        displayClock: string
        period: number
    }
    competitions: {
        competitors: {
            score: string
            team: {
                id: string
                location: string
                displayName: string
                logo: StaticImageData
            };
        }[];
    }[];
}

interface LeagueProp {
    League: string
    Date: string
}

export default function GameList({League, Date}: LeagueProp): ReactElement {
    const [gameList, setGameList] = useState<Game[]>([])

    useEffect(() => {
        const loadGamesList = async () => {
            const data = await fetchGames({League, Date})
            setGameList(data);
        }
        loadGamesList();
        const refreshInterval = setInterval(loadGamesList, 7000)
        return () => clearInterval(refreshInterval)
    }, [League, Date]);

    return (
        <div>
            <div className='grid grid-cols-2'>
                {gameList.map((Game) => (
                    <div key={Game.id} className=' card p-2 border-2 border-amber-200 m-1 grid rounded-xl'>

                        {/* game stats */}
                        {Game.competitions.map((competition, i) => (
                            <div key={i} className='card-body flex flex-row p-0'>
                                {competition.competitors.map((competitor, j) => (
                                    <div key={j} className='border-2 flex flex-row p-1 justify-items-center gap-1'>
                                        <Image src={competitor.team.logo} width={25} height={10} alt={competitor.team.displayName + "'s logo"}/>
                                        <p className='items-center'> {competitor.score} </p>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* game status info */}
                        <div className='border-2 flex justify-center gap-2 max-h-10 text-xs w-full'>
                            <p>time: {Game.status.displayClock}</p>
                            <p>Q: {Game.status.period}</p>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

async function fetchGames({League, Date}: LeagueProp): Promise<Game[]> {
    // params: league, to change the sport
    // date, to view the scores of a specific date, or upcoming games.

    try {
        // Base API: http://site.api.espn.com/apis/site/v2/sports/ -- the rest are extensions
        // mlb team path = 'baseball/mlb/teams'
        // nhl  team path =' '/hockey/nhl/teams'
        // for scores, they're all structured the same. just "scoreboard after the league" eg. "/hockey/nhl/scoreboard"
        // base api structure:
        const api = `http://site.api.espn.com/apis/site/v2/sports/${League}/scoreboard${Date}`
        const response = await fetch(api)
        const data = await response.json()
        const teams: Game[] = data.events
        return teams
    }
    catch (error) {
        throw new Error("error" + error)
    }
}
