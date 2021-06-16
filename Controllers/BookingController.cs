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
    [Route("api/booking")]
    [ApiController]
    public class BookingController : Controller
    {
        public BookingController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                BookingModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // PUT api/booking
        [HttpPut]
        public IActionResult PutUpdate([FromForm] BookingModel.Model model)
        {
            Guid editedBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            bool results = BookingModel.Methods.Update(editedBy, model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        //GET api/booking
        [HttpGet("list/{productID}")]
        public IActionResult GetList(Guid productID)
        {
            IEnumerable<object> list = BookingModel.Methods.List(productID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{bookingID}")]
        //public IActionResult GetDetails(Guid bookingID)
        //{
        //    //Get login booking
        //    object details = BookingModel.Methods.Details(bookingID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
