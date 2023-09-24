using BulletinDataLayer.DataModels;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.Repository
{
    public class LikesRepo
    {
        public async Task<int> UserLikes(Likes likes)
        {
            using var connection = new SqlConnection(Constant.ConnectionString);
           var user=  await connection.ExecuteScalarAsync("IF NOT EXISTS (SELECT * FROM Likes WHERE UserName = @UserName AND pId = @pId)" +
                "       INSERT INTO Likes (pId, UserName, yes_no) VALUES (@pId, @UserName, 1);  " +
                "  ELSE        UPDATE Likes SET yes_no = CASE yes_no WHEN 0 THEN 1 ELSE 0 END    " +
                "     WHERE UserName = @UserName AND pId = @pId;  " +
                " SELECT yes_no FROM Likes WHERE UserName = @UserName AND pId = @pId;", likes);
            return (int)user;
        }
    }
}
