import { StaticImageData } from "next/image";
import React from "react";
import { useState, useEffect } from "react";


interface News{
    articles:{
        id: number;
        headline: string;
        description: string;
        published: string;
        lastModified: string;
        images: StaticImageData;
        byline: string;

    }
}

export default function NewsCard({ League }: { League: League }) {
    const [newsList, setNewsList] = useState([]);

    const newsAPI = `http://site.api.espn.com/apis/site/v2/sports/${League}/news`

    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch(newsAPI)
            const newsData = await response.json()
            const newsItem = newsData.item
            setNewsList(newsItem)
        }

        fetchNews()
    })

}