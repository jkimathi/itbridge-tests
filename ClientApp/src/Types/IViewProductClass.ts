export default interface IViewProductClass {
  classes_classID: string;
  classes_code: string;

  classes_descriptions: string;

  classes_fromAddress: string;
  classes_fromPlace: string;
  classes_fromPlaceName: string;
  classes_isActive: boolean;
  classes_name: string;
  classes_price: number;
  classes_productID: string;
  classes_ticketsRangedFrom: number;
  classes_ticketsRangedTo: number;
  classes_toAddress: string;
  classes_toPlace: string;
  classes_toPlaceName: string;
  classes_totalNumberOfTickets: number;

  products_branchID: string;
  products_code: string;

  products_descriptions: string;

  products_fromAddress: string;
  products_fromPlace: string;
  products_isActive: boolean;
  products_name: string;
  products_productID: string;
  products_subcategoryID: number;
  products_toAddress: string;
  products_toPlace: string;
}
