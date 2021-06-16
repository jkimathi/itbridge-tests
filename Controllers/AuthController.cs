using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ticketing.Services;
using ticketing.Models;
using ticketing.ClientModels.SecretModels;
using Microsoft.AspNetCore.Http;
using System.Collections;

namespace ticketing.Controllers
{  
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {

        private string defaultCompanyImagesPath = "companies\\images";
        public AuthController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                //secret models
                SecretUserModel.Methods._connString = Startup.ConnectionString_Secret;
                SecretLoginModel.Methods._connString = Startup.ConnectionString_Secret;

                //ticketing models
                UserMethodsModel.Methods._connString = Startup.ConnectionString;
                MstModel.Methods._connString = Startup.ConnectionString;
                BookingModel.Methods._connString = Startup.ConnectionString;
                ClassModel.Methods._connString = Startup.ConnectionString;
                EventClassModel.Methods._connString = Startup.ConnectionString;
                CompanyModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // POST api/User
        [HttpPost("registration")]
        public IActionResult PostRegistration([FromForm] UserModel.Registration_Model model)
        {
            model.Password = PasswordService.Encrypt(model.Password);
            Guid createdBy = Guid.NewGuid();
            bool registered = false;

            bool isRegistered = SecretUserModel.Methods.Registration(createdBy, createdBy, model);            

            if (isRegistered)
            {
                bool createdInTicketing = UserMethodsModel.Methods.Registration(createdBy, createdBy, model);

                if (!createdInTicketing) 
                {
                    //delete the created secret user because it didn't create in ticketing database;

                    Response.StatusCode = StatusCodes.Status500InternalServerError;
                    return Json(new
                    {
                        registered
                    });
                }

                registered = true;
            }

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                registered
            });
        }

        // PUT api/branch
        [HttpPut("submit/reference")]
        public IActionResult SubmitReference([FromForm] BookingModel.Model_SubmitReference model)
        {
            bool results = BookingModel.Methods.SubmitReference(model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        // POST api/User
        [HttpPost("login")]
        public IActionResult PostLogin([FromForm] SecretLoginModel.Model model)
        {
            string token = "";

            //Encrypt the key
            model.Password = PasswordService.Encrypt(model.Password);
            dynamic secret = SecretLoginModel.Methods.Login(model);

            //Login the user in
            if (secret != null) {

                //Get user details from the database
                dynamic userDetails = UserMethodsModel.Methods.Details(secret.userID);
           
                if (userDetails != null)
                {
                    token = TokenService.Token(secret, userDetails);
                    string companyID = userDetails.companyID.ToString();

                    //Set sessions
                    HttpContext.Session.SetString("companyID", companyID);

                    //Getting the first and default company
                    object DefaultCompanyDetails = CompanyModel.Methods.Details(userDetails.companyID);

                    //Get bussiness_type specific data
                    Dictionary<string, string> BusinessData = DynamicUI_Service.RetuturnUI("Hotel");

                    Response.StatusCode = StatusCodes.Status200OK;
                    return Json(new
                    {
                        secret,
                        userDetails,
                        DefaultCompanyDetails,
                        BusinessData,
                        token
                    });
                }
            }

            Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Json(new
            {
               token
            });
        }

        // POST api/booking
        [HttpPost("booking")]
        public IActionResult PostCreation([FromForm] BookingModel.Model model)
        {

           //generate the voucher
            string Voucher = VoucherService.GenerateUniqueVoucher(Constants_DB_Service.Voucher);

            if (Voucher.Length > 3) //if voucher exist
            {
                model.BookingID = Guid.NewGuid();
                Guid ClientID = Guid.NewGuid();

                bool results = BookingModel.Methods.Creation(ClientID, Voucher, model);

                // check if booking was created successfully
                if (results)
                {
                    Response.StatusCode = StatusCodes.Status201Created;
                    return Json(new
                    {
                        Voucher
                    });
                }
                else 
                {
                    Voucher = "";
                    Response.StatusCode = StatusCodes.Status409Conflict;
                    return Json(new
                    {
                        Voucher
                    });
                }
            }
            else 
            {
                //if voucher was not successfully created
                Response.StatusCode = StatusCodes.Status409Conflict;
                return Json(new
                {
                    Voucher
                });
            }
        }

        //GET api/class
        [HttpGet("company/{companyCode}")]
        public IActionResult CompanyDetails(string companyCode)
        {

            var companyDetails = CompanyModel.Methods.Details(companyCode.ToLower());
            var EventsClasses = EventClassModel.Methods.List(companyCode.ToLower(), null, null, null);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                companyDetails,
                EventsClasses
            });
        }

        // GET api/mst/languages
        [HttpGet("languages")]
        public IActionResult GetLanguagesList()
        {
            IEnumerable<object> languages = MstModel.Methods.LanguagesList();

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                languages
            });
        }

        // GET api/mst/languages
        [HttpGet("provinces/{countryID}")]
        public IActionResult GetProvincesList(int countryID)
        {
            IEnumerable<object> provinces = MstModel.Methods.ProvincesList(countryID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                provinces
            });
        }

        // GET api/mst/languages
        [HttpGet("cities/{provinceID}")]
        public IActionResult GetCitiesList(Guid provinceID)
        {
            IEnumerable<object> cities = MstModel.Methods.CitiesList(provinceID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                cities
            });
        }

        // GET api/mst/role
        [HttpGet("countries")]
        public IActionResult GetCountriesList()
        {
            //Get login user
            //int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);

            IEnumerable<object> countries = MstModel.Methods.CountriesList();

             Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                countries
            });
        }

        // GET api/mst/role
        [HttpGet("countries/{languageID}")]
        public IActionResult GetCountriesList(int languageID)
        {
            //Get login user
            //int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);

            IEnumerable<object> countries = MstModel.Methods.CountriesList(languageID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                countries
            });
        }

        // GET api/mst/role
        [HttpGet("return/secret_user/given/username/{username}")]
        public IActionResult Return_secret_user_given_username(string username)
        {
            //Get login user
            //int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);
            
            object user = SecretUserModel.Methods.ReturnUserGivenUsername(username);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                user
            });
        }

        // GET api/mst/role
        [HttpGet("return/secret_user/given/phonenumber/{phonenumber}")]
        public IActionResult ReturnSecretUserGivenPhonenumber(string phonenumber)
        {
            //Get login user
            //int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);

            object user = SecretUserModel.Methods.ReturnUserGivenPhonenumber(phonenumber);
            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                user
            });
        }

        //// GET api/mst/role
        //[HttpGet("return/country/given/iso3/{country_iso3}")]
        //public IActionResult ReturnCountryGivenIso3(string country_iso3)
        //{
        //    //Get login user
        //    //int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);

        //    object country = MstModel.Methods.ReturnCountryGivenIso3(country_iso3);
        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        country
        //    });
        //}

        // GET api/mst/genders
        [HttpGet("genders/{languageID}")]
        public IActionResult GetGendersList(int languageID)
        {
            //Get login user
            //int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);

            IEnumerable<object> genders = MstModel.Methods.GendersList(languageID);
            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                genders
            });
        }

        // GET api/mst/genders
        [HttpGet("search/cities/{name}")]
        public IActionResult MstSearchCities(string Name)
        {
            IEnumerable<object> cities = MstModel.Methods.MstSearchCities(Name);
            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                cities
            });
        }

        // GET api/mst/genders
        [HttpGet("cities")]
        public IActionResult CitiesListAll()
        {
            IEnumerable<object> cities = MstModel.Methods.CitiesListAll();
            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                cities
            });
        }

        // POST api/class
        [HttpPost("search/events/classes")]
        public IActionResult SearchEventClasses([FromForm] EventClassModel.Model_Search model)
        {
            IEnumerable<object> eventClasses = EventClassModel.Methods.SearchEventClasses(model);

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                eventClasses
            });
        }

        // GET api/mst/genders
        [HttpGet("booked/seats/{EventClassID}")]
        public IActionResult BookedSeats(Guid EventClassID)
        {
            IEnumerable<object> booked_seats = BookingModel.Methods.BookedSeats(EventClassID);
            IEnumerable<object> payment_methods = EventClassModel.Methods.payment_methods(EventClassID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                booked_seats,
                payment_methods
            });
        }

        // GET api/mst/titles
        [HttpGet("titles/{languageID}")]
        public IActionResult GetTitlesList(int languageID)
        {
            IEnumerable<object> list = MstModel.Methods.TitlesList(languageID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        // GET api/mst/categories
        [HttpGet("categories/{languageID}")]
        public IActionResult GetCategoriesList(int languageID)
        {
            //Get login user
            IEnumerable<object> list = MstModel.Methods.CategoriesList(languageID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }
    }
}
