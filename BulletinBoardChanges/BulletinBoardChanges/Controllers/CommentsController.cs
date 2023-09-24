using BulletinDataLayer.DataModels;
using BulletinDataLayer.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using BulletinBusinessLayer;
using BulletinBoardChanges.interfaces;

namespace BulletinBoardChanges.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase, ICommentsController
    {
        //Get Specific Post Details
        [HttpGet("/Comments/SpecificPostDetials")]
        public async Task<ActionResult<List<CommentsForSpecificPost>>> GetComments(int PostId)
        {
            CommentsBL commentbl = new CommentsBL();
            var getcomment = commentbl.GetComments(PostId);
            return await getcomment;
        }

        //SIngle Insertion

        [HttpPost("InsertSingleComments")]
        public async Task<ActionResult<List<Category>>> CreateSingleComments(Comment Obj)
        {
            CommentsBL commentbl = new CommentsBL();
            var InsertComment = commentbl.CreateSingleComments(Obj);
            return Ok(await InsertComment);
        }

        //Insertion

        [HttpPost("InsertComments")]
        public async Task<ActionResult<List<Category>>> CreateComments(Comment[] Obj)
        {
            CommentsBL commentbl = new CommentsBL();
            var InsertComment = commentbl.CreateComments(Obj);
            return Ok(await InsertComment);
        }

        // Single Updation

        [HttpPut("UpdateSingleComment")]
        public async Task<ActionResult<List<Comment>>> UpdateSingleComment(Comment Obj)
        {
            CommentsBL commentbl = new CommentsBL();
            var UpdateSingleComment = commentbl.UpdateSingleComment(Obj);
            return Ok(await UpdateSingleComment);
        }


        // Updation

        [HttpPut("UpdateComment")]
        public async Task<ActionResult<List<Comment>>> UpdateComment(Comment[] Obj)
        {
            CommentsBL commentbl = new CommentsBL();
            var UpdateComment = commentbl.UpdateComment(Obj);
            return Ok(await UpdateComment);
        }

        [HttpDelete("DeleteSingleComment")]
        public async Task<ActionResult<List<Comment>>> DeleteSingleComment(string UserName,string Email,int cId)
        {
            CommentsBL commentbl = new CommentsBL();
            var DeleteComment = commentbl.DeleteSingleComment(UserName,Email, cId);
            return Ok(await DeleteComment);

        }


        [HttpDelete("DeleteComment")]
        public async Task<ActionResult<List<ICid>>> DeleteComment(DComment[] obj)
        {
            CommentsBL commentbl = new CommentsBL();
            var DeleteComment = commentbl.DeleteComment(obj);
            return Ok(await DeleteComment);

        }
        }
}
