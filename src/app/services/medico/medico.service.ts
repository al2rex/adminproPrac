import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {
  totalMedicos: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';

    return this.http.get(url)
              .map( (resp: any) => {
                  this.totalMedicos = resp.conteo;
                  return resp.medicos;
              })

  }
  cargarMedico(id:string){
    let url = URL_SERVICIOS + '/medico/'+id;

    return this.http.get(url)
               .map((resp:any) =>  resp.medico);
  }

  buscarMedicos(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/'+ termino;
    return this.http.get( url ).map( (resp: any) => resp.medicos )
  }

  borrarMedico(id: string){
      let url = URL_SERVICIOS + '/medico/' + id;
      url += '?token=' + this._usuarioService.token;
      console.log("registro eliminado xD")
      return this.http.delete( url );   

  }

  guardarMedico(medico: Medico){
    //console.log(medico);return;
    let url = URL_SERVICIOS + '/medico';
    if( medico._id ){
      //actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
                 .map((resp: any) => {
                   console.log("medico actualizado")
                   return resp.medico
                 })
    }else{
      //creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
               .map( (resp: any) => {
                 console.log("Medico creado xD")
                 return resp.medico;
               })
    }



   
  }

}
