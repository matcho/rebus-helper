export class ElementRebus {

    private motRecherche: string;
    private _motAffiche: string;
    private image: string;

    public constructor(mot: string, image?: string) {
        this.motRecherche = mot;
        this._motAffiche = "";
        this.image = image;
    }

    public get motAffiche() {
        if (this._motAffiche) {
            return this._motAffiche;
        } else {
            return this.motRecherche;
        }
    }
}
