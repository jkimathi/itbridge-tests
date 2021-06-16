export default interface IBranches {
  activatedBy?: string;
  activatedDate: string;
  branchID: string;
  companyID: string;
  countryID: string;
  createdBy: string;
  createdDate: string;
  deactivatedBy?: string;
  deactivatedDate: string;
  editedBy?: string;
  editedDate?: string;
  email?: string;
  imagesLink?: string;
  isActive?: string;
  isMainBranch: boolean;
  name?: string;
  phonenumber?: string;
  physicalAddress?: string;
}
