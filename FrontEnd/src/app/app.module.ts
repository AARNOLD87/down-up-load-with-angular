import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadDownloadService } from './services/upload-download.service';
import { HttpClientModule } from '@angular/common/http';
import { UploadComponent } from './components/upload/upload.component';
import { DownloadComponent } from './components/download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UploadComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ UploadDownloadService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
