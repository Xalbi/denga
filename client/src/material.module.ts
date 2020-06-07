import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTooltipModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatCheckboxModule,
		MatChipsModule,
		MatIconModule,
		MatInputModule,
		MatSlideToggleModule,
		MatDialogModule
	],
	exports: [
		BrowserAnimationsModule,
		MatButtonModule,
		MatNativeDateModule,
		MatFormFieldModule,
		MatSelectModule,
		MatTooltipModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatCheckboxModule,
		MatChipsModule,
		MatIconModule,
		MatInputModule,
		MatSlideToggleModule,
		MatDialogModule
	]
})
export class MaterialModule { }
