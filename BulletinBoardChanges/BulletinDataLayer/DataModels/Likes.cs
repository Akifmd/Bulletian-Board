﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.DataModels
{
    public class Likes
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public int PId { get; set; }
        public int Yes_No { get; set; }
    }
}
