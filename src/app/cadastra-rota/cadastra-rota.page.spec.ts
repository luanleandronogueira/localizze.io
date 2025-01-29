import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastraRotaPage } from './cadastra-rota.page';

describe('CadastraRotaPage', () => {
  let component: CadastraRotaPage;
  let fixture: ComponentFixture<CadastraRotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastraRotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
