import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Clientes } from '../model/cliente.model';

@Injectable()
export class ClienteService {
  clientesColeccion: AngularFirestoreCollection<Clientes>;
  clienteDoc: AngularFirestoreDocument<Clientes>;
  clientes: Observable<Clientes[]>;
  cliente: Observable<Clientes>;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }

  getCliente(): Observable<Clientes[]> {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Clientes;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );

    return this.clientes;
  }

  CrearCliente(cliente: Clientes) {
    this.clientesColeccion.add(cliente);
  }
  getClienteEdit(id: string) {
    this.clienteDoc = this.db.doc<Clientes>(`clientes/${id}`);

    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const datos = action.payload.data() as Clientes;
          datos.id = action.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }
  editarCliente(editar: Clientes) {
    this.clienteDoc = this.db.doc<Clientes>(`clientes/${editar.id}`);
    this.clienteDoc.update(editar);
  }

  eliminarCliente(eliminar: Clientes) {
    this.clienteDoc = this.db.doc<Clientes>(`clientes/${eliminar.id}`);
    this.clienteDoc.delete();
  }
}
