export class ElementRebus {

    public motRecherche: string;
    private _motAffiche: string;
    public image: string;

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

    public set motAffiche(mot: string) {
        this._motAffiche = mot;
    }

    public setImage(image: string) {
        this.image = image;
    }
}
