import { IPlantio } from 'app/shared/model/plantio.model';

export interface ICultura {
    id?: number;
    nome?: string;
    nomeCientifico?: string;
    plantios?: IPlantio[];
}

export class Cultura implements ICultura {
    constructor(public id?: number, public nome?: string, public nomeCientifico?: string, public plantios?: IPlantio[]) {}
}
