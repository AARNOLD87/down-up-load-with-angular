import { Component, OnInit } from '@angular/core';
import { UploadDownloadService } from 'src/app/services/upload-download.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public selectedFile;

  constructor(private service: UploadDownloadService) { }

  ngOnInit() {
  }

  public download() {
    this.service.downloadFile().subscribe(
      url => {
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.href = url;
        a.target = '_blank';
        a.click();
      }
    );
  }

  public upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.service.uploadFile(file).subscribe(
        data => {
          if (data) {
            console.log(data);

            switch (data.type) {
              case HttpEventType.UploadProgress:
                break;
              case HttpEventType.Response:
                this.selectedFile = '';
                alert('upload andato a buon fine');
                break;
            }
          }
        },
        error => {
          this.selectedFile = '';
          alert('ci sono stati errori durante l\'upload');
        }
      );
    }
  }
}
