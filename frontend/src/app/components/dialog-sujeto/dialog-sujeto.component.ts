import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-sujeto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-sujeto.component.html',
  styleUrls: ['./dialog-sujeto.component.css']
})
export class DialogSujetoComponent {
  denominacion: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogSujetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cuit: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}