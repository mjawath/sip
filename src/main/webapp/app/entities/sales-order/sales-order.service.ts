import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISalesOrder } from 'app/shared/model/sales-order.model';

type EntityResponseType = HttpResponse<ISalesOrder>;
type EntityArrayResponseType = HttpResponse<ISalesOrder[]>;

@Injectable({ providedIn: 'root' })
export class SalesOrderService {
    private resourceUrl = SERVER_API_URL + 'api/sales-orders';

    constructor(private http: HttpClient) {}

    create(salesOrder: ISalesOrder): Observable<EntityResponseType> {
        return this.http.post<ISalesOrder>(this.resourceUrl, salesOrder, { observe: 'response' });
    }

    update(salesOrder: ISalesOrder): Observable<EntityResponseType> {
        return this.http.put<ISalesOrder>(this.resourceUrl, salesOrder, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISalesOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISalesOrder[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
