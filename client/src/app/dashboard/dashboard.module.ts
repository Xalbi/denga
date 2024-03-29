import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs/jobs.component';
import { JobsService } from './jobs.service';
import { MaterialModule } from 'src/material.module';
import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobDetailsModalComponent } from './job-details-modal/job-details-modal.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { StatsOverviewComponent } from './stats-overview/stats-overview.component';
import { StatsOverviewService } from './stats-overview.service';
import { ConfigService } from './config.service';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
	declarations: [JobsComponent, JobDetailsModalComponent, StatsOverviewComponent, ConfirmComponent],
	imports: [
		MomentModule,
		CommonModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		MatGridListModule,
		MatProgressSpinnerModule
	],
	entryComponents: [
		JobsComponent
	],
	providers: [
		JobsService,
		ConfigService,
		StatsOverviewService
	],
	exports: [
		JobsComponent
	]
})
export class DashboardModule { }
