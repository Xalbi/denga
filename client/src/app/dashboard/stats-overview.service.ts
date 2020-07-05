import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StatsOverviewService {
	host = `${window.location.protocol}//${window.location.host}`
	url = this.host + '/api/stats/';

	constructor(private http: HttpClient) { }
	
	getStatsOverview():Observable<any> {
		return this.http.get(this.url)
	}
}
