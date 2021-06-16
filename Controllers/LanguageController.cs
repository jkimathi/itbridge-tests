using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Threading.Tasks;

namespace ticketing.Controllers
{

    // https://codewithmukesh.com/blog/globalization-and-localization-in-aspnet-core/

    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : Controller
    {
        private readonly IStringLocalizer<LanguageController> _localizer;
        public LanguageController(IStringLocalizer<LanguageController> localizer)
        {
            _localizer = localizer;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var guid = Guid.NewGuid();
            return Ok(_localizer["Language"].Value);
        }
    }
}