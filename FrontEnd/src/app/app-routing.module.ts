import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDownloadComponent } from './components/upload-download/upload-download.component';

const routes: Routes = [
  {path: '', component: UploadDownloadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
