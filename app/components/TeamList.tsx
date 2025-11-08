'use client'

import React, { ReactElement } from 'react'
import { useState, useEffect } from 'react'

interface TeamInfo {
    team: {
        id: string
        displayName: string
        shortDisplayName: string
        abbreviation: string
    }
}

export default function TeamList(): ReactElement {
    const [teamList, setTeamList] = useState<TeamInfo[]>([])
    
    
    useEffect(() => {
        const loadTeamsList = async() => {
            const data = await fetchTeams()
            setTeamList(data);
        }
        loadTeamsList();
    }, []);

    return (
        <div>
            <h1>teams:</h1>
            {
                teamList.map((team) => (
                    <li key={team.team.id}>
                        <p>{team.team.displayName}</p>
                        <p>{team.team.abbreviation}</p>
                    </li>
                ))
            }
        </div>
    )
}

async function fetchTeams(): Promise<TeamInfo[]> {
    try {
        const api = 'http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams'
        const response = await fetch(api)
        const data = await response.json()
        const teams: TeamInfo[] = data.sports[0].leagues[0].teams
        return teams
    }
    catch (error) {
        throw new Error("error" + error)
    }
}
