import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { JobsService, Filter } from '../jobs.service';
import { Subscription, interval } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { JobDetailsModalComponent } from '../job-details-modal/job-details-modal.component';

export interface Job {
	_id: string,
	name: string,
	data: any,
	type: string,
	priority: number,
	repeatInterval: string,
	nextRunAt: Date,
	lastRunAt: Date,
	lastFinishedAt: Date,
	lockedAt: Date,
	repeatTimezone: any,
	lastModifiedBy: any,
	failCount?: number,
	failReason?: string,
	failedAt?: Date,
	states?: JobStates
}
export interface JobStates {
	failed?: boolean,
	running?: boolean,
	scheduled?: boolean,
	queued?: boolean,
	completed?: boolean,
	repeating?: boolean
}


@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
	JOB_DATA: Job[] = []
	filter: Filter = {
		search_string: '',
		states: [],
		job_names: []
	};

	jobNames
	selectedNames

	refreshInterval = 1000;
	dataSource
	selection
	displayedColumns: string[] = [
		'repeatInterval',
		'name',
		'type',
		'lastRunAt',
		'nextRunAt',
		'lastFinishedAt',
	];
	@ViewChild(MatTable) table: MatTable<any>;
	refresh: Subscription;
	refreshState = true
	constructor(
		private jobsService: JobsService,
		public jobDetails: MatDialog
	) { }

	async ngOnInit() {
		this.jobNames = [
			"sendmail",
			"exportMkt",
			"MarketingAutomationTask"
		]

		await this.init()
		this.refresh = interval(this.refreshInterval).subscribe(async (val) => {
			if (this.refreshState) {
				try {
					await this.init()
				} catch (error) {
				}
			}
		})
	}

	async init() {
		this.JOB_DATA = await this.jobsService.getJobs(this.filter).toPromise()
		this.dataSource = new MatTableDataSource<Job>(this.JOB_DATA);
		this.selection = new SelectionModel<Job>(true, []);
		this.JOB_DATA.forEach(job => {
			job.states = this.computeJobStates(job)
		})
	}

	openJobDetails(elem): void {
		const dialogRef = this.jobDetails.open(JobDetailsModalComponent, {
			width: '30%',
			data: elem
		});

		dialogRef.afterClosed().subscribe(async result => {
			if (result && result.action) {
				await this.executeJobAction(result)
			}
		});
	}

	async executeJobAction(actionParam) {
		switch (actionParam.action) {
			case 'requeue': {
				await this.jobsService.requeueJobs(actionParam).toPromise()
				break;
			}
			case 'delete': {
				await this.jobsService.removeJobs(actionParam).toPromise()
				break;
			}
			default: {
				break;
			}
		}
	}

	async applyFilter(event: Event) {
		this.filter.search_string = (event.target as HTMLInputElement).value;
		await this.init()
	}

	async filterChanged(filter, model) {	
		this.filter[filter] = this[model];
		await this.init()
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	checkboxLabel(row?: Job): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
	}

	computeJobStates(job: Job): JobStates {
		let now = new Date().getTime()
		let lastRunAt = new Date(job.lastRunAt).getTime()
		let lastFinishedAt = new Date(job.lastFinishedAt).getTime()
		let failedAt = new Date(job.failedAt).getTime()
		let nextRunAt = new Date(job.nextRunAt).getTime()
		failedAt = isNaN(failedAt) ? 0 : failedAt
		lastFinishedAt = isNaN(lastFinishedAt) ? 0 : lastFinishedAt

		let failed = (lastFinishedAt && failedAt) && (lastFinishedAt == failedAt)
		let running = lastRunAt && (lastRunAt > lastFinishedAt)
		let completed = lastFinishedAt && (lastFinishedAt > failedAt)
		let scheduled = nextRunAt && (nextRunAt >= now)
		let queued = nextRunAt && (now >= nextRunAt) && (nextRunAt >= lastFinishedAt)
		let repeating = (job.repeatInterval !== null && job.repeatInterval !== undefined)

		return {
			failed,
			running,
			completed,
			scheduled,
			queued,
			repeating
		}

	}

}
