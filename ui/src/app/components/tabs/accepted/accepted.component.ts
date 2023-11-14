import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobService } from '../../../services/job-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss']
})
export class AcceptedComponent implements OnInit, OnDestroy {
  acceptedLeads: any[] = [];
  jobSubscription!: Subscription;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobSubscription = this.jobService.acceptedJobs$.subscribe(leads => {
      this.acceptedLeads = leads;
    });

    if (!this.acceptedLeads.length) {
      this.jobService.fetchAcceptedJobs();
    }

    this.jobService.leadAccepted$.subscribe(lead => {
      this.addAcceptedLead(lead);
    });
  }

  ngOnDestroy(): void {
    if (this.jobSubscription) {
      this.jobSubscription.unsubscribe();
    }
  }

  addAcceptedLead(lead: any) {
    this.acceptedLeads.push(lead);
  }
}