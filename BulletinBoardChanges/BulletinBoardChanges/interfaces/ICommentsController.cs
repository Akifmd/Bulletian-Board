using BulletinDataLayer.DataModels;
using Microsoft.AspNetCore.Mvc;

namespace BulletinBoardChanges.interfaces
{
    public interface ICommentsController
    {
        public  Task<ActionResult<List<CommentsForSpecificPost>>> GetComments(int PostId);
        public  Task<ActionResult<List<Category>>> CreateComments(Comment[] Obj);
        public  Task<ActionResult<List<Comment>>> UpdateComment(Comment[] Obj);
        public  Task<ActionResult<List<ICid>>> DeleteComment(DComment[] obj);
        



    }
}
