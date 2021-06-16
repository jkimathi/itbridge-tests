import React, { useState } from 'react';
import '../../Styles/DashBoard.scss';

import LeftNavigation from '../Navigation/LeftNavigation';
import TopNavigation from '../Navigation/TopNavigation';
import DashBoardStatCard from './DashboardCard/DashBoardStatCard';
import { SvgIconProps } from '@material-ui/core';

import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import GroupIcon from '@material-ui/icons/Group';
import PaymentIcon from '@material-ui/icons/Payment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import BackToTopButton from '../BackToTopButton/BackToTopButton';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../App/hooks';
import { selectNavigationState } from '../../features/navigation/navigationSlice';
import ChartUpcomingEventsStats from '../Charts/ChartUpcomingEventsStats';
interface IDashBoardCard {
    icon: (props: SvgIconProps) => JSX.Element;
    title: string;
    value: number;

}
//TODO: replace this with api data
let dataDashBoardCards: IDashBoardCard[] = [
    {
        icon: ConfirmationNumberIcon,
        title: "Upcoming Events",
        value: 15


    },
    {
        icon: MonetizationOnIcon,
        title: "Expected Amount",
        value: 500


    },
    {
        icon: MonetizationOnIcon,
        title: "Received Amount",
        value: 300


    },
    {
        icon: MonetizationOnIcon,
        title: "Outstanding Amount",
        value: 200


    },
]
const DashBoard = () => {

    const navState = useAppSelector(selectNavigationState);
    let dashBoardStats = dataDashBoardCards.map((stat, key) => {
        return (
            <DashBoardStatCard
                icon={<stat.icon style={{ fontSize: 60 }} className="card-icon" />}
                title={stat.title}
                value={stat.value}
            />
        )
    }

    )
    return (
        <div className="dashboard">


            <div className="dashboard-container">
                <div className={navState ? "page-left-navigation" : "page-left-navigation-hidden"}>
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">

                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="page-content-summary-cards-stats">


                            {
                                dashBoardStats
                            }



                        </div>

                        <div className="chart-stat-container">
                            <div className="chart-stat">
                                <ChartUpcomingEventsStats />
                            </div>
                        </div>
                    </div>

                </div>


            </div>




            <BackToTopButton />
            <Footer />

        </div>




    )
}

export default DashBoard
