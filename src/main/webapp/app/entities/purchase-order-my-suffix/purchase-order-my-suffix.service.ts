import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPurchaseOrderMySuffix } from 'app/shared/model/purchase-order-my-suffix.model';

type EntityResponseType = HttpResponse<IPurchaseOrderMySuffix>;
type EntityArrayResponseType = HttpResponse<IPurchaseOrderMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrderMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/purchase-orders';

    constructor(private http: HttpClient) {}

    create(purchaseOrder: IPurchaseOrderMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPurchaseOrderMySuffix>(this.resourceUrl, purchaseOrder, { observe: 'response' });
    }

    update(purchaseOrder: IPurchaseOrderMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPurchaseOrderMySuffix>(this.resourceUrl, purchaseOrder, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPurchaseOrderMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPurchaseOrderMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
