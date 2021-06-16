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
    [Route("api/event")]
    [ApiController]
    public class EventController : Controller
    {
        public EventController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                EventModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // POST api/event
        [HttpPost]
        public IActionResult PostCreation([FromForm] EventModel.Model model)
        {
            Guid createdBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            model.EventID = Guid.NewGuid();

            bool results = EventModel.Methods.Creation(createdBy, model);

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                results
            });
        }

        //// PUT api/event
        //[HttpPut]
        //public IActionResult PutUpdate([FromForm] EventModel.Model model)
        //{
        //    Guid editedBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
        //    bool results = EventModel.Methods.Update(editedBy, model);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        results
        //    });
        //}

        //GET api/event
        [HttpGet]
        public IActionResult GetList()
        {
            Guid companyID = new (HttpContext.Session.GetString("companyID"));
            IEnumerable<object> list = EventModel.Methods.List(companyID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{eventID}")]
        //public IActionResult GetDetails(Guid eventID)
        //{
        //    //Get login event
        //    object details = EventModel.Methods.Details(eventID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
