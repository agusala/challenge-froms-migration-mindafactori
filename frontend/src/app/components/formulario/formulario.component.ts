import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Automotor } from '../../models/automotor.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogSujetoComponent } from '../dialog-sujeto/dialog-sujeto.component';
import { Sujeto } from '../../models/sujeto.model';
import { AutomotorService } from '../../service/automotor.service';
import { SujetoService } from '../../service/sujeto.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule,
    HttpClientModule,
    DialogSujetoComponent
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formulario: FormGroup;
  isEdit = false;
  dominioOriginal: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private automotorService: AutomotorService,
    private sujetoService: SujetoService,
    private dialog: MatDialog
  ) {
    this.formulario = this.fb.group({
      dominio: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}[0-9]{3}$|^[A-Z]{2}[0-9]{3}[A-Z]{2}$/)]],
      numero_chasis: [''],
      numero_motor: [''],
      color: [''],
      fecha_fabricacion: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      cuit_duenio: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });
  }

  ngOnInit(): void {
    const dominio = this.route.snapshot.paramMap.get('dominio');
    if (dominio) {
      this.isEdit = true;
      this.dominioOriginal = dominio;
      this.automotorService.getByDominio(dominio).subscribe((auto: Automotor) => {
        this.formulario.patchValue({
          dominio: auto.dominio,
          numero_chasis: auto.numero_chasis,
          numero_motor: auto.numero_motor,
          color: auto.color,
          fecha_fabricacion: auto.fecha_fabricacion.toString(),
          cuit_duenio: auto.cuit_duenio
        });
        this.formulario.get('dominio')?.disable();
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.invalid) return;
    const formValue = this.formulario.getRawValue();
    const automotor: Automotor = {
      dominio: formValue.dominio,
      numero_chasis: formValue.numero_chasis,
      numero_motor: formValue.numero_motor,
      color: formValue.color,
      fecha_fabricacion: parseInt(formValue.fecha_fabricacion),
      cuit_duenio: formValue.cuit_duenio
    };

    this.sujetoService.findByCuit(automotor.cuit_duenio).subscribe({
      next: (sujeto: Sujeto) => {
        this.guardar(automotor);
      },
      error: (err) => {
        if (err.status === 404) {
          this.abrirDialogCrearSujeto(automotor.cuit_duenio, automotor);
        } else {
          console.error(err);
        }
      }
    });
  }

  abrirDialogCrearSujeto(cuit: string, automotor: Automotor): void {
    const dialogRef = this.dialog.open(DialogSujetoComponent, {
      width: '400px',
      data: { cuit }
    });

    dialogRef.afterClosed().subscribe((result: string | undefined) => {
      if (result) {
        this.sujetoService.create({ cuit, denominacion: result }).subscribe({
          next: () => {
            this.guardar(automotor);
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  guardar(automotor: Automotor): void {
    if (this.isEdit && this.dominioOriginal) {
      this.automotorService.update(this.dominioOriginal, automotor).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err)
      });
    } else {
      this.automotorService.create(automotor).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error(err)
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}