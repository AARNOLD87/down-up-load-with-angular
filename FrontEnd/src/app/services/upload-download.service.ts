import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable()
export class UploadDownloadService {
  private baseApiUrl: string;
  private apiDownloadUrl: string;
  private apiUploadUrl: string;
  private apiFileUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = 'https://localhost:5001/api/';
    this.apiDownloadUrl = this.baseApiUrl + 'download';
    this.apiUploadUrl = this.baseApiUrl + 'upload';
    this.apiFileUrl = this.baseApiUrl + 'files';
  }

  public downloadFile(file: string): Observable<any> {
    const downloadApiUrl = `${this.apiDownloadUrl}?file=${file}`;
    const httpOptions = {
      'responseType'  : 'blob' as 'json'
    };

    return this.httpClient.request(new HttpRequest(
      'GET',
      `${this.apiDownloadUrl}?file=${file}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob' as 'json'
      }));
  }

  public uploadFile(file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.request(new HttpRequest(
      'POST',
      this.apiUploadUrl,
      formData,
      {
        reportProgress: true
      }));
  }

  public getFiles(): Observable<any> {
    return this.httpClient.get(this.apiFileUrl);
  }
}
