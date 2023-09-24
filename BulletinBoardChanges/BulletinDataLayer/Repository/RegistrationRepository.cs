using BulletinDataLayer.DataModels;
using BulletinDataLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.Repository
{
    public class RegistrationRepository: IRegistartionRepository
    {
        public string DoRegistration(Registration registration)
        {

            SqlConnection sql = new SqlConnection(Constant.ConnectionString);
            sql.Open();
            SqlCommand cmd = new SqlCommand("Insert into Registration (UserName,Password,Email) values ('" + registration.UserName + "','" + registration.Password + "','" + registration.Email + "')", sql);
            int i = cmd.ExecuteNonQuery();
            sql.Close();

            if (i > 0)
            {
                return "Data Inserted";

            }
            else
                return "Error";

        }

        public string DoLogin(Registration registration)
        {
            SqlConnection sql = new SqlConnection(Constant.ConnectionString);
            sql.Open();
            SqlDataAdapter sd = new SqlDataAdapter($"Select * from Registration WHERE  UserName='" + registration.UserName + "' AND Email='" + registration.Email + "' AND Password = '" + registration.Password + "' ", sql);
            DataTable dt = new DataTable();
            sd.Fill(dt);

            if (dt.Rows.Count > 0)
            {
                return "Valid User";
            }
            else
            {
                return "Invalid User";
            }

        }

    }
}
