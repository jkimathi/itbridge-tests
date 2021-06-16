import React from 'react';
import { Chart } from "react-google-charts";





const ChartUpcomingEventsStats = () => {



    return (
        <div>

            <Chart

                height={'480px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        'Day',


                        'Booked Tickets',
                    ],

                    [new Date(2021, 5, 4), 10],
                    [new Date(2021, 5, 5), 8],
                    [new Date(2021, 5, 6), 5],
                    [new Date(2021, 5, 7), 6],
                    [new Date(2021, 6, 8), 5],
                    [new Date(2021, 6, 9), 6],
                    [new Date(2021, 6, 10), 4],
                    [new Date(2021, 7, 11), 5],
                    [new Date(2021, 8, 1), 18],
                    [new Date(2021, 8, 2), 15],
                    [new Date(2021, 8, 3), 13],
                ]}
                options={{
                    hAxis: {
                        format: 'yyyy',
                    },
                    vAxis: {
                        format: 'short',
                    },
                    title: 'Upcoming event - summary',
                }}

                rootProps={{ 'data-testid': '3' }}
            />

        </div>
    )
}

export default ChartUpcomingEventsStats
