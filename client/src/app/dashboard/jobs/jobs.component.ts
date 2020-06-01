import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { JobsService } from '../jobs.service';
import { Subscription, interval } from 'rxjs';

export interface Job {
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
	failedAt?: Date
}

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
	JOB_DATA: Job[] = []
	dataSource
	displayedColumns: string[] = ['name', 'type', 'lastRunAt', 'nextRunAt', 'repeatInterval'];
	selection = new SelectionModel<Job>(true, []);
	@ViewChild(MatTable) table: MatTable<any>;
	private refresh: Subscription;
	constructor(
		private jobsService: JobsService,
	) { }

	async ngOnInit() {
		this.refresh = interval(2000).subscribe(async (val) => {
			try {
				await this.init()
			} catch (error) {
				/**
				 * lost server cnx
				 */
			}
		})
	}

	async init() {
		this.JOB_DATA = await this.jobsService.getJobs().toPromise()
		this.dataSource = new MatTableDataSource<Job>(this.JOB_DATA);
	}



	/** Whether the number of selected elements matches the total number of rows. */
	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected === numRows;
	}

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
		this.isAllSelected() ?
			this.selection.clear() :
			this.dataSource.data.forEach(row => this.selection.select(row));
	}

	/** The label for the checkbox on the passed row */
	checkboxLabel(row?: Job): string {
		if (!row) {
			return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
		}
		return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name + 1}`;
	}


}
