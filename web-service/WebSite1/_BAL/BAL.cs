using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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


    }
}
