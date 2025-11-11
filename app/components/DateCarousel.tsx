import React, { ReactElement } from "react";

interface DateProp {
    onDateSelect: (message: string) => void
}

export default function DateCarousel({ onDateSelect }: DateProp): ReactElement {

    const DateArray = getDatesArray()

    return (
        <div className="CarouselWrapper  p-3 flex flex-row justify-items-center border-2 items-center mx-10">
            {
                DateArray.map((date) => (
                    <div key={date}>
                        <p onClick={() => onDateSelect(date)}
                            className="hover:underline hover:cursor-pointer"
                        >
                           {date}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

function getDatesArray(): string[] {
    try {

        // const getYear = Today.getUTCFullYear()
        // const getMonth = Today.getUTCMonth
        // const getDay = Today.getUTCDay()
        const Today = new Date()
        const DateArray: string[] = []

        //instead of Date(), use it in combination of Intl.DateTimeFormat("en-US").format.(date)
        for (let i = -5; i < 5; i++) {
            const differentDatePlaceholder = new Date(Today)
            differentDatePlaceholder.setDate(Today.getDate() + i)
            const DateDetails = transmuteDate({ DateValue: differentDatePlaceholder })
            DateArray.push(DateDetails)
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
function transmuteDate({ DateValue }: { DateValue: Date }): string {
    const datePlaceholder = Intl.DateTimeFormat("en-CA").format(DateValue);
    const apiEndpointExtension = "?dates="
    // returns date in format string: "YYYY-MM-DD"

    const cleanDate = datePlaceholder
        .split("-")
        .join("")

    return apiEndpointExtension + cleanDate
}