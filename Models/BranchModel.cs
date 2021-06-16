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
    public class BranchModel
    {
        public class Model
        {
            [Display(Name = "BranchID")]
            public Guid BranchID { get; set; }

            [Required]
            [Display(Name = "Name")]
            public string Name { get; set; }

            //[Display(Name = "CompanyID")]
            //public Guid CompanyID { get; set; }

            [Display(Name = "IsMainBranch")]
            public bool IsMainBranch { get; set; }

            [Display(Name = "CountryID")]
            public int CountryID { get; set; }

            [Display(Name = "Phonenumber")]
            public string Phonenumber { get; set; }

            [Required]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [Display(Name = "PhysicalAddress")]
            public string PhysicalAddress { get; set; }
        }

        public static class Methods //: Model
        {
            //connection String
            public static string _connString;
            public static bool Creation(Guid createdBy, Guid companyID, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_branch_creation(@branchID, @name, @companyID, @isMainBranch, @countryID, @phonenumber, @email, @isActive," +
                                                    "@activatedBy, @activatedDate, @deactivatedBy, @deactivatedDate," +
                                                    "@physicalAddress, @imagesLink, @createdBy, @createdDate)",
                        new
                        {
                            model.BranchID,
                            model.Name,
                            companyID,
                            model.IsMainBranch,
                            model.CountryID,
                            model.Phonenumber,
                            model.Email,
                            constantService.IsActive,
                            constantService.ActivatedBy,
                            constantService.ActivatedDate,
                            constantService.DeactivatedBy,
                            constantService.DeactivatedDate,
                            model.PhysicalAddress,
                            constantService.ImagesLink,

                            createdBy,
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

            // update branch and return true if the branch is updated
            public static bool Update(Guid EditedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);                

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_branch_update(@branchID, @name, @isMainBranch, @countryID, @phonenumber, @email, " +
                                                 "@physicalAddress, @EditedBy, @EditedDate)",
                        new
                        {
                            model.BranchID,
                            model.Name,
                            model.IsMainBranch,
                            model.CountryID,
                            model.Phonenumber,
                            model.Email,
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
            public static IEnumerable<object> List(Guid CompanyID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_branch_List(@companyID)",
                        new
                        {
                            CompanyID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a branch
            public static object Details(Guid BranchID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_branch_details(@branchID)",
                        new
                        {
                            BranchID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }
        }
    }
}
