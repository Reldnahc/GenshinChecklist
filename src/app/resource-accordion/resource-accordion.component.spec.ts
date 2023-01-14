import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAccordionComponent } from './resource-accordion.component';

describe('ResourceAccordionComponent', () => {
  let component: ResourceAccordionComponent;
  let fixture: ComponentFixture<ResourceAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceAccordionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
