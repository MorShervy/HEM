using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ExpensesByYear : Expenses
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public string Time { get; set; }
        public double Amount { get; set; }
        public int CategoryID { get; set; }
        public string Info { get; set; }
    }
}