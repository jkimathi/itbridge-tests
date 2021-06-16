using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ticketing.Models;
using Microsoft.AspNetCore.Authorization;
using ticketing.Services;
using Microsoft.AspNetCore.Http;
using ticketing.ClientModels.SecretModels;

namespace ticketing.Controllers
{
    [Authorize]
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        public UserController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                UserMethodsModel.Methods._connString = Startup.ConnectionString;
                SecretUserModel.Methods._connString = Startup.ConnectionString_Secret;
            }
        }

        // POST api/user
        [HttpPost]
        public IActionResult PostCreation([FromForm] UserModel.Creation_Model model)
        {
            string defaultPassword = "1234";
            string password = PasswordService.Encrypt(defaultPassword);
            Guid userID = Guid.NewGuid();
            Guid createdBy = new(@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            int businessTypeID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "businessTypeID").Value);

            Guid companyID = new(HttpContext.Session.GetString("companyID"));
            bool created = false;

            bool isCreated = SecretUserModel.Methods.Creation(userID, createdBy, password, model);
            
            if (isCreated)
            {
                bool createdInTicketing = UserMethodsModel.Methods.Creation(userID, createdBy, businessTypeID, companyID, model);

                if (!createdInTicketing)
                {
                    //delete the created secret user because it didn't create in ticketing database;

                    Response.StatusCode = StatusCodes.Status500InternalServerError;
                    return Json(new
                    {
                        created
                    });
                }

                created = true;
            }

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                created
            });
        }

        // PUT api/user
        [HttpPut]
        public IActionResult PutUpdate([FromForm] UserModel.Update_Model model)
        {

            Guid editedBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            bool results = UserMethodsModel.Methods.Update(editedBy, model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        //GET api/user
        [HttpGet]
        public IActionResult GetList()
        {

            Guid companyID = new(HttpContext.Session.GetString("companyID"));

            IEnumerable<object> list = UserMethodsModel.Methods.List(companyID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        /*// GET api/user/details
        [HttpGet("details")]
        public IActionResult GetDetails()
        {
            //Get login user
            Guid userID = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            return UserModel.Methods.Details(userID);
        }*/

        //[HttpGet("{userID}")]
        //public IActionResult GetDetails(Guid userID)
        //{
        //    //Get login user
        //    object details = UserModel.Methods.Details(userID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
