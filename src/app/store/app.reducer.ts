import {Action, createReducer, on} from "@ngrx/store";
import {
    closeModalWindowAction,
    createProductItemSuccessAction,
    deleteProductItemSuccessAction,
    getProductItemSuccessAction,
    openModalWindowAction,
    setInitialItemAction, setSelectItemAction,
    updateProductItemSuccessAction
} from "./app.action";
import {appStore, initialAppState} from "./app.state";

const appReducer = createReducer(
    initialAppState,
    on(getProductItemSuccessAction, (state, {items}) => ({
        ...state,
        items
    })),

    on(openModalWindowAction, (state: appStore, {isEditOrCreate}) => ({
        ...state,
        isModalWindowEdit: true,
        isEditOrCreate: isEditOrCreate
    })),

    on(closeModalWindowAction, (state: appStore) => ({
        ...state,
        isModalWindowEdit: false
    })),

    on(deleteProductItemSuccessAction, (state, {id}) => ({
        ...state,
        items: state.items.filter(item => item.id !== id)
    })),

    on(createProductItemSuccessAction, (state, {item}) => ({
        ...state,
        items: [...state.items, item]
    })),

    on(updateProductItemSuccessAction, (state, {itemUpdate}) => ({
        ...state,
        items: state.items.map(item =>
            item.id === itemUpdate.id ? {...item, ...itemUpdate} : item
        )
    })),

    on(setInitialItemAction, (state) => ({
        ...state,
        items: [{id: '', name: '', description: '', imageUrl: ''}]
    })),

    on(setSelectItemAction, (state, {item}) => ({
        ...state,
        selectItem: item
    })),
);

export function reducer(state: appStore | undefined, action: Action) {
    return appReducer(state, action);
}