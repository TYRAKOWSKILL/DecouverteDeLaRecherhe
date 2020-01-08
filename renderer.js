const fs = require('fs');
let THREE = require('three');
var {superCube,Boite}= require('./Objets');
var OrbitControls = require('three-orbit-controls')(THREE)


/*const editor = document.querySelector('#editor');
const loadInput = document.querySelector('#load-input');
const saveButton = document.querySelector('#save-button');

loadInput.addEventListener('change', () => {
    fs.readFile(loadInput.files[0].path, 'utf-8', (err, data) => {
        if (err) { throw err; }
        editor.value = data;
      });
}, true);

saveButton.addEventListener('click', () => {
    fs.writeFile(loadInput.files[0].path, editor.value, (err, data) => {
        if (err) { throw err; }
      });
}, true);*/

//$(document).ready(function(e){
/*$('#editor').keyup(function(){
  var nombreCaractere = $(this).val().length;
  var nombreMots = jQuery.trim($(this).val()).split(' ').length;
    if($(this).val() === ''){
      nombreMots = 0;
    }
  var msg = ' ' + nombreMots + ' Mot(s) | ' + nombreCaractere + ' Caractère(s)';
  $('#compteur').text(msg);
})*/
console.log('rendereJS');

//});
