using FileConverterApi.Validation.Exceptions;

namespace FileConverterApi.Validation
{
    public static class ValidationFile
    {
        public static void ValidateFile(IFormFile file)
        {
            if (file.ContentType != ("text/plain"))
                throw new FileException("Arquivo inválido. Somente arquivos do tipo TXT são suportados.");

            if (file == null || file.Length == 0)
                throw new FileException("Arquivo precisa conter valor.");
        }
    }
}
