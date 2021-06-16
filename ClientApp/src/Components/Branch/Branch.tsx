import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/Branch.scss";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PageviewIcon from "@material-ui/icons/Pageview";
import IBranches from "../../Types/IBranches";

const Branch = ({
    branchID,
    companyID,
    countryID,
    email,
    isMainBranch,
    name,
    phonenumber,
    physicalAddress,
}: IBranches) => {
    return (
        <div className="branch-card">
            <div className="branch-name">
                <h2>
                    Branch name: <span>{name}</span>
                </h2>
            </div>
            <div className="branch-phone-number">
                <h2>
                    Phone number: <span>{phonenumber}</span>
                </h2>
            </div>

            <div className="branch-email">
                <h2>
                    Branch email: <span>{email}</span>
                </h2>
            </div>
            <div className="branch-physicalAddress">
                <h2>
                    Physical Address: <span>{physicalAddress}</span>
                </h2>
            </div>
            <div className="branch-status">
                {isMainBranch
                    ? <h2>
                        Branch type: <span> Main Branch</span>
                    </h2>
                    : <h2>
                        Branch type: <span>Not a Main Branch</span>
                    </h2>}
            </div>

            <div className="branch-action-status">
                <div className="branch-action-view">
                    <Link to={`/branches/view/${branchID}`}>
                        <PageviewIcon
                            className="icon-branch-action"
                            style={{ fontSize: 20 }}
                        />View
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default Branch;
