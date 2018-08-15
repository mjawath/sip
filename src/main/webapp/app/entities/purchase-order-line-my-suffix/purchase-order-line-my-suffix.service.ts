import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPurchaseOrderLineMySuffix } from 'app/shared/model/purchase-order-line-my-suffix.model';

type EntityResponseType = HttpResponse<IPurchaseOrderLineMySuffix>;
type EntityArrayResponseType = HttpResponse<IPurchaseOrderLineMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseOrderLineMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/purchase-order-lines';

    constructor(private http: HttpClient) {}

    create(purchaseOrderLine: IPurchaseOrderLineMySuffix): Observable<EntityResponseType> {
        return this.http.post<IPurchaseOrderLineMySuffix>(this.resourceUrl, purchaseOrderLine, { observe: 'response' });
    }

    update(purchaseOrderLine: IPurchaseOrderLineMySuffix): Observable<EntityResponseType> {
        return this.http.put<IPurchaseOrderLineMySuffix>(this.resourceUrl, purchaseOrderLine, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IPurchaseOrderLineMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IPurchaseOrderLineMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
