export default interface IEvents {
  availableTickets: number;
  bookedTickets: number;
  branchID: string;
  code: string;
  descriptions: string;
  fromAddress: string;
  isCashPaidToItBridge: boolean;
  itBridgeExpectedCash: number;
  itBridgeReceivedCash: number;

  createdDate: string;
  eventID: string;
  expectedCash: number;
  expensesCash?: number;
  fromDate: string;
  fromHours: string;
  fromPlace: string;
  fromPlace_Name: string;
  isActive: boolean;
  lostCash: number;
  name: string;
  productID: string;
  receivedCash: number;
  subcategoryID: number;
  toDate: string;
  toHours: string;
  toPlace: string;
  toPlace_Name: string;
  totalTickets: number;
  totalExpectedCash: number;
  totalReceivedCash: number;
}
