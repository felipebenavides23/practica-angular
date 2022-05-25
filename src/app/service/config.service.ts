import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { config } from '../model/config.model';

@Injectable()
export class configServices {
  configColeccion: AngularFirestoreCollection<config>;
  configDoc: AngularFirestoreDocument<config>;
  configU: Observable<config>;
  constructor(private db: AngularFirestore) {
    this.configColeccion = db.collection('configuracion');
  }

  getconfigedit() {
    this.configDoc = this.db.doc<config>('configuracion/1');

    this.configU = this.configDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === null) {
          return null;
        } else {
          const data = action.payload.data() as config;
          //   console.log(data);
          return data;
        }
      })
    );

    return this.configU;
  }

  editarConfig(configeditar: config) {
    this.configDoc = this.db.doc<config>('configuracion/1');
    this.configDoc.update(configeditar);
  }
}
