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
    [Route("api/branch")]
    [ApiController]
    public class BranchController : Controller
    {
        public BranchController(/*string connString*/)
        {

            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                BranchModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // POST api/branch
        [HttpPost]
        public IActionResult PostCreation([FromForm] BranchModel.Model model)
        {
           
            Guid createdBy = new(@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            model.BranchID = Guid.NewGuid();
            Guid companyID = new(HttpContext.Session.GetString("companyID"));

            bool results = BranchModel.Methods.Creation(createdBy, companyID, model);

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                results
            });
        }

        // PUT api/branch
        [HttpPut]
        public IActionResult PutUpdate([FromForm] BranchModel.Model model)
        {
           
            Guid editedBy = new(@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);

            bool results = BranchModel.Methods.Update(editedBy, model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        //GET api/branch
        [HttpGet]
        public IActionResult GetList()
        {

            Guid companyID = new(HttpContext.Session.GetString("companyID"));

            IEnumerable<object> list = BranchModel.Methods.List(companyID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{branchID}")]
        //public IActionResult GetDetails(Guid branchID)
        //{

        //    //Get login branch
        //    object details = BranchModel.Methods.Details(branchID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
