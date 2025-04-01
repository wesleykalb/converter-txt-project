using Microsoft.AspNetCore.Mvc;

namespace FileConverterApi.Services
{
    class FileConverterService
    {
        public async Task<FileStreamResult> ConvertFileTxt(IFormFile file)
        {
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                var content = await reader.ReadToEndAsync();
                var convertedContent = content.ToUpper();

                var memoryStream = new MemoryStream();
                var writer = new StreamWriter(memoryStream);
                await writer.WriteAsync(convertedContent);
                await writer.FlushAsync();
                memoryStream.Position = 0;

                return new FileStreamResult(memoryStream, "text/plain")
                {
                    FileDownloadName = "converted_" + file.FileName
                };
            }
        }
    }
}
