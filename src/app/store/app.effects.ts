import {Injectable} from "@angular/core";
import {Actions, ofType, createEffect} from "@ngrx/effects";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {
    createProductItemAction,
    createProductItemErrorAction,
    createProductItemSuccessAction,
    deleteProductItemAction,
    deleteProductItemErrorAction,
    deleteProductItemSuccessAction,
    getProductItemAction,
    getProductItemErrorAction,
    getProductItemSuccessAction,
    updateProductItemAction, updateProductItemErrorAction,
    updateProductItemSuccessAction
} from "./app.action";
import {catchError, mergeMap, tap} from "rxjs/operators";
import {map, of} from "rxjs";
import {ProductService} from "../service/product-service";


@Injectable()
export class AppEffects {
    constructor(private actions$: Actions,
                private router: Router,
                private productService: ProductService,
                private toastr: ToastrService) {
    }

///////////////////////////////LOAD ITEMS/////////////////////////////////
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getProductItemAction),
            mergeMap(() => this.productService.getItems().pipe(
                map(items => getProductItemSuccessAction({items})),
                catchError(() => of(getProductItemErrorAction()))
            ))
        )
    );
///////////////////////////////DELETE ITEM/////////////////////////////////
    deleteItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProductItemAction),
            mergeMap((action) => this.productService.deleteItem(action.id).pipe(
                map(items => deleteProductItemSuccessAction({id: action.id})),
                catchError(() => of(deleteProductItemErrorAction()))
            ))
        )
    );

    deleteProductItemSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(deleteProductItemSuccessAction),
                tap(() => {
                    this.toastr.success('Item deleted successfully');
                })
            ),
        {dispatch: false}
    );
    deleteProductItemError$ = createEffect(() =>
            this.actions$.pipe(
                ofType(deleteProductItemErrorAction),
                tap(() => {
                    this.toastr.success('Item deleted error');
                })
            ),
        {dispatch: false}
    );
//////////////////////////CREATE ITEM//////////////////////////////////////
    createItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createProductItemAction),
            mergeMap((action) => this.productService.createItem(action.name, action.description, action.imageUrl).pipe(
                map(item => createProductItemSuccessAction({item: item})),
                catchError(() => of(createProductItemErrorAction()))
            ))
        )
    );
    createProductItemSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(createProductItemSuccessAction),
                tap(() => {
                    this.toastr.success('Item create successfully');
                })
            ),
        {dispatch: false}
    );
    createProductItemError$ = createEffect(() =>
            this.actions$.pipe(
                ofType(createProductItemErrorAction),
                tap(() => {
                    this.toastr.success('Item create error');
                })
            ),
        {dispatch: false}
    );
//////////////////////////UPDATE ITEM/////////////////////////////////////////
    updateItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProductItemAction),
            mergeMap((action) =>
                this.productService.updateItem(action.id, action.name, action.description, action.imageUrl).pipe(
                    map((item) => updateProductItemSuccessAction({itemUpdate: item})),
                    catchError(() => of(updateProductItemErrorAction()))
                )
            )
        )
    );
    updateProductItemSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(updateProductItemSuccessAction),
                tap(() => {
                    this.toastr.success('Item update successfully');
                })
            ),
        {dispatch: false}
    );
    updateProductItemError$ = createEffect(() =>
            this.actions$.pipe(
                ofType(updateProductItemErrorAction),
                tap(() => {
                    this.toastr.success('Item deleted error');
                })
            ),
        {dispatch: false}
    );
}
