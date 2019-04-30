/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestaoAgricolaTestModule } from '../../../test.module';
import { InsumoConsumidoComponent } from 'app/entities/insumo-consumido/insumo-consumido.component';
import { InsumoConsumidoService } from 'app/entities/insumo-consumido/insumo-consumido.service';
import { InsumoConsumido } from 'app/shared/model/insumo-consumido.model';

describe('Component Tests', () => {
    describe('InsumoConsumido Management Component', () => {
        let comp: InsumoConsumidoComponent;
        let fixture: ComponentFixture<InsumoConsumidoComponent>;
        let service: InsumoConsumidoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestaoAgricolaTestModule],
                declarations: [InsumoConsumidoComponent],
                providers: []
            })
                .overrideTemplate(InsumoConsumidoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InsumoConsumidoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsumoConsumidoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new InsumoConsumido(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.insumoConsumidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
