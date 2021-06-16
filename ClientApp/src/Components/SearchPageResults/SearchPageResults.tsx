import React from 'react';
import '../../Styles/SearchPageResults.scss';
import ISearchResultPageProps from '../../Types/ISearchResultPageProps';
import ResultCard from './ResulCard/ResultCard';



const SearchPageResults = ({ companys_events_data }: ISearchResultPageProps) => {


    const resultData = companys_events_data.map(event => {

        return (
            <ResultCard
                fromPlaceName={event.eventClasses_fromPlaceName}
                toPlaceName={event.eventClasses_toPlaceName}
                departureTime={event.event_fromHours}
                departureDate={event.event_fromDate}
                eventPrice={event.eventClasses_price}
                eventClasses_availableNumberOfTickets={event.eventClasses_availableNumberOfTickets}
                company_imagesLink={event.company_imagesLink}
                eventClasses_code={event.eventClasses_code}
                eventClasses_totalPrice={event.eventClasses_totalPrice}
                eventClasses_eventClassID={event.eventClasses_eventClassID}
                company_name={event.company_name}
                company_websiteUrlLink={event.company_websiteUrlLink}

            />
        )

    });
    return (
        <div className="search-page-results">
            <div className="search-page-results-container">
                <div className="container">
                    <div className="search-result">
                        {resultData}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPageResults
