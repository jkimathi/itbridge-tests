//using Grpc.Core;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using static System.Net.Mime.MediaTypeNames;
using System.Web;
using ticketing.Models;

namespace ticketing.Services
{
    public static class VoucherService
    {
		public static string GetUniqueKey(int length)
		{
			string guidResult = string.Empty;

			while (guidResult.Length < length)
			{
				// Get the GUID.
				guidResult += Guid.NewGuid().ToString().GetHashCode().ToString("x");
				// we can also generate unique key using: DateTime.Now.ToString().GetHashCode().ToString("x");
			}

			// Make sure length is valid.
			if (length <= 0 || length > guidResult.Length)
				throw new ArgumentException("Length must be between 1 and " + guidResult.Length);

			// Return the first length bytes.
			return guidResult.Substring(0, length);
		}

		public static string GenerateUniqueVoucher(int length) 
		{

			string voucher = "";

			for (int i=1; i<=5; i++) // loop 5 times, trying to get a voucher that is not yet used in the DB
			{
				string getVoucher = GetUniqueKey(length);

				if (!BookingModel.Methods.IsVoucherExist(getVoucher)) //check if the voucher as been used before in our system
				{
					voucher = getVoucher; // return voucher if unique
					break;
				}
			}

			return voucher;
		}
	}
}
