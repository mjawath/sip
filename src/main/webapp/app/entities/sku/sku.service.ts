import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISKU } from 'app/shared/model/sku.model';

type EntityResponseType = HttpResponse<ISKU>;
type EntityArrayResponseType = HttpResponse<ISKU[]>;

@Injectable({ providedIn: 'root' })
export class SKUService {
    private resourceUrl = SERVER_API_URL + 'api/skus';

    constructor(private http: HttpClient) {}

    create(sKU: ISKU): Observable<EntityResponseType> {
        return this.http.post<ISKU>(this.resourceUrl, sKU, { observe: 'response' });
    }

    update(sKU: ISKU): Observable<EntityResponseType> {
        return this.http.put<ISKU>(this.resourceUrl, sKU, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISKU>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISKU[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
