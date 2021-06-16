//using Grpc.Core;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using static System.Net.Mime.MediaTypeNames;
using System.Web;
using ticketing.Models;

namespace ticketing.Services
{
    public class WebsiteUrlLinkService
    {
        //
        public static string generateUniqueWebsiteUrlLink (string companyName ) 
        {

            string websiteUrlLink = companyName.ToLower().Replace(" ", "-");

            for (int i=1; i<=11; i++) // loop 11 times, trying to get a websiteUrlLink that is not yet used in the DB
			{

				if ( ! CompanyModel.Methods.IsWebsiteUrlLinkExist(websiteUrlLink)) //check if the websiteUrlLink as been used before in our system
				{
					return websiteUrlLink; // return websiteUrlLink if unique
				}

                if (i == 11) //if we finally can't get a unique url link, we exit with empty string
                {
                    return "";
                }

                if (i > 1)
                {
                    websiteUrlLink = websiteUrlLink.Remove(websiteUrlLink.Length - 1, 1) + i; //Concatinate a number.
                }
                else 
                {
                    websiteUrlLink += "-" + i; //Concatinate a number.
                }
                              
			}

            return websiteUrlLink;
        }
    }
}