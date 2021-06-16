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
    public class ExpensesModel
    {
        public class Model
        {
            [Display(Name = "ExpensesID")]
            public Guid ExpensesID { get; set; }

            [Required]
            [Display(Name = "EventID")]
            public Guid EventID { get; set; }

            [Display(Name = "Amount")]
            public double Amount { get; set; }

            [Display(Name = "SpentOn")]
            public string SpentOn { get; set; }    
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
                        "CALL db.sp_expense_creation(@expensesID, @eventID, @amount, @spentOn," +
                                                    "@createdBy, @createdDate)",
                        new
                        {
                            model.ExpensesID,
                            model.EventID,
                            model.Amount,
                            model.SpentOn,
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

            // update expense and return true if the expense is updated
            public static bool Update(Guid EditedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_expense_update(@expensesID, @amount, @spentOn," +
                                                    "@editedBy, @editedDate)",
                        new
                        {
                            model.ExpensesID,
                            model.Amount,
                            model.SpentOn,
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
            public static IEnumerable<object> List(Guid EventID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_expense_List(@eventID)",
                        new
                        {
                            EventID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a expense
            public static object Details(Guid ExpensesID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_expense_details(@expensesID)",
                        new
                        {
                            ExpensesID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }
        }
    }
}
