using BulletinBusinessLayer.interfaces;
using BulletinDataLayer.DataModels;
using BulletinDataLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinBusinessLayer
{
    public class CategoryBL: ICategoryBL
    {

        // Retrival of All Category
       
        public async Task<List<Category>> GetCategory()
        {

            CategoryRepository categoryrepository = new CategoryRepository();
            // var CategoryObj = categoryrepository.GetCategory();
            return await categoryrepository.GetCategory();
        }

        //Insert Category
       
        public async Task<List<CatName>> CreateCategory(Category[] Obj)
        {

            CategoryRepository categoryrepository = new CategoryRepository();
            var CategoryObj = categoryrepository.CreateCategory(Obj);
            return await CategoryObj;
        }

        //Update Category

       
        public async Task<List<CatName>> UpdateCategory(Category[] Obj)
        {
            CategoryRepository categoryrepository = new CategoryRepository();
            var CategoryObj = categoryrepository.UpdateCategory(Obj);

            return await CategoryObj;
        }


        //Delete Category

       
        public async Task<List<CatName>> DeleteCategory(CatName[] obj)
        {
            CategoryRepository categoryrepository = new CategoryRepository();
            var CategoryObj = categoryrepository.DeleteCategory(obj);

            return await CategoryObj;
        }
    }
}
