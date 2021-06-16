//using Grpc.Core;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using static System.Net.Mime.MediaTypeNames;
using System.Web;
using ticketing.Models;
using System.Collections.Generic;
using MassTransit;

namespace ticketing.Services
{
    public static class DynamicUI_Service
	{

		static readonly Dictionary<string, string> Buss = new Dictionary<string, string>()
		{
			{"Product", "Buss"},
			{"Classes", "Classes"},
			{"Event", "Trip"}
		};

		static readonly Dictionary<string, string> Airplan = new Dictionary<string, string>()
		{
			{"Product", "Airplan"},
			{"Classes", "Trip"}
		};

		static readonly Dictionary<string, string> Clinic = new Dictionary<string, string>()
		{
			{"Product", "Clinic"},
			{"Classes", "Consultation"}
		};

		static readonly Dictionary<string, string> University = new Dictionary<string, string>()
		{
			{"Product", "University"},
			{"Classes", "class_room"}
		};

		static readonly Dictionary<string, string> Stadium = new Dictionary<string, string>()
		{
			{"Product", "Stadium"},
			{"Classes", "Seat"}
		};

		static readonly Dictionary<string, string> Hall = new Dictionary<string, string>()
		{
			{"Product", "Hall"},
			{"Classes", "Seat"}
		};

		static readonly Dictionary<string, string> Institution = new Dictionary<string, string>()
		{
			{"Product", "Institution"},
			{"Classes", "Appointment"}
		};

		static readonly Dictionary<string, string> School = new Dictionary<string, string>()
		{
			{"Product", "School"},
			{"Classes", "Class_Room"}
		};

		static readonly Dictionary<string, string> Agriculture_Show = new Dictionary<string, string>()
		{
			{"Product", "Agriculture_Show"},
			{"Classes", "Farm"}
		};

		static readonly Dictionary<string, string> Hotel = new Dictionary<string, string>()
		{
			{"Product", "Hotel"},
			{"Classes", "Room"}
		};

		static readonly Dictionary<string, Dictionary<string, string>> MasterDictionary = new Dictionary<string, Dictionary<string, string>>()
		{
			{"Bus", Buss},
			{"Airplan", Airplan},
			{"Clinic", Clinic},
			{"University", University},
			{"Stadium", Stadium},
			{"Hall", Hall},
			{"Institution", Institution},
			{"School", School},
			{"Agriculture_Show", Agriculture_Show},
			{"Hotel", Hotel}
		};

		public static Dictionary<string, string> RetuturnUI(string key) 
		{
			return MasterDictionary[key];
		}
	}
}
