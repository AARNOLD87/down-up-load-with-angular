import { Component, OnInit } from '@angular/core';
import { UploadDownloadService } from 'src/app/services/upload-download.service';

@Component({
  selector: 'app-upload-download',
  templateUrl: './upload-download.component.html',
  styleUrls: ['./upload-download.component.css']
})
export class UploadDownloadComponent implements OnInit {

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
        success => {
          this.selectedFile = '';
          alert('upload andato a buon fine');
        },
        error => {
          this.selectedFile = '';
          alert('ci sono stati errori durante l\'upload');
        }
      );
    }
  }
}
