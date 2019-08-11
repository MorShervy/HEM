using _DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using WebPush;

namespace _BAL
{
    public sealed class BAL
    {

        private static VapidDetails _keys;

        private static BAL _instance;
        private static readonly object Padlock = new object();

        public static BAL Instance
        {
            get
            {
                lock (Padlock)
                {
                    if (_instance == null)
                        _instance = new BAL();
                    return _instance;
                }
            }
        }

        private BAL()
        {
            _keys = VapidHelper.GenerateVapidKeys();
        }

        public string GetKey()
        {
            if (_keys == null)
            {
                _keys = VapidHelper.GenerateVapidKeys();
            }
            return _keys.PublicKey;
        }

        public object InsertUser(string email, string pass)
        {
            int result = DAL.InsertUser(email, pass);
            var res = new { res = result.ToString() };
            return new JavaScriptSerializer().Serialize(res);
        }

        public object InsertUserFBandGL(string email, string name, string photoUrl)
        {
            int result = DAL.InsertUserFBandGL(email, name, photoUrl);

            var res = new { res = result.ToString() };
            return new JavaScriptSerializer().Serialize(res);
        }

        public object Login(string email, string pass)
        {
            int result = DAL.Login(email, pass);

            var res = new { res = result.ToString() };
            return new JavaScriptSerializer().Serialize(res);
        }

        public object UpdateUserName(string email, string name)
        {
            int result = DAL.UpdateUserName(email, name);

            var res = new { res = result.ToString() };
            return new JavaScriptSerializer().Serialize(res);
        }

        public object UpdateUserPicture(string email, string photoUrl)
        {
            int result = DAL.UpdateUserPicture(email, photoUrl);

            var res = new { res = result.ToString() };
            return new JavaScriptSerializer().Serialize(res);
        }
    }
}
