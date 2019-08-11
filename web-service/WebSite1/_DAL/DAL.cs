using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
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

        public static int InsertUser(string email, string pass)
        {
            int res = -1;

            try
            {
                Con.Open();
                _command = new SqlCommand($"InsertUser", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Password", pass));

                SqlParameter returnPar = new SqlParameter();
                returnPar.Direction = ParameterDirection.ReturnValue;
                _command.Parameters.Add(returnPar);
                _command.ExecuteNonQuery();
                res = (int)returnPar.Value;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return res;
        }

        public static int InsertUserFBandGL(string email, string name, string photoUrl)
        {
            int res = -1;

            try
            {
                Con.Open();
                _command = new SqlCommand($"InsertUserFBandGL", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Name", name));
                _command.Parameters.Add(new SqlParameter("PhotoUrl", photoUrl));

                SqlParameter returnPar = new SqlParameter();
                returnPar.Direction = ParameterDirection.ReturnValue;
                _command.Parameters.Add(returnPar);
                _command.ExecuteNonQuery();
                res = (int)returnPar.Value;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }

            return res;
        }

        public static int Login(string email, string pass)
        {
            int res = -1;

            try
            {
                Con.Open();
                _command = new SqlCommand($"Login", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Password", pass));

                SqlParameter returnPar = new SqlParameter();
                returnPar.Direction = ParameterDirection.ReturnValue;
                _command.Parameters.Add(returnPar);
                _command.ExecuteNonQuery();
                res = (int)returnPar.Value;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return res;
        }

        public static int UpdateUserName(string email, string name)
        {
            int res = -1;

            try
            {
                Con.Open();
                _command = new SqlCommand($"UpdateUserName", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Name", name));

                SqlParameter returnPar = new SqlParameter();
                returnPar.Direction = ParameterDirection.ReturnValue;
                _command.Parameters.Add(returnPar);
                _command.ExecuteNonQuery();
                res = (int)returnPar.Value;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return res;
        }

        public static int UpdateUserPicture(string email, string photoUrl)
        {
            int res = -1;

            try
            {
                Con.Open();
                _command = new SqlCommand($"UpdateUserPicture", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("PhotoUrl", photoUrl));

                SqlParameter returnPar = new SqlParameter();
                returnPar.Direction = ParameterDirection.ReturnValue;
                _command.Parameters.Add(returnPar);
                _command.ExecuteNonQuery();
                res = (int)returnPar.Value;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (Con.State == ConnectionState.Open)
                    Con.Close();
            }
            return res;
        }
    }
}
