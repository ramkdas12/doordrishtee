import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
describe('AppComponent', () => {
  
  beforeEach(async(() => {
    const _dataService = jasmine.createSpyObj('DataService', ['getUsers']);
    const test = {
      name: 'John Rambo',
      id: '1'
    }
    // const dataService = TestBed.get(DataService);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ], 
      providers:    [
        DataService,
        { provide: DataService, useValue: _dataService }
      ]
    });
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Rambo'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Rambo');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome Rambo');
  }));
});
