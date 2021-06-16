import { useState, useEffect } from "react";
import "../../Styles/Branches.scss";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import LeftNavigation from "../Navigation/LeftNavigation";
import TopNavigation from "../Navigation/TopNavigation";
import axiosInstance from "../../Api/Api";
import IBranches from "../../Types/IBranches";
import { GridLoader } from "react-spinners";
import BlockIcon from "@material-ui/icons/Block";
import Branch from "./Branch";
import BackToTopButton from "../BackToTopButton/BackToTopButton";
import Footer from "../Footer/Footer";
import { useAppSelector } from "../../App/hooks";
import { selectNavigationState } from "../../features/navigation/navigationSlice";

const Branches = () => {
    const [stateBranches, setstateBranches] = useState<IBranches[]>([]);

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageEmpty, setIsPageEmpty] = useState(false);

    const navState = useAppSelector(selectNavigationState);

    //load Branches
    useEffect(() => {
        const config = {
            headers: { Authorization: sessionStorage.getItem("token") },
        };

        axiosInstance
            .get("branch", config)
            .then(response => {
                setIsPageLoading(false);

                if (response.data.list.length) {
                    setstateBranches(response.data.list);

                    sessionStorage.setItem(
                        "branchList",
                        JSON.stringify(response.data.list)
                    );
                } else {
                    setIsPageEmpty(true);
                }
            })
            .catch(error => {
                setIsPageLoading(false);
            });
    }, []);

    const listBranches = stateBranches.map(branch => {
        return (
            <Branch
                branchID={branch.branchID}
                companyID={branch.companyID}
                countryID={branch.countryID}
                email={branch.email}
                isMainBranch={branch.isMainBranch}
                name={branch.name}
                phonenumber={branch.phonenumber}
                physicalAddress={branch.physicalAddress}
                activatedDate={branch.activatedDate}
                createdBy={branch.createdBy}
                createdDate={branch.createdDate}
                deactivatedDate={branch.deactivatedDate}
            />
        );
    });
    return (
        <div className="branches">
            <div className="branches-container">
                <div
                    className={
                        navState ? "page-left-navigation" : "page-left-navigation-hidden"
                    }
                >
                    <LeftNavigation />
                </div>

                <div className="page-top-right-navigation-page-content">
                    <div className="top-right-navigation">
                        <TopNavigation />
                    </div>
                    <div className="page-content">
                        <div className="branches">
                            <div className="branches-container">
                                <div className="branches-container-header">
                                    <h1 className="page-header-branches">Companie's Branches</h1>
                                    <Link className="link-create-branch" to="/branches/new">
                                        {" "}<AddIcon
                                            className="icon-add-branch"
                                            style={{ fontSize: 18 }}
                                        />Create branch
                                    </Link>
                                </div>
                                {isPageLoading
                                    ? <div className="loader-branches">
                                        <GridLoader size={20} margin="2" color="#0078d4" />
                                    </div>
                                    : <div className="branches-list">
                                        {isPageEmpty
                                            ? <div className="container-no-branch-found">
                                                <div className="container-no-branch-found-icon">
                                                    <BlockIcon style={{ fontSize: 70 }} />
                                                </div>
                                                <div className="container-no-branch-found-text">
                                                    <h2>
                                                        {" "}You do not have any branches at the moment
                                                    </h2>

                                                    <Link
                                                        className="link-create-branch"
                                                        to="/branches/new"
                                                    >
                                                        {" "}<AddIcon
                                                            className="icon-add-company"
                                                            style={{ fontSize: 18 }}
                                                        />Create branch
                                                    </Link>
                                                </div>
                                            </div>
                                            : listBranches

                                            // {
                                            //     listCompanies
                                            // }
                                        }
                                        {/* {
                listCompanies ? listCompanies : 'You do not have any companies at the moment'
            } */}
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BackToTopButton />
            <Footer />
        </div>
    );
};

export default Branches;
