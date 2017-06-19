import React from 'react';
import ReactDOM from 'react-dom';

// Import bootstrap and your main.scss
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css';
import style from './scss/base.scss';

import io from 'socket.io-client';
import gfsIds from './gfs-ids.json';
import alimIds from './alim-ids.json';

require.context("./", true, /^\.\/.*\.html/);


function getIds(supplier) {
  if (supplier == 'GFS') {
    return gfsIds;
  } else if (supplier == 'ALIM') {
    return alimIds;
  }
  return [];
}

function getCookie(supplier) {
  if (supplier == 'GFS') {
    return {
      jSessionId: '0000wGYXND1WxYXwtxnmP-XXJhA:19evi6k52'
    };
  } else if (supplier == 'ALIM') {
    return {
      cfId : '25797033',
      cfToken : '71433318'
    };
  }
  return {};
}

function setupSupplier(supplier, socket, isMock) {
  let ids = getIds(supplier);

  socket.emit('clientEvent', JSON.stringify({
    supplier: supplier,
    isMock: isMock,
    ids: ids,
    cookie : getCookie(supplier)
  }));
}

const TableProducts = ({products, title}) => {
  return (
   <table>
   <thead>
        <tr><th>{ title }</th></tr>
   </thead>
    <tbody>
      <tr>
        <th>id</th>
        <th>productName</th>
        <th>packetFormat</th>
        <th>price</th>
        <th>unitPriceFormated</th>
        <th>standardUnit</th>
        <th>date</th>
      </tr>
      {products.slice(0).reverse().map(product =>
         (<tr key={product.id}>
           <td>{product.id}</td>
           <td>{product.productName}</td>
           <td>{product.packetFormat}</td>
           <td>{product.price}$</td>
           <td>{product.unitPriceFormated}$</td>
           <td>{product.standardUnit}</td>
           <td>{product.date}</td>
         </tr>)
      )}
    </tbody>
   </table>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.socket = io.connect('ws://localhost:3000/');
    this.state = {
      alimProducts: [],
      gfsProducts: [],
      isMock: true
    };
    setupSupplier('ALIM', this.socket, this.state.isMock);
    setupSupplier('GFS', this.socket, this.state.isMock);
  }

  componentDidMount() {
    this.socket.on('dataJson_ALIM', function(data){
      let alimProducts = this.state.alimProducts;
      alimProducts.push(data);
      this.setState({alimProducts: alimProducts})
    }.bind(this));

    this.socket.on('dataJson_GFS', function(data){
      let gfsProducts = this.state.gfsProducts;
      gfsProducts.push(data);
      this.setState({gfsProducts: gfsProducts})
    }.bind(this));
  }

  render() {
    return (
      <div>
        <TableProducts products={this.state.gfsProducts} title={'GFS'}/>
        <TableProducts products={this.state.alimProducts} title={'ALIM PLUS'}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
