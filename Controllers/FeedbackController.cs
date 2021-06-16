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
    [Route("api/feedback")]
    [ApiController]
    public class FeedbackController : Controller
    {
        public FeedbackController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                FeedbackModel.Methods._connString = Startup.ConnectionString;
            }            
        }

        // POST api/feedback
        [HttpPost]
        public IActionResult PostCreation([FromForm] FeedbackModel.Model model)
        {
         
            Guid createdBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            model.FeedbackID = Guid.NewGuid();

            bool results = FeedbackModel.Methods.Creation(createdBy, model);

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                results
            });
        }

        // PUT api/feedback
        [HttpPut]
        public IActionResult PutUpdate([FromForm] FeedbackModel.Model model)
        {           
            Guid editedBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);

            bool results = FeedbackModel.Methods.Update(editedBy, model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        //GET api/feedback
        [HttpGet]
        public IActionResult GetList()
        {
            IEnumerable<object> list = FeedbackModel.Methods.List();

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{feedbackID}")]
        //public IActionResult GetDetails(Guid feedbackID)
        //{
        //    //Get login feedback
        //    object details = FeedbackModel.Methods.Details(feedbackID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
