export default interface IProduct {
  branchID: string;
  branchesEmail: string;
  branchesName: string;
  branchesPhonenumber: string;
  code: string;
  createdBy: string;
  createdDate: string;

  deactivatedDate: string;
  descriptions: string;
  // fromPlace: string;
  // fromPlace_Name: string;

  // toPlace: string;
  // toPlace_Name: string;

  isActive: boolean;
  name: string;
  ProductID: string;
  subcategoryID: number;
  productID: string;
  //TODO: remove duplicate productID
}
