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
    public class ProductUsersModel
    {
        public class Model
        {
            [Required]
            [Display(Name = "ProductID")]
            public string ProductID { get; set; }

            [Display(Name = "UserID")]
            public string UserID { get; set; }
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
                        "CALL db.sp_product_users_creation(@productID, @userID, @createdBy, @createdDate)",
                        new
                        {
                            model.ProductID, model.UserID,
                            CreatedBy, constantService.ProductUsersCreatedDate,                                
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

            // update productUsers and return true if the productUsers is updated
            public static bool Update(Guid editedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_product_users_update(@productID, @userID, @createdBy, @createdDate)",
                        new
                        {
                            model.ProductID, model.UserID                               
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
            public static IEnumerable<object> List()
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_product_users_List()",
                        new
                        {

                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a productUsers
            public static object Details(Guid ProductUsersID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_product_users_details(@productUsersID)",
                        new
                        {
                            ProductUsersID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }
        }
    }
}
