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
    [Route("api/event_class")]
    [ApiController]
    public class EventClassController : Controller
    {
        public EventClassController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                EventClassModel.Methods._connString = Startup.ConnectionString;
            }
        }

        //// POST api/eventClass
        //[HttpPost]
        //public IActionResult PostCreation([FromForm] EventClassModel.Model model)
        //{
        //    Guid createdBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
        //    model.EventClassID = Guid.NewGuid();

        //    bool results = EventClassModel.Methods.Creation(createdBy, model);

        //    Response.StatusCode = StatusCodes.Status201Created;
        //    return Json(new
        //    {
        //        results
        //    });
        //}

        //// PUT api/eventClass
        //[HttpPut]
        //public IActionResult PutUpdate([FromForm] EventClassModel.Model model)
        //{
        //    Guid editedBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
        //    bool results = EventClassModel.Methods.Update(editedBy, model);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        results
        //    });
        //}

        //GET api/eventClass
        [HttpGet("{eventID}")]
        public IActionResult GetList(Guid eventID)
        {
            //Guid companyID = new Guid(HttpContext.Session.GetString("companyID"));

            IEnumerable<object> list = EventClassModel.Methods.List(eventID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{eventClassID}")]
        //public IActionResult GetDetails(Guid eventClassID)
        //{
        //    //Get login eventClass
        //    object details = EventClassModel.Methods.Details(eventClassID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
