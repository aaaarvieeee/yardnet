'use client'

import React, { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'


interface Game {
    id: string
    date: string
    shortName: string
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
                logo: ImageBitmap
            };
        }[];
    }[];
}

export default function GameList(): ReactElement {
    const [gameList, setGameList] = useState<Game[]>([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const loadGamesList = async () => {
            const data = await fetchGames()
            setGameList(data);
        }
        loadGamesList();
        const refreshInterval = setInterval(loadGamesList, 5000)
        return () => clearInterval(refreshInterval)
    }, []);

    return (
        <div>
            <h1>teams:</h1>
            <div className='grid grid-cols-3 p-2 mx-12 border-2 border-e-red-50'>
                {gameList.map((Game) => (
                    <div key={Game.id} className='p-2 border-2 border-amber-200 m-2 grid grid-row'>
                        {/* game status info */}
                        <div className='border-2'>
                            <p>{Game.shortName}</p>
                            <p>time: {Game.status.displayClock}</p>
                            <p>period: {Game.status.period}</p>
                        </div>

                        {/* game stats */}
                        {Game.competitions.map((competition, i) => (
                            <div key={i} className='mx-3'>
                                {competition.competitors.map((competitor, j) => (
                                    <div key={j}>
                                        <p>{competitor.team.displayName}: {competitor.score} </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

async function fetchGames(): Promise<Game[]> {
    try {
        // Base API: http://site.api.espn.com/apis/site/v2/sports/ -- the rest are extensions
        // mlb team path = 'baseball/mlb/teams'
        // nhl  team path =' '/hockey/nhl/teams'
        // for scores, they're all structured the same. just "scoreboard after the league" eg. "/hockey/nhl/scoreboard"
        const api = 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'
        const response = await fetch(api)
        const data = await response.json()
        const teams: Game[] = data.events
        return teams
    }
    catch (error) {
        throw new Error("error" + error)
    }
}
