import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  @Output() jobNames = new EventEmitter<string[]>();

  refresh: Subscription;

  constructor( 
    public statsOverviewService: StatsOverviewService,
  ) {}

  jobTypesColors = {
    completed:  {'background-color': "green", "color": "white"},
    failed:  {'background-color': "#f44336", "color": "white"},
    running:  {'background-color': "#ffd740"},
    scheduled:  {'background-color': "lightblue"},  
    queued:  {'background-color': "lightblue"},  
    repeating:  {'background-color': "lightblue"}  
  }
  
  jobsTypes: string[];
  displayedColumns: string[] = ['position', 'name'];
  totalStats = {data: [], jobName: ''};
  jobSelected = {data: [], jobName: ''};
  jobTypesStats;
  jobTypeSelected;
  loading = false
  
  nodata = false

  ngOnInit(): void {
    this.loading = true
    this.refresh = interval(this.refreshInterval)
    .subscribe((_) => {
      if (this.refreshState) {
        this.refreshStats().then(()=>{
            this.loading = false
          })
        }
      })
  }

	async refreshStats(){
    this.nodata = false
	  this.statsOverviewService.getStatsOverview().toPromise().then(
      res => {
        if (res.length === 0) {
          this.nodata = true
          return
        } 
        this.totalStats = res.totalJobs
        this.jobTypesStats = res.jobTypes
        this.jobsTypes = this.jobsTypes ? this.jobsTypes: res.jobTypes
          .map(jobType => jobType.jobName)
          .sort()

        this.jobNames.emit(this.jobsTypes)

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
