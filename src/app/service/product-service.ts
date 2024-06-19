import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ProductService {
    private apiUrl = 'http://localhost:3000/items';

    constructor(private http: HttpClient) {
    }

    getItems(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }

    deleteItem(id: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<any>(url);
    }

    createItem(name: string, description: string, imageUrl: string): Observable<any> {
        const newItem = {name, description, imageUrl};
        return this.http.post<any>(this.apiUrl, newItem);
    }

    updateItem(id: string, name: string, description: string, imageUrl: string): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        const updatedItem = {id, name, description, imageUrl};
        return this.http.put<any>(url, updatedItem);
    }

}
