import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPermissionUnauthorizedComponent } from './error-permission-unauthorized.component';

describe('ErrorPermissionUnauthorizedComponent', () => {
  let component: ErrorPermissionUnauthorizedComponent;
  let fixture: ComponentFixture<ErrorPermissionUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPermissionUnauthorizedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorPermissionUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
