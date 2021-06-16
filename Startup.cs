using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Text;


namespace ticketing
{
    public class Startup
    {
        //My variables
        public static string ConnectionString;
        public static string ConnectionString_Secret;
        public static string Issuer;
        public static string Key;
        public static string Audience;
        public static string ExpirationInDays;
        public static string Subject;
        public static string PasswordEncryptionKey;
        public static string Jwt;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //localization and globalization
            // http://www.codedigest.com/CodeDigest/207-Get-All-Language-Country-Code-List-for-all-Culture-in-C---ASP-Net.aspx
            services.AddLocalization(options => options.ResourcesPath = "Resources");
            services.AddMvc()
                .AddViewLocalization(Microsoft.AspNetCore.Mvc.Razor.LanguageViewLocationExpanderFormat.Suffix)
                .AddDataAnnotationsLocalization();

            services.Configure<RequestLocalizationOptions>(options =>
            {
                var cultures = new List<CultureInfo> {
                    new CultureInfo("en-GB"),
                    new CultureInfo("fr-FR"),
                    new CultureInfo("es-ES"),
                    new CultureInfo("pt-PT"),
                    new CultureInfo("sw-KE")
                };
                options.DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("en-GB");
                options.SupportedCultures = cultures;
                options.SupportedUICultures = cultures;
            });

            services.AddControllersWithViews();
            services.AddSession(); //add variable

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            ////My customizations ===============
            
            // jwt variables
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,

                    ValidIssuer = Configuration["Jwt:issuer"],
                    ValidAudience = Configuration["Jwt:audience"],

                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:key"]))

                };
            });

            // Swagger Config
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "APIs",
                    Version = "v1",
                });
            });

            //images
            services.Configure<FormOptions>(o => {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseSession(); //added variables

            //app.UseHttpsRedirection();

            //Files
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Files")),
                RequestPath = new PathString("/Files")
            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();  //added variables

            //Globalization and Localisation
            //app.UseHttpsRedirection();
            //app.UseStaticFiles();
            app.UseRequestLocalization(app.ApplicationServices.GetRequiredService<IOptions<RequestLocalizationOptions>>().Value);

            app.UseRouting();
            app.UseAuthorization();  //added variables

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            //My customization 

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            //Setting appsettings variables
            ConnectionString = Configuration.GetConnectionString("connectionString");
            ConnectionString_Secret = Configuration.GetConnectionString("connectionString_secret");

            //jwt variables
            Issuer = Configuration["Jwt:issuer"];
            Key = Configuration["Jwt:key"];
            Audience = Configuration["Jwt:audience"];
            ExpirationInDays = Configuration["Jwt:expirationInDays"];
            Subject = Configuration["Jwt:subject"];

            PasswordEncryptionKey = Configuration["Constants:passwordEncryptionKey"];

            //app.UseAuthentication();

            app.UseCors(builder =>
            {
                builder.WithOrigins("http://localhost:8100");
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();

            });

            // Add Swagger/SwaggerUI to pipeline
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "APIs v1");
                //c.RoutePrefix = string.Empty;
            });
        }
    }
}
