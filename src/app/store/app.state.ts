export interface appStore {
    items: {
        id: string;
        name: string;
        description: string;
        imageUrl: string;

    }[],
    selectItem: {
        id: string,
        name: string,
        description: string,
        imageUrl: string
    };
    isModalWindowEdit: boolean;
    isEditOrCreate: boolean;
}

export const initialAppState: appStore = {
    items: [],
    selectItem: {
        id: '',
        name: '',
        description: '',
        imageUrl: ''
    },
    isModalWindowEdit: false,
    isEditOrCreate: false
};
