using BulletinBusinessLayer.interfaces;
using BulletinDataLayer.DataModels;
using BulletinDataLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinBusinessLayer
{
    public class CommentsBL : ICommentBL
    {
        //Get Specific Post Details
       
        public async Task<List<CommentsForSpecificPost>> GetComments(int PostId)
        {
            CommentsRepository commentsrepository = new CommentsRepository();
            var GetComment = commentsrepository.GetComments(PostId);
            return await GetComment;
        }

        //SIngle Insertion


        public async Task<string> CreateSingleComments(Comment Obj)

        {
            CommentsRepository commentsrepository = new CommentsRepository();
            var insertcomment = commentsrepository.CreateSingleComments(Obj);
            return await insertcomment;
        }


        //Insertion


        public async Task<List<Comment>> CreateComments(Comment[] Obj)
        {
            CommentsRepository commentsrepository = new CommentsRepository();
            var insertcomment = commentsrepository.CreateComments(Obj);
            return await insertcomment;
        }


        // Single Updation


        public async Task<string> UpdateSingleComment(Comment Obj)
        {
            CommentsRepository commentsrepository = new CommentsRepository();
            var UpdateSingleComment = commentsrepository.UpdateSingleComment(Obj);
            return await UpdateSingleComment;
        }

        // Updation


        public async Task<List<Comment>> UpdateComment(Comment[] Obj)
        {
            CommentsRepository commentsrepository = new CommentsRepository();
            var UpdateComment = commentsrepository.UpdateComment(Obj);
            return await UpdateComment;
        }

        public async Task<string> DeleteSingleComment(string UserName, string Email, int cId)
        {
            CommentsRepository commentsrepository = new CommentsRepository();
            var DeleteComment = commentsrepository.DeleteSingleComment(UserName,Email, cId);
            return await DeleteComment;

        }

        public async Task<List<Comment>> DeleteComment(DComment[] obj)
        {
            CommentsRepository commentsrepository = new CommentsRepository();
            var DeleteComment = commentsrepository.DeleteComment(obj);
            return await DeleteComment;

        }
    }
}
