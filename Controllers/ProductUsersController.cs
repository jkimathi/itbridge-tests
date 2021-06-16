using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ticketing.Models;
using Microsoft.AspNetCore.Authorization;
using ticketing.Services;
using Microsoft.AspNetCore.Http;

namespace ticketing.Controllers
{
    [Authorize]
    [Route("api/productUsers")]
    [ApiController]
    public class ProductUsersController : Controller
    {
        public ProductUsersController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                ProductUsersModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // POST api/productUsers
        [HttpPost]
        public IActionResult PostCreation([FromForm] ProductUsersModel.Model model)
        {          
            Guid createdBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);

            bool results = ProductUsersModel.Methods.Creation(createdBy, model);

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                results
            });
        }

        // PUT api/productUsers
        [HttpPut]
        public IActionResult PutUpdate([FromForm] ProductUsersModel.Model model)
        {           
            Guid editedBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);

            bool results = ProductUsersModel.Methods.Update(editedBy, model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        //GET api/productUsers
        [HttpGet]
        public IActionResult GetList()
        {
            IEnumerable<object> list = ProductUsersModel.Methods.List();

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{productUsersID}")]
        //public IActionResult GetDetails(Guid productUsersID)
        //{
        //    //Get login productUsers
        //    object details = ProductUsersModel.Methods.Details(productUsersID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
