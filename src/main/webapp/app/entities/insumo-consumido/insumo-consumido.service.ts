import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInsumoConsumido } from 'app/shared/model/insumo-consumido.model';

type EntityResponseType = HttpResponse<IInsumoConsumido>;
type EntityArrayResponseType = HttpResponse<IInsumoConsumido[]>;

@Injectable({ providedIn: 'root' })
export class InsumoConsumidoService {
    public resourceUrl = SERVER_API_URL + 'api/insumo-consumidos';

    constructor(protected http: HttpClient) {}

    create(insumoConsumido: IInsumoConsumido): Observable<EntityResponseType> {
        return this.http.post<IInsumoConsumido>(this.resourceUrl, insumoConsumido, { observe: 'response' });
    }

    update(insumoConsumido: IInsumoConsumido): Observable<EntityResponseType> {
        return this.http.put<IInsumoConsumido>(this.resourceUrl, insumoConsumido, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInsumoConsumido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInsumoConsumido[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
