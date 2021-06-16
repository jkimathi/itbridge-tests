import React from 'react'
import Chart from 'react-google-charts'
import IPieChartTicketsSummaryProps from '../../Types/IPieChartTicketsSummaryProps'




const PieChartTicketsSummary = ({ availableTickets, bookedTickets, totalTickets }: IPieChartTicketsSummaryProps) => {
    return (
        <div>
            <Chart
                width={'100%'}
                height={'250px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Category', 'Number of tickets'],
                    ['Total available Ticket', availableTickets],
                    ['Total  Booked Ticket', bookedTickets],
                    // ['Total number of ticket', totalTickets],

                ]}
                options={{
                    title: `Event ticket Summary. Total number of ticket: ${new Intl.NumberFormat().format(totalTickets)}`,
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}

export default PieChartTicketsSummary
