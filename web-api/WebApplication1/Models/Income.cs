﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Income
    {
        public int AccountID { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public double Amount { get; set; }
        public string Type { get; set; }
    }
}