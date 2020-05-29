import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs/jobs.component';
import { JobsService } from './jobs.service';
import { MaterialModule } from 'src/material.module';

@NgModule({
	declarations: [JobsComponent],
	imports: [
		CommonModule,
		MaterialModule
	],
	entryComponents: [
		JobsComponent
	],
	providers: [
		JobsService
	]
})
export class DashboardModule { }
