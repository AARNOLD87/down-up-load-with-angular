import { Component, OnInit } from '@angular/core';
import { UploadDownloadService } from 'src/app/services/upload-download.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html'
})

export class UploadComponent {
  public selectedFile;
  public percentageUpload: number;
  public showProgress: boolean;

  constructor(private service: UploadDownloadService) { }

  public upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.percentageUpload = 0;
      this.showProgress = true;
      this.service.uploadFile(file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.percentageUpload = Math.round((data.loaded / data.total) * 100);
                break;
              case HttpEventType.Response:
                this.selectedFile = '';
                this.showProgress = false;
                break;
            }
          }
        },
        error => {
          this.selectedFile = '';
          this.showProgress = false;
          alert('ci sono stati errori durante l\'upload');
        }
      );
    }
  }
}
