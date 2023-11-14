import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ILead } from '../../../interfaces/ilead';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent {
  @Input() tab!: string;
  @Input() lead!: ILead;
  @Output() statusChange = new EventEmitter<{id: number, status: string}>();

  acceptLead() {
    this.statusChange.emit({id: this.lead.id, status: 'accepted'});
  }

  declineLead() {
    this.statusChange.emit({id: this.lead.id, status: 'declined'});
  }
}