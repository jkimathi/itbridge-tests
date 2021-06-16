export default interface IResultCardProps {
  fromPlaceName: string;
  toPlaceName: string;
  departureTime: string;
  departureDate: string;
  eventPrice: number;
  company_imagesLink: string;

  eventClasses_availableNumberOfTickets: number;
  eventClasses_code: string;
  eventClasses_totalPrice: number;
  eventClasses_eventClassID: string;
  company_name: string;
  company_websiteUrlLink: string;
}
