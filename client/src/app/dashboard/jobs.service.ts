import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class JobsService {

	url = environment.api + '/jobs/';
	constructor(private http: HttpClient) { }

	getJobs():Observable<any> {
		return this.http.get(this.url + 'all')
	}

}
