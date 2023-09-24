using BulletinDataLayer.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using BulletinDataLayer.Interfaces;

namespace BulletinDataLayer.Repository
{
    public class CommentsRepository: ICommentsRepository
    {
        //Get Specific Post Details
        public async Task<List<CommentsForSpecificPost>> GetComments(int PostId)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            var GetComment = await connection.QueryAsync<CommentsForSpecificPost>("select UserName,CId,Comments,Date_Time from Comments where PId = @PId", new { PId = PostId });
            return (List<CommentsForSpecificPost>)GetComment;
        }

        // Single Insertion 
        public async Task<string> CreateSingleComments(Comment Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);

            var reg = await connection.QueryAsync<Registration>("select * from Registration where UserName = @UserName and Email=@Email", new { username = Obj.UserName, email = Obj.Email });


            if (reg.Count() != 0)
            {
                    await connection.ExecuteAsync("insert into Comments (comments,Pid,UserName,Email,Date_Time) values (@comments,@Pid,@UserName,@Email,getdate())", Obj);


            }
            else
            {
                return "Invalid User Detials";


            }

            return "success";
        }

        //Insertion
        public async Task<List<Comment>> CreateComments(Comment[] Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            foreach (var item in Obj)
            {
                var reg = await connection.QueryAsync<Registration>("select * from Registration where UserName = @username and Email=@email", new { username = item.UserName, email = item.Email });
                if (reg.Count() != 0)
                {
                    await connection.ExecuteAsync("insert into Comments (comments,Pid,UserName,Email,Date_Time) values (@comments,@Pid,@UserName,@Email,getdate())", item);
                }
                else
                {
                   Console.WriteLine( "Invalid User details");
                }
            }
            return (List<Comment>)await GetAllComment(connection);
        }


        // Single Updation

        public async Task<string> UpdateSingleComment(Comment Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
           
                var result= await connection.ExecuteAsync("Update comments set  Comments=@Comments,Date_Time=getdate() where UserName=@UserName And  CId=@Cid and Email=@Email", Obj);
            if (result == 1)
            {
                return "success";
            }
            else
            

            return "Invalid"; 
            
        }

        // Updation

        public async Task<List<Comment>> UpdateComment(Comment[] Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            foreach (var item in Obj)
            {
                await connection.ExecuteAsync("Update comments set  Comments=@Comments,Date_Time=getdate() where UserName=@UserName And  CId=@Cid and Email=@Email", item);
            }
            return (List<Comment>)await GetAllComment(connection);
        }


        // SingleDeletion
        public async Task<string> DeleteSingleComment(string UserName, string Email, int cId)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);

            
               var deletedinglecomment=await connection.ExecuteAsync("Delete from comments  where UserName=@UserName And  CId=@Cid and Email=@Email ", new { UserName = UserName, Email = Email,cId=cId });
            if (deletedinglecomment == 1)
            {
                return "success";
            }else

            return "Invalid" ;
        }
        // Deletion
        public async Task<List<Comment>> DeleteComment(DComment[] obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);

            foreach (var CommentID in obj)
            {
                await connection.ExecuteAsync("Delete from comments  where UserName=@UserName And  CId=@Cid and Email=@Email ", CommentID);
            }

            return (List<Comment>)await GetAllComment(connection);
        }

        private static async Task<IEnumerable<Comment>> GetAllComment(SqlConnection connection)
        {
            return await connection.QueryAsync<Comment>("SELECT * from comments  order by Date_Time desc");

        }

    }

}
