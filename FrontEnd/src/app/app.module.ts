import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UploadDownloadService } from './services/upload-download.service';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './components/upload/upload.component';
import { DownloadComponent } from './components/download/download.component';
import { FileManagerComponent } from './components/file-manager/file-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    FileManagerComponent,
    UploadComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ UploadDownloadService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
