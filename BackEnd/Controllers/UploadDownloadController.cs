using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace BackEnd.Controllers
{
    [Route("api")]
    [ApiController]
    public class UploadDownloadController: ControllerBase
    {
        private IHostingEnvironment _hostingEnvironment;

        public UploadDownloadController(IHostingEnvironment environment) {
            _hostingEnvironment = environment;
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            if(!Directory.Exists(uploads))
            {
                Directory.CreateDirectory(uploads);
            }
            if (file.Length > 0) {
                var filePath = Path.Combine(uploads, file.FileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create)) {
                    await file.CopyToAsync(fileStream);
                }
            }
            return Ok();
        }

        [HttpGet]
        [Route("download")]
        public async Task<IActionResult> Download([FromQuery] string file) {
            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            var filePath = Path.Combine(uploads, file);
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var memory = new MemoryStream();
            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return File(memory, GetContentType(filePath), file); 
        }

        [HttpGet]
        [Route("files")]
        public IActionResult Files() {
            var result =  new List<string>();

            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            if(Directory.Exists(uploads))
            {   
                var provider = _hostingEnvironment.ContentRootFileProvider;
                foreach (string fileName in Directory.GetFiles(uploads))
                {
                    var fileInfo = provider.GetFileInfo(fileName);
                    result.Add(fileInfo.Name);
                }
            }
            return Ok(result);
        }  


        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if(!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
    }
}