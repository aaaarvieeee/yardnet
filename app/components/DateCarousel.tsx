import React, { ReactElement } from "react";

interface DateProp {
    onDateSelect: (message: string) => void
}

interface DateItem {
    FormattedDate: string
    CleanedDate: string
    Link: string

}

export default function DateCarousel({ onDateSelect }: DateProp): ReactElement {

    const DateArray = getDatesArray()

    return (
        <div className="carousel carousel-center flex flex-row justify-items-center items-center max-w-1/5 overflow-x-auto snap-x snap-mandatory scroll-smooth mask-x-from-70% px-1/3">
            {
                DateArray.map((date) => (
                    <div key={date.CleanedDate}
                        className="carousel-item mx-1">
                        <p onClick={() => onDateSelect(date.Link)}
                            className="hover:underline hover:cursor-pointer text-2xl snap-caenter">
                            {date.FormattedDate}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

function getDatesArray(): DateItem[] {
    try {

        // const getYear = Today.getUTCFullYear()
        // const getMonth = Today.getUTCMonth
        // const getDay = Today.getUTCDay()
        const Today = new Date()
        const DateArray: DateItem[] = []

        //instead of Date(), use it in combination of Intl.DateTimeFormat("en-US").format.(date)
        for (let i = -14; i < 14; i++) {
            const differentDatePlaceholder = new Date(Today)
            differentDatePlaceholder.setDate(Today.getDate() + i)

            const { FormattedDate, CleanedDate, Link } = (transmuteDate({
                DateValue: differentDatePlaceholder
            })
            )

            DateArray.push({ FormattedDate, CleanedDate, Link })
        }

        return DateArray;

    }
    catch (error) {
        throw new Error("error:" + error)
    }
}


// method to format the current date
// takes the parameter, DateValue, and formats it into the en-CA format, "YYYY-MM-DD", splits it by the "-", and turns it back into a string.
// combines the apiEndpointExtension and the cleanDate into a whole string: "?date={cleanDate}"
// params: DateValue | type: Date
// return: Endpoint Extension and Formatted Date | type: string
function transmuteDate({ DateValue }: { DateValue: Date }): DateItem {

    const cleanDatePlaceholder = Intl.DateTimeFormat("en-CA").format(DateValue);
    // returns date in format string: "YYYY-MM-DD"
    const cleanDate = cleanDatePlaceholder
        .split("-")
        .join("")


    const formatDate = Intl.DateTimeFormat("en-CA", {
        dateStyle: "medium"
    }).format(DateValue);
    // returns date in format string: "Nov 10, 2025"



    const apiEndpointExtension = "?dates="
    const link = apiEndpointExtension + cleanDate


    return {
        FormattedDate: formatDate,
        CleanedDate: cleanDate,
        Link: link,
    }
    //     return apiEndpointExtension + cleanDate
}