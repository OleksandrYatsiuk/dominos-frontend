import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


export interface Root {
    id: number
    title: string
    completed: boolean
    date?: any
}

@Injectable({ providedIn: 'root' })
export class RootService {
    public root: Root[] = [
        { id: 1, title: "Гавайська", completed: false, date: new Date() },
        { id: 2, title: "Карбонара", completed: true, date: new Date() },
        { id: 3, title: "Філадельфія", completed: false, date: new Date() },
    ];
    constructor(private http: HttpClient) {
    }
    fetchItems(): Observable<Root[]> {
        return this.http.get<Root[]>('http://localhost:3000/pizzas')
            .pipe(tap(root => this.root = root))
    }

    onToggle(id: number) {
        const idx = this.root.findIndex(t => t.id == id);
        this.root[idx].completed = !this.root[idx].completed;
    }

    removeItem(id: number) {
        return this.http.delete(`http://localhost:3000/pizzas/${id}`);
    }
    createPizza(pizza: Root) {
        return this.http.post<Root[]>('http://localhost:3000/pizzas', pizza).subscribe(res => {
            return this.root.push(pizza);
        });
    }
}