import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesindexComponent } from './clientesindex.component';

describe('ClientesindexComponent', () => {
  let component: ClientesindexComponent;
  let fixture: ComponentFixture<ClientesindexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesindexComponent]
    });
    fixture = TestBed.createComponent(ClientesindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
