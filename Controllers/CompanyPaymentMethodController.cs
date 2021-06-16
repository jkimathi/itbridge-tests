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
    [Route("api/company_payment_method")]
    [ApiController]
    public class CompanyPaymentMethodController : Controller
    {
        public CompanyPaymentMethodController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                CompanyPaymentMethodModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // POST api/company
        [HttpPost]
        public IActionResult PostCreation([FromForm] CompanyPaymentMethodModel.Model model)
        {
            Guid companyPaymentMethodID = Guid.NewGuid();
            Guid companyID = new(HttpContext.Session.GetString("companyID"));
            Guid createdBy = new(@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);

            bool results = CompanyPaymentMethodModel.Methods.Creation(companyPaymentMethodID, companyID, createdBy, model);

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                results
            });
        }

        // PUT api/class
        [HttpPut]
        public IActionResult PutUpdate([FromForm] CompanyPaymentMethodModel.Model model)
        {
            Guid editedBy = new(@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);

            bool results = CompanyPaymentMethodModel.Methods.Update(editedBy, model);

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
            Guid companyID = new(HttpContext.Session.GetString("companyID"));
            IEnumerable<object> list = CompanyPaymentMethodModel.Methods.List(companyID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        [HttpGet("{itemID}")]
        public IActionResult GetDetails(Guid itemID)
        {
            //Get login company
            Guid companyID = new(HttpContext.Session.GetString("companyID"));
            int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);
            object details = CompanyPaymentMethodModel.Methods.Details(companyID, itemID, languageID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                details
            });
        }
    }
}
