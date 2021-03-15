using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PVAOWeb.Helpers;

namespace PVAOWeb.Controllers
{
    [AuthenticateUser]
    public class OverRemittanceController : Controller
    {
        // GET: OverRemittance
        public ActionResult Index(string benefit_code = "", string year = "", string month = "", string search_text = "")
        {
            ViewData["benefitStatusList"] = this._getBenefitStatusList();
            ViewData["benefit_code"] = benefit_code;
            ViewData["year"] = year;
            ViewData["month"] = month;
            ViewData["search_text"] = search_text;
            List<OverRemitance> overRemitances = this._getOverRemitanceList();

            if (benefit_code != "")
            {
                overRemitances = overRemitances.FindAll(x => x.BenefitCode.code == benefit_code);
            }

            if (year != "")
            {
                overRemitances = overRemitances.FindAll(x => x.CreateAt.ToString("yyyy") == year);
            }

            if (month != "")
            {
                overRemitances = overRemitances.FindAll(x => x.CreateAt.ToString("mm") == month);
            }

            if (search_text != "")
            {
                search_text = search_text.ToLower();
                overRemitances = overRemitances.FindAll(x =>
                    x.BeneficiaryName.ToLower().Contains(search_text)
                    || x.VDMSNumberToString().Contains(search_text)
                    || x.DateOfBirth.ToString("mm/dd/yyyy").Contains(search_text)
                    || x.Gender.ToLower().Contains(search_text)
                    || x.ClaimNumber.ToLower().Contains(search_text)
                    || x.BenefitCode.code.ToLower().Contains(search_text)
                    || x.BenefitCode.name.ToLower().Contains(search_text)
                    || x.Amount.ToString().Contains(search_text)
                    || x.Status.ToLower().Contains(search_text));
            }

            ViewData["overRemittanceList"] = overRemitances;
            return View();
        }

        private List<BenefitStatus> _getBenefitStatusList()
        {
            return new List<BenefitStatus>()
            {
                new BenefitStatus() { code = "DW", name = "Disability Pension (Surviving Spouse)" },
                new BenefitStatus() { code = "DC", name = "Disability Pension (Minor)" },
                new BenefitStatus() { code = "TP", name = "Death Pension (Parent)" },
            };
        }

        private List<OverRemitance> _getOverRemitanceList()
        {
            return new List<OverRemitance>()
            {
                new OverRemitance()
                {
                    VDMSNumber = 783393,
                    BeneficiaryName = "Devante Lawrence Sato Lontok",
                    DateOfBirth = new DateTime(1978, 5, 16),
                    Gender = "Male",
                    ClaimNumber = "OV-MCO-13-001995",
                    BenefitCode = _getBenefitStatusList().First(x => x.code == "DW"),
                    Amount = 6192.04,
                    Status = "For Approval",
                    CreateAt = new DateTime(2021, 2, 15)
                },
                new OverRemitance()
                {
                    VDMSNumber = 52646,
                    BeneficiaryName = "Lia Thaddeus Dinaluyan Cruzada",
                    DateOfBirth = new DateTime(1956, 6, 11),
                    Gender = "Female",
                    ClaimNumber = "DW-MCO-12-001432",
                    BenefitCode = _getBenefitStatusList().First(x => x.code == "DC"),
                    Amount = 7854.60,
                    Status = "For Approval",
                    CreateAt = new DateTime(2020, 12, 14)
                },
                new OverRemitance()
                {
                    VDMSNumber = 43234,
                    BeneficiaryName = "Rowan Travis Salim Abayana",
                    DateOfBirth = new DateTime(1985, 6, 12),
                    Gender = "Male",
                    ClaimNumber = "DA-MCO-04-001939",
                    BenefitCode = _getBenefitStatusList().First(x => x.code == "TP"),
                    Amount = 9856.54,
                    Status = "For Approval",
                    CreateAt = new DateTime(2020, 11, 27)
                }
            };
        }
    }

    public class BenefitStatus
    {
        public string code { get; set; }
        public string name { get; set; }
    }

    public class OverRemitance
    {
        public int VDMSNumber { get; set; }
        public string BeneficiaryName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string ClaimNumber { get; set; }
        public BenefitStatus BenefitCode { get; set; }
        public double Amount { get; set; }
        public string Status { get; set; }
        public DateTime CreateAt { get; set; }


        public string VDMSNumberToString()
        {
            return this.VDMSNumber.ToString().PadLeft(10, '0');
        }

        public int Age()
        {
            TimeSpan span = DateTime.Now - this.DateOfBirth;
            return (int)Math.Ceiling(((span.TotalDays / 30.0) / 12.0));
        }
    }
}