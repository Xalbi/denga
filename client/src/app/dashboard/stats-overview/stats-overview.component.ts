import { Component, OnInit, Input } from '@angular/core';
import { StatsOverviewService } from '../stats-overview.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-stats-overview',
  templateUrl: './stats-overview.component.html',
  styleUrls: ['./stats-overview.component.scss']
})
export class StatsOverviewComponent implements OnInit {

  @Input() refreshState = true;
  @Input() refreshInterval = 3000;

  refresh: Subscription;

  constructor( 
    public statsOverviewService: StatsOverviewService,
  ) {}
    
  jobsTypes: string[];
  displayedColumns: string[] = ['position', 'name'];
  totalStats = {data: [], jobName: ''};
  jobSelected = {data: [], jobName: ''};
  jobTypesStats;
  jobTypeSelected;
  

  ngOnInit(): void {
    this.refresh = interval(this.refreshInterval)
      .subscribe((_) => {
        if (this.refreshState) {
            this.refreshStats()
        }
      })
  }

	refreshStats() {
	  this.statsOverviewService.getStatsOverview().toPromise().then(
      res => {
        this.totalStats = res.totalJobs
        this.jobTypesStats = res.jobTypes
        this.jobsTypes = this.jobsTypes ? this.jobsTypes: res.jobTypes
          .map(jobType => jobType.jobName)
          .sort()


        let initJob = this.jobTypesStats[0]
        this.jobTypeSelected = this.jobTypeSelected ? this.jobTypeSelected: initJob.jobName
        if (this.jobSelected) {
          this.getStatsForJob(this.jobTypeSelected)
        }else[
          this.jobSelected =   initJob
        ] 
      
      })
	}


  getStatsForJob(jobName: string): void {
    this.jobSelected = this.jobTypesStats.filter(jobType => jobType.jobName === jobName)[0]
  }
}
