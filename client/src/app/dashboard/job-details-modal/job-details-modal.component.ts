import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Job } from '../jobs/jobs.component';

export type Action = 'requeue' | 'delete' | 'cancel'

@Component({
	selector: 'app-job-details-modal',
	templateUrl: './job-details-modal.component.html',
	styleUrls: ['./job-details-modal.component.scss']
})
export class JobDetailsModalComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<JobDetailsModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Job
	) { }

	
	async ngOnInit() {
		console.log(this.data);
		
	}
	
	onAction(action: Action) {
		this.dialogRef.close({
			action: action,
			ids: [this.data._id]
		});
	}
	
}
