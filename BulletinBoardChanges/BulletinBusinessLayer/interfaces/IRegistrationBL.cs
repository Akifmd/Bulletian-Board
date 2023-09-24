using BulletinDataLayer.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinBusinessLayer.interfaces
{
    public interface IRegistrationBL
    {
        public string Registrations(Registration registratiion);
        public string Login(Registration registratiion);
    }
}
