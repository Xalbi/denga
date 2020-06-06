import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs/jobs.component';
import { JobsService } from './jobs.service';
import { MaterialModule } from 'src/material.module';
import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [JobsComponent],
	imports: [
		MomentModule,
		CommonModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
	],
	entryComponents: [
		JobsComponent
	],
	providers: [
		JobsService
	],
	exports: [
		JobsComponent
	]
})
export class DashboardModule { }
