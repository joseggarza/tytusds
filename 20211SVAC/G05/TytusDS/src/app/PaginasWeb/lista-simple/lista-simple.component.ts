import { Component, OnInit } from '@angular/core';
import { ListaSimple } from './ts/lista-simple';
import { saveAs } from 'file-saver';
import { DocumentoService } from '../../services/documento.service';

declare var require: any;
let vis=require('../../../../vis-4.21.0/dist/vis');

@Component({
  selector: 'app-lista-simple',
  templateUrl: './lista-simple.component.html',
  styleUrls: ['./lista-simple.component.css']
})
export class ListaSimpleComponent implements OnInit {

  lista: ListaSimple;  //  Variable para manejar la lista simple

  //  Las variables para manejar las operaciones de la lista
  valorAgregar = '';
  valorEliminar = '';
  nodoActualizar = '';
  valorActualizar = '';
  valorBuscar = '';

  //  Las opciones de la confuguracion para las operaciones
  opciones = {
    ingreso: 'final',
    velocidadLineales: 1000,
    repeticionLineales: true,
    velocidadOrdenamientos: 1000,
    velocidadArboles: 1000,
    grado: 3,
    repeticionArboles: true,
  };

  constructor(private documentoService: DocumentoService) {
    this.lista = new ListaSimple();
  }

  ngOnInit(): void {}

  //  Si el usuario cambia alguna opcion se recibe la nueva configuracion y se cambia por la anterior
  getOpciones(opciones: any): void {
    console.log(opciones);
    this.opciones = opciones;
  }

  //  Si el usuario decide cargar un archivo
  getDocumento(documento: any): void{
    this.documentoService.getDocumento(documento).then( contenido => {
      console.log(contenido);
      if (contenido['repeticion'] !== undefined) {
        this.opciones['repeticionLineales'] = contenido['repeticion'];
      }
      if (contenido['posicion'] !== undefined) {
        this.opciones['ingreso'] = contenido['posicion'];
      }
      contenido['valores'].forEach(valor => {
        this.valorAgregar = '' + valor;
        this.agregar(true);
        //this.lista.insertarFinal(valor);
      });
      console.log(this.lista.primero);
      this.graficar();
    });
  }

  //  Agregar un nuevo elemento en la lista
  agregar(esperar?: boolean): void {
    if (this.valorAgregar.length > 0) {
      if (this.opciones['repeticionLineales'] === false) {
        if (this.lista.verRepetido(this.valorAgregar) === true) {
          this.valorAgregar = '';
          return;
        }
      }
      if (this.opciones['ingreso'].toLowerCase() === 'final' || this.opciones['ingreso'].toLowerCase() === 'fin') {
        this.lista.insertarFinal(this.valorAgregar);
      } else if (this.opciones['ingreso'].toLowerCase() === 'inicio') {
        this.lista.insertarInicio(this.valorAgregar);
      }
      //console.log(this.lista.primero.valor);
      this.valorAgregar = '';
      if (!esperar) {
        this.graficar();
      }
    }
  }

  //  Eliminar un elemento de la lista
  eliminar(): void {
    if (this.valorEliminar.toString().length > 0){
      this.lista.eliminar(+this.valorEliminar);
      this.graficar();
      this.valorEliminar = '';
    }
  }

  //  Actualizar un elemento de la lista
  actualizar(): void {
    if (this.nodoActualizar.length === 0 || this.valorActualizar.length === 0) {
      console.log('no se puede');
      return;
    }
    this.lista.actualizar(+this.nodoActualizar, this.valorActualizar);
    this.graficar();
    this.nodoActualizar = '';
    this.valorActualizar = '';
  }

  // metodo de busqueda
  buscar(): void {
    if (this.valorBuscar === '') {
      return;
    }
    let aux = this.lista.primero;
    for (let x = 0; x < this.lista.cuenta; x++) {
      if (aux.valor === +this.valorBuscar || aux.valor === `${this.valorBuscar}`) {
        this.graficarBusqueda(x);
        break;
      }
      aux = aux.siguiente;
    }

  }

  graficarBusqueda(lugar: number): void {
    //Retorno de la lista con los objetos de nodos y edges
    const nodes = this.lista.getNodos();
    const edges = this.lista.getEdges();
    //se escoge el div a utilizar como contenedor
    let contenedor = document.getElementById("contenedor");
    const datos = {nodes:nodes,edges:edges};
    //OPCIONES PARA LOS NODOS----------------------------------------------------------
    let opciones={
      edges:{
        arrows:{
          to:{
            enabled:true
          }
        },
        color:{
          color:"red"
        }
      },
      nodes:{
        color:{
          border:"white",background:"red"
        }
      }
    };
    //------------------------------------------------------------------------
    let grafo= new vis.Network(contenedor,datos,opciones);
    //OPCIONES ANIMACION:
    //n:contador velE:velocidad de estiramiento dur:duración
    let n = 0, velE = 100, dur = this.opciones['velocidadLineales'];
    //NEst=numero de estiramientos que tendran los nodos Math.floor redondea al valor entero hacia la izquierda
    var NEst = Math.floor( dur / velE);
    //Obtencion de las posicionesa actuales de los nodos
    let pos = grafo.getPositions();

    let AnimLista = setInterval(function(){

      //Por_est: porcentaje para estirarse, si NEst es muy grande se estirara mas
      //entre mayor sea el porcentaje en cada iteración mas pronto volvera al origen
      let por_est = n / NEst;
        //en lugar de i podria ir un string, como se realizaria en un diccionario
        let posx = pos[n].x, posy=pos[n].y;
        let xt =  posx* por_est;
        let yt =  posy * por_est;
        //Mover cada nodo, luego del move los nodos vuelven a su posicion normal
        grafo.moveNode(n,xt,yt);

      //PARA LUEGO DE
      if(n == lugar){
        clearInterval(AnimLista);
      }
      n+=1;
      //tiempo de repeticion de cada nodo
    }, dur);
  }

  //OPCIONES PARA GRAFICAR------------------------
  graficar(): void {
    //Retorno de la lista con los objetos de nodos y edges
    const nodes = this.lista.getNodos();
    const edges = this.lista.getEdges();
    //se escoge el div a utilizar como contenedor
    let contenedor = document.getElementById("contenedor");
    const datos = {nodes:nodes,edges:edges};
    //OPCIONES PARA LOS NODOS----------------------------------------------------------
    let opciones={
      edges:{
        arrows:{
          to:{
            enabled:true
          }
        },
        color:{
          color:"red"
        }
      },
      nodes:{
        color:{
          border:"white",background:"red"
        }
      }
    };
    //------------------------------------------------------------------------
    let grafo= new vis.Network(contenedor,datos,opciones);
  }

  guardar(): void {
    const contenido: any = {
      categoria: "Estructura Lineal",
      nombre: "Lista Simplemente Enlazada",
      valores: []
    };
    let aux = this.lista.primero;
    for (let i = 0; i < this.lista.cuenta; i++) {
      contenido.valores.push(aux.valor);
      aux = aux.siguiente;
    }
    let blob = new Blob([JSON.stringify(contenido)], {type: 'json;charset=utf-8'});
    saveAs(blob, 'descarga.json');
  }

}
