export default interface ICompanyBookingCard {
  clients_name: string;
  clients_surname: string;
  clients_idNumber: string;
  bookings_voucher: string;
  bookings_reference: string;
  clients_phonenumber: string;
  bookings_ticketCode: number;
  eventsClasses_price: number;
  bookings_amountPaid: number;
  bookings_isReserved: boolean;
  bookings_isBooked: boolean;
  bookings_isCheckedIn: boolean;
  bookings_bookingID: string;
  clients_email: string;
  clients_genderID: number;
  clients_dateOfBirth: string;
  clients_titleID: number;
  eventsClasses_eventClassID: string;
  bookings_paymentMethodID: number;
}
