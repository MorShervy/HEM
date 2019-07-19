using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace _DAL
{
    public static class DAL
    {

        private static string conStr = null;
        private static bool local = false;
        private static SqlConnection Con = null;
        private static SqlDataAdapter _adtr = null;
        private static SqlCommand _command = null;


        static DAL()
        {
            Configuration config = null;
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);

            string exeConfigPath = path;
            try
            {
                config = ConfigurationManager.OpenExeConfiguration(exeConfigPath);
            }
            catch (Exception e)
            {
                //handle errror here.. means DLL has no sattelite configuration file.
                throw new Exception(e.Message);
            }

            if (config != null)
            {
                conStr = GetAppSetting(config, local ? "Local" : "LiveDNS");
            }

            Con = new SqlConnection(conStr);
            //_command = new SqlCommand();
            //_command.Connection = Con;
        }

        static string GetAppSetting(Configuration config, string key)
        {
            KeyValueConfigurationElement element = config.AppSettings.Settings[key];
            if (element != null)
            {
                string value = element.Value;
                if (!string.IsNullOrEmpty(value))
                    return value;
            }
            return string.Empty;
        }



    }
}
