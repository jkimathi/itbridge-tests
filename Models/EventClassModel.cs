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
    public class EventClassModel
    {
        public class Model
        {
            [Display(Name = "EventClassID")]
            public Guid EventClassID { get; set; }

            [Display(Name = "ProductID")]
            public Guid ProductID { get; set; }

            [Display(Name = "EventID")]
            public Guid EventID { get; set; }

            [Display(Name = "Code")]
            public string Code { get; set; }

            [Display(Name = "Price")]
            public double Price { get; set; }

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


            [Display(Name = "TicketsRangedFrom")]
            public int TicketsRangedFrom { get; set; }

            [Required]
            [Display(Name = "TicketsRangedTo")]
            public int TicketsRangedTo { get; set; }

            //[Required]
            //[Display(Name = "TotalNumberOfTickets")]
            //public int TotalNumberOfTickets { get; set; }

            [Display(Name = "Descriptions")]
            public string Descriptions { get; set; }
        }

        public class Model_Search
        {

            [Display(Name = "CompanyCode")]
            public string CompanyCode { get; set; }

            [Required]
            [Display(Name = "FromPlace")]
            public Guid? FromPlace { get; set; }

            [Required]
            [Display(Name = "ToPlace")]
            public Guid? ToPlace { get; set; }

            [Display(Name = "FromDate")]
            public DateTime? FromDate { get; set; }
        }

        public static class Methods //: Model
        {
            //connection String
            public static string _connString;
            public static bool Creation(Guid CreatedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);
                
                int TotalNumberOfTickets = model.TicketsRangedTo - model.TicketsRangedFrom;
                int AvailableNumberOfTickets = TotalNumberOfTickets;

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_event_classes_creation(@productID, @eventID, @createdBy, @createdDate)",
                        new
                        {
                            model.ProductID,
                            model.EventID,
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
                
                int TotalNumberOfTickets = model.TicketsRangedTo - model.TicketsRangedFrom;

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_event_classes_update(@eventClassID, @code, @price, @fromPlace, @toPlace, @fromAddress, @toAddress," +
                                                        "@ticketsRangedFrom, @ticketsRangedTo, @totalNumberOfTickets, @descriptions," +
                                                        "@editedBy, @editedDate)",
                        new
                        {
                            model.EventClassID,
                            model.Code,
                            model.Price,
                            model.FromPlace,
                            model.ToPlace,
                            model.FromAddress,
                            model.ToAddress,
                            model.TicketsRangedFrom,
                            model.TicketsRangedTo,
                            TotalNumberOfTickets,
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

            public static IEnumerable<object> SearchEventClasses(Model_Search model)
            {
                return List(model.CompanyCode, model.FromPlace, model.ToPlace, model.FromDate);
            }

            // return a list of all companies
            public static IEnumerable<object> List(Guid EventID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_event_classes_List(@eventID)",
                        new
                        {
                            EventID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a list of all companies
            public static IEnumerable<object> List(string CompanyCode, Guid? FromPlace, Guid? ToPlace, DateTime? FromDate)
            {

                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_search_event_classes(@companyCode, @fromPlace, @toPlace, @fromDate)",
                        new
                        {
                            CompanyCode,
                            FromPlace,
                            ToPlace,
                            FromDate
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a class
            public static object Details(Guid EventClassID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_event_classes_details(@eventClassID)",
                        new
                        {
                            EventClassID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }

            // return a list of all companies
            public static IEnumerable<object> payment_methods(Guid EventClassID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_event_classes_payment_methods(@eventClassID)",
                        new
                        {
                            EventClassID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }
        }
    }
}
