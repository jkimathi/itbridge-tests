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
    public class EventModel
    {
        public class Model
        {
            [Display(Name = "EventID")]
            public Guid EventID { get; set; }

            [Required]
            [Display(Name = "ProductID")]
            public Guid ProductID { get; set; }

            [Required]
            [Display(Name = "Code")]
            public string Code { get; set; }

            [Required]
            [Display(Name = "FromPlace")]
            public Guid FromPlace { get; set; }

            [Required]
            [Display(Name = "ToPlace")]
            public Guid ToPlace { get; set; }

            [Required]
            [Display(Name = "FromAddress")]
            public string FromAddress { get; set; }

            [Required]
            [Display(Name = "ToAddress")]
            public string ToAddress { get; set; }

            [Required]
            [Display(Name = "FromDate")]
            public DateTime FromDate { get; set; }

            [Required]
            [Display(Name = "ToDate")]
            public DateTime ToDate { get; set; }

            [Required]
            [Display(Name = "FromHours")]
            public string FromHours { get; set; }

            [Required]
            [Display(Name = "ToHours")]
            public string ToHours { get; set; }

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

                //string FromHours = (model.FromHours).ToString(@"hh\:mm");
                //string ToHours = (model.ToHours).ToString(@"hh\:mm");

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_event_creation(@eventID, @productID, @branchID, @name, @code, @fromPlace, @toPlace," +
                                                  "@fromAddress, @toAddress, @fromDate, @toDate, @fromHours, @toHours, @isActive, @activatedBy, @activatedDate," +
                                                  "@deactivatedBy, @deactivatedDate, @descriptions, @createdBy, @createdDate)",
                        new
                        {
                            model.EventID,
                            model.ProductID,
                            constantService.BranchID,
                            constantService.Name,
                            model.Code,
                            model.FromPlace,
                            model.ToPlace,
                            model.FromAddress,
                            model.ToAddress,
                            model.FromDate,
                            model.ToDate,
                            model.FromHours,
                            model.ToHours,
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

            // update event and return true if the event is updated
            public static bool Update(Guid editedBy, Model model)
            {
                ConstantsModelService constantService = new();

                //string FromHours = (model.FromHours).ToString(@"hh\:mm");
                //string ToHours = (model.ToHours).ToString(@"hh\:mm");

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_event_update(@eventID, @code, @fromPlace, @toPlace, @fromAddress, @toAddress, @fromDate, @toDate, " +
                                                "@fromHours, @toHours, @descriptions, @editedBy, @editedDate)",
                        new
                        {
                            model.EventID,
                            model.Code,
                            model.FromPlace,
                            model.ToPlace,
                            model.FromAddress,
                            model.ToAddress,
                            model.FromDate,
                            model.ToDate,
                            model.FromHours,
                            model.ToHours,
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
                        "SELECT * FROM db.fc_event_List(@companyID)",
                        new
                        {
                            CompanyID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a event
            public static object Details(Guid EventID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_event_details(@eventID)",
                        new
                        {
                            EventID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }
        }
    }
}
