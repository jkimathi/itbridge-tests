using Dapper;
using ticketing.Services;
using Npgsql;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ticketing.Services
{
    public static class FileService
    {
        public static string Upload(string DefaultPath, string folderName, IFormFile SubmitedFile, string newFileName)
        {
            try
            {
                // we can do the resize of the image from the frontend to avoid client sending nbig pictures over the network as it is costy for them
                var file = SubmitedFile;
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, newFileName); // generate a path with a the new file name

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);

                        stream.Close();
                        stream.Dispose();
                        
                        //change file name
                        var newfullPath = Path.Combine(pathToSave, newFileName);
                        File.Move(fullPath, newfullPath, true); // this will overide any existing file with the same name. Reason why update will still work as well.
                    }

                    return dbPath;
                }
                else
                {
                    return DefaultFileList(DefaultPath);
                }
            }
            catch(Exception ex) 
            {
                
                return DefaultFileList(DefaultPath);
            }
        }

        // return a list of all companies
        public static string ReturnFilePath(Guid ItemID, string FileName, string DefaultPath, IFormFile SubmitedFile)
        {

            if (SubmitedFile == null)
            {
                return DefaultFileList(DefaultPath);
            }
            else
            {
                string FolderName = Path.Combine("Files", (DefaultPath + "\\" + ItemID));

                if (!Directory.Exists(FolderName))
                {
                    Directory.CreateDirectory(FolderName);
                }

                return Upload(DefaultPath, FolderName, SubmitedFile, FileName);
            }
        }

        // return a list of all companies
        public static void Delete(string Path)
        {

            try
            {
                File.Delete(Path);
            }
            catch (Exception e)
            { 
           
            }
        }

        public static string DefaultFileList(string DefaultPath)
        {

            string FolderPath = Path.Combine("Files", DefaultPath);
            string[] fileEntries = Directory.GetFiles(FolderPath);

            return fileEntries[0];
        }

        // return a list of all companies
        //public static ArrayList FileList(Guid ItemID, string DefaultPath)
        //{

        //    string myDomain = System.Net.NetworkInformation.IPGlobalProperties.GetIPGlobalProperties().DomainName;


        //    string[] fileEntries;
        //    var files = new ArrayList();

        //    string ItemPath = DefaultPath + "\\" + ItemID;
        //    string FolderName = Path.Combine("Files", ItemPath);

        //    if (!Directory.Exists(FolderName))
        //    {
        //        FolderName = Path.Combine("Files", DefaultPath);
        //        fileEntries = Directory.GetFiles(FolderName);
        //    }
        //    else 
        //    {
        //        fileEntries = Directory.GetFiles(FolderName);
        //    }

        //    foreach (string fileEntry in fileEntries) 
        //    {
        //        files.Add(Download(fileEntry));
        //    }

        //    return files;
        //}

        //public static FileStreamResult Download(string path)  //download function
        //{

        //    var memory = new MemoryStream();
        //    using (var stream = new FileStream(path, FileMode.Open))
        //    {
        //         stream.CopyToAsync(memory);
        //    }

        //    memory.Position = 0;
        //    return File(memory, GetContentType(path), Path.GetFileName(path));
        //}

        //private static string GetContentType(string path)
        //{

        //    var types = GetMimeTypes();
        //    var ext = Path.GetExtension(path).ToLowerInvariant();
        //    return types[ext];
        //}

        //private static Dictionary<string, string> GetMimeTypes()
        //{

        //    return new Dictionary<string, string>
        //    {
        //        {".txt", "text/plain"},
        //        {".pdf", "application/pdf"},
        //        {".doc", "application/vnd.ms-word"},
        //        {".docx", "application/vnd.ms-word"},
        //        {".xls", "application/vnd.ms-excel"},
        //        {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
        //        {".png", "image/png"},
        //        {".PNG", "image/PNG"},
        //        {".jpg", "image/jpg"},
        //        {".JPG", "image/JPG"},
        //        {".jpeg", "image/jpeg"},
        //        {".JPEG", "image/JPEG"},
        //        {".gif", "image/gif"},
        //        {".csv", "text/csv"}
        //    };
        //}
    }
}
