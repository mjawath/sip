import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISalesOrderLineMySuffix } from 'app/shared/model/sales-order-line-my-suffix.model';

type EntityResponseType = HttpResponse<ISalesOrderLineMySuffix>;
type EntityArrayResponseType = HttpResponse<ISalesOrderLineMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SalesOrderLineMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/sales-order-lines';

    constructor(private http: HttpClient) {}

    create(salesOrderLine: ISalesOrderLineMySuffix): Observable<EntityResponseType> {
        return this.http.post<ISalesOrderLineMySuffix>(this.resourceUrl, salesOrderLine, { observe: 'response' });
    }

    update(salesOrderLine: ISalesOrderLineMySuffix): Observable<EntityResponseType> {
        return this.http.put<ISalesOrderLineMySuffix>(this.resourceUrl, salesOrderLine, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISalesOrderLineMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISalesOrderLineMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
