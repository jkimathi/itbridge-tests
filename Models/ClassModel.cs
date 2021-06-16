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
    public class ClassModel
    {
        public class Model
        {
            [Display(Name = "ClassID")]
            public Guid ClassID { get; set; }

            [Required]
            [Display(Name = "ProductID")]
            public Guid ProductID { get; set; }

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

            [Display(Name = "Name")]
            public string Name { get; set; }

            [Display(Name = "Code")]
            public string Code { get; set; }

            [Display(Name = "Price")]
            public double Price { get; set; }

            [Display(Name = "TicketsRangedFrom")]
            public int TicketsRangedFrom { get; set; }

            [Required]
            [Display(Name = "TicketsRangedTo")]
            public int TicketsRangedTo { get; set; }

            [Required]
            [Display(Name = "TotalNumberOfTickets")]
            public int TotalNumberOfTickets { get; set; }

            [Required]
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
                
                //int TotalNumberOfTickets = model.TicketsRangedTo - model.TicketsRangedFrom;
                //int AvailableNumberOfTickets = TotalNumberOfTickets;

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_class_creation(@classID, @productID, @name, @code, @price, @fromPlace, @toPlace," +
                                                  "@fromAddress, @toAddress, @fromDate, @toDate, @fromHours, @toHours," +
                                                  "@ticketsRangedFrom, @ticketsRangedTo, @totalNumberOfTickets," +
                                                  "@isActive, @activatedBy, @activatedDate, @deactivatedBy, @deactivatedDate, @descriptions, @createdBy," +
                                                  "@createdDate)",
                        new
                        {
                            model.ClassID,
                            model.ProductID,
                            model.Name,
                            model.Code,
                            model.Price,
                            model.FromPlace,
                            model.ToPlace,
                            model.FromAddress,
                            model.ToAddress,
                            model.FromDate,
                            model.ToDate,
                            model.FromHours,
                            model.ToHours,
                            model.TicketsRangedFrom,
                            model.TicketsRangedTo,
                            model.TotalNumberOfTickets,
                            constantService.IsActive,
                            constantService.ActivatedBy,
                            constantService.ActivatedDate,
                            constantService.DeactivatedBy,
                            constantService.DeactivatedDate,
                            model.Descriptions,
                            CreatedBy, constantService.CreatedDate
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
                        "CALL db.sp_class_update(@classID, @name, @code, @price, @fromPlace, @toPlace, @fromAddress, @toAddress," +
                                                "@ticketsRangedFrom, @ticketsRangedTo, @totalNumberOfTickets," +
                                                "@descriptions, @editedBy, @editedDate)",
                        new
                        {
                            model.ClassID,
                            model.Name,
                            model.Code,
                            model.Price,
                            model.FromPlace,
                            model.ToPlace,
                            model.FromAddress,
                            model.ToAddress,
                            model.TicketsRangedFrom,
                            model.TicketsRangedTo,
                            model.TotalNumberOfTickets,
                            model.Descriptions,
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
            public static IEnumerable<object> List(Guid ProductID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_class_List(@productID)",
                        new
                        {
                            ProductID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a class
            public static object Details(Guid ClassID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_class_details(@classID)",
                        new
                        {
                            ClassID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }
        }
    }
}
