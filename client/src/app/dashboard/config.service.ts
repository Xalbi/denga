

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigService {
	host = `${window.location.protocol}//${window.location.host}`
	url = this.host + '/api/config/';
	constructor(private http: HttpClient) { }

	getConfig():Observable<any> {
		return this.http.get(this.url)
	}
}