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
    [Route("api/class")]
    [ApiController]
    public class ClassController : Controller
    {
        public ClassController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                ClassModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // POST api/class
        [HttpPost]
        public IActionResult PostCreation([FromForm] ClassModel.Model model)
        {           
            Guid createdBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            model.ClassID = Guid.NewGuid();

            bool results = ClassModel.Methods.Creation(createdBy, model);

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                results
            });
        }

        // PUT api/class
        [HttpPut]
        public IActionResult PutUpdate([FromForm] ClassModel.Model model)
        {           
            Guid editedBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);

            bool results = ClassModel.Methods.Update(editedBy, model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        //GET api/class
        [HttpGet("list/{productID}")]
        public IActionResult GetList(Guid productID)
        {
            IEnumerable<object> list = ClassModel.Methods.List(productID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{classID}")]
        //public IActionResult GetDetails(Guid classID)
        //{
        //    //Get login class
        //    object details = ClassModel.Methods.Details(classID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
