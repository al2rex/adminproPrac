import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;
  constructor(public _usuarioService: UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario){
    console.log(usuario)
    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    
    this._usuarioService.actualizarUsuario(this.usuario)
                        .subscribe( resp => {
                          console.log(resp)
                        }  )

  }

  seleccionImage(archivo: File){
    if(!archivo){
      this.imagenSubir = null;
      return;
    }
    
    if(archivo.type.indexOf('image') < 0 ){
      console.log("Solo acepto imagenes xD")
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => this.imagenTemp = reader.result
    
  }

  cambiarImage(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
