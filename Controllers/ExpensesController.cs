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
    [Route("api/expenses")]
    [ApiController]
    public class ExpensesController : Controller
    {
        public ExpensesController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                ExpensesModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // POST api/expense
        [HttpPost]
        public IActionResult PostCreation([FromForm] ExpensesModel.Model model)
        {
           
            Guid createdBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            model.ExpensesID = Guid.NewGuid();

            bool results = ExpensesModel.Methods.Creation(createdBy, model);

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                results
            });
        }

        // PUT api/expense
        [HttpPut]
        public IActionResult PutUpdate([FromForm] ExpensesModel.Model model)
        {          
            Guid editedBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);

            bool results = ExpensesModel.Methods.Update(editedBy, model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        //GET api/expense
        [HttpGet("list/{eventID}")]
        public IActionResult GetList(Guid eventID)
        {
            IEnumerable<object> list = ExpensesModel.Methods.List(eventID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{expensesID}")]
        //public IActionResult GetDetails(Guid expensesID)
        //{
        //    //Get login expense
        //    object details = ExpensesModel.Methods.Details(expensesID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
