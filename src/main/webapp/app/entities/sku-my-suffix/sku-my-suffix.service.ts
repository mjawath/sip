import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISKUMySuffix } from 'app/shared/model/sku-my-suffix.model';

type EntityResponseType = HttpResponse<ISKUMySuffix>;
type EntityArrayResponseType = HttpResponse<ISKUMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SKUMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/skus';

    constructor(private http: HttpClient) {}

    create(sKU: ISKUMySuffix): Observable<EntityResponseType> {
        return this.http.post<ISKUMySuffix>(this.resourceUrl, sKU, { observe: 'response' });
    }

    update(sKU: ISKUMySuffix): Observable<EntityResponseType> {
        return this.http.put<ISKUMySuffix>(this.resourceUrl, sKU, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISKUMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISKUMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
