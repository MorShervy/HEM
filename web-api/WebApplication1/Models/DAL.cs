using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Web;

namespace WebApplication1.Models
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

        public static DataTable InsertUser(string email, string pass)
        {

            try
            {
                Con.Open();
                _command = new SqlCommand($"InsertUser", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Password", pass));

                //SqlParameter returnPar = new SqlParameter();
                //returnPar.Direction = ParameterDirection.ReturnValue;
                //_command.Parameters.Add(returnPar);
                //_command.ExecuteNonQuery();
                //res = (int)returnPar.Value;

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];

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
            return null;
        }

        public static DataTable InsertUserFBandGL(string email, string name, string photoUrl)
        {

            try
            {
                Con.Open();
                _command = new SqlCommand($"InsertUserFBandGL", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Name", name));
                _command.Parameters.Add(new SqlParameter("PhotoUrl", photoUrl));

                //SqlParameter returnPar = new SqlParameter();
                //returnPar.Direction = ParameterDirection.ReturnValue;
                //_command.Parameters.Add(returnPar);
                //_command.ExecuteNonQuery();
                //res = (int)returnPar.Value;

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];
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

            return null;
        }

        public static DataTable Login(string email, string pass)
        {

            try
            {
                Con.Open();
                _command = new SqlCommand($"Login", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("Email", email));
                _command.Parameters.Add(new SqlParameter("Password", pass));

                //SqlParameter returnPar = new SqlParameter();
                //returnPar.Direction = ParameterDirection.ReturnValue;
                //_command.Parameters.Add(returnPar);
                //_command.ExecuteNonQuery();
                //res = (int)returnPar.Value;

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];

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
            return null;
        }

        public static DataTable GetIncomeUserByYear(int accountId, string date)
        {
            try
            {
                Con.Open();
                _command = new SqlCommand($"GetIncomeUserByYear", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("AccountID", accountId));
                _command.Parameters.Add(new SqlParameter("Date", date));

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "Income");

                if (ds.Tables["Income"].Rows.Count != 0)
                    return ds.Tables["Income"];

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
            return null;
        }

        public static DataTable GetExpensesUserByYear(int accountId, string date)
        {
            try
            {
                Con.Open();
                _command = new SqlCommand($"GetExpensesUserByYear", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("AccountID", accountId));
                _command.Parameters.Add(new SqlParameter("Date", date));

                _adtr = new SqlDataAdapter(_command);
                DataSet ds = new DataSet();
                _adtr.Fill(ds, "Expenses");

                if (ds.Tables["Expenses"].Rows.Count != 0)
                    return ds.Tables["Expenses"];

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
            return null;
        }

        public static int InsertIncome(int accountID, string date, string time, double amount, string type)
        {
            int res = -1;

            try
            {
                Con.Open();
                _command = new SqlCommand($"InsertIncome", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("AccountID", accountID));
                _command.Parameters.Add(new SqlParameter("Date", date));
                _command.Parameters.Add(new SqlParameter("Time", time));
                _command.Parameters.Add(new SqlParameter("Amount", amount));
                _command.Parameters.Add(new SqlParameter("Type", type));

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

        public static int InsertExpense(int accountID, string date, string time, double amount, int categoryID, string info)
        {
            int res = -1;

            try
            {
                Con.Open();
                _command = new SqlCommand($"InsertExpense", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("AccountID", accountID));
                _command.Parameters.Add(new SqlParameter("Date", date));
                _command.Parameters.Add(new SqlParameter("Time", time));
                _command.Parameters.Add(new SqlParameter("Amount", amount));
                _command.Parameters.Add(new SqlParameter("CategoryID", categoryID));
                _command.Parameters.Add(new SqlParameter("Info", info));

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

        public static int DeleteExpense(int accountId, string date, string time, double amount)
        {
            int res = -1;

            try
            {
                Con.Open();
                _command = new SqlCommand($"DeleteExpense", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("@AccountID", accountId));
                _command.Parameters.Add(new SqlParameter("@Date", date));
                _command.Parameters.Add(new SqlParameter("@Time", time));
                _command.Parameters.Add(new SqlParameter("@Amount", amount));

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

        public static int DeleteIncome(int accountId, string date, string time, double amount)
        {
            int res = -1;

            try
            {
                Con.Open();
                _command = new SqlCommand($"DeleteIncome", Con);
                _command.CommandType = CommandType.StoredProcedure;

                /* input parameters */
                _command.Parameters.Add(new SqlParameter("@AccountID", accountId));
                _command.Parameters.Add(new SqlParameter("@Date", date));
                _command.Parameters.Add(new SqlParameter("@Time", time));
                _command.Parameters.Add(new SqlParameter("@Amount", amount));

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