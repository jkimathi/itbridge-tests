using Dapper;
using Npgsql;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace ticketing.Models
{
    public class UserModel
    {
        public class Registration_Model
        {           
            [Required]
            [Display(Name = "Name")]
            public string Name { get; set; }

            [Required]
            [Display(Name = "Surname")]
            public string Surname { get; set; }

            [Required]
            [Display(Name = "Password")]
            public string Password { get; set; }

            [Required]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [Display(Name = "Phonenumber")]
            public string Phonenumber { get; set; }

            [Required]
            [Display(Name = "LanguageID")]
            public int LanguageID { get; set; }

            [Required]
            [Display(Name = "CountryID")]
            public int CountryID { get; set; }

            [Required]
            [Display(Name = "BusinessTypeID")]
            public int BusinessTypeID { get; set; }

            [Required]
            [Display(Name = "GenderID")]
            public int GenderID { get; set; }
        }

        public class Creation_Model
        {
            [Required]
            [Display(Name = "Name")]
            public string Name { get; set; }

            [Required]
            [Display(Name = "Surname")]
            public string Surname { get; set; }

            [Required]
            [Display(Name = "Email")]
            public string Email { get; set; }

            [Required]
            [Display(Name = "Phonenumber")]
            public string Phonenumber { get; set; }

            [Required]
            [Display(Name = "LanguageID")]
            public int LanguageID { get; set; }

            [Required]
            [Display(Name = "CountryID")]
            public int CountryID { get; set; }

            [Required]
            [Display(Name = "GenderID")]
            public int GenderID { get; set; }

            [Required]
            [Display(Name = "RoleID")]
            public int RoleID { get; set; }

            [Display(Name = "BranchID")]
            public Guid? BranchID { get; set; }

            [Display(Name = "JobDescription")]
            public string JobDescription { get; set; }
        }
        public class Update_Model
        {
            [Required]
            [Display(Name = "UserID")]
            public Guid UserID { get; set; }

            [Required]
            [Display(Name = "Name")]
            public string Name { get; set; }

            [Required]
            [Display(Name = "Surname")]
            public string Surname { get; set; }

            [Display(Name = "DateOfBirth")]
            public DateTime? DateOfBirth { get; set; }

            [Display(Name = "ImageLink")]
            public string ImageLink { get; set; }

            [Required]
            [Display(Name = "GenderID")]
            public int GenderID { get; set; }

            [Required]
            [Display(Name = "TitleID")]
            public int TitleID { get; set; }

            [Required]
            [Display(Name = "LanguageID")]
            public int LanguageID { get; set; }

            [Required]
            [Display(Name = "CountryID")]
            public int CountryID { get; set; }
        }
    }
}
