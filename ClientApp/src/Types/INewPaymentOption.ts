export default interface INewPaymentOption {
  ProductID: string;
  PaymentMethodID: number;
  Fields: string;
  phoneNumber: string;
  ReferenceNumber: string;
  BankName: string;
  BranchCode: string;
  AccountNumber: string;
  CardName: string;
  CardNumber: string;
}
