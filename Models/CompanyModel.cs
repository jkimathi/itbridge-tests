using Dapper;
using ticketing.Services;
using Npgsql;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace ticketing.Models
{
    public class CompanyModel
    {
        public class Model
        {
            [Display(Name = "CompanyID")]
            public Guid CompanyID { get; set; }

            [Required]
            [Display(Name = "Name")]
            public string Name { get; set; }

            [Required]
            [Display(Name = "Phonenumber")]
            public string Phonenumber { get; set; }

            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [Display(Name = "IsPaymentOnProductLevel")]
            public bool IsPaymentOnProductLevel { get; set; }

            [Display(Name = "AdvertMessage")]
            public string AdvertMessage { get; set; }

            [Required]
            [Display(Name = "PhysicalAddress")]
            public string PhysicalAddress { get; set; }

            [Display(Name = "Logo")]
            public IFormFile Logo { get; set; }

            [Display(Name = "CustomerPortalImage")]
            public IFormFile CustomerPortalImage  { get; set; }
        }

        public static class Methods //: Model
        {
            //connection String
            public static string _connString;
            private const string defaultLogoPath = "companies\\images\\logo";
            private const string defaultCustomerPortalPath = "companies\\images\\customerPortal";
            private const string defaultContractPath = "companies\\documents\\contract";

            public static bool Creation(Guid CreatedBy, int CountryID, Model model)
            {
                ConstantsModelService constantService = new();
                int roleID = Constants_DB_Service.Super_Admin;

                //generate the websiteUrlLink
                string websiteUrlLink = WebsiteUrlLinkService.generateUniqueWebsiteUrlLink(model.Name);

                //save images and return url
                string logoPath = FileService.ReturnFilePath(model.CompanyID, "logo.jpg", defaultLogoPath, model.Logo);
                string customerPortalImagePath = FileService.ReturnFilePath(model.CompanyID, "customerPortal.jpg", defaultCustomerPortalPath, model.CustomerPortalImage);

                using var connection = new NpgsqlConnection(_connString);

                if (websiteUrlLink != "")
                {
                    connection.Open();
                    var results = connection.Query(
                        "CALL db.sp_company_creation(@companyID, @name, @phonenumber, @email, @isPremium, @isPaymentOnProductLevel, @isActive, @activatedBy," +
                                                    "@activatedDate, @deactivatedBy, @deactivatedDate, @websiteUrlLink, @advertMessage, @logoPath, @customerPortalImagePath, @documentsLink," +
                                                    "@physicalAddress, @countryID, @roleID, @createdBy, @createdDate)",
                        new
                        {
                            model.CompanyID,
                            model.Name,
                            model.Phonenumber,
                            model.Email,
                            constantService.IsPremium,
                            model.IsPaymentOnProductLevel,
                            constantService.IsActive,
                            constantService.ActivatedBy,
                            constantService.ActivatedDate,
                            constantService.DeactivatedBy,
                            constantService.DeactivatedDate,

                            websiteUrlLink,

                            model.AdvertMessage,
                            logoPath,
                            customerPortalImagePath,
                            constantService.DocumentsLink,
                            model.PhysicalAddress,
                            CountryID,
                            roleID,
                            CreatedBy,
                            constantService.CreatedDate
                        },
                        commandType: CommandType.Text
                    );
                    connection.Close();

                    if (!results.Any())
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }
                else
                {
                    return false;
                }
            }

            // update company and return true if the company is updated
            public static bool Update(Guid EditedBy, Model model)
            {
                ConstantsModelService constantService = new();
             
                //save images and return url
                string logoPath = FileService.ReturnFilePath(model.CompanyID, "logo.jpg", defaultLogoPath, model.Logo);
                string customerPortalImagePath = FileService.ReturnFilePath(model.CompanyID, "customerPortal.jpg", defaultCustomerPortalPath, model.CustomerPortalImage);

                using var connection = new NpgsqlConnection(_connString);                

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_company_update(@companyID, @name, @phoneNumber, @email," +
                                                    "@advertMessage, @logoPath, @customerPortalImagePath, @physicalAddress, @editedBy, @editedDate)",
                        new
                        {
                            model.CompanyID,
                            model.Name,
                            model.Phonenumber,
                            model.Email,
                            model.AdvertMessage,
                            logoPath,
                            customerPortalImagePath,
                            model.PhysicalAddress,
                            EditedBy,
                            constantService.EditedDate
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                if (!results.Any())
                {
                    return true;
                }
                else
                {
                    return false;
                }                
            }

            // return a list of all companies
            public static IEnumerable<object> List(Guid UserID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_company_List(@userID)",
                        new
                        {
                            UserID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;                
            }

            // return a specific detail of a company
            public static object Details(Guid CompanyID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_company_details(@companyID)",
                        new
                        {
                            CompanyID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }

            // return a specific detail of a company
            public static object Details(Guid CompanyID, Guid UserID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_company_details(@companyID, @UserID)",
                        new
                        {
                            CompanyID,
                            UserID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }

            // return a specific detail of a company
            public static object Details(string CompanyCode)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_company_details(@companyCode)",
                        new
                        {
                            CompanyCode
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();                
            }

            public static bool IsWebsiteUrlLinkExist(string websiteUrlLink) 
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query<bool>(
                        "SELECT * FROM db.fc_does_website_url_link_exist(@websiteUrlLink)",
                        new
                        {
                            websiteUrlLink
                        },
                        commandType: CommandType.Text
                    ).FirstOrDefault();
                connection.Close();
                
                return results;
            }
        }
    }
}
