import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { Menu, MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActionsComponent } from './actions.component';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  const mouseClickMock = jasmine.createSpyObj<Event>('Event', ['stopPropagation']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActionsComponent, CommonModule, MenuModule,
        NgxPermissionsModule.forRoot(), TranslateModule.forRoot(),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openActions', () => {
    it('should toggle menu to show actions', () => {
      const menuMock = jasmine.createSpyObj<Menu>('Menu', ['toggle']);
      fixture.componentRef.setInput('menu', menuMock);
      fixture.detectChanges();

      fixture.componentRef.setInput('actions', () => []);
      component.toggle(mouseClickMock);
      expect(menuMock.toggle).toHaveBeenCalled();
      expect(mouseClickMock.stopPropagation).toHaveBeenCalled();
    });
  });

  it('should prepare list with correct permissions and conditions', (done: DoneFn) => {
    TestBed.inject(NgxPermissionsService).loadPermissions(['manage:item']);

    fixture.componentRef.setInput('actions', () => [{
      label: 'Manage Item',
      permissions: ['manage:item'],
      conditions: [true],
    }])

    component.toggle(mouseClickMock);
    component.options$.subscribe((options) => {
      expect(options[0].label).toEqual('Manage Item');
      done();
    });
  });

  it('should hide action with not allowed permission', (done: DoneFn) => {
    TestBed.inject(NgxPermissionsService).flushPermissions();

    fixture.componentRef.setInput('actions', () => [{
      label: 'Manage Item',
      permissions: ['manage:item'],
      conditions: [true],
    }])

    component.toggle(mouseClickMock);
    component.options$.subscribe((options) => {
      expect(options[0].label).toEqual('messages.noActions');
      done();
    });
  });

  it('should show action without permissions or conditions', (done: DoneFn) => {

    fixture.componentRef.setInput('actions', () => [{ label: 'Manage Item' }]);
    component.toggle(mouseClickMock);
    component.options$.subscribe((options) => {
      expect(options[0].label).toEqual('Manage Item');
      done();
    });
  });

  it('should show separator action', (done: DoneFn) => {
    fixture.componentRef.setInput('actions', () => [{ separator: true }]);
    component.toggle(mouseClickMock);

    component.options$.subscribe((options) => {
      expect(options[0].label).toEqual('');
      expect(options[0].separator).toEqual(true);
      done();
    });
  });

  it('should translate label for action', (done: DoneFn) => {
    const translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('en', { manageItem: 'Manage {{item}}' });
    translateService.setDefaultLang('en');

    fixture.componentRef.setInput('actions', () => [{ label: ['manageItem', { item: 'user' }] }]);
    component.toggle(mouseClickMock);
    component.options$.subscribe((options) => {
      expect(options[0].label).toEqual('Manage user');
      done();
    });
  });
});
