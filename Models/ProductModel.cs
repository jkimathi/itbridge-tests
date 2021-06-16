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
    public class ProductModel
    {
        public class Model
        {
            [Display(Name = "ProductID")]
            public Guid ProductID { get; set; }

            [Required]
            [Display(Name = "BranchID")]
            public Guid BranchID { get; set; }

            [Required]
            [Display(Name = "Name")]
            public string Name { get; set; }

            [Required]
            [Display(Name = "Code")]
            public string Code { get; set; }

            [Display(Name = "Descriptions")]
            public string Descriptions { get; set; }
        }

        public static class Methods //: Model
        {
            //connection String
            public static string _connString;
            public static bool Creation(Guid CreatedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_product_creation(@productID, @branchID, @name, @code, @fromPlace, @toPlace, " +
                                                    "@fromAddress, @toAddress, @isActive," +
                                                    "@activatedBy, @activatedDate, @deactivatedBy, @deactivatedDate," +
                                                    "@descriptions, @createdBy, @createdDate)",
                        new
                        {
                            model.ProductID,
                            model.BranchID,
                            model.Name,
                            model.Code,
                            constantService.FromPlace,
                            constantService.ToPlace,
                            constantService.FromAddress,
                            constantService.ToAddress,
                            constantService.IsActive,
                            constantService.ActivatedBy,
                            constantService.ActivatedDate,
                            constantService.DeactivatedBy,
                            constantService.DeactivatedDate,
                            model.Descriptions,
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

            // update product and return true if the product is updated
            public static bool Update(Guid editedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_product_update(@productID, @name, @code, @fromPlace, @toPlace, " +
                                                  "@fromAddress, @toAddress, @descriptions, @editedBy, @editedDate)",
                        new
                        {
                            model.ProductID,
                            model.Name,
                            model.Code,
                            constantService.FromPlace,
                            constantService.ToPlace,
                            constantService.FromAddress,
                            constantService.ToAddress,
                            model.Descriptions,
                            editedBy,
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
                        "SELECT * FROM db.fc_product_List(@companyID)",
                        new
                        {
                            CompanyID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a product
            public static object Details(Guid ProductID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_product_details(@productID)",
                        new
                        {
                            ProductID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }
        }
    }
}
