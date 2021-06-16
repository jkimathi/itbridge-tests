import React, { useState } from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import '../../Styles/BackToTopButton.scss';

import { animateScroll as scroll } from 'react-scroll';

const BackToTopButton = () => {
    const [backToTopVisibility, setbackToTopVisibility] = useState(false);
    const handlePageScroll = () => {
        if (window.scrollY >= 80) {
            setbackToTopVisibility(true);


        } else {

            setbackToTopVisibility(false);
        }
    };

    window.addEventListener('scroll', handlePageScroll);

    const handleBacToTop = () => {

        scroll.scrollToTop();


    };
    return (
        <div>
            <div className={`BacktoTop  ${backToTopVisibility ? 'showBackToTop' : ''}`}>

                <ArrowUpwardIcon style={{ fontSize: 45 }} className="icon " onClick={handleBacToTop} />

            </div>
        </div>
    )
}

export default BackToTopButton
