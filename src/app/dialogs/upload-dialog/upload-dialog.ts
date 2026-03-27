import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadServices } from '../../services/upload-services';

@Component({
  selector: 'app-upload-dialog',
  standalone: false,
  templateUrl: './upload-dialog.html',
  styleUrl: './upload-dialog.css',
})
export class UploadDialog implements OnInit {

  readonly dialog = inject(MatDialog);

  veicolo: any = signal<any>(null);
  imageUrl = signal(null);
  msg = signal("");

  fileName: string = '';
  selectedFile: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private uploadServices: UploadServices,
    private dialogRef: MatDialogRef<UploadDialog>
  ) {
    if (data) {
      this.veicolo.set(data.veicolo);
    }
  }

  ngOnInit(): void {
    console.log("marca:" + this.veicolo().marca)
    if (this.veicolo().image != null)
      this.imageUrl.set(this.veicolo().image);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.fileName = '';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = input.files[0]; // recupera il file selezionato
    this.fileName = this.selectedFile.name;

    console.log('File selezionato:', this.selectedFile);

    this.onUpload();

  }
  onUpload() {
    console.log("*** upload *****:");
    this.uploadServices.upload(this.selectedFile, this.veicolo().id)
      .subscribe({
        next: ((r: any) => {
          this.uploadServices.getUrl(r.msg)   // upload image and save in veicolo
            .subscribe(({
              next: ((r: any) => {
                this.imageUrl.set(r.msg);    // load url
              })
            }))
        }),
        error: ((r: any) => {
          console.log(r.error.msg);
          this.msg.set(r.error.msg);
        })


      })
  }


}
