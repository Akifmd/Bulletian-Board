using BulletinDataLayer.DataModels;
using BulletinDataLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinBusinessLayer
{
    public class LikesBL
    {
        public async Task<int> UserLikes(Likes likes)
        {
            LikesRepo likesRepo = new LikesRepo();
            int res = await likesRepo.UserLikes(likes);
            return res;
        }
    }
}
