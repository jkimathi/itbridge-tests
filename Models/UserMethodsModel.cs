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
using static ticketing.Models.UserModel;

namespace ticketing.Models
{
    public class UserMethodsModel
    {
        public class Model
        {
          
        }

        public static class Methods //: Model
        {
            //connection String
            public static string _connString;

            // create user and return true if the user is created
            public static bool Registration(Guid UserID, Guid CreatedBy, Registration_Model model)
            {
                ConstantsModelService constantService = new();
               
                using var connection = new NpgsqlConnection(_connString);
                    
                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_user_registration(@userID, @token, @name, @surname, @dateOfBirth, @imageLink, @businessTypeID, @genderID, " +
                                                      "@titleID, @languageID, @countryID, @createdBy, @createdDate)",
                        new {
                                UserID, constantService.Token, model.Name, model.Surname,                                    
                                constantService.DateOfBirth,
                                constantService.ImageLink, model.BusinessTypeID,
                                model.GenderID, constantService.TitleID, model.LanguageID,
                                model.CountryID, CreatedBy, constantService.CreatedDate
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

            public static bool Creation(Guid UserID, Guid CreatedBy, int businessTypeID, Guid? CompanyID, Creation_Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_user_creation(@userID, @token, @name, @surname, @dateOfBirth, @imageLink, @businessTypeID, @genderID, " +
                                                  "@titleID, @languageID, @countryID, @companyID, @roleID, @branchID, " +
                                                  "@haveAccessToSystem, @givenAccessBy, @givenAccessDate," +
                                                  "@removedAccessBy, @removedAccessDate, @jobDescription, @createdBy, @createdDate)",
                        new
                        {
                            UserID,
                            constantService.Token,
                            model.Name,
                            model.Surname,
                            constantService.DateOfBirth,
                            constantService.ImageLink,
                            businessTypeID,
                            model.GenderID,
                            constantService.TitleID,
                            model.LanguageID,
                            model.CountryID,

                            CompanyID,
                            model.RoleID,
                            model.BranchID,

                            constantService.HaveAccessToSystem,
                            constantService.GivenAccessBy,
                            constantService.GivenAccessDate,
                            constantService.RemovedAccessBy,
                            constantService.RemovedAccessDate,

                            model.JobDescription,
                            CreatedBy,
                            constantService.CreatedDate,
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
            public static bool Update(Guid EditedBy, Update_Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_user_update(@userID, @name, @surname, @dateOfBirth, @imageLink, @genderID, " +
                                               "@titleID, @languageID, @countryID, @editedBy, @editedDate)",
                        new
                        {
                            model.UserID,
                            model.Name,
                            model.Surname,
                            model.DateOfBirth,
                            model.ImageLink,
                            model.GenderID,
                            model.TitleID,
                            model.LanguageID,
                            model.CountryID,
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

            // return a list of all users
            public static IEnumerable<object> List(Guid CompanyID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_user_List(@companyID)",
                        new
                        {
                            CompanyID
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
        }
    }
}
