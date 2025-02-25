import React, { useState } from 'react';
import { MenuItemsLineales } from './MenuItemsLineales';
import { MenuItemsOrdenamientos } from './MenuItemsOrdenamientos';
import { MenuItemsArboreas } from './MenuItemsArboreas';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

function Navbar(){
	const [click, setClick] = useState(false);
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      			<div className="container-fluid">
      				<a className="navbar-brand" href="./">ESTRUCTURA DE DATOS</a>
      				<div className="collapse navbar-collapse" id="navbarColor02">
          			<ul className="navbar-nav me-auto">
            			<li className="nav-item dropdown">
              				<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Estructuras Lineales</a>
              				<div className="dropdown-menu">
                				{MenuItemsLineales.map((item, index) =>{
                					return(
                						<li key={index}>
                							<Link className={item.cName} to={item.path} onClick={() => setClick(false)}>
                								{item.title}
                							</Link>
                						</li>
                					)
                				})}
              				</div>
           				</li>
            			<li className="nav-item dropdown">
            			  <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Ordenamientos</a>
            			  <div className="dropdown-menu">
            			    {MenuItemsOrdenamientos.map((item, index) =>{
                					return(
                						<li key={index}>
                							<Link className={item.cName} to={item.path} onClick={() => setClick(false)}>
                								{item.title}
                							</Link>
                						</li>
                					)
                				})}
            			  </div>
            			</li>
            			<li className="nav-item dropdown">
            			  <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Estructura Arboreas</a>
            			  <div className="dropdown-menu">
            			    {MenuItemsArboreas.map((item, index) =>{
                					return(
                						<li key={index}>
                							<Link className={item.cName} to={item.path} onClick={() => setClick(false)}>
                								{item.title}
                							</Link>
                						</li>
                					)
                				})}
            			  </div>
            			</li>
          			</ul>
        			</div>	
      			</div>
      		</nav>
		</>
	)
}

export default Navbar;