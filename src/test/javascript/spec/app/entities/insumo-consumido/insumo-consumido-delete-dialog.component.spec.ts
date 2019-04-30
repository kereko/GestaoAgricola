/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestaoAgricolaTestModule } from '../../../test.module';
import { InsumoConsumidoDeleteDialogComponent } from 'app/entities/insumo-consumido/insumo-consumido-delete-dialog.component';
import { InsumoConsumidoService } from 'app/entities/insumo-consumido/insumo-consumido.service';

describe('Component Tests', () => {
    describe('InsumoConsumido Management Delete Component', () => {
        let comp: InsumoConsumidoDeleteDialogComponent;
        let fixture: ComponentFixture<InsumoConsumidoDeleteDialogComponent>;
        let service: InsumoConsumidoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestaoAgricolaTestModule],
                declarations: [InsumoConsumidoDeleteDialogComponent]
            })
                .overrideTemplate(InsumoConsumidoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InsumoConsumidoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsumoConsumidoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
