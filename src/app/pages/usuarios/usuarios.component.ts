import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.models';
import { UsuarioService, ModalUploadService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuariosService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUSuarios();
  }
  mostrarModal(id: string){
    this._modalUploadService.mostrarModal('usuarios', id);
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUSuarios() );
  }

  cargarUSuarios(){
    this.cargando = true;
    this._usuariosService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      console.log(resp.usuarios)
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    })

  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros ){
      return;
    }

    if( desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarUSuarios();
  }

  buscarUsuario(termino: string){
    if( termino.length <= 0 ){
      this.cargarUSuarios();
      return;
    }
    this.cargando = true;
    this._usuariosService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    })
  }
  borrarUsuario(usuario: Usuario){
    console.log(usuario)
    if(usuario._id === this._usuariosService.usuario._id){
      console.log("No se puede borrar asi mismo");
      return;
    }
    if(confirm('¿Desea borrar el usuario ' + usuario.nombre + ' ?')){
      this._usuariosService.borrarUsuario(usuario._id).subscribe( resp => {
        console.log(resp)
        this.cargarUSuarios();
      })
    }
  }

  guardarUsuario(usuario: Usuario){

    this._usuariosService.actualizarUsuario(usuario).subscribe();
  }

}
