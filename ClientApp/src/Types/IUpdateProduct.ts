export default interface IUpdateProduct {
  ProductID: string;
  SubcategoryID: string;
  Name: string;
  Code: string;
  FromPlace: string;
  ToPlace: string;
  fromAddress: string;
  toAddress: string;
  Descriptions: string;
  isActive: boolean;
  BranchID: string;
  categoryID: string;
  subcategoryID: string;
}
