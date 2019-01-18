using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
            try {
                var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
                var filePath = Path.Combine(uploads, file);
                var memory = new MemoryStream();
                using (var stream = new FileStream(filePath, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;
                return File(memory, GetContentType(filePath), file); 
            }catch(Exception ex) {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("files")]
        public IActionResult Files() {
            var result = new FilesResponse() {
                Count = 0,
                Files = new List<string>()
            };

            var uploads = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");
            if(Directory.Exists(uploads))
            {   
                var provider = _hostingEnvironment.ContentRootFileProvider;
                foreach (string fileName in Directory.GetFiles(uploads))
                {
                    result.Count++;
                    var fileInfo = provider.GetFileInfo(fileName);
                    result.Files.Add(fileInfo.Name);
                }
            }
            return Ok(result);
        }  


        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }      
    }
}