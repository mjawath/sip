import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISalesOrderMySuffix } from 'app/shared/model/sales-order-my-suffix.model';

type EntityResponseType = HttpResponse<ISalesOrderMySuffix>;
type EntityArrayResponseType = HttpResponse<ISalesOrderMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SalesOrderMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/sales-orders';

    constructor(private http: HttpClient) {}

    create(salesOrder: ISalesOrderMySuffix): Observable<EntityResponseType> {
        return this.http.post<ISalesOrderMySuffix>(this.resourceUrl, salesOrder, { observe: 'response' });
    }

    update(salesOrder: ISalesOrderMySuffix): Observable<EntityResponseType> {
        return this.http.put<ISalesOrderMySuffix>(this.resourceUrl, salesOrder, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISalesOrderMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISalesOrderMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
