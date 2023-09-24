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
    public class RegistrationBL: IRegistrationBL
    {
        public  string Registrations(Registration registratiion)
        {
            RegistrationRepository registrationRepository = new RegistrationRepository();
            var res = registrationRepository.DoRegistration(registratiion);
             return res;
           
            

        }
        public string Login(Registration registratiion)
        {
            RegistrationRepository registrationRepository = new RegistrationRepository();
            var res = registrationRepository.DoLogin(registratiion);
            return res;

        }
    }
}
