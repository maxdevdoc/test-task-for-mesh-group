import {Component, Input, OnInit, signal} from "@angular/core";
import {Store} from "@ngrx/store";
import {Item} from "../../../modal-interface/modal-item.interface";
import {
    deleteProductItemAction,
    getProductItemAction,
    openModalWindowAction,
    setSelectItemAction
} from "../../store/app.action";
import {selectStateModalWindowEdit} from "../../store/app.selector";
import {ModalWindowComponent} from "../../shared/modal-window-edit/modal-window.component";
import {initialAppState} from "../../store/app.state";


@Component({
    selector: "item-product",
    standalone: true,
    imports: [
        ModalWindowComponent
    ],
    templateUrl: "./item.component.html",
    styleUrl: "./item.component.scss",
})
export class ItemComponent implements OnInit {
    @Input() item: Item = initialAppState.items[0]
    isModalWindowEdit = signal(false);
    isEditOrCreate = false;

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.store.select(selectStateModalWindowEdit).subscribe(
            (data) => {
                this.isModalWindowEdit.set(data.isModalWindowEdit)
            }
        )
    }

    deleteProduct(item: any) {
        this.store.dispatch(deleteProductItemAction({id: item.id}))
        this.store.dispatch(getProductItemAction({offset: 50}));
    }

    editProduct(item: any) {
        this.store.dispatch(setSelectItemAction({item: this.item}))
        this.store.dispatch(openModalWindowAction({isEditOrCreate: this.isEditOrCreate}))
    }

}
