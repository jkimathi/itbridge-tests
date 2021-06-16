using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ticketing.Models;
using Microsoft.AspNetCore.Authorization;
using ticketing.Services;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Net.Http.Headers;

namespace ticketing.Controllers
{
    [Authorize]
    [Route("api/company")]
    [ApiController]
    public class CompanyController : BaseController
    {
        public CompanyController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                CompanyModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // POST api/company
        [HttpPost]
        public IActionResult PostCreation([FromForm] CompanyModel.Model model)
        {
                        
            int countryID = Convert.ToInt32(@User.Claims.FirstOrDefault(c => c.Type == "countryID").Value); //used for the first branch
            Guid createdBy = new(@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            model.CompanyID = Guid.NewGuid();

            //Get the Domaine
            //string domaine = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            
            bool results = CompanyModel.Methods.Creation(createdBy, countryID, model);

            //caching companyID
            //https://stackoverflow.com/questions/41505612/memory-cache-in-dotnet-core

            //session
            HttpContext.Session.SetString("companyID", model.CompanyID.ToString());

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                results
            });
        }

        // PUT api/company
        [HttpPut]
        public IActionResult PutUpdate([FromForm] CompanyModel.Model model)
        {
            Guid editedBy = new(@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);

            //Get the Domaine
            //string domaine = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";

            bool results = CompanyModel.Methods.Update(editedBy, model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        //GET api/company
        [HttpGet]
        public IActionResult GetList()
        {
            Guid userID = new(@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            IEnumerable<object> list = CompanyModel.Methods.List(userID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{companyID}")]
        //public IActionResult GetDetails(Guid companyID)
        //{
        //    //Get login company
        //    Guid userID = new(@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
        //    object details = CompanyModel.Methods.Details(companyID, userID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}

        [HttpGet("set/current/company/{companyID}")]
        public IActionResult SetCurrentCompany(Guid companyID)
        {
            //Set sessions
            //string OldCompany = HttpContext.Session.GetString("companyID");
            HttpContext.Session.SetString("companyID", companyID.ToString());
            bool response = true;

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                response
            });
        }
    }
}
