import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCollapseComponent } from './config-collapse.component';

describe('ConfigCollapseComponent', () => {
  let component: ConfigCollapseComponent;
  let fixture: ComponentFixture<ConfigCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigCollapseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigCollapseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
