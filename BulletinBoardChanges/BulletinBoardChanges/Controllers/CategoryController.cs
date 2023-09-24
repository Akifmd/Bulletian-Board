using BulletinBoardChanges.interfaces;
using BulletinBusinessLayer;
using BulletinDataLayer.DataModels;
using BulletinDataLayer.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Data.SqlClient;

namespace BulletinBoardChanges.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase, ICategoryController
    {

        // Retrival of All Category
        [HttpGet]
        public async Task<ActionResult<List<CatName>>> GetCategory()
        {

            CategoryBL categorybl = new CategoryBL();
            var CategoryObj = categorybl.GetCategory();
            return Ok(await CategoryObj);
        }

        //Insert Category
        [HttpPost("InsertCategory")]
        public async Task<ActionResult<List<CatName>>> CreateCategory(Category[] Obj)
        {

            CategoryBL categorybl = new CategoryBL();
            var CategoryObj = categorybl.CreateCategory(Obj);
            return Ok(await CategoryObj);
        }

        //Update Category

        [HttpPut("UpdateCategory")]
        public async Task<ActionResult<List<CatName>>> UpdateCategory(Category[] Obj)
        {
            CategoryBL categorybl = new CategoryBL();
            var CategoryObj = categorybl.UpdateCategory(Obj);

            return Ok(await CategoryObj);
        }


        //Delete Category

        [HttpDelete("DeleteCategory")]
        public async Task<ActionResult<List<CatName>>> DeleteCategory(CatName[] obj)
        {
            CategoryBL categorybl = new CategoryBL();
            var CategoryObj = categorybl.DeleteCategory(obj);

            return Ok(await CategoryObj);
        }
    }
}
