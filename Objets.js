//mport { Object3D } from "three";
var THREE = require('three');
class Rectangle {
    constructor(longueur, largeur, position = null) {
        if (typeof longueur == "number" && typeof largeur == "number") {
            this.longueur = longueur;
            this.largeur = largeur;
            this.isStock = false;
            this.position = {
                x: position.x,
                y: position.y
            }
        }
        else {
            throw new Error("x or y  not a number");
        }
    }
    changePosition(x, y) {
        this.position = { x, y };

    }



}

class Boite extends THREE.Mesh {
    constructor(largeur = 1, hauteur = 1, profondeur = 1, position = null) {
        /* if (typeof largeur == "number" && typeof profondeur == "number" && typeof hauteur == "number") {
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
         }*/
        super(new THREE.BoxGeometry(largeur, hauteur, profondeur), new THREE.MeshBasicMaterial({ color: 0xcd62d1, transparent: true, opacity: 0.8 }));

    }
    changePosition(x, y, z) {
        this.position = { x, y, z };

    }
    TakeBiggerBox(a, b) {
        return a.longueur * a.largeur * a.profondeur - b.longueur * b.largeur * b.profondeur;
    }
    AjustePosition(position = { x: 0, y: 0, z: 0 }) {
        position.x += this.geometry.parameters.width / 2;
        position.y += this.geometry.parameters.height / 2;
        position.z += this.geometry.parameters.depth / 2;

        return position

    }
}

class superCube extends THREE.Mesh {
    constructor(width = 10, height = 10, depth = 10) {
        super(new THREE.BoxGeometry(width, height, depth), new THREE.MeshBasicMaterial({ wireframe: true }));
        //super()
        this.inBande = new Array(height);
		this.aPos = new Array(height);
		this.aPosHauteur = new Array(height);
        this.list = [];

        var hauteurBande=height;
        var largeurBande=width;
        var profondeurBande=depth
        var taille=600;
    
            for(var i=0; i < hauteurBande; i++){
                this.inBande[i] = new Array(largeurBande);
                for(var j=0; j < profondeurBande; j++){
                    this.inBande[i][j] = new Array(profondeurBande);
                    for(var k=0; k < profondeurBande; k++){
                        this.inBande[i][j][k] = 0;
                    }
                }
            }
            for(var l=0; l < hauteurBande; l++){
                this.aPos[l] = taille;
                taille -= 50;
            }
            var tailleHauteur = 25;
            for(var l=0; l < hauteurBande; l++){
                this.aPosHauteur[l] = tailleHauteur;
                tailleHauteur += 50;
            }
        
    }

    AddBox(Box, position) {
        console.log(typeof position);
        if (typeof position != "undefined") {
            position = this.ChangeRepere(position.x, position.y, position.z);
            position = Box.AjustePosition(position);
            console.log(JSON.parse(JSON.stringify(position)));
            console.log('if addBox');
        }
        else {
            //position = this.ChangeRepere(position.x, position.y, position.z);
            //position = Box.AjustePosition(position);
            position = this.AutoPosition(Box);
            position = this.ChangeRepere(position.x, position.y, position.z);
            position = Box.AjustePosition(position);
            
            console.log('else addBox');
        }
       
        Box.position.set(position.x, position.y, position.z);
        this.list.push(Box)
    }

    AddAllToScene(scene) {
        scene.add(this);
        this.list.forEach((box) => {
            console.log(JSON.parse(JSON.stringify(box)));
            console.log(JSON.parse(JSON.stringify(scene)));

            scene.add(box);
        })
        //scene.add(this.list[0]);
    }
    ChangeRepere(x, y, z) {
        //console.log('x:'+x);
        x = x - this.geometry.parameters.width / 2;
        y = y - this.geometry.parameters.height / 2;
        z = z - this.geometry.parameters.depth / 2;
        return { x, y, z };
    }

    AutoPosition(Box) {
        var l=Box.geometry.parameters.width;
        var p=Box.geometry.parameters.height;
        var h= Box.geometry.parameters.depth;
        let hauteurBande= this.geometry.parameters.height;
        let largeurBande= this.geometry.parameters.width;
        let profondeurBande= this.geometry.parameters.depth;
        var ok = false;
        var posOK = false;
        var fok = true;
        var X = 0;
        var Y = 0;
        var Z = 0;
        for(var i=0; i < hauteurBande; i++){
            for(var j=0; j < largeurBande; j++){
                for(var k=0; k < profondeurBande; k++){
                    if(this.inBande[i][j][k] == 0){
                        for(var ii=i; ii < (parseInt(h)+i); ii++){
                            for(var jj=j; jj < (parseInt(l)+j); jj++){
                                for(var mm = k; mm < (parseInt(p)+k); mm++){
                                    if(jj > hauteurBande || ii > largeurBande || mm > profondeurBande || this.inBande[ii][jj][mm] != 0){
                                        if(ok) fok = false;
                                        ok=false;
                                        break;
                                    }else{

                                        if(fok) ok=true;
                                    }
                                }
                            }
                            if(!fok)
                {
                    fok = true;
                    break;
                }
                        }
                        if(ok == true){
                            X=i;
                            Y=j;
                            Z=k;
                            for(var iii=i; iii < (parseInt(h)+i); iii++){
                                for(var jjj=j; jjj < (parseInt(l)+j); jjj++){
                                    for(var kkk=k; kkk < (parseInt(p)+k); kkk++){
                                        this.inBande[iii][jjj][kkk] = 1;
                                    }
                                }
                            }
                            posOK = true;
                        }
                    }
                    if(posOK){
                        break;
                    }	
                }
                if(posOK){
                    break;
                }
            }
            if(posOK){
                break;
            }
        }
        if(posOK){
            return {x:X,y:Y,z:Z}
        }else{
            return false;
        }


        
    }
}



module.exports = {
    superCube: superCube,
    Boite: Boite
}