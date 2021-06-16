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

namespace ticketing.Models
{
    public class CompanyPaymentMethodModel
    {
        public class Model
        {
            [Display(Name = "CompanyPaymentMethodID")]
            public Guid CompanyPaymentMethodID { get; set; }

            [Display(Name = "ProductID")]
            public Guid? ProductID { get; set; }

            [Required]
            [Display(Name = "PaymentMethodID")]
            public int PaymentMethodID { get; set; }

            [Required]
            [Display(Name = "Fields")]
            public string Fields { get; set; }
        }

        public static class Methods //: Model
        {
            //connection String
            public static string _connString;
            public static bool Creation(Guid CompanyPaymentMethodID, Guid CompanyID, Guid CreatedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_company_payment_method_creation(@companyPaymentMethodID, @companyID, @productID, @paymentMethodID," +
                                                    "@fields, @createdBy, @createdDate)",
                        new
                        {
                            CompanyPaymentMethodID,
                            CompanyID,
                            model.ProductID,
                            model.PaymentMethodID,
                            model.Fields,
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

            // update class and return true if the class is updated
            public static bool Update(Guid EditedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);

                //int TotalNumberOfTickets = model.TicketsRangedTo - model.TicketsRangedFrom;

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_company_payment_method_update(@companyPaymentMethodID, @fields, @editedBy, @editedDate)",
                        new
                        {
                            model.CompanyPaymentMethodID,
                            model.Fields,
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
            public static IEnumerable<object> List(Guid CompanyID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_company_payment_methods_list(@companyID)",
                        new
                        {
                            CompanyID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;                
            }

            // return a specific detail of a company
            public static object Details(Guid CompanyID, Guid ItemID, int LanguageID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_company_payment_methods_details(@companyID, @itemID, @languageID)",
                        new
                        {
                            CompanyID,
                            ItemID,
                            LanguageID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }
        }
    }
}
