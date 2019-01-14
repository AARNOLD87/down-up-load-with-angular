import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable()
export class UploadDownloadService {
  private baseApiUrl: string;
  private apiDownloadUrl: string;
  private apiUploadUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = 'https://localhost:5001/api/';
    this.apiDownloadUrl = this.baseApiUrl + 'download';
    this.apiUploadUrl = this.baseApiUrl + 'upload';
  }

  public downloadFile(): Observable<string> {
    return of(this.apiDownloadUrl);
  }

  public uploadFile(file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<any>(this.apiUploadUrl, formData);
  }
}
