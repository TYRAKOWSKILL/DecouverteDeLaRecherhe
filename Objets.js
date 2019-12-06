class Rectangle {
    constructor(longueur, largeur, position = null) {
        if (typeof longueur == "number" && typeof largeur == "number") {
            this.longueur = longueur;
            this.largeur = largeur;
            this.isStock= false;
            this.position = {
                x: position.x,
                y: position.y
            }
        }
        else {
            throw new Error("x or y  not a number");
        }
    }
    changePosition(x, y){
        this.position = { x, y };

    }



}

class Boite {
    constructor(largeur, profondeur, hauteur, position) {
        if (typeof largeur == "number" && typeof profondeur == "number" && typeof hauteur == "number") {
            this.largeur = largeur;
            this.profondeur = profondeur;
            this.hauteur = hauteur;
            this.isStock= false;
            this.position = {
                x: position.x,
                y: position.y,
                z: position.z,
            }
        }
        else {
            throw new Error("x or y  not a number");
        }
    }
    changePosition(x, y, z){
        this.position = { x, y, z};

    }
    TakeBiggerBox(a,b){
        return a.longueur*a.largeur*a.profondeur - b.longueur*b.largeur*b.profondeur;
    }
}