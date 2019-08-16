using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Expenses
    {
        public int AccountID { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public double Amount { get; set; }
        public int CategoryID { get; set; }
        public string Info { get; set; }
    }
}