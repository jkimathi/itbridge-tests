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
    public class BookingModel
    {
        public class Model
        {
            [Display(Name = "BookingID")]
            public Guid BookingID { get; set; }

            [Required]
            [Display(Name = "Name")]
            public string Name { get; set; }

            [Required]
            [Display(Name = "Surname")]
            public string Surname { get; set; }

            [Required]
            [Display(Name = "IDNumber")]
            public string IdNumber { get; set; }

            [Required]
            [Display(Name = "Phonenumber")]
            public string Phonenumber { get; set; }

            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [Display(Name = "GenderID")]
            public int GenderID { get; set; }

            [Required]
            [Display(Name = "DateOfBirth")]
            public DateTime DateOfBirth { get; set; }

            [Required]
            [Display(Name = "TitleID")]
            public int TitleID { get; set; }


            [Required]
            [Display(Name = "EventClassID")]
            public Guid EventClassID { get; set; }

            [Display(Name = "PaymentMethodID")]
            public int PaymentMethodID { get; set; }

            [Display(Name = "AmountPaid")]
            public double AmountPaid { get; set; }

            [Display(Name = "ProofOfPaymentLink")]
            public string ProofOfPaymentLink { get; set; }

            [Required]
            [Display(Name = "TicketCode")]
            public int TicketCode { get; set; }

            [Display(Name = "TicketDescription")]
            public string TicketDescription { get; set; }

            [Display(Name = "IsReserved")]
            public bool IsReserved { get; set; }

            [Display(Name = "IsBooked")]
            public bool IsBooked { get; set; }

            [Display(Name = "IsCheckedIn")]
            public bool IsCheckedIn { get; set; }
        }

        public class Model_SubmitReference
        {
            [Required]
            [Display(Name = "Voucher")]
            public string Voucher { get; set; }

            [Required]
            [Display(Name = "Reference")]
            public string Reference { get; set; }
        }

        public static class Methods //: Model
        {
            //connection String
            public static string _connString;

            public static bool Creation(Guid ClientID, string Voucher,  Model model)
            {
                ConstantsModelService constantService = new();
                Guid CreatedBy = ClientID;
                string Reference = Voucher;

                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query<bool>(
                        "SELECT db.fc_booking_creation(@clientID, @name, @surname, @idNumber, @phonenumber, @email, @genderID, " +
                                                    "@dateOfBirth, @titleID, @bookingID, @eventClassID, @paymentMethodID, @voucher, " +
                                                    "@reference, @amountPaid, @proofOfPaymentLink, @ticketCode, @ticketDescription, " +
                                                    "@isReserved, @isBooked, @createdBy, @createdDate)",
                        new
                        {
                            ClientID,
                            model.Name,
                            model.Surname,
                            model.IdNumber,
                            model.Phonenumber,
                            model.Email,
                            model.GenderID,
                            model.DateOfBirth,
                            model.TitleID,

                            model.BookingID,
                            model.EventClassID,
                            constantService.PaymentMethodID,
                            Voucher,
                            Reference,
                            constantService.AmountPaid,
                            constantService.ProofOfPaymentLink,
                            model.TicketCode,
                            constantService.TicketDescription,
                            constantService.IsReserved,
                            constantService.IsBooked,

                            CreatedBy,
                            constantService.CreatedDate
                        },
                        commandType: CommandType.Text
                    ).FirstOrDefault();
                connection.Close();

               return results;
            }

            // update booking and return true if the booking is updated
            public static bool Update(Guid EditedBy, Model model)
            {
                ConstantsModelService constantService = new();

                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_booking_update(@bookingID, @eventClassID, @paymentMethodID, @amountPaid, @proofOfPaymentLink, @ticketDescription," +
                                                  "@isBooked, @isCheckedIn, @editedBy, @editedDate)",
                        new
                        {
                            model.BookingID,
                            model.EventClassID,
                            model.PaymentMethodID,
                            model.AmountPaid,
                            model.ProofOfPaymentLink,
                            model.TicketDescription,

                            model.IsBooked,
                            model.IsCheckedIn,

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

            // update booking and return true if the booking is updated
            public static bool SubmitReference(Model_SubmitReference model)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "CALL db.sp_booking_submit_reference(@voucher, @reference)",
                        new
                        {
                            model.Voucher,
                            model.Reference
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
                        "SELECT * FROM db.fc_booking_List(@eventID)",
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
            public static IEnumerable<object> BookedSeats(Guid EventClassID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_booking_booked_seats(@eventClassID)",
                        new
                        {
                            EventClassID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a specific detail of a booking
            public static object Details(Guid BookingID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_booking_details(@bookingID)",
                        new
                        {
                            BookingID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }

            public static bool IsVoucherExist(string Voucher)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query<bool>(
                        "SELECT * FROM db.fc_does_voucher_exist(@voucher)",
                        new
                        {
                            Voucher
                        },
                        commandType: CommandType.Text
                    ).FirstOrDefault();
                connection.Close();

                return results;
            }
        }
    }
}
