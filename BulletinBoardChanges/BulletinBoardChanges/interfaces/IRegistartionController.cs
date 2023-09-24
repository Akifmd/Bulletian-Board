using BulletinDataLayer.DataModels;
using Microsoft.AspNetCore.Mvc;

namespace BulletinBoardChanges.interfaces
{
    public interface IRegistartionController
    {
        public  Task<ActionResult<List<Registration>>> Registrations(Registration registratiion);
        public  Task<ActionResult<List<Registration>>> Login(Registration registratiion);
        

    }
}
