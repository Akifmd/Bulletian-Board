using BulletinDataLayer.DataModels;
using Microsoft.AspNetCore.Mvc;

namespace BulletinBoardChanges.interfaces
{
    public interface ICategoryController
    {
        public  Task<ActionResult<List<CatName>>> GetCategory();
        public  Task<ActionResult<List<CatName>>> CreateCategory(Category[] Obj);
        public  Task<ActionResult<List<CatName>>> UpdateCategory(Category[] Obj);
        public  Task<ActionResult<List<CatName>>> DeleteCategory(CatName[] obj);


    }
}
