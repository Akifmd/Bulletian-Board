using BulletinDataLayer.DataModels;
using Microsoft.AspNetCore.Mvc;

namespace BulletinBoardChanges.interfaces
{
    public interface IPostController
    {
        public  Task<ActionResult<List<Post>>> GetAllPosts();
        public Task<ActionResult<List<SpecificPost>>> GetPost(int PostId);
        public Task<ActionResult<List<Post>>> GetPostsofsinglecategory(string Category);
        public Task<ActionResult<List<cat>>> GetDistinctCategory();

        public Task<ActionResult<List<Post>>> CreatePosts(Ipost[] Obj);
        public Task<ActionResult<List<Post>>> UpdatePosts(Ipost[] Obj);
        public  Task<ActionResult<List<Dpost>>> DeletePosts(Dpost[] mposts);


    }
}
