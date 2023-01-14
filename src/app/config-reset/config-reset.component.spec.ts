import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigResetComponent } from './config-reset.component';

describe('ConfigResetComponent', () => {
  let component: ConfigResetComponent;
  let fixture: ComponentFixture<ConfigResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigResetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
