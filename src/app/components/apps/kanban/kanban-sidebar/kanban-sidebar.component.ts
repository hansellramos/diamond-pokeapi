import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { KanbanCard, Comment, ListName, Task } from 'src/app/api/kanban';
import { Member } from 'src/app/api/member';
import { AppsKanbanComponent } from '../apps.kanban.component';
import { MemberService } from 'src/app/service/member.service';
import { KanbanService } from 'src/app/service/kanban.service';
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

    newTask: Task;

    comment: string = '';

    taskContent: string = '';

    timeout = null;

    showTaskContainer: boolean;

    menuItems: MenuItem[];

    listNames: ListName[];

    cardSubscription: Subscription;
    
    listSubscription: Subscription;

    listNameSubscription: Subscription;

    @ViewChild('inputEl') inputEl: ElementRef;

    @ViewChild('inputEl2') inputEl2: ElementRef;

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

        this.newTask = {
            text: '',
            completed: false
        }
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

    addTaskList() {
        this.showTaskContainer = !this.showTaskContainer;

        if (!this.showTaskContainer) {
            return;
        } 
        else if (!this.card.taskList) {
            let id = this.kanbanService.generateId();
            this.card = {...this.card, taskList: {id: id, tasks:[]}};
        }
    }

    addTask(event) {
        event.preventDefault();
        this.newTask = { text: this.taskContent, completed: false };
        this.card.taskList.tasks.unshift(this.newTask);
        this.taskContent = null;

        this.calculateProgress();
    }

    focus(arg) {
        if (arg == 1) {
            this.timeout = setTimeout(() => this.inputEl.nativeElement.focus(), 1);
        } 
        if (arg == 2) {
            this.timeout = setTimeout(() => this.inputEl2.nativeElement.focus(), 1);
        } 
    }

    calculateProgress(){
        let completed = this.card.taskList.tasks.filter(t => t.completed).length;
        this.card.progress = Math.round(100 * (completed / this.card.taskList.tasks.length));
    }

}
