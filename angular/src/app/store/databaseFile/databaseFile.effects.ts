import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ImageService } from "../../image.service";
import { map, catchError, of, switchMap, tap, Observable, mergeMap } from "rxjs";
import { loadDatabaseFile, loadDatabaseFileFailure, loadDatabaseFileSuccess } from "./databaseFile.actions";
import { DatabaseFileService } from "../../database-file/service/database-file.service";
import { DatabaseFile } from "../../data/models/databaseFile";
import { Data } from "@angular/router";
import { FileDto } from "../../data/dtos/file.dto";
import { addClothesSuccess, loadCloset } from "../closet/closet.actions";
import { Clothes } from "../../data/models/clothes";
import { Store } from "@ngrx/store";
import { selectClosetId } from "../closet/closet.selector";

@Injectable()
export class DatabaseFileEffects{
    constructor(private actions$: Actions,
        private dbFileService: DatabaseFileService,
        private store: Store
        ) {}
        
        loadDatabaseFile$ = createEffect(() => this.actions$.pipe(
            ofType(loadDatabaseFile),
            mergeMap((action) => this.dbFileService.getDatabaseFileById(action.id).pipe(
                map((databaseFile) => {
                    const {id, filename, data} = databaseFile as DatabaseFile;

                    const buf = {...data}

                    const blob = new Blob([data], { type: 'image/png' });

                    const url = URL.createObjectURL(blob);
                    const ret : FileDto = { 
                        id: id,
                        filename: filename,
                        url: url
                    }

                    return loadDatabaseFileSuccess({databaseFile: ret});
                }),
                catchError((error) => of(loadDatabaseFileFailure({ error })))
            ))
        ));

    loadDatabaseFileSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loadDatabaseFileSuccess),
        tap((action) => {
            console.log(action.databaseFile);
        })
    ), { dispatch: false });


    // addClothesSuccess$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(addClothesSuccess),
    //         switchMap(() => {
    //             return this.store.select(selectClosetId).pipe(
    //                 map((closetId) => loadCloset({ id: closetId }))
    //             );
    //         })
    //     )
    // );

    // addClothesSuccess$ = createEffect(() => this.actions$.pipe(
    //     ofType(addClothesSuccess),
    //     map(() => {
    //         this.store.select(selectClosetId).subscribe((closetId) => {
    //             return(loadCloset({id: closetId}));
    //         }
    //         );
    //     })
    // ));
}