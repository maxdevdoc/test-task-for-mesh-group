import {Component, OnInit, signal} from "@angular/core";
import {Store} from "@ngrx/store";
import {
    getProductItemAction,
    openModalWindowAction,
    setInitialItemAction
} from "../store/app.action";
import {selectItems} from "../store/app.selector";
import {initialAppState} from "../store/app.state";
import {ItemComponent} from "./item/item.component";
import {ModalWindowComponent} from "../shared/modal-window-edit/modal-window.component";

@Component({
    selector: "main-page",
    standalone: true,
    imports: [
        ItemComponent,
        ModalWindowComponent
    ],
    templateUrl: "./main-page.component.html",
    styleUrl: "./main-page.component.scss",
})
export class MainComponent implements OnInit {
    items = signal(initialAppState.items);
    isEditOrCreate: boolean = true;

    constructor(private store: Store) {
    }

    ngOnInit() {
        this.store.dispatch(getProductItemAction({offset: 50}));
        this.store.select(selectItems).subscribe(
            (data) => {
                this.items.set(data.items)
            }
        )
    }

    addProduct() {
        if (this.items().length === 0) {
            this.items.set([{id: '0', name: '', description: '', imageUrl: ''}])
            this.store.dispatch(setInitialItemAction())
            this.store.dispatch(openModalWindowAction({isEditOrCreate: this.isEditOrCreate}))
        } else {
            this.store.dispatch(openModalWindowAction({isEditOrCreate: this.isEditOrCreate}))
        }
    }
}
