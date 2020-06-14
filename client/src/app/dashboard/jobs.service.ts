import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JobsService {
	host = `${window.location.protocol}//${window.location.host}`
	url = this.host + '/api/jobs/';
	constructor(private http: HttpClient) { }
	
	getJobs():Observable<any> {
		return this.http.get(this.url + 'all')
	}
	
	removeJobs(params):Observable<any> {
		return this.http.post(this.url + 'remove', params)
	}
	
	requeueJobs(params):Observable<any> {
		return this.http.post(this.url + 'requeue', params)
	}

}
