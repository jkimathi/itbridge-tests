using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ticketing.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace ticketing.Controllers
{
    [Authorize]
    [Route("api/mst")]
    [ApiController]
    public class MstController : Controller
    {
        //IHostingEnvironment
        //IWebHostEnvironment

        public MstController(/*string connString*/)
        {
            //providing the connection string to the methods
            string connString = null;
            if (connString == null || connString == "")
            {
                MstModel.Methods._connString = Startup.ConnectionString;
            }
            
        }

        // GET api/mst/categories
        [HttpGet("payment_methods")]
        public IActionResult GetPaymentMethodsList()
        {
            //Get login user
            int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);
            IEnumerable<object> list = MstModel.Methods.PaymentMethodsList(languageID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        // GET api/mst/subcategories
        [HttpGet("subcategories/{categoryID}")]
        public IActionResult GetSubcategoriesList(int categoryID)
        {
            //Get login user
            int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);
            IEnumerable<object> list = MstModel.Methods.SubcategoriesList(categoryID, languageID);

            Response.StatusCode = StatusCodes.Status200OK;
            return Json(new
            {
                list
            });
        }

        // GET api/mst/roles
        [HttpGet("roles")]
        public IActionResult GetRolesList()
        {
            //Get login user
            int languageID = Int16.Parse(@User.Claims.FirstOrDefault(c => c.Type == "languageID").Value);
            IEnumerable<object> list = MstModel.Methods.RolesList(languageID);

            Response.StatusCode = StatusCodes.Status200OK;            
            return Json(new
            {
                list
            });
        }
    }
}
