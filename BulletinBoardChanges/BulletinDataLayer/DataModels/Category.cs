using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.DataModels
{
    public interface IcatId
    {
        public int CateId { get; set; }
    }
    public class CatName
    {
        public string CategoryName { get; set; } = String.Empty;

    }
    public class Category : CatName, IcatId
    {
        public int CateId { get; set; }
       
    }
}
