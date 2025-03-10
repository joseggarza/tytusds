import React from 'react';
import ListaDoble from '../../EDD/ListaDobleEnlazada';
import './ListaDobleEnlazada.css';
import flecha from '../../assets/flechad.png'


class ListaDobleEnlazada extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            elemento: '',
            reemplazado: '',
            data: null,
            lista: new ListaDoble()
        };

        this.ContenidoElemento = this.ContenidoElemento.bind(this);
        this.ContenidoReemplazado = this.ContenidoReemplazado.bind(this);
        this.InsertarContenidoInicio = this.InsertarContenidoInicio.bind(this);
        this.InsertarContenidoFinal = this.InsertarContenidoFinal.bind(this);
        this.ImprimirLista = this.ImprimirLista.bind(this);
        this.EliminarElemento = this.EliminarElemento.bind(this);
        this.ModificarElemento = this.ModificarElemento.bind(this);
        this.leerJson = this.leerJson.bind(this);
    }

    ContenidoElemento(e) {
        this.setState({ elemento: e.target.value });
    }

    ContenidoReemplazado(e) {
        this.setState({ reemplazado: e.target.value });
    }

    InsertarContenidoInicio() {
        this.state.lista.add_i(this.state.elemento);
        this.setState({
            lista: this.state.lista,
        });
    }

    InsertarContenidoFinal() {
        this.state.lista.add_f(this.state.elemento);
        this.setState({
            lista: this.state.lista,
        });
    }

    EliminarElemento() {
        this.state.lista.delete(this.state.elemento);
        this.setState({
            lista: this.state.lista,
        });
    }


    ImprimirLista() {
        this.state.lista.imprimir();
    }

    ModificarElemento() {
        this.state.lista.update(this.state.elemento, this.state.reemplazado);
        this.setState({
            lista: this.state.lista,
        });
    }


    leerJson(event) {
        const input = event.target
        const reader = new FileReader()
        reader.onload = (event) => {
            const text = reader.result

            const json = JSON.parse(text)
            const valores = json.valores

            valores.forEach((element, index) => {
                setTimeout(() => {
                    this.setState({
                        elemento: element,
                    }, () => {
                        this.InsertarContenidoFinal()
                    })

                }, index * 1000)
            });

            this.setState({
                data: json
            })
        }
        reader.readAsText(input.files[0], "UTF-8")
    }

    render() {
        console.log(this.state.lista.length);
        return (
            <div className="container">
                <div className="row gap-2">
                    <div className="col-sm-2 d-grid gap-2">
                        <input type="text" className="form-control" id="Elemento" placeholder="Elemento" value={this.state.elemento} onChange={this.ContenidoElemento} />
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-success" onClick={this.InsertarContenidoInicio} >Insertar al Inicio</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-success" onClick={this.InsertarContenidoFinal} >Insertar al Final</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-danger" onClick={this.EliminarElemento} >Eliminar</button>
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <input type="file" class="form-control" onChange={this.leerJson} />
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <input type="text" className="form-control" id="contenido" placeholder="Reemplazar" value={this.state.reemplazado} onChange={this.ContenidoReemplazado} />
                    </div>

                    <div className="col-sm-2 d-grid gap-2">
                        <button className="btn btn-warning" onClick={this.ModificarElemento}>Modificar</button>
                    </div>


                </div>

                <div className="card mt-2">
                    <div className="contPadre">
                    
                        {
                            Array(this.state.lista.length).fill({}).map((_e, i) => (
                                <div className="contNodo animate__animated animate__fadeInBottomLeft">
                                    <div className="enlace"></div>
                                    <div className="valor">{this.state.lista.get(i)}</div>
                                    <div className="enlace"></div>
                                    <div className="flech animate__animated animate__backInLeft">
                                    <img src={flecha} width="40px" height="30px"/>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="nodoNull animate__animated animate__fadeInDown">
                        Null
                        </div>
                    </div>


                </div>

            </div>
        )
    }
}

export default ListaDobleEnlazada;