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
    public class BaseController : Controller
    {
        public BaseController() 
        {

        }

    }
}
