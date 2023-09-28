import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('output: submit', () => {
    it('should emit the form value', () =>{
      const testData = {
        username: 'test',
        password: 'test'
      }
      component.form.setValue(testData);

      const observerSpy = subscribeSpyTo(component.submit);
      // fixture.detectChanges();

      const submitButton = fixture.nativeElement.querySelector('.log-in-btn');

      submitButton.click();
      expect(observerSpy.getLastValue()).toEqual(testData);

    })
  })

});

