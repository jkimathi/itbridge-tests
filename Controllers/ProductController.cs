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
    [Route("api/product")]
    [ApiController]
    public class ProductController : Controller
    {
        public ProductController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                ProductModel.Methods._connString = Startup.ConnectionString;
            }
        }

        // POST api/product
        [HttpPost]
        public IActionResult PostCreation([FromForm] ProductModel.Model model)
        {
            Guid createdBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            model.ProductID = Guid.NewGuid();

            bool results = ProductModel.Methods.Creation(createdBy, model);

            Response.StatusCode = StatusCodes.Status201Created;
            return Json(new
            {
                results
            });
        }

        // PUT api/product
        [HttpPut]
        public IActionResult PutUpdate([FromForm] ProductModel.Model model)
        {
            Guid editedBy = new (@User.Claims.FirstOrDefault(c => c.Type == "userID").Value);
            bool results = ProductModel.Methods.Update(editedBy, model);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                results
            });
        }

        //GET api/product
        [HttpGet]
        public IActionResult GetList()
        {
            Guid companyID = new(HttpContext.Session.GetString("companyID"));

            IEnumerable<object> list = ProductModel.Methods.List(companyID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        //[HttpGet("{productID}")]
        //public IActionResult GetDetails(Guid productID)
        //{
        //    //Get login product
        //    object details = ProductModel.Methods.Details(productID);

        //    Response.StatusCode = StatusCodes.Status200OK;
        //    return Json(new
        //    {
        //        details
        //    });
        //}
    }
}
