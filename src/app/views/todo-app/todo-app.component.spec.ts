import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoAppComponent } from './todo-app.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { TodoService } from 'src/app/services/todo.service';

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

describe('TodoAppComponent', () => {
  let component: TodoAppComponent;
  let fixture: ComponentFixture<TodoAppComponent>;
  let angularFirestore: AngularFirestore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoAppComponent],
      providers: [
        HttpClient,
        HttpClientModule,
        HttpHandler,
        TodoService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
      ],
    }).compileComponents();

    angularFirestore = TestBed.inject(AngularFirestore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
