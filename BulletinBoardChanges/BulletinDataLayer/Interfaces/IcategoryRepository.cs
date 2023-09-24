using BulletinDataLayer.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.Interfaces
{
    public interface IcategoryRepository
    {
        public  Task<List<Category>> GetCategory();
        public  Task<List<CatName>> CreateCategory(Category[] Obj);


        public  Task<List<CatName>> UpdateCategory(Category[] Obj);
        public  Task<List<CatName>> DeleteCategory(CatName[] obj);

    }
}
