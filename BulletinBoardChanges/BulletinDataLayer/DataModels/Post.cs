  using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.DataModels
{
    public interface Id
    {
        public int PId { get; set; }   
    }

    public class cat
    {
        public string Category { get; set; } = String.Empty;

    }

    public class Ipost : Post, Id
    {
        public int PId { get; set; }
        public string UserName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public int Views { get; set; }

    }

    public class Post : cat,Id
    {
        public int PId { get; set; }
        public string post { get; set; } = String.Empty;

        public string PostDetials { get; set; } = String.Empty;
        public DateTime Date_Time { get; set; }

        public int Likes { get; set; }
        public int Views { get; set; }
        public string UserName { get; set; } = String.Empty;

    }

    public class SpecificPost : Post, Id
    {
        public int PId { get; set; }

        public string Category { get; set; } = String.Empty;
        public string post { get; set; } = String.Empty;

    }
    public class Dpost
    {
        public int PId { get; set; }
        public string UserName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
    }
    public class postundercategory:cat
    {
        public string post { get; set; } = String.Empty;

        public string PostDetials { get; set; } = String.Empty;
    }
}
