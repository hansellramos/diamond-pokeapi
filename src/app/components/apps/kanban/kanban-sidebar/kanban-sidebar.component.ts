import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { KanbanCard, Comment, ListName } from 'src/app/api/kanban';
import { Member } from 'src/app/api/member';
import { AppsKanbanComponent } from '../apps.kanban.component';
import { MemberService } from 'src/app/service/memberservice';
import { KanbanService } from 'src/app/service/kanbanservice';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'kanban-sidebar',
    templateUrl: './kanban-sidebar.component.html',
    styleUrls: ['./kanban-sidebar.component.scss']
})
export class KanbanSidebarComponent implements OnInit, OnDestroy {

    card: KanbanCard;

    listId: string;

    filteredAssignees: Member[];

    assignees: Member[];

    newComment: Comment;

    comment: string = '';

    timeout = null;

    menuItems: MenuItem[];

    listNames: ListName[];

    cardSubscription: Subscription;
    
    listSubscription: Subscription;

    listNameSubscription: Subscription;

    @ViewChild('inputEl') inputEl: ElementRef;

    constructor(public parent: AppsKanbanComponent, private memberService: MemberService, private kanbanService: KanbanService) { 
        this.memberService.getMembers().then(members => this.assignees = members);

        this.cardSubscription = this.kanbanService.selectedCard$.subscribe(data => this.card = data);
        this.listSubscription = this.kanbanService.selectedListId$.subscribe(data => this.listId = data);
        this.listNameSubscription = this.kanbanService.listNames$.subscribe(data => this.listNames = data);
    }

    ngOnInit(): void {
        this.newComment = {
            id: "123",
            name: 'Jane Cooper',
            text: '',
        };
    }

    ngOnDestroy() {
        this.cardSubscription.unsubscribe();
        this.listSubscription.unsubscribe();
        this.listNameSubscription.unsubscribe();
        clearTimeout(this.timeout);
    }

    close(){
        this.parent.sidebarVisible = false;
    }

    filterAssignees(event) {
        let filtered: Member[] = [];
        let query = event.query;

        for(let i = 0; i < this.assignees.length; i++) {
            let assignee = this.assignees[i];
            if (assignee.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(assignee);
            }
        }

        this.filteredAssignees = filtered;
    }

    onComment(event){
        event.preventDefault();
        this.newComment.text = this.comment;
        this.card.comments.unshift(this.newComment);
        this.comment = null;
    }

    onSave() {
        this.parent.sidebarVisible = false;
    }

    onMove(listId) {
        this.kanbanService.moveCard(this.card, listId, this.listId);
    }

    onDelete() {
        this.kanbanService.deleteCard(this.card.id, this.listId);
        this.parent.sidebarVisible = false;
    }

    focus() {
        this.timeout = setTimeout(() => this.inputEl.nativeElement.focus(), 1);
    }

}
