﻿//using Grpc.Core;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using static System.Net.Mime.MediaTypeNames;
using System.Web;
using ticketing.Models;
using System.Threading.Tasks;
//using MimeKit;

namespace ticketing.Services
{
    public static class EmailService
    { 
		public static string SendEmail(int length)
		{

			//https://codewithmukesh.com/blog/send-emails-with-aspnet-core/
			//https://www.infoworld.com/article/3534690/how-to-send-emails-in-aspnet-core.html

			return "";
		}
	}


    //public async Task SendEmailAsync(MailRequest mailRequest)
    //{
    //    var email = new MimeMessage();
    //    email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
    //    email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
    //    email.Subject = mailRequest.Subject;
    //    var builder = new BodyBuilder();
    //    if (mailRequest.Attachments != null)
    //    {
    //        byte[] fileBytes;
    //        foreach (var file in mailRequest.Attachments)
    //        {
    //            if (file.Length > 0)
    //            {
    //                using (var ms = new MemoryStream())
    //                {
    //                    file.CopyTo(ms);
    //                    fileBytes = ms.ToArray();
    //                }
    //                builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
    //            }
    //        }
    //    }
    //    builder.HtmlBody = mailRequest.Body;
    //    email.Body = builder.ToMessageBody();
    //    using var smtp = new SmtpClient();
    //    smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
    //    smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
    //    await smtp.SendAsync(email);
    //    smtp.Disconnect(true);
    //}
}