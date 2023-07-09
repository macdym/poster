using Microsoft.AspNetCore.Http;
using poster.application.Photos;

namespace poster.application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
}
