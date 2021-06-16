using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace ticketing.Services
{
    public static class TokenService
    {

        private static readonly string issuer = Startup.Issuer;
        private static readonly string authKey = Startup.Key;
        private static readonly string audience = Startup.Audience;
        private static readonly string subject = Startup.Subject;
        private static readonly string expirationInDays = Startup.ExpirationInDays;

        public static string Token(dynamic login, dynamic details) {

            //create claims details based on the user information
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),

                new Claim("userID", login.userID.ToString()),
                new Claim("username", login.username.ToString()),
                new Claim("phonenumber", login.phonenumber.ToString()),
                new Claim("businessTypeID", login.phonenumber.ToString()),

                new Claim("name", details.name.ToString()),
                new Claim("surname", details.surname),
                new Claim("genderID", details.genderID.ToString()),
                new Claim("languageID", details.languageID.ToString()),
                new Claim("countryID", details.countryID.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authKey));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var signature = new JwtSecurityToken(issuer, audience, claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);
            string token = "Bearer " + new JwtSecurityTokenHandler().WriteToken(signature);

            return token;
        }
    }
}
