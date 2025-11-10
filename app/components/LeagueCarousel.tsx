import React, { ReactElement } from "react";

interface LeaguesUtilProp {
    leagues: League[]
    onLeagueSelect: (message: string) => void
}


export default function LeagueCarousel({ leagues, onLeagueSelect }: LeaguesUtilProp): ReactElement {

    const leaguesList = [...leagues]

    return (
        <div className="CarouselWrapper  p-3 flex flex-row justify-items-center border-2 items-center mx-10">
            {leaguesList.map((leagueItem) => (
                <div key={leagueItem.id}
                    className="CarouselItemWrapper border-2 border-white mx-2 hover:underline hover:bg-sky-900 hover:cursor-pointer"
                    onClick={() => onLeagueSelect(leagueItem.endpoint)}>
                    <div className="text-sm">
                        <p>{leagueItem.id}</p>
                        {/* <p>{leagueItem.leagueName}</p> */}
                    </div>
                </div>
            ))}
        </div>
    )
}