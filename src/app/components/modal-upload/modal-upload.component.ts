import { Component, OnInit } from '@angular/core';
import { SubirArchivoService, ModalUploadService } from '../../services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  // oculto: string = '';
  imagenSubir: File;
  imagenTemp: any;
  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {
    
  }

  ngOnInit() {
  }
  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    
    this._modalUploadService.ocultarModal();
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

  subirImagen(): void{
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
                             .then( resp => {
                               console.log(resp);
                                this._modalUploadService.notificacion.emit( resp );
                                this.cerrarModal();
                             })
                             .catch(err => {
                               console.log("Error en la carga")
                             })
  }

}
