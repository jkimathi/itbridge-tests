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

namespace ticketing.ClientModels.SecretModels
{
    public class SecretLoginModel
    {
        public class Model
        {
            [Required]
            [Display(Name = "Username")]
            public string Username { get; set; }

            [Required]
            [Display(Name = "Password")]
            public string Password { get; set; }
        }

        public class Methods: Model
        {
            //connection String
            public static string _connString;
           
            // return a specific detail of a user
            public static object Login(Model model)
            {
                using var connection = new NpgsqlConnection(_connString);
               
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_user_login(@username, @password)",
                        new
                        {
                            model.Username,
                            model.Password
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();
            }
        }
    }
}
