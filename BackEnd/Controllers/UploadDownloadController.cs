using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api")]
    [ApiController]
    public class UploadDownloadController: ControllerBase
    {
    
        [HttpPost]
        [Route("upload")]
        public IActionResult Upload(IFormFile file)
        {
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
    }
}