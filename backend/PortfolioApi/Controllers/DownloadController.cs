using Microsoft.AspNetCore.Mvc;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DownloadController : ControllerBase
{
    [HttpGet("resume")]
    public ActionResult GetResume()
    {
        var resumeUrl = "https://customer-assets.emergentagent.com/job_tech-portfolio-3d-10/artifacts/2gz02bcn_Santosh_Nyaupane_cv.pdf";
        return Ok(new { url = resumeUrl, filename = "Santosh_Nyaupane_Resume.pdf" });
    }

    [HttpGet("achievements")]
    public ActionResult GetAchievements()
    {
        var achievementsUrl = "https://customer-assets.emergentagent.com/job_tech-portfolio-3d-10/artifacts/y8137tbx_Achievements_new.pdf";
        return Ok(new { url = achievementsUrl, filename = "Santosh_Nyaupane_Achievements.pdf" });
    }
}
