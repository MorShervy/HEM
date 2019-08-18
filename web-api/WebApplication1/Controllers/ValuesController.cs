using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        //GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }


        [HttpGet]
        [Route("HelloWorld")]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [HttpPost]
        [Route("InsertUser")]
        public object InsertUser([FromBody]User user)
        {
            return BAL.Instance.InsertUser(user.Email,user.Pass);
        }

        [HttpPost]
        [Route("InsertUserFBandGL")]
        public object InsertUserFBandGL([FromBody]User user)
        {
            return BAL.Instance.InsertUserFBandGL(user.Email, user.Name, user.PhotoUrl);
        }

        [HttpPost]
        [Route("Login")]
        public object Login([FromBody]User user)
        {
            return BAL.Instance.Login(user.Email, user.Pass);
        }

        [HttpPost]
        [Route("UpdateUserName")]
        public object UpdateUserName([FromBody]User user)
        {
            return BAL.Instance.UpdateUserName(user.Email, user.Name);
        }

        [HttpPost]
        [Route("UpdateUserPicture")]
        public object UpdateUserPicture([FromBody]User user)
        {
            return BAL.Instance.UpdateUserPicture(user.Email, user.PhotoUrl);
        }

        [HttpPost]
        [Route("GetIncomeUserByYear")]
        public List<IncomeByYear> GetIncomeUserByYear([FromBody]Income income)
        {
            return BAL.Instance.GetIncomeUserByYear(income.AccountID, income.Date);
        }

        [HttpPost]
        [Route("GetExpensesUserByYear")]
        public List<ExpensesByYear> GetExpensesUserByYear([FromBody]Expenses expenses)
        {
            return BAL.Instance.GetExpensesUserByYear(expenses.AccountID, expenses.Date);
        }

        [HttpPost]
        [Route("InsertIncome")]
        public object InsertIncome([FromBody]Income income)
        {
            return BAL.Instance.InsertIncome(income.AccountID, income.Date, income.Time, income.Amount, income.Type);
        }

        [HttpPost]
        [Route("InsertExpense")]
        public object InsertExpense([FromBody]Expenses ex)
        {
            return BAL.Instance.InsertExpense(ex.AccountID, ex.Date, ex.Time, ex.Amount, ex.CategoryID, ex.Info);
        }

        [HttpPost]
        [Route("DeleteExpense")]
        public object DeleteExpense([FromBody]Expenses ex)
        {
            return BAL.Instance.DeleteExpense(ex.AccountID, ex.Date, ex.Time, ex.Amount);
        }

        [HttpPost]
        [Route("DeleteIncome")]
        public object DeleteIncome([FromBody]Income inc)
        {
            return BAL.Instance.DeleteIncome(inc.AccountID, inc.Date, inc.Time, inc.Amount);
        }

        [Route("uploadpicture")]
        public Task<HttpResponseMessage> Post()
        {

            string outputForNir = "start---";
            List<string> savedFilePath = new List<string>();
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            string rootPath = HttpContext.Current.Server.MapPath("~/uploadFiles");
            var provider = new MultipartFileStreamProvider(rootPath);
            var task = Request.Content.ReadAsMultipartAsync(provider).
                ContinueWith<HttpResponseMessage>(t =>
                {
                    if (t.IsCanceled || t.IsFaulted)
                    {
                        Request.CreateErrorResponse(HttpStatusCode.InternalServerError, t.Exception);
                    }
                    foreach (MultipartFileData item in provider.FileData)
                    {
                        try
                        {
                            outputForNir += " ---here";
                            string name = item.Headers.ContentDisposition.FileName.Replace("\"", "");
                            outputForNir += " ---here2=" + name;

                            //need the guid because in react native in order to refresh an inamge it has to have a new name
                            string newFileName = Path.GetFileNameWithoutExtension(name) + "_" + CreateDateTimeWithValidChars() + Path.GetExtension(name);
                            //string newFileName = Path.GetFileNameWithoutExtension(name) + "_" + Guid.NewGuid() + Path.GetExtension(name);
                            //string newFileName = name + "" + Guid.NewGuid();
                            outputForNir += " ---here3" + newFileName;

                            //delete all files begining with the same name
                            string[] names = Directory.GetFiles(rootPath);
                            foreach (var fileName in names)
                            {
                                if (Path.GetFileNameWithoutExtension(fileName).IndexOf(Path.GetFileNameWithoutExtension(name)) != -1)
                                {
                                    File.Delete(fileName);
                                }
                            }

                            //File.Move(item.LocalFileName, Path.Combine(rootPath, newFileName));
                            File.Copy(item.LocalFileName, Path.Combine(rootPath, newFileName), true);
                            File.Delete(item.LocalFileName);
                            outputForNir += " ---here4";

                            Uri baseuri = new Uri(Request.RequestUri.AbsoluteUri.Replace(Request.RequestUri.PathAndQuery, string.Empty));
                            outputForNir += " ---here5";
                            string fileRelativePath = "~/uploadFiles/" + newFileName;
                            outputForNir += " ---here6 imageName=" + fileRelativePath;
                            Uri fileFullPath = new Uri(baseuri, VirtualPathUtility.ToAbsolute(fileRelativePath));
                            outputForNir += " ---here7" + fileFullPath.ToString();
                            savedFilePath.Add(fileFullPath.ToString());
                        }
                        catch (Exception ex)
                        {
                            outputForNir += " ---excption=" + ex.Message;
                            string message = ex.Message;
                        }
                    }

                    return Request.CreateResponse(HttpStatusCode.Created, "nirchen " + savedFilePath[0] + "!" + provider.FileData.Count + "!" + outputForNir + ":)");
                });
            return task;
        }

        private string CreateDateTimeWithValidChars()
        {
            return DateTime.Now.ToString().Replace('/', '_').Replace(':', '-').Replace(' ', '_');
        }
    }
}
