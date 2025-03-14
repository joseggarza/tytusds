const Nodo = require('./Nodo.js');

class EstructuraCola{
	primero=null;

	Constructor(){
		this.primero= null;
		this.ultimo=null;
	}
	get_primero = () => {return this.primero;}
	set_primero = (primero) => {this.primero = primero;}
	get_ultimo = () => {return this.ultimo;}
	set_ultimo = (ultimo) => {this.ultimo = ultimo;}
	get_vacia = () => {
		if(this.get_primero()==null){
			return true;
		}else{
			return false;
		}
	}
	Encolar = (valor) => {
		let nodo = new Nodo(valor);
		if(this.get_vacia()==true){
			this.set_primero(nodo);
			this.set_ultimo(nodo);
		}else{
			this.get_ultimo().set_siguiente(nodo);
			this.set_ultimo(nodo);
		}
	}
	Desencolar = () => {
		let nodo = this.primero;
		let seguir = true;
		this.set_primero(this.get_primero().get_siguiente());
	}
	Buscar = (dato) =>{
		let nodo = this.get_primero();
		let i=0;
		if(this.get_vacia() == false){
			do{
				if(nodo.get_valor() == dato){
					return i;
				}
				i++;
				nodo = nodo.get_siguiente();
			}while(nodo != null);
		}else{
			return false;
		}
		return false;
	}

	Imprimir = () => {
		let nodo = this.get_primero();
		do{
			console.log(nodo.get_valor());
			nodo=nodo.get_siguiente();
		}while(nodo!=null)
	}
	GenerarNodosDOT = () => {
		let nodo = this.get_primero();
		var dot = [];
		if(this.get_vacia()==false){
			let id = 0;
			do{
				dot.push({id: id, label: nodo.get_valor()});
				nodo=nodo.get_siguiente();
				id++;
			}while(nodo != null);
		}
		return dot;
	}
	GenerarEdgesDOT = () => {
		let nodo = this.get_primero();
		var dot = [];
		if(this.get_vacia()==false){
			let i = 0;
			do{
				if ( nodo.get_siguiente() != null) {
					let nodoactual=parseInt(i)
					let nodosiguiente = parseInt(nodoactual) + parseInt(1)
					if(i==0){
						dot.push({from:0, to:1, arrows: "to"});
					}
					if(nodoactual != false && nodosiguiente != false){
						dot.push({from:parseInt(nodoactual), to:parseInt(nodosiguiente), arrows: "to"});
					}
				}
				nodo = nodo.get_siguiente();
				i++;
			}while(nodo != null);
		}
		return dot;
	}
}

module.exports = EstructuraCola;