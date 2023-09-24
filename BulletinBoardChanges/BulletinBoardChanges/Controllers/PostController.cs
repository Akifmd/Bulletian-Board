using BulletinDataLayer.DataModels;
using BulletinDataLayer.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using BulletinBusinessLayer;
using BulletinBoardChanges.interfaces;
using System.Security.Cryptography;
using Dapper;
using BulletinDataLayer;
using System;

namespace BulletinBoardChanges.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class PostController : ControllerBase, IPostController
    {

        // Retrival of All Data
        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetAllPosts()
        {
            PostBL postsbl = new PostBL();  
            var posts = postsbl.GetAllPosts();
            return Ok(await posts);
        }

        //Get Specific Post Details
        [HttpGet("/api/POST/SpecificPostDetials")]
        public async Task<ActionResult<List<SpecificPost>>> GetPost(int PostId)
        {
            PostBL postsbl = new PostBL();
            var GetPost = postsbl.GetPost(PostId);

            return Ok(await GetPost);
        }
        //Get All Posts under One Category
        [HttpGet("/api/POST/GetAllThePostsUnderCategory")]
        public async Task<ActionResult<List<Post>>> GetPostsofsinglecategory(string Category)
        {
            PostBL postsbl = new PostBL();
            var GetPostsofsinglecategory = postsbl.GetPostsofsinglecategory(Category);

            return Ok(await GetPostsofsinglecategory);
        }

        //Get Different Categories From Posts
        [HttpGet]
        [Route("/api/POST/DistinctCategory")]
        public async Task<ActionResult<List<cat>>> GetDistinctCategory()
        {
            PostBL postsbl = new PostBL();
            var GetDistinctCategory = postsbl.GetDistinctCategory();

            return Ok(await GetDistinctCategory);
        }
        // Single Insertion 
        [HttpPost("InsertSinglePosts")]
        public async Task<ActionResult<List<Post>>> CreateSinglePosts(Ipost Obj)
        {
            PostBL postsbl = new PostBL();
            var CreatePosts = postsbl.CreateSinglePosts(Obj);
            return Ok(await CreatePosts);
        }
        // Insertion 

        [HttpPost("InsertPosts")]
        public  async Task<ActionResult<List<Post>>> CreatePosts(Ipost[] Obj)
        {
            PostBL postsbl = new PostBL();
            var CreatePosts = postsbl.CreatePosts(Obj);
            return Ok(await CreatePosts);
        }

        // Single Updation

        [HttpPut("UpdateSinglePosts")]
        public async Task<ActionResult<List<Post>>> UpdateSinglePosts(Ipost Obj)
        {
            PostBL postsbl = new PostBL();
            var UpdatePosts = postsbl.UpdateSinglePosts(Obj);
            return Ok(await UpdatePosts);


        }


        // Updation

        [HttpPut("UpdatePosts")]
        public async Task<ActionResult<List<Post>>> UpdatePosts(Ipost[] Obj)
        {
            PostBL postsbl = new PostBL();
            var UpdatePosts = postsbl.UpdatePosts(Obj);
            return Ok(await UpdatePosts);


        }

        // Single Deletion

        [HttpDelete("DeleteSinglePosts")]
        public async Task<ActionResult<List<Dpost>>> DeleteSinglePosts(string UserName, string Email, int pId)
        {

            PostBL postsbl = new PostBL();
            var DeletePosts = postsbl.DeleteSinglePosts(UserName, Email, pId);
            return Ok(await DeletePosts);

        }
        // Deletion

        [HttpDelete("DeletePosts")]
        public async Task<ActionResult<List<Dpost>>> DeletePosts(Dpost[] mposts)
        {

            PostBL postsbl = new PostBL();
            var DeletePosts = postsbl.DeletePosts(mposts);
            return Ok(await DeletePosts);

        }

        [HttpPut("/views/{PId}")]

        public async Task<ActionResult<Post>> UpdateView(int PId)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);           
            var count = await connection.ExecuteScalarAsync<int>($"UPDATE Post SET views = views + 1 OUTPUT INSERTED.views WHERE PId = {PId}");
            return Ok( count);
        }

        [HttpPut("/Likes/{PId}")]

        public async Task<ActionResult<Post>> UpdateLikes(int PId)
        {
            PostBL postsbl = new PostBL();
            var user = postsbl.UpdateLikes(PId);
            return Ok(await user);
        }

        [HttpPut("/DisLikes/{PId}")]

        public async Task<ActionResult<Post>> DisLikes(int PId)
        {
            PostBL postsbl = new PostBL();
            var user = postsbl.DisLikes(PId);
            return Ok(await user);
        }

        [HttpGet("/isLikes")]

        public async Task<ActionResult<int>> isLikes(int PId,string UserName)
        {
            PostBL postsbl = new PostBL();
            var user = postsbl.isLikes(PId,UserName);
            return Ok(await user);
        }

      


        // get Post per user
        [HttpGet("/PostbyUser")]
        public async Task<ActionResult<Post>> GetPostperUser(string UserName)
        {
            PostBL postsbl = new PostBL();
            var user = postsbl.GetPostperUser(UserName);
            return Ok(await user);
        }


    }
}
