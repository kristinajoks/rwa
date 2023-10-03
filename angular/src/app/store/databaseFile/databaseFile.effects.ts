import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ImageService } from "../../image.service";
import { map, catchError, of, switchMap } from "rxjs";
import { loadDatabaseFile, loadDatabaseFileFailure } from "./databaseFile.actions";
import { DatabaseFileService } from "../../database-file/service/database-file.service";

@Injectable()
export class DatabaseFileEffects{
    constructor(private actions$: Actions,
        private dbFileService: DatabaseFileService,
        ) {}

    loadDatabaseFile$ = createEffect(() => this.actions$.pipe(
        ofType(loadDatabaseFile),
        switchMap((action) => this.dbFileService.getDatabaseFileById(action.id).pipe( 
            map((databaseFile) => ({ type: '[DatabaseFile] Load DatabaseFile Success', databaseFile })),
            catchError((error) => of({ type: '[DatabaseFile] Load DatabaseFile Failure', error }))
        ))
    ));

    

}