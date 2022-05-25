import { FlashMessagesService } from 'angular2-flash-messages';
import { ClienteService } from './../../service/cliente.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Clientes } from 'src/app/model/cliente.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Clientes[];
  cliente: Clientes = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  @ViewChild('ClienteForm') clienteform: NgForm;
  @ViewChild('botonCerrar') botoncerrar: ElementRef;
  constructor(
    private ClienteService: ClienteService,
    private FlashMessages: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.ClienteService.getCliente().subscribe((cliente) => {
      console.log(cliente);
      this.clientes = cliente;
    });
  }

  getSaldototal(): number {
    let saldototal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldototal = saldototal + cliente.saldo;
      });
    }
    return saldototal;
  }

  agregarCliente({ value, valid }: { value: Clientes; valid: boolean }) {
    if (!valid) {
      this.FlashMessages.show('por favor lleanr todo el formulario', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      this.ClienteService.CrearCliente(value);
      this.clienteform.resetForm();
      this.botoncerrar.nativeElement.click();
    }
  }

  modificar(id: string) {
    this.ClienteService.getClienteEdit(id).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }
}
