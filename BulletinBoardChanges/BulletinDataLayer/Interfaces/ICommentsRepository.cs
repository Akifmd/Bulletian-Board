using BulletinDataLayer.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.Interfaces
{
    public interface ICommentsRepository
    {
        public Task<List<CommentsForSpecificPost>> GetComments(int PostId);
        public  Task<List<Comment>> CreateComments(Comment[] Obj);

        public  Task<List<Comment>> UpdateComment(Comment[] Obj);

        public  Task<List<Comment>> DeleteComment(DComment[] obj);

    }
}
