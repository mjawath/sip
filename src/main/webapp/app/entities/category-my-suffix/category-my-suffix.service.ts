import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';

type EntityResponseType = HttpResponse<ICategoryMySuffix>;
type EntityArrayResponseType = HttpResponse<ICategoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CategoryMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/categories';

    constructor(private http: HttpClient) {}

    create(category: ICategoryMySuffix): Observable<EntityResponseType> {
        return this.http.post<ICategoryMySuffix>(this.resourceUrl, category, { observe: 'response' });
    }

    update(category: ICategoryMySuffix): Observable<EntityResponseType> {
        return this.http.put<ICategoryMySuffix>(this.resourceUrl, category, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICategoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICategoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
