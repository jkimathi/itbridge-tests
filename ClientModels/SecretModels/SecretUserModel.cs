using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using ticketing.ClientModels.Services;
using Npgsql;
using System.ComponentModel.DataAnnotations;
using System.Data;
using static ticketing.Models.UserModel;

namespace ticketing.ClientModels.SecretModels
{
    public class SecretUserModel
    {
        public class Model
        {
            [Required]
            [Display(Name = "UserID")]
            public Guid UserID { get; set; }

            [Required]
            [Display(Name = "Password")]
            public string Password { get; set; }

            [Required]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [Display(Name = "Phonenumber")]
            public string Phonenumber { get; set; }
        }

        public static class Methods //: Model
        {
            //connection String
            public static string _connString;

            // create user and return true if the user is created
            public static bool Registration(Guid UserID, Guid CreatedBy, Registration_Model model)
            {
                ConstantService constantService = new();
                string Username = model.Email;

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_user_registration(@userID, @token, @username, @password, @email, @emailConfirmationCode," +
                                                        "@isEmailConfirmed, @Phonenumber, @phonenumberConfirmationCode, " +
                                                        "@isPhonenumberConfirmed, @haveAccessToSystem, @createdBy," +
                                                        "@createdDate)",
                        new
                        {
                            UserID,
                            constantService.Token,
                            Username,
                            model.Password,
                            model.Email,
                            constantService.EmailConfirmationCode,
                            constantService.IsEmailConfirmed,
                            model.Phonenumber,
                            constantService.PhonenumberConfirmationCode,
                            constantService.IsPhonenumberConfirmed,
                            constantService.HaveAccessToSystem,
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

            public static bool Creation(Guid UserID, Guid CreatedBy, string Password, Creation_Model model)
            {
                ConstantService constantService = new();
                string Username = model.Email;

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_user_creation(@userID, @token, @username, @password, @email, @emailConfirmationCode," +
                                                 "@isEmailConfirmed, @phonenumber, @phonenumberConfirmationCode," +
                                                 "@isPhonenumberConfirmed, @haveAccessToSystem, @givenAccessBy, @givenAccessDate," +
                                                 "@removedAccessBy, @removedAccessDate, @createdBy, @createdDate)",
                        new
                        {
                            UserID,
                            constantService.Token,
                            Username,
                            Password,
                            model.Email,
                            constantService.EmailConfirmationCode,
                            constantService.IsEmailConfirmed,
                            model.Phonenumber,
                            constantService.PhonenumberConfirmationCode,
                            constantService.IsPhonenumberConfirmed,
                            constantService.HaveAccessToSystem,

                            constantService.GivenAccessBy,
                            constantService.GivenAccessDate,
                            constantService.RemovedAccessBy,
                            constantService.RemovedAccessDate,

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

            // update user and return true if the user is updated
            public static bool Update(Guid EditedBy, Model model)
            {
                ConstantService constantService = new();
                string Username = model.Email;

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_user_update(@userID, @token, @username, @password, @email, @emailConfirmationCode," +
                                                "@isEmailConfirmed, @phonenumber, @phonenumberConfirmationCode," +
                                                "@isPhonenumberConfirmed, @haveAccessToSystem, @givenAccessBy, @givenAccessDate," +
                                                "@deactivatedBy, @deactivatedDate, @createdBy, @createdDate)",
                        new
                        {
                            //constantService.UserID,
                            //constantService.Token,
                            //Username,
                            //Password,
                            //model.Email,
                            //constantService.EmailConfirmationCode,
                            //constantService.IsEmailConfirmed,
                            //model.Phonenumber,
                            //constantService.PhonenumberConfirmationCode,
                            //constantService.IsPhonenumberConfirmed,
                            //constantService.HaveAccessToSystem,

                            //constantService.GivenAccessBy,
                            //constantService.GivenAccessDate,
                            //constantService.DeactivatedBy,
                            //constantService.DeactivatedDate,

                            //EditedBy,
                            //constantService.EditedDate
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

            // return a list of all users
            public static IEnumerable<object> List()
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_user_List()",
                        new
                        {

                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a user
            public static object Details(Guid UserID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_user_details(@userID)",
                        new
                        {
                            UserID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }

            public static object ReturnUserGivenUsername(string Username)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_return_user_given_username(@username)",
                        new
                        {
                            Username
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }

            // return a list of all roles
            public static object ReturnUserGivenPhonenumber(string Phonenumber)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_return_user_given_phonenumber(@phonenumber)",
                        new
                        {
                            Phonenumber
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }
        }
    }
}
