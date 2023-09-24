using BulletinDataLayer.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulletinDataLayer.Interfaces
{
    public interface IRegistartionRepository
    {
        public string DoRegistration(Registration registration);
        public string DoLogin(Registration registration);
    }
}
