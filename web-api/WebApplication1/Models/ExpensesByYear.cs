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
    }
}