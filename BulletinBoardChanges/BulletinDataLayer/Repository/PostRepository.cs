using BulletinDataLayer.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using BulletinDataLayer.Interfaces;
using System.Security.Cryptography;

namespace BulletinDataLayer.Repository
{
    public class PostRepository: IPostRepository
    {

        // Retrival of All Data
        public async Task<List<Post>> GetAllPosts()
        {

            using var connection = new SqlConnection(Constant.ConnectionString);
            IEnumerable<Post> PostObj = await SelectAllPosts(connection);
            return (List<Post>)PostObj;
        }

        //Get Specific Post Details
        public async Task<SpecificPost> GetPost(int PostId)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            var GetPost = await connection.QueryFirstAsync<SpecificPost>("select Pid,post,category,PostDetials,date_time,UserName,views,likes from post where PId = @PId",
            new { PId = PostId });
           
            return GetPost;
           
        }

        //Get All Posts under One Category
        public async Task<List<Post>> GetPostsofsinglecategory(string Category)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            IEnumerable<Post> GetPostsofsinglecategory = await GetAllThePostsUnderCategory(connection, Category);
            return (List<Post>)GetPostsofsinglecategory;       
        }

        //Get Different Categories From Posts
        public async Task<List<cat>> GetDistinctCategory()
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            IEnumerable<cat> GetDistinctCategory = await GetCategory(connection);
            return (List<cat>)GetDistinctCategory;
        }

        // Single Insertion 
        public async Task<string> CreateSinglePosts(Ipost Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            
                var reg = await connection.QueryAsync<Registration>("select * from Registration where UserName = @UserName and Email=@Email", new { username =Obj. UserName, email =Obj.Email });


                if (reg.Count() != 0)
                {
                    await connection.ExecuteAsync("insert into post(UserName,Email,category,post,PostDetials,Date_Time,Views,likes) values (@UserName,@Email,@category,@post,@PostDetials,getdate(),@Views,0)", Obj);

                }
                else
                {
                    return "Invalid User Detials";


                }
            
            return "success";
        }




        // Insertion 
        public async Task<string> CreatePosts(Ipost[] Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            foreach (var item in Obj)
            {
                var reg = await connection.QueryAsync<Registration>("select * from Registration where UserName = @username and Email=@email", new { username = item.UserName, email = item.Email });
                
                
                    if (reg.Count() != 0)
                    {
                        await connection.ExecuteAsync($"insert into post(UserName,Email,category,post,PostDetials,Date_Time,Views,likes) values (@UserName,@Email,@category,@post,@PostDetials,getdate(),@Views,0)", item);
                        
                    }
                else { 
                    return "Invalid User Detials";
                     
                 
                }
            }
            return "success";
        }


        // Single Updation
        public async Task<string> UpdateSinglePosts(Ipost Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            
               var result= await connection.ExecuteAsync("Update Post set  Category=@Category,Post=@Post,PostDetials=@PostDetials,Date_Time=getdate() where UserName=@UserName And  PId=@Pid and Email=@Email", Obj);
            if (result == 1)
            {
                return "success";
            }
            else
            return "Invalid User Detials";
        }

        // Updation
        public async Task<List<Post>> UpdatePosts(Ipost[] Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            foreach (var item in Obj)
            {
                await connection.ExecuteAsync("Update Post set  Category=@Category,Post=@Post,PostDetials=@PostDetials,Date_Time=getdate() where UserName=@UserName And  PId=@Pid and Email=@Email", item);
            }

            return (List<Post>)await SelectAllPosts(connection);
        }


        // single Deletion
        public async Task<string> DeleteSinglePosts(string UserName, string Email, int pId)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);

         
               var result= await connection.ExecuteAsync("Delete from Post  where UserName=@UserName and PId=@PId and Email=@Email", new { UserName = UserName, Email = Email, pId = pId });
            if (result == 1)
            {

                return "success";
            }
            else
                return "Invalid User Detials";
       

        }


        // Deletion
        public async Task<List<Post>> DeletePosts(Dpost[] mposts)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);

            foreach (var post in mposts)
            {
                await connection.ExecuteAsync("Delete from Post  where UserName=@UserName and PId=@PId and Email=@Email", post);
            }

            return (List<Post>)await SelectAllPosts(connection);
        }

        //Post By User
        public async Task<List<Post>> GetPostperUser(string UserName)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
             var user= await connection.QueryAsync<Post>("select * from Post where UserName=@UserName", new { UserName = UserName });
            return (List<Post>)user;
        }

        public async Task<int> UpdateLikes(int PId)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            var count = await connection.ExecuteScalarAsync<int>($"UPDATE Post SET likes = likes + 1 OUTPUT INSERTED.likes WHERE PId = {PId}");
            return count;
        }

        public async Task<int> DisLikes(int PId)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            var count = await connection.ExecuteScalarAsync<int>($"UPDATE Post SET likes = likes - 1 OUTPUT INSERTED.likes WHERE PId = {PId}");
            return count;
        }
        public async Task<int> isLikes(int PId, string UserName)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            var count = await connection.ExecuteScalarAsync<int>($"select yes_no from Likes where PId={PId} and UserName = '{UserName}';");
            return count;
        }


        private static async Task<IEnumerable<Post>> SelectAllPosts(SqlConnection connection)
        {
            return await connection.QueryAsync<Post>("Select * from Post order by Date_Time desc");
        }

        private static async Task<IEnumerable<Post>> GetAllThePostsUnderCategory(SqlConnection connection, string Category)
        {
            return await connection.QueryAsync<Post>("select * from Post where Category=@Category", new { Category });
        }

        private static async Task<IEnumerable<cat>> GetCategory(SqlConnection connection)
        {
            return await connection.QueryAsync<cat>("select distinct Category from Post");
        }

    }
}
