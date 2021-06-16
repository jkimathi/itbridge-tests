using System;

namespace ticketing.Services
{
    public class ConstantsModelService
    {

        //user model       
        public Guid UserID = Guid.NewGuid();
        public Guid? CompanyID = null;
        public Guid? DepartmentID = null;
        public string Token = "undefined";
        public string UniqueNumber = "undefined";
        public string EmailConfirmationCode = "undefined";
        public Boolean IsEmailConfirmed = false;
        public string JobDescription = "undefined";
        public DateTime? DateOfBirth = null;
        public Boolean HaveAccessToSystem = true;

        public Guid? GivenAccessBy = null;
        public DateTime? GivenAccessDate = null;
        public Guid? RemovedAccessBy = null;
        public DateTime? RemovedAccessDate = null;

        public string ImageLink = "undefined";
        public int? GenderID = null;
        public int? TitleID = null;
        public string PhoneNumberConfirmationCode = "undefined";
        public Boolean IsPhoneNumberConfirmed = true;
        public DateTime CreatedDate = DateTime.UtcNow;
        public DateTime? EditedDate = DateTime.UtcNow;

        //company model
        public bool IsPremium = false;
        public bool IsActive = true;
        public Guid? ActivatedBy = null;
        public DateTime? ActivatedDate = DateTime.UtcNow;
        public Guid? DeactivatedBy = null;
        public DateTime? DeactivatedDate = DateTime.UtcNow;
        public string ImagesLink = "undefined";
        public string DocumentsLink = "undefined";

        // branch model
        public Guid BranchID = Guid.NewGuid();
        public bool BranchIsActive = true;
        public bool IsMainBranch = false;
        public string BranchImageLink = "undefined";

        //public Guid? BranchCreatedBy = null;
        public DateTime BranchCreatedDate = DateTime.UtcNow;
        //public Guid? BranchEditedBy = null;
        public DateTime? BranchEditedDate = null;

        // feedback model
        public Guid FeedbackID = Guid.NewGuid();

        //public Guid? FeedbackCreatedBy = null;
        public DateTime FeedbackCreatedDate = DateTime.UtcNow;

        // product model
        //public Guid ProductID = Guid.NewGuid();
        public int GeneralTotalNumber = 0;
        public int GeneralAvailableTotalNumber = 0;
        public int GeneralBookedTotalNumber = 0;
        public bool IsCancelled = false;

        //public Guid? ProductCreatedBy = null;
        public DateTime ProductCreatedDate = DateTime.UtcNow;
        //public Guid? ProductEditedBy = null;
        public DateTime? ProductEditedDate = null;

        // expense model
        public Guid ExpensesID = Guid.NewGuid();

        //public Guid? ExpensesCreatedBy = null;
        public DateTime ExpensesCreatedDate = DateTime.UtcNow;
        //public Guid? ExpensesEditedBy = null;
        public DateTime? ExpensesEditedDate = null;

        // class model
        public Guid ClassID = Guid.NewGuid();
        public int AvailableNumberOfTickets = 0;
        public int BookedNumberOfTickets = 0;
        public bool ClassIsCancelled = false;

        //public Guid? ClassCreatedBy = null;
        public DateTime ClassCreatedDate = DateTime.UtcNow;
        //public Guid? ClassEditedBy = null;
        public DateTime? ClassEditedDate = null;

        // booking model
        public Guid BookingID = Guid.NewGuid();
        public int? BookingGenderID = null;
        public DateTime? BookingDateOfBirth = null;
        public int? BookingTitleID = null;
        public string ProofOfPaymentLink = "undefined";
        public bool BookingIsCancelled = false;
        public Guid? CancelledBy = null;

        public DateTime? CancelledDate = null;
        public DateTime BookingCreatedDate = DateTime.UtcNow;

        //public Guid? ProductUsersCreatedBy = null;
        public DateTime ProductUsersCreatedDate = DateTime.UtcNow;

        public int? PaymentMethodID = null;
        public double AmountPaid = 0.00;
        public string TicketDescription = null;
        public bool IsReserved = true;
        public bool IsBooked = false;

        public Guid? FromPlace = null;
        public Guid? ToPlace = null;
        public string FromAddress = null;
        public string ToAddress = null;

        public string Name = null;
    }
}
