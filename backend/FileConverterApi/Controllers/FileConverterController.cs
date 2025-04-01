using FileConverterApi.Services;
using Microsoft.AspNetCore.Mvc;
using FileConverterApi.Validation;
using Microsoft.AspNetCore.RateLimiting;
using FileConverterApi.Validation.Exceptions;

namespace FileConverterApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileConverterController : ControllerBase
    {
        [HttpPost("convert")]
        [EnableRateLimiting("upload")]
        public async Task<IActionResult> ConvertFile(IFormFile file)
        {
            try
            {
                ValidationFile.ValidateFile(file);

                FileConverterService fileService = new();

                Task<FileStreamResult> serviceConvertResult = fileService.ConvertFileTxt(file);

                return await serviceConvertResult;
            }
            catch (FileException ex)
            {
                return BadRequest(new {succes = false, message = ex.Message});
            }
            catch (Exception)
            {
                return StatusCode(500, new {succes = false, message = "Ocorreu um erro interno."});
            }

        }
    }
}