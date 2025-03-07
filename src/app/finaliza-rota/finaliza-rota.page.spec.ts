import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalizaRotaPage } from './finaliza-rota.page';

describe('FinalizaRotaPage', () => {
  let component: FinalizaRotaPage;
  let fixture: ComponentFixture<FinalizaRotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalizaRotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
