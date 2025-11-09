'use client'

import React, { ReactElement } from 'react'
import { useState, useEffect } from 'react'

interface Team {
    team: {
        id: string
        displayName: string
        shortDisplayName: string
        abbreviation: string
    };
}

interface LeagueProp {
    League: {
        team: Team[];
    }
}

export default function TeamList({League}: LeagueProp): ReactElement {
    const [teamList, setTeamList] = useState<Team[]>([])
    
    
    useEffect(() => {
        const loadTeamsList = async() => {
            const data = await fetchTeams()
            setTeamList(data);
        }
        loadTeamsList();
    }, [League]);

    return (
        <div>
            <h1>teams:</h1>
            <div className='grid grid-cols-3 p-2 mx-12'>
                    {
                        teamList.map((Team) => (
                            <div key={Team.team.id}>
                                <p>{Team.team.displayName}</p>
                                <p>{Team.team.abbreviation}</p>
                            </div>
                        ))
                    }
            </div>
        </div>
    )
}

async function fetchTeams(): Promise<Team[]> {
    try {
        // Base API: http://site.api.espn.com/apis/site/v2/sports/ -- the rest are extensions
        // mlb team path = 'baseball/mlb/teams'
        // nhl  team path =' '/hockey/nhl/teams'
        // for scores, they're all structured the same. just "scoreboard after the league" eg. "/hockey/nhl/scoreboard"
        const api = 'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams'
        const response = await fetch(api)
        const data = await response.json()
        const teams: Team[] = data.sports[0].leagues[0].teams
        return teams
    }
    catch (error) {
        throw new Error("error" + error)
    }
}
