/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestaoAgricolaTestModule } from '../../../test.module';
import { InsumoConsumidoDetailComponent } from 'app/entities/insumo-consumido/insumo-consumido-detail.component';
import { InsumoConsumido } from 'app/shared/model/insumo-consumido.model';

describe('Component Tests', () => {
    describe('InsumoConsumido Management Detail Component', () => {
        let comp: InsumoConsumidoDetailComponent;
        let fixture: ComponentFixture<InsumoConsumidoDetailComponent>;
        const route = ({ data: of({ insumoConsumido: new InsumoConsumido(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestaoAgricolaTestModule],
                declarations: [InsumoConsumidoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InsumoConsumidoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InsumoConsumidoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.insumoConsumido).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
