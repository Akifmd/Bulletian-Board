using BulletinDataLayer.DataModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using BulletinDataLayer.Interfaces;

namespace BulletinDataLayer.Repository
{
    public class CategoryRepository: IcategoryRepository
    {


        // Retrival of All Category
        public async Task<List<Category>> GetCategory()
        {

            using var connection = new SqlConnection(Constant.ConnectionString);
            IEnumerable<Category> CategoryObj = await GetAllCategory(connection);
            return (List<Category>)CategoryObj;
        }



        //Insert Category

        public async Task<List<CatName>> CreateCategory(Category[] Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            foreach (var item in Obj)
            {
                await connection.ExecuteAsync("insert into category (cateid,categoryName) values (@cateid,@categoryname)", item);
            }
            return (List<CatName>)await GetAllCategory(connection);
        }

        //Update Category

        public async Task<List<CatName>> UpdateCategory(Category[] Obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
            foreach (var item in Obj)
            {
                await connection.ExecuteAsync("Update Category set  CategoryName=@CategoryName where cateid=@cateid", item);
            }
            return (List<CatName>)await GetAllCategory(connection);
        }

        //Delete Category
        public async Task<List<CatName>> DeleteCategory(CatName[] obj)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);

            foreach (var categoryname in obj)
            {
                await connection.ExecuteAsync("Delete from Category  where categoryName=@categoryName", categoryname);
            }

            return (List<CatName>)await GetAllCategory(connection);
        }

        private static async Task<IEnumerable<Category>> GetAllCategory(SqlConnection connection)
        {
            return await connection.QueryAsync<Category>("Select * from Category");
        }
    }
}
