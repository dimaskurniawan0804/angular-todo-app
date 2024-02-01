import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public angularFireAuth: AngularFireAuth // Inject Firebase auth service
  ) {}

  signUp(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      catchError((error) => {
        window.alert(error.message);
        throw error;
      })
    );
  }

  signIn(email: string, password: string): Observable<any> {
    console.log(email, password);
    return from(
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
