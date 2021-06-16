//using Grpc.Core;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using static System.Net.Mime.MediaTypeNames;
using System.Web;

namespace ticketing.Services
{
    public static class ImageService
    {
        public static string ReturnImageLing(string name) {

            string imageLink = "";

            //var filePath = Path.Combine(Server.MapPath("~/Images"), "test.jpg");

            //Image image = Image.FromFile(HttpContext.Current.Server.MapPath("~/Content/img/toendra.JPG"));

            //Microsoft.AspNetCore.Hosting.HostingEnvironment.MapPath(path);

            //string pathToFiles = Server.MapPath("/UploadedFiles");
            //var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");

            //https://stackoverflow.com/questions/43992261/how-to-get-absolute-path-in-asp-net-core-alternative-way-for-server-mappath

            var abs = Path.GetFullPath("~/Content/Images/Sample.PNG").Replace("~\\", "");

            return imageLink;
        }
    }
}
