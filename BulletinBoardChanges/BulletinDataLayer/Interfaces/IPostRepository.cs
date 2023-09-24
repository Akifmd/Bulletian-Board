using BulletinDataLayer.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.Interfaces
{
    public interface IPostRepository
    {
        public  Task<List<Post>> GetAllPosts();
        public  Task<SpecificPost> GetPost(int PostId);
        public  Task<List<Post>> GetPostsofsinglecategory(string Category);
        public  Task<List<cat>> GetDistinctCategory();
        public  Task<string> CreatePosts(Ipost[] Obj);
        public  Task<List<Post>> UpdatePosts(Ipost[] Obj);
        public  Task<List<Post>> DeletePosts(Dpost[] mposts);

    }
}
