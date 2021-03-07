using System.Web.Mvc;
using PVAOWeb.Helpers;

namespace PVAOWeb.Controllers
{
    public class HomeController : BaseController
    {
        [AuthenticateUser]
        public ActionResult Index()
        {
            return View();
        }
    }
}