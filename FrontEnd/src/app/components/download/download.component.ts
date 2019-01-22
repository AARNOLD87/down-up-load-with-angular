import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from 'src/app/services/upload-download.service';
import { ProgressStatus, ProgressStatusEnum } from 'src/app/models/progress-status.model';

@Component({
  selector: 'app-download',
  templateUrl: 'download.component.html'
})

export class DownloadComponent {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private service: UploadDownloadService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  public download() {
    this.downloadStatus.emit( {status: ProgressStatusEnum.START});
    this.service.downloadFile(this.fileName).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.fileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        this.downloadStatus.emit( {status: ProgressStatusEnum.ERROR});
      }
    );
  }
}
