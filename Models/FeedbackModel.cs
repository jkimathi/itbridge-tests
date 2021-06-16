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
    public class FeedbackModel
    {
        public class Model
        {
            [Display(Name = "FeedbackID")]
            public Guid FeedbackID { get; set; }

            [Required]
            [Display(Name = "CountryID")]
            public int CountryID { get; set; }

            [Display(Name = "CompanyID")]
            public int CompanyID { get; set; }

            [Display(Name = "Name")]
            public string Name { get; set; }

            [Display(Name = "Surname")]
            public string Surname { get; set; }

            [Display(Name = "PhoneNumber")]
            public string PhoneNumber { get; set; }

            [Required]
            [Display(Name = "EmailAddress")]
            public string EmailAddress { get; set; }

            [Required]
            [Display(Name = "Message")]
            public string Message { get; set; }     
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
                        "CALL db.sp_feedback_creation(@feedbackID, @countryID, @companyID, @name, @surname, @phoneNumber, @emailAddress, @message," +
                                                        "@createdBy, @createdDate)",
                        new
                        {
                            model.FeedbackID,
                            model.CountryID,
                            model.CompanyID,
                            model.Name,
                            model.Surname,
                            model.PhoneNumber,
                            model.EmailAddress,
                            model.Message,
                            CreatedBy,
                            constantService.FeedbackCreatedDate
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

            // update feedback and return true if the feedback is updated
            public static bool Update(Guid EditedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_feedback_update(@feedbackID, @countryID, @companyID, @name, @surname, @phoneNumber, @emailAddress, @message)",
                        new
                        {
                            model.FeedbackID,
                            model.CountryID,
                            model.CompanyID,
                            model.Name,
                            model.Surname,
                            model.PhoneNumber,
                            model.EmailAddress,
                            model.Message
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
                        "SELECT * FROM db.fc_feedback_List()",
                        new
                        {

                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a feedback
            public static object Details(Guid FeedbackID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_feedback_details(@feedbackID)",
                        new
                        {
                            FeedbackID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }
        }
    }
}
