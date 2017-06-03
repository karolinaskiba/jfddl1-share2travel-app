import React from 'react';
import { connect } from 'react-redux'
import Toggle from 'react-toggle'

import {add, remove} from './state/favoriteProducts'
import {Row, Col, ButtonToolbar, Button, Panel} from 'react-bootstrap';
import Chart from './Chart'
import './Comp.css'

const face = 'http://www.facebook.com/share.php?u=' + encodeURIComponent(location.href);
import {fetchProducts} from './state/products'
import * as firebase from 'firebase';

// Initialize Firebase


export default connect(
  state => ({
    products: state.products,
    favIds: state.favoriteProducts
  }),
  dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    addToFavorites: (productId) => dispatch(add(productId)),
    removeFromFavorites: (productId) => dispatch(remove(productId)),
  })
)(
  class Comp extends React.Component {

    state = {
      x:'0'
    }

    componentWillMount() {
      this.props.fetchProducts()
      firebase.database().ref('/productsByUid/').child(
        // this.props.match.params.productId
        '/12434cc7-6cfb-4d86-a58d-9aa118a9c9bc/'
      ).child('/pricesArray/').on('value', (snapshot) => {
        this.setState({
          x: snapshot.val()
        })
      })
    }

    constructor(props) {
      super(props);
      console.log('firebase', firebase);
      this.state = {
        searchPhrase: '',
        products: null,

      };
      fetch(
        process.env.PUBLIC_URL + '/data/products.json'
      ).then(
        response => response.json()
      ).then(
        data => this.setState({
          products: data.products
        })
      )
    }

    render() {
      const {addToFavorites, removeFromFavorites, favIds} = this.props
      const productUid = this.props.match.params.productId;
      const products = this.state.products;

      const product = products !== null ?
        products.find(
          product => product.uid === productUid
        ) : null;

      const similarProductsPrices = product !== null ? products.filter(p => p.id === product.id).map(e => {return parseInt(e.price,10)}) : null;

      // const storageRef = firebase.storage().ref('x');

      return product === null ? <p>Ładowanie produktu</p> : (
        <div>
          <Panel className='Comp-center Comp-panel' bsStyle="primary" header={product.productName}>
          </Panel>

          <Row className='Comp-vertical-align'>
            <Col lg={4}>
              <img className="Comp-img" src={process.env.PUBLIC_URL + '/shoe.jpg'} alt=''/>
            </Col>
            <Col className='Comp-opis' lg={4}>
              <h1 className="Comp-h1">Opis produktu</h1>
              <p>

                Typ: {product.product}<br/>
                Nazwa: {product.productName}<br/>
                Producent: {product.producer}<br/>
                Kategoria: {product.department}<br/>
                Materiał: {product.productMaterial}<br/>
                Kolor: {product.color}<br/>
                ID: {product.id}<br/>
                {/*{product.id}*/}


              </p>
              <div className="fb-share-button" data-href="{face}" data-layout="button" data-size="large"
                   data-mobile-iframe="false"><a className="fb-xfbml-parse-ignore" target="_blank"
                                                 href={face}>Udostępnij</a>
                <br/>
                <br/>
                {/*<button onClick={() => addToFavorites(product.uid)}*/}
                        {/*disabled={favIds.includes(product.uid)}>*/}
                  {/*Dodaj do ulubionych*/}
                {/*</button>*/}
                {/*<button*/}
                  {/*onClick={() => removeFromFavorites(product.uid)}*/}
                  {/*disabled={!favIds.includes(product.uid)}>*/}

                  {/*Usuń z ulubionych*/}
                {/*</button>*/}
                <div>
                    <label>



                            {
                              favIds.includes(product.uid) ?
                                <Toggle
                                  checked={true}
                                  aria-label='Usuń z ulubionych'
                                  onChange={() => removeFromFavorites(product.uid)}/> :
                                <Toggle
                                  checked={false}
                                  aria-label='Dodaj do ulubionych'
                                  onChange={() => addToFavorites(product.uid)}/>
                            }

                         <br/>
                        <p>Dodaj do ulubionych</p>

                    </label>
                </div>

              </div>
            </Col>
            <Col className='Comp-firstRowButtons' lg={4}>
              <ButtonToolbar>

                {similarProductsPrices.sort(function(a, b){return b-a}).reverse().map(price => (
                  <Button  key={products.uid} className="Comp-button" bsStyle="info">
                    <img  className="Comp-left Comp-img" src={process.env.PUBLIC_URL + '/nike.png'} alt=""/>
                    <span  className="Comp-price">
                    {parseInt(price, 10) + ' zł'}
                    </span>
                  </Button>))}

              </ButtonToolbar>
            </Col>
          </Row>

          <Row>
            <Col className='Comp-wykresik' lg={6}>
              {console.log(this.state.x)}
              <Chart
                series={[{
                  data: this.state.x

                  //   .map(item => parseFloat(product.price)).map((item, index, array) => {
                  //   if (index === 0) {
                  //     return item
                  //   }
                  //   return item + Math.round(Math.random() * 10) - 5
                  // }).reverse()

                }]}/>
            </Col>
          </Row>
        </div>
      )
    }
  }
)