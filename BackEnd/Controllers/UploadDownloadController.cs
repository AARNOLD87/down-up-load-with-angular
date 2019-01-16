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
        public IActionResult Download() {
            var comlumHeadrs = new string[]
            {
                "Column 1",
                "Column 2",
                "Column 3"
            };
 
            var records = new[]
            { 
                new string[] {"name 1", "surname 1", "30" },
                new string[] {"name 2", "surname 2", "30" },
                new string[] {"name 3", "surname 3", "30" },
                new string[] {"name 4", "surname 4", "30" },
            }.ToList();
 
            // Build the file content
            var csv = new StringBuilder();
            records.ForEach(line =>
            {
                csv.AppendLine(string.Join(",", line));
            });
 
            byte[] buffer = Encoding.ASCII.GetBytes($"{string.Join(",", comlumHeadrs)}\r\n{csv.ToString()}");
   
            return File(buffer,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "file.csv"); 
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
                foreach (string fileName in Directory.GetFiles(uploads))
                {
                    result.Count++;
                    result.Files.Add(fileName);
                }
            }
            return Ok(result);
        }        
    }
}