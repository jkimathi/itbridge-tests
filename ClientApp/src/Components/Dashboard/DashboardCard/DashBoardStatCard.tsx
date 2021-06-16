import React from 'react';
import '../../../Styles/DashBoardStatCard.scss';
import AssignmentIndSharpIcon from '@material-ui/icons/AssignmentIndSharp';
interface IDashBoardCard {
    icon: any;
    title: string;
    value: number;

}
const DashBoardStatCard = ({ icon, title, value }: IDashBoardCard) => {
    return (
        <div className="DashBoardStatCard">


            <div className="stat-card">

                <div className="stat-value-icon">
                    <div className="stat-icon">
                        {icon}
                    </div>
                    <div className="stat-value">
                        {
                            title === "Outstanding Amount" ?

                                <h2 className="Outstanding-Amount">{value}</h2>

                                :

                                title === "Received Amount" ?
                                    <h2 className="Received-Amount">

                                        {


                                            value}</h2>
                                    :
                                    <h2>{value}</h2>


                        }



                    </div>


                </div>

                <div className="stat-title">
                    <h2>{title}</h2>


                </div>

                {/* <div className="stat-value">

                </div> */}
            </div>




        </div>
    )
}

export default DashBoardStatCard
