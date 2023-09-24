using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BulletinDataLayer.DataModels;
using BulletinDataLayer.Repository;
using BulletinBusinessLayer;
using BulletinBoardChanges.interfaces;

namespace BulletinBoardChanges.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase, IRegistartionController
    {
        [HttpPost]
        [Route("RegisterHere")]
        public async Task<ActionResult<List<Registration>>> Registrations(Registration registratiion)
        {
            RegistrationBL registrationbl = new RegistrationBL();
            var res = registrationbl.Registrations(registratiion);
            return Ok(res);

        }

        [HttpPost]
        [Route("LoginHere")]
        public async Task<ActionResult<List<Registration>>> Login(Registration registratiion)
        {
            RegistrationBL registrationbl = new RegistrationBL();
            var res = registrationbl.Login(registratiion);
            return Ok(res);

        }

    }
}
