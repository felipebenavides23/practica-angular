import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos-cabecero',
  templateUrl: './pos-cabecero.component.html',
  styleUrls: ['./pos-cabecero.component.css'],
})
export class PosCabeceroComponent implements OnInit {
  @Input() titulo;

  constructor() {}

  ngOnInit(): void {
    console.log(this.titulo.titulo);
  }
}
