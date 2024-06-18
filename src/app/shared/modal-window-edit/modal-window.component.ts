import {Component, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {
    closeModalWindowAction,
    createProductItemAction, setSelectItemAction,
    updateProductItemAction
} from "../../store/app.action";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {selectIsEditOrCreate, selectSelectItem} from "../../store/app.selector";
import {Item} from "../../../modal-interface/modal-item.interface";
import {initialAppState} from "../../store/app.state";


@Component({
    selector: 'modal-window-edit',
    standalone: true,
    imports: [CommonModule,
        RouterModule,
        NgIf,
        ReactiveFormsModule,],
    templateUrl: './modal-window.component.html',
    styleUrls: ['./modal-window.component.scss'],
})
export class ModalWindowComponent implements OnInit {

    isOpen: boolean = true;
    isEditOrCreate: boolean = false;
    item!: Item;
    modalForm!: FormGroup;


    constructor(
        private store: Store,
        private ngForm: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.store.select(selectIsEditOrCreate).subscribe((data) => {
            this.isEditOrCreate = data.isEditOrCreate
        })
        this.store.select(selectSelectItem).subscribe((data) => {
            this.item = data.selectItem
        })
        this.createForm()
    }

    createForm() {
        this.modalForm = this.ngForm.group({
            name: [this.item.name, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
            description: [this.item.description, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
            imageUrl: [this.item.imageUrl, [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
        });
    }

    saveValueModal() {
        if (this.modalForm.valid) {
            if (this.isEditOrCreate) {
                this.store.dispatch(createProductItemAction({
                    name: this.modalForm.value.name,
                    description: this.modalForm.value.description,
                    imageUrl: this.modalForm.value.imageUrl
                }))
            } else {
                this.store.dispatch(updateProductItemAction({
                    id: this.item.id,
                    name: this.modalForm.value.name,
                    description: this.modalForm.value.description,
                    imageUrl: this.modalForm.value.imageUrl
                }))
            }
        }
        this.closeModal()
    }

    closeModal() {
        this.store.dispatch(setSelectItemAction({item: initialAppState.selectItem}))
        this.store.dispatch(closeModalWindowAction());
    }
}
