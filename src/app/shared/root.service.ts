import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class RootService {

    constructor(private http: HttpClient) {
    }
    fetchItems(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/pizzas');
    }

    removeItem(id: number) {
        return this.http.delete(`http://localhost:3000/pizzas/${id}`);
    }
    createPizza(pizza: any) {
        return this.http.post<any[]>('http://localhost:3000/pizzas', pizza);
    }
}
