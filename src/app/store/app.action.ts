import {createAction, props} from "@ngrx/store";
import {Item} from "../../modal-interface/modal-item.interface";


//////////////////NAVIGATION BLOCK//////////////////////////
export const navigateToProductAction = createAction(
    "[Main page] Navigate to product"
);

export const navigationToMainPageAction = createAction(
    "[Product page] Navigate to main page"
);
////////////////////MODAL WINDOW EDIT///////////////////////
export const openModalWindowAction = createAction(
    "[Main page] Open modal window edit",
    props<{ isEditOrCreate: boolean }>()
);

export const closeModalWindowAction = createAction(
    "[Main page] Close modal window edit"
);

////////////////////GET PRODUCT ITEM////////////////////////
export const getProductItemAction = createAction(
    "[Main page] Get product",
    props<{ offset: number }>()
);

export const getProductItemSuccessAction = createAction(
    "[Main page] Get product success",
    props<{ items: any }>()
);

export const getProductItemErrorAction = createAction(
    "[Main page] Get product error"
);
////////////////////DELETE ITEM/////////////////////////////
export const deleteProductItemAction = createAction(
    "[Main page] Delete product",
    props<{ id: string }>()
);

export const deleteProductItemSuccessAction = createAction(
    "[Main page] Delete product success",
    props<{id: string}>()
);

export const deleteProductItemErrorAction = createAction(
    "[Main page] Delete product error"
);
///////////////////ADD ITEM///////////////////////////////////
export const createProductItemAction = createAction(
    "[Main page] Create product item",
    props<{ name: string; description: string; imageUrl: string }>()
);

export const createProductItemSuccessAction = createAction(
    "[Main page] Add product success",
    props<{item: any}>()
);

export const createProductItemErrorAction = createAction(
    "[Main page] Add product error"
);
//////////////UPDATE ITEM////////////////////////////////////
export const updateProductItemAction = createAction(
    "[Main page] Update product",
    props<{ id: string; name: string; description: string; imageUrl: string }>()
);

export const updateProductItemSuccessAction = createAction(
    "[Main page] Update product success",
    props<{itemUpdate: any}>()
);

export const updateProductItemErrorAction = createAction(
    "[Main page] Update product error"
);
///////////////////////////////////////////////////////////////
export const setInitialItemAction = createAction(
    "[Main page] Set initial item"
);

export const setSelectItemAction = createAction(
    "[Main page] Set select item in store",
    props<{item: Item}>()
);