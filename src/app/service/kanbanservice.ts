import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KanbanCard, KanbanList } from '../api/kanban';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class KanbanService {

    private _lists: KanbanList[] = [];

    private selectedCard = new Subject<KanbanCard>();

    private selectedListId = new Subject<string>();

    private lists = new BehaviorSubject<KanbanList[]>(this._lists);

    lists$ = this.lists.asObservable();

    selectedCard$ = this.selectedCard.asObservable();

    selectedListId$ = this.selectedListId.asObservable();

    constructor(private http: HttpClient) {
        this.http.get<any>('assets/demo/data/kanban.json')
        .toPromise()
        .then(res => res.data as KanbanList[])
        .then(data => {
            this.updateLists(data);
        });
    }

    private updateLists(data) {
        this._lists = data;
        this.lists.next(data);
    }

    addList() {
        const listId = this.generateId();
        const title = "Untitled List";
        const newList = {
            listId: listId,
            title: title,
            cards:[]
        };

        this._lists.push(newList);
        this.lists.next(this._lists);
    }

    addCard(listId) {
        const cardId = this.generateId();
        const title = "Untitled card";
        const newCard = {id: cardId, title: title, description: '', progress: '', assignees: [], attachments: 0, comments: [], startDate: '', dueDate: '', completed: false};

        let lists = this._lists.map(l => l.listId === listId ? ({...l, cards: [...l.cards, newCard]}) : l);
        this.updateLists(lists);
    }

    deleteList(id: string) {
        this._lists = this._lists.filter(l => l.listId !== id);
        this.lists.next(this._lists);
    }

    copyList(list) {
        let newId = this.generateId();
        let newList = {...list, listId: newId};
        
        this._lists.push(newList);
        this.lists.next(this._lists);
    }

    deleteCard(cardId, listId) {
        let lists = [];

        for(let i = 0; i < this._lists.length; i++) {
            let list = this._lists[i];

            if(list.listId === listId) {
                list.cards = list.cards.filter(c => c.id !== cardId);
            }

            lists.push(list);
        }

        this.updateLists(lists);
    }

    copyCard(card, listId) {
        let lists = [];

        for(let i = 0; i < this._lists.length; i++) {
            let list = this._lists[i];

            if(list.listId === listId) {
                let cardIndex = list.cards.indexOf(card);
                let newId = this.generateId();
                let newCard = {...card, id: newId};
                list.cards.splice(cardIndex, 0, newCard);
            }

            lists.push(list);
        }

        this.updateLists(lists);
    }

    moveCard(card, targetListId, sourceListId) {
        this.deleteCard(card.id, sourceListId);
        let lists = this._lists.map(l => l.listId === targetListId ? ({...l, cards: [...l.cards, card]}) : l);
        this.updateLists(lists);
    }

    onCardSelect(card, listId) {
        this.selectedCard.next(card);
        this.selectedListId.next(listId);
    }

    generateId() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        
        return text;
    }
}
