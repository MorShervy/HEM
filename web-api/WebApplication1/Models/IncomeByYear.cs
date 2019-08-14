using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class IncomeByYear : Income
    {

        public int Year { get; set; }
        public int Month { get; set; }
        public double Amount { get; set; }
        public string Type { get; set; }
    }
}