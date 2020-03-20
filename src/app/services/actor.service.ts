
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Actor } from '../model/actor.model';
import { AuthService } from './auth.service';

@Injectable()
export class ActorService {

    DEFAULT_LANG = 'en-US';
    lang: string;
    token: String;
    userRole: string;
    private backendApiBaseURL = 'https://localhost:8080';

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private authService: AuthService) {
            this.route.queryParams.subscribe(params => {
                console.log(params)
                this.lang = params['lang'] != null ? params['lang'] : this.DEFAULT_LANG;
            });
    }

    getActor(id: string) {
        const url = `${this.backendApiBaseURL}/v1/actors/${id}`;
        return this.http.get<Actor>(url).toPromise();
    }
    
    updateProfile(actor: Actor) {
        const url = `${this.backendApiBaseURL}/v2/actors/${actor._id}`;

        const putActor = JSON.parse(JSON.stringify(actor));
        delete putActor.idToken;
        delete putActor.customToken;

        const body = JSON.stringify(putActor);
        return new Promise<any>((resolve, reject) => {
            this.http.put(url, body,   {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'Authorization': actor.idToken,
                  'Accept-language': this.lang
                })}).toPromise()
                .then(res => {
                    resolve(res);
                }, err => { console.log(err); reject(err); });
        });
    }
}
