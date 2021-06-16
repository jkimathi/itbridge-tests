export default interface ICompanyDetails {
  owner_userID: string;
  owner_token: string;
  owner_name: string;
  owner_surname: string;
  owner_dateOfBirth: string;
  owner_imageLink: string;
  owner_genderID: string;
  owner_titleID: string;
  owner_languageID: string;
  owner_countryID: string;
  owner_createdBy: string;
  owner_createdDate: string;
  company_companyID: string;
  company_name: string;
  company_uniqueCode: string;
  company_phonenumber: string;
  company_email: string;
  company_isPremium: boolean;
  company_isPaymentOnProductLevel: boolean;
  company_isActive: boolean;
  company_activatedBy: string;
  company_activatedDate: string;
  company_deactivatedBy: string;
  company_deactivatedDate: string;
  company_websiteUrlLink: string;
  company_advertMessage: string;
  company_imagesLink: string;
  company_documentsLink: string;
  company_physicalAddress: string;
  company_createdBy: string;
  company_createdDate: string;
  company_editedBy: string;
  editedDate: string;
  companies_customerPortalImagePath: string;
  companies_logoPath:string;
}
