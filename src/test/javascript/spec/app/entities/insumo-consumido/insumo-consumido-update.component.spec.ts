/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestaoAgricolaTestModule } from '../../../test.module';
import { InsumoConsumidoUpdateComponent } from 'app/entities/insumo-consumido/insumo-consumido-update.component';
import { InsumoConsumidoService } from 'app/entities/insumo-consumido/insumo-consumido.service';
import { InsumoConsumido } from 'app/shared/model/insumo-consumido.model';

describe('Component Tests', () => {
    describe('InsumoConsumido Management Update Component', () => {
        let comp: InsumoConsumidoUpdateComponent;
        let fixture: ComponentFixture<InsumoConsumidoUpdateComponent>;
        let service: InsumoConsumidoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestaoAgricolaTestModule],
                declarations: [InsumoConsumidoUpdateComponent]
            })
                .overrideTemplate(InsumoConsumidoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InsumoConsumidoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsumoConsumidoService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InsumoConsumido(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.insumoConsumido = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InsumoConsumido();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.insumoConsumido = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
