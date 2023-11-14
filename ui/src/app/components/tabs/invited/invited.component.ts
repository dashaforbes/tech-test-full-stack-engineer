import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobService } from '../../../services/job-service.service';
import { Subscription } from 'rxjs';

/**
 * InvitedComponent is a component that displays the jobs that the user has been invited to.
 */
@Component({
  selector: 'app-invited',
  templateUrl: './invited.component.html',
  styleUrls: ['./invited.component.scss']
})
export class InvitedComponent implements OnInit, OnDestroy {
  leads: any[] = [];
  jobSubscription!: Subscription;

  constructor(private jobService: JobService) { }

  /**
   * Subscribes to the invitedJobs$ Observable and fetches the invited jobs when the component is initialized.
   */
  ngOnInit(): void {
    this.jobSubscription = this.jobService.invitedJobs$.subscribe(leads => {
      this.leads = leads;
    });

    if (!this.leads.length) {
      this.jobService.fetchInvitedJobs();
    }
  }

  /**
   * Unsubscribes from the invitedJobs$ Observable when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.jobSubscription) {
      this.jobSubscription.unsubscribe();
    }
  }

  /**
   * Updates the status of a job.
   * This method is called when the user accepts or declines a job.
   * @param id - The ID of the job to update.
   * @param status - The new status of the job ('accepted' or 'declined').
   */
  updateLeadStatus({id, status}: {id: number, status: string}) {
    const idAsString = id.toString();
    if (status === 'accepted') {
      this.jobService.acceptJob(idAsString).subscribe(updatedLead => {
        this.leads = this.leads.filter(lead => lead.id !== id);
      });
    } else if (status === 'declined') {
      this.jobService.declineJob(idAsString).subscribe(updatedLead => {
        this.leads = this.leads.filter(lead => lead.id !== id);
      });
    }
  }
}