using Dapper;
using ticketing.Services;
using Npgsql;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ticketing.Models
{
    public class MstModel
    {
        public class Model
        {
            
        }

        public class Methods: Model
        {
            //connection String
            public static string _connString;

            // return a list of all roles
            public static IEnumerable<object> LanguagesList()
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_languages_list()",
                        new
                        {
                               
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;                
            }

            public static IEnumerable<object> CitiesList(Guid ProvinceID )
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_cities_list(@provinceID)",
                        new
                        {
                            ProvinceID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            public static IEnumerable<object> CitiesListAll()
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_cities_list_all()",
                        new
                        {
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            public static IEnumerable<object> ProvincesList(int CountryID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_provinces_list(@countryID)",
                        new
                        {
                            CountryID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            public static IEnumerable<object> GendersList(int LanguageID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_genders_list(@languageID)",
                        new
                        {
                            LanguageID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;                
            }

            // return a list of all roles
            public static IEnumerable<object> TitlesList(int LanguageID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_titles_list(@languageID)",
                        new
                        {
                            LanguageID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;                
            }

            // return a list of all roles
            public static IEnumerable<object> CategoriesList(int LanguageID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_categories_list(@languageID)",
                        new
                        {
                            LanguageID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a list of all roles
            public static IEnumerable<object> SubcategoriesList(int CategoryID, int LanguageID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_subcategories_list(@categoryID, @languageID)",
                        new
                        {
                            CategoryID,
                            LanguageID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a list of all roles
            public static IEnumerable<object> RolesList(int LanguageID)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_roles_list(@languageID)",
                        new
                        {
                            LanguageID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a list of all roles
            public static IEnumerable<object> CountriesList(int LanguageID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_countries_list(@languageID)",
                        new
                        {
                            LanguageID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a list of all roles
            public static IEnumerable<object>PaymentMethodsList(int LanguageID)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_payment_methods_list(@languageID)",
                        new
                        {
                            LanguageID
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            // return a list of all roles
            public static IEnumerable<object> CountriesList()
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_countries_list()",
                        new
                        {                               
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }

            public static object ReturnCountryGivenIso3(string CountryIso3)
            {
                using var connection = new NpgsqlConnection(_connString);
                
                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_return_country_given_iso3(@countryIso3)",
                        new
                        {
                            CountryIso3
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results.FirstOrDefault();                
            }

            public static IEnumerable<object> MstSearchCities(string Name)
            {
                using var connection = new NpgsqlConnection(_connString);

                connection.Open();
                var results = connection.Query(
                        "SELECT * FROM db.fc_mst_search_cities(@name)",
                        new
                        {
                            Name
                        },
                        commandType: CommandType.Text
                    );
                connection.Close();

                return results;
            }
        }
    }
}
