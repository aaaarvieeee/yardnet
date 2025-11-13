import React, { ReactElement } from "react";

interface LeaguesUtilProp {
    leagues: League[]
    onLeagueSelect: (message: string) => void
}


export default function LeagueCarousel({ leagues, onLeagueSelect }: LeaguesUtilProp): ReactElement {

    const leaguesList = [...leagues]

    return (
        <div className="carousel carousel-center max-w-1/3 overflow-x-auto snap-x snap-mandatory scroll-smooth mask-x-from-60">
            {leaguesList.map((leagueItem) => (
                <div key={leagueItem.id}
                    className="carousel-item border-b-white mx-1 hover:underline hover:bg-sky-900 hover:cursor-pointer"
                    onClick={() => onLeagueSelect(leagueItem.endpoint)}>
                    <p
                        className="text-4xl"
                    >
                        {leagueItem.id}
                    </p>
                </div>
            ))}
        </div>
    )
}