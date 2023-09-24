using BulletinBusinessLayer;
using BulletinDataLayer.DataModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BulletinBoardChanges.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        [HttpPost("/Likes")]
        public async Task<ActionResult<Likes>> UserLikes(Likes likes)
        {
            LikesBL likesBL = new LikesBL();
            var res = await likesBL.UserLikes(likes);
            return Ok(res);
        }
    }
}
