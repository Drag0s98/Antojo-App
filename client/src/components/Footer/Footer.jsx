import React from "react";

import home from '../../styles/assets/img/png/home.png';
import shopping from '../../styles/assets/img/png/shopping-bag.png';
import account from '../../styles/assets/img/png/account.png';
import { Link } from "react-router-dom";

const Footer = () => {

  console.log(window.location.pathname)

  return (
    <footer className="footer2">
      <div className="arrow-container">

          <div className="expl">
            <Link to={`/home`} className={`expl ${window.location.pathname === '/home' || '/search' ? 'linkfooter2' : 'linkfooter'}`}>
            <img src={home} alt="" />
            <p className="explora">Explora</p>
            </Link>
          </div>

          <div className="shop">
            <Link to={`/orders`} className={`shop ${window.location.pathname === '/orders' ? 'linkfooter3' : 'linkfooter'}`}>
            <img src={shopping} alt="" />
            <p className="compra">Pedidos</p>
            </Link>
          </div>

          <div className="acc">
            <img src={account} alt="" />
            <p className="perf">Perfil</p>
          </div>
        
      </div>
    </footer>
  );
};

export default Footer;
