//mport { Object3D } from "three";
var THREE= require('three');
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

class Boite extends THREE.Mesh{
    constructor(largeur=1, hauteur=1, profondeur=1, position=null) {
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
        super(new THREE.BoxGeometry(1, 1, 1),new THREE.MeshBasicMaterial({color: 0xcd62d1,transparent:true, opacity:0.8}));
        
    }
    changePosition(x, y, z){
        this.position = { x, y, z};

    }
    TakeBiggerBox(a,b){
        return a.longueur*a.largeur*a.profondeur - b.longueur*b.largeur*b.profondeur;
    }
    AjustePosition(position={x:0,y:0,z:0}){
        position.x+=this.geometry.parameters.width/2;
        position.y+=this.geometry.parameters.height/2;
        position.z+=this.geometry.parameters.depth/2;

        return position

    }
}

class superCube extends THREE.Mesh{
    constructor( width=10, height=10, depth=10){
       super(new THREE.BoxGeometry(width,height,depth),new THREE.MeshBasicMaterial({wireframe:true}) );
       //super() 
       this.list=[];
    } 

    AddBox(Box,position={x:0,y:0,z:0}){
        position=this.ChangeRepere(position.x,position.y, position.z);
        position=Box.AjustePosition(position);
        console.log(JSON.parse(JSON.stringify(position)));
        Box.position.set(position.x,position.y,position.z);
        this.list.push(Box)
    }

    AddAllToScene(scene){
        scene.add(this);
        this.list.forEach((box)=>{
            console.log(JSON.parse(JSON.stringify(box)));
            console.log(JSON.parse(JSON.stringify(scene)));
            
            scene.add(box);
        })
        //scene.add(this.list[0]);
    }
    ChangeRepere(x,y,z){
        //console.log('x:'+x);
        x=x-this.geometry.parameters.width/2;
        y=y-this.geometry.parameters.height/2;
        z=z-this.geometry.parameters.depth/2;
        return {x,y,z};
    }

}

module.exports={
    superCube:superCube,
    Boite:Boite
}