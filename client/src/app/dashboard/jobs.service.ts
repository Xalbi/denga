import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JobsService {
	host = `${window.location.protocol}//${window.location.host}`
	url = this.host + '/api/jobs/';
	constructor(private http: HttpClient) { }
	
	getJobs():Observable<any> {
		console.log(this.host);
		return this.http.get(this.url + 'all')
	}
}
