using BulletinBusinessLayer.interfaces;
using BulletinDataLayer.DataModels;
using BulletinDataLayer.Repository;
using Dapper;
using System.Data.SqlClient;
using System.Runtime.InteropServices;

namespace BulletinBusinessLayer
{
    public class PostBL : IPostBL
    {

        // Retrival of All Data
        public async Task<List<Post>> GetAllPosts()
        {
            PostRepository postsRepository = new PostRepository();
            var posts = postsRepository.GetAllPosts();
            return await posts;
        }


        //Get Specific Post Details
        public async Task<SpecificPost> GetPost(int PostId)
        {
            PostRepository postsRepository = new PostRepository();
            var getpost = postsRepository.GetPost(PostId);

            return await getpost;
        }

        //Get All Posts under One Category
        
        public async Task<List<Post>> GetPostsofsinglecategory(string Category)
        {
            PostRepository postsRepository = new PostRepository();
            var GetPostsofsinglecategory = postsRepository.GetPostsofsinglecategory(Category);

            return await GetPostsofsinglecategory;
        }

        //Get Different Categories From Posts
        
     
        public async Task<List<cat>> GetDistinctCategory()
        {
            PostRepository postsRepository = new PostRepository();
            var GetDistinctCategory = postsRepository.GetDistinctCategory();

            return await GetDistinctCategory;
        }


        // Single Insertion 


        public async Task<string> CreateSinglePosts(Ipost Obj)
        {
            PostRepository postsRepository = new PostRepository();
            var createposts = postsRepository.CreateSinglePosts(Obj);
            return await createposts;
        }

        // Insertion 


        public async Task<string> CreatePosts(Ipost[] Obj)
        {
            PostRepository postsRepository = new PostRepository();
            var createposts = postsRepository.CreatePosts(Obj);
            return await createposts;
        }


        // Single Updation


        public async Task<string> UpdateSinglePosts(Ipost Obj)
        {
            PostRepository postsRepository = new PostRepository();
            var UpdatePosts = postsRepository.UpdateSinglePosts(Obj);
            return await UpdatePosts;

        }
        // Updation


        public async Task<List<Post>> UpdatePosts(Ipost[] Obj)
        {
            PostRepository postsRepository = new PostRepository();
            var UpdatePosts = postsRepository.UpdatePosts(Obj);
            return await UpdatePosts;

        }

        // Single Deletion


        public async Task<string> DeleteSinglePosts(string UserName, string Email, int pId)
        {

            PostRepository postsRepository = new PostRepository();
            var deleteposts = postsRepository.DeleteSinglePosts(UserName, Email, pId);
            return await deleteposts;

        }
        // Deletion


        public async Task<List<Post>> DeletePosts(Dpost[] mposts)
        {

            PostRepository postsRepository = new PostRepository();
            var deleteposts = postsRepository.DeletePosts(mposts);
            return await deleteposts;

        }

        //Post By User
        public async Task<List<Post>> GetPostperUser(string UserName)
        {

            PostRepository postsRepository = new PostRepository();
            var user = postsRepository.GetPostperUser(UserName);
            return await user;
        }

        // likes
        public async Task<int> UpdateLikes(int PId)
        {

            PostRepository postsRepository = new PostRepository();
            var user = postsRepository.UpdateLikes(PId);
            return await user;
        }
        //dislikes
        public async Task<int> DisLikes(int PId)
        {
            PostRepository postsRepository = new PostRepository();
            var user = postsRepository.DisLikes(PId);
            return await user;
        }
        //islikes
        public async Task<int> isLikes(int PId, string UserName)
        {
            PostRepository postsRepository = new PostRepository();
            var user = postsRepository.isLikes(PId, UserName);
            return await user;

        }

    }
}