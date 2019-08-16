using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using WebPush;

namespace WebApplication1.Models
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
            DataTable result = DAL.InsertUser(email, pass);
            if (result == null)
                return null;

            if (result.Columns.Count > 1)
            {
                UserInfo userInfo = new UserInfo()
                {
                    AccountID = int.Parse(result.Rows[0]["AccountID"].ToString()),
                    Email = result.Rows[0]["Email"].ToString(),
                    Name = result.Rows[0]["Name"].ToString(),
                    PhotoUrl = result.Rows[0]["PhotoUrl"].ToString()
                };
                return userInfo;
            }
            var error = new { error = result.Rows[0][0].ToString() };
            return error;

        }

        public object InsertUserFBandGL(string email, string name, string photoUrl)
        {
            DataTable result = DAL.InsertUserFBandGL(email, name, photoUrl);
            if (result == null)
                return null;

            if (result.Columns.Count > 1)
            {
                UserInfo userInfo = new UserInfo()
                {
                    AccountID = int.Parse(result.Rows[0]["AccountID"].ToString()),
                    Email = result.Rows[0]["Email"].ToString(),
                    Name = result.Rows[0]["Name"].ToString(),
                    PhotoUrl = result.Rows[0]["PhotoUrl"].ToString()
                };
                return userInfo;
            }
            var error = new { error = result.Rows[0][0].ToString() };
            return error;
        }

        public object Login(string email, string pass)
        {
            DataTable result = DAL.Login(email, pass);
            if (result == null)
                return null;

            if (result.Columns.Count > 1)
            {
                UserInfo userInfo = new UserInfo()
                {
                    AccountID = int.Parse(result.Rows[0]["AccountID"].ToString()),
                    Email = result.Rows[0]["Email"].ToString(),
                    Name = result.Rows[0]["Name"].ToString(),
                    PhotoUrl = result.Rows[0]["PhotoUrl"].ToString()
                };
                return userInfo;
            }
            var error = new { error = result.Rows[0][0].ToString() };
            return error;
        }

        public List<IncomeByYear> GetIncomeUserByYear(int accountId, string date)
        {
            DataTable result = DAL.GetIncomeUserByYear(accountId, date);
            List<IncomeByYear> income = null;

            if (result == null)
                return null;

            foreach (DataRow row in result.Rows)
            {
                if (income == null)
                    income = new List<IncomeByYear>();

                income.Add(new IncomeByYear()
                {
                    AccountID = int.Parse(row["AccountID"].ToString()),
                    Date = row["Date"].ToString(),
                    Time = row["Time"].ToString(),
                    Year = int.Parse(row["Year"].ToString()),
                    Month = int.Parse(row["Month"].ToString()),
                    Amount = double.Parse(row["Amount"].ToString()),
                    Type = row["Type"].ToString()
                });
            }

            return income;
        }

        public List<ExpensesByYear> GetExpensesUserByYear(int accountId, string date)
        {
            DataTable result = DAL.GetExpensesUserByYear(accountId, date);
            List<ExpensesByYear> expenses = null;

            if (result == null)
                return null;

            foreach (DataRow row in result.Rows)
            {
                if (expenses == null)
                    expenses = new List<ExpensesByYear>();

                expenses.Add(new ExpensesByYear()
                {
                    AccountID = int.Parse(row["AccountID"].ToString()),
                    Date = row["Date"].ToString(),
                    Time = row["Time"].ToString(),
                    Year = int.Parse(row["Year"].ToString()),
                    Month = int.Parse(row["Month"].ToString()),
                    Day = int.Parse(row["Day"].ToString()),
                    Amount = double.Parse(row["Amount"].ToString()),
                    CategoryID = int.Parse(row["CategoryID"].ToString()),
                    Info = row["Info"].ToString()
                });
            }

            return expenses;
        }

        public object InsertIncome(int accountID,string date,string time,double amount,string type)
        {
            int result = DAL.InsertIncome(accountID, date, time, amount, type);
            var res = new { res = result.ToString() };
            return new JavaScriptSerializer().Serialize(res);
        }

        public object InsertExpense(int accountID,string date,string time,double amount,int categoryID,string info)
        {
            int result = DAL.InsertExpense(accountID, date, time, amount, categoryID, info);
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