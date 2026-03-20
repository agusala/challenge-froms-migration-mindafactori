import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AutomotorService } from '../../service/automotor.service';
import { Automotor } from '../../models/automotor.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [CommonModule, RouterModule,HttpClientModule],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  automotores: Automotor[] = [];

  constructor(
    private automotorService: AutomotorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this.automotorService.getAll().subscribe((data: Automotor[]) => {
      this.automotores = data;
    });
  }

  editar(dominio: string): void {
    this.router.navigate(['/formulario', dominio.toUpperCase()]);
  }

  nuevo(): void {
    this.router.navigate(['/formulario']);
  }

  eliminar(dominio: string): void {
    if (confirm('¿Está seguro de eliminar este automotor?')) {
      this.automotorService.delete(dominio).subscribe(() => {
        this.cargarLista();
      });
    }
  }
}