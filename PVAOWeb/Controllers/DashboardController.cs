using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PVAOWeb.Helpers;

namespace PVAOWeb.Controllers
{
    public class DashboardController : Controller
    {
        [AuthenticateUser]
        public ActionResult Index()
        {
            return View();
        }
    }
}