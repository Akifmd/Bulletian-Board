using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.DataModels
{
    public interface ICid
    {
        public int cId { get; set; }
    }

    public interface Icomment : ICid
    {
        public string UserName { get; set; }
        public string Email { get; set; }

    }
    public class Comment : CommentsForSpecificPost, Icomment
    {
        public int cId { get; set; }

        public int PID { get; set; }
        public string UserName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;

    }

    public class CommentsForSpecificPost:DComment
    {
        public int cId { get; set; }
        public string Comments { get; set; } = string.Empty;

        public DateTime Date_Time { get; set; }
    }

    public class DComment
    {
        public int cId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

    }
}
