import React from 'react'
import Chart from 'react-google-charts'
import IPieChartCashSummaryProps from '../../Types/IPieChartCashSummaryProps'





const PieChartCashSummary = ({ companyExpectedCash, companyReceivedCash }: IPieChartCashSummaryProps) => {
    return (
        <div>
            <Chart
                width={'100%'}
                height={'250px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Category', 'Expected revenue'],
                    ['Amount Received ', companyReceivedCash],
                    ['Amount Expected ', companyExpectedCash - companyReceivedCash],

                    // ['Total number of ticket', totalTickets],

                ]}
                options={{
                    title: `Event revenue Summary. Total Expected revenue:  ${new Intl.NumberFormat().format(companyExpectedCash)}`,
                    is3D: true,
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}

export default PieChartCashSummary
