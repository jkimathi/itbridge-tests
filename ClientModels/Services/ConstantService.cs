using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ticketing.ClientModels.Services
{
    public class ConstantService
    {
        //user model       
        public Guid UserID = Guid.NewGuid();
        public string Token = "undefined";
        public string EmailConfirmationCode = "undefined";
        public Boolean IsEmailConfirmed = true;
        public string PhonenumberConfirmationCode = "undefined";
        public Boolean IsPhonenumberConfirmed = true;
        public Boolean HaveAccessToSystem = true;

        public Guid? GivenAccessBy = null;
        public DateTime? GivenAccessDate = null;
        public Guid? RemovedAccessBy = null;
        public DateTime? RemovedAccessDate = null;

        public DateTime CreatedDate = DateTime.UtcNow;
        public DateTime? EditedDate = null;

        public bool IsActive = true;
        public Guid? ActivatedBy = null;
        public DateTime? ActivatedDate = DateTime.UtcNow;
        public Guid? DeactivatedBy = null;
        public DateTime? DeactivatedDate = DateTime.UtcNow;
    }
}
