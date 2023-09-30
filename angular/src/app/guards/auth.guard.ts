import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectIsAuthenticated } from '../store/auth/auth.selector';
import { map, take } from 'rxjs';
import { inject } from '@angular/core';
import { AuthState } from '../store/auth/auth.state';

export const authGuard: CanActivateFn = (route, state) => {

  const store = inject(Store<AuthState>);
  const router = inject(Router);

  return store.pipe(
    select(selectIsAuthenticated),
    take(1),
    map((isAuthenticated) => {
      if(!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      else{
        return true;
      }
    })
  );
};

export const unAuthGuard: CanActivateFn = (route, state) => {
  
    const store = inject(Store<AuthState>);
    const router = inject(Router);
  
    return store.pipe(
      select(selectIsAuthenticated),
      take(1),
      map((isAuthenticated) => {
        if(isAuthenticated) {
          router.navigate(['/home']);
          return false;
        }
        else{
          return true;
        }
      })
    );
  };