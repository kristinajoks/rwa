import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectToken } from "../store/auth/auth.selector";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let token = "";
        this.store.select(selectToken).subscribe((t) => {
            token = t ?? ""; 
        });

        const authReq = req.clone({
            headers: req.headers.set("Authorization", `Bearer ${token}`)
        });

        return next.handle(authReq);
    }
}