import { FlashMessagesService } from 'angular2-flash-messages';
import { ClienteService } from './../../service/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Clientes } from 'src/app/model/cliente.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  cliente: Clientes = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  id: string;
  constructor(
    private ClienteService: ClienteService,
    private FlashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.ClienteService.getClienteEdit(this.id).subscribe((cliente) => {
      this.cliente = cliente;
      console.log(cliente);
    });
  }

  guardaredit({ value, valid }: { value: Clientes; valid: boolean }) {
    if (!valid) {
      this.FlashMessages.show(' porfavor tener el formular bien diligenciado', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      value.id = this.id;
      this.ClienteService.editarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if (confirm('seguro que quiere eliminar al cliente')) {
      this.ClienteService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
