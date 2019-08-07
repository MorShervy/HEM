using _BAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WebServiceM
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class WebServiceM : System.Web.Services.WebService
{

    public WebServiceM()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    [WebMethod]
    public object InsertUser(string email,string pass)
    {
        return BAL.Instance.InsertUser(email, pass);
    }

    [WebMethod]
    public object InsertUserFBandGL(string email, string name, string photoUrl)
    {
        return BAL.Instance.InsertUserFBandGL(email, name, photoUrl);
    }

    [WebMethod]
    public object Login(string email, string pass)
    {
        return BAL.Instance.Login(email, pass);
    }
}
