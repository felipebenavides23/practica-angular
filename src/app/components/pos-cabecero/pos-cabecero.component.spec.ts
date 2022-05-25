import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosCabeceroComponent } from './pos-cabecero.component';

describe('PosCabeceroComponent', () => {
  let component: PosCabeceroComponent;
  let fixture: ComponentFixture<PosCabeceroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosCabeceroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosCabeceroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
