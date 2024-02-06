import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { TodoService } from 'src/app/services/todo.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { of } from 'rxjs';

const angularFireAuthStub = {
  authState: of(null),
};

class AngularFirestoreCollectionMock<T> {
  valueChanges() {
    return of([]);
  }
}

const angularFirestoreStub = {
  collection: jasmine
    .createSpy('collection')
    .and.returnValue(new AngularFirestoreCollectionMock()),
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let todoService: TodoService;
  let angularFirestore: AngularFirestore;

  const spyTodoService = jasmine.createSpyObj('TodoService', [
    'fetchRandomQuote',
  ]);

  const spyAuthService = jasmine.createSpyObj('AuthService', ['signUp']);

  spyTodoService.fetchRandomQuote.and.returnValue(
    of({
      content: 'Test',
      author: 'Test',
    })
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: spyAuthService },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: TodoService, useValue: spyTodoService },
        MatSnackBar,
        Overlay,
        HttpClient,
        HttpClientModule,
        HttpHandler,
      ],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    todoService = TestBed.inject(TodoService);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Fetch Random Quote', () => {
    expect(component.randomQuote).toEqual({
      content: 'Test',
      author: 'Test',
    });
  });

  it('should call signUp method in AuthService', () => {
    const spySignUp = spyAuthService.signUp;
    spyAuthService.signUp.and.returnValue(of(/* some value */));
    component.email.setValue('test@mail.com');
    component.displayname.setValue('test');
    component.password.setValue('password');
    component.signUp();
    fixture.detectChanges();
    expect(spySignUp).toHaveBeenCalledWith('test@mail.com', 'password');
  });
});
