import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ImageService } from "../../image.service";
import { map, catchError, of, switchMap, tap, Observable, mergeMap } from "rxjs";
import { loadDatabaseFile, loadDatabaseFileFailure, loadDatabaseFileSuccess } from "./databaseFile.actions";
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
            
                    // loadDatabaseFile$ = createEffect(() => this.actions$.pipe(
                    //         ofType(loadDatabaseFile),
                    //         switchMap((action) => this.dbFileService.getDatabaseFileById(action.id).pipe( 
                    //             map((databaseFile : Blob) => (
                    //                 { type: '[DatabaseFile] Load DatabaseFile Success', databaseFile :
                    //             {
                    //                 blob: databaseFile
                    //             } })),
                    //             catchError((error) => of({ type: '[DatabaseFile] Load DatabaseFile Failure', error }))
                    //         ))
                    //     ));
            
            //     loadDatabaseFile$ = createEffect(() =>
            //     this.actions$.pipe(
//       ofType(loadDatabaseFile),
//       switchMap((action) =>
//         this.dbFileService.getDatabaseFileById(action.id).pipe(
    //           mergeMap((blob: Blob) =>
    //             this.blobToUint8Array(blob).pipe(
        //               map((data: Uint8Array) =>
        //                 loadDatabaseFileSuccess({
            //                   databaseFile: { id: action.id, filename: "", data }
            //                 })
//               ),
//               catchError((error) => of(loadDatabaseFileFailure({ error })))
//             )
//           )
//         )
//       )
//     )
//   );

//   private blobToUint8Array(blob: Blob): Observable<Uint8Array> {
//     return new Observable<Uint8Array>((observer) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.result instanceof ArrayBuffer) {
//             const arrayBuffer = reader.result;
//             const dataArray = Array.from(arrayBuffer);
//           observer.next(new Uint8Array(reader.result));
//           observer.complete();
//         } else {
//           observer.error("Failed to convert Blob to Uint8Array");
//         }
//       };
//       reader.onerror = () => {
//         observer.error("Error reading Blob data");
//       };
//       reader.readAsArrayBuffer(blob);
//     });
//   }

    loadDatabaseFileSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loadDatabaseFileSuccess),
        tap((action) => {
            console.log(action.databaseFile);
        })
    ), { dispatch: false });

}