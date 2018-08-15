import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryMySuffix } from 'app/shared/model/category-my-suffix.model';
import { CategoryMySuffixService } from './category-my-suffix.service';
import { CategoryMySuffixComponent } from './category-my-suffix.component';
import { CategoryMySuffixDetailComponent } from './category-my-suffix-detail.component';
import { CategoryMySuffixUpdateComponent } from './category-my-suffix-update.component';
import { CategoryMySuffixDeletePopupComponent } from './category-my-suffix-delete-dialog.component';
import { ICategoryMySuffix } from 'app/shared/model/category-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CategoryMySuffixResolve implements Resolve<ICategoryMySuffix> {
    constructor(private service: CategoryMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((category: HttpResponse<CategoryMySuffix>) => category.body));
        }
        return of(new CategoryMySuffix());
    }
}

export const categoryRoute: Routes = [
    {
        path: 'category-my-suffix',
        component: CategoryMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-my-suffix/:id/view',
        component: CategoryMySuffixDetailComponent,
        resolve: {
            category: CategoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-my-suffix/new',
        component: CategoryMySuffixUpdateComponent,
        resolve: {
            category: CategoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-my-suffix/:id/edit',
        component: CategoryMySuffixUpdateComponent,
        resolve: {
            category: CategoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-my-suffix/:id/delete',
        component: CategoryMySuffixDeletePopupComponent,
        resolve: {
            category: CategoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Categories'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
