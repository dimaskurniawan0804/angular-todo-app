import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { TodoService } from 'src/app/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let angularFirestore: AngularFirestore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        AuthService,
        HttpClient,
        HttpClientModule,
        HttpHandler,
        TodoService,
        MatSnackBar,
        Overlay,
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
      ],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
