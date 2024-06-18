import {createFeatureSelector, createSelector} from "@ngrx/store";
import {appStore} from "./app.state";

export const selectFeature = createFeatureSelector<appStore>('feature');

export const selectItems = createSelector(
    selectFeature,
    (state: appStore) => ({
        items: state.items,
    })
);

export const selectStateModalWindowEdit = createSelector(
    selectFeature,
    (state: appStore) => ({
        isModalWindowEdit: state.isModalWindowEdit,
    })
);

export const selectIsEditOrCreate = createSelector(
    selectFeature,
    (state: appStore) => ({
        isEditOrCreate: state.isEditOrCreate,
    })
);

export const selectSelectItem = createSelector(
    selectFeature,
    (state: appStore) => ({
        selectItem: state.selectItem,
    })
);