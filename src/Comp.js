import React from 'react';
import { connect } from 'react-redux'
import Toggle from 'react-toggle'

import { add,remove } from './state/favoriteProducts'
import {Grid, Row, Col, ButtonToolbar, Button, Panel} from 'react-bootstrap';
import Chart from './Chart'
import './Comp.css'

const face = 'http://www.facebook.com/share.php?u=' + encodeURIComponent(location.href);
import { fetchProducts } from './state/products'

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
    componentWillMount() {
        this.props.fetchProducts()
    }

    constructor(props) {
    super(props);
    this.state = {
      searchPhrase: '',
      products: null
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
      const {addToFavorites,removeFromFavorites,favIds } = this.props
    const productId = this.props.match.params.productId;
    const products = this.state.products;

    const product = products !== null ?
      products.find(
        product => product.uid === productId
      ) : null

    return product === null ? <p>Ładowanie produktu</p> : (
      <Grid>
        <Panel className='Comp-center' bsStyle="primary" header={product.productName}>
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
              Kolor: {product.color}


            </p>
            <div className="fb-share-button" data-href="{face}" data-layout="button" data-size="large"
                 data-mobile-iframe="false"><a className="fb-xfbml-parse-ignore" target="_blank"
                                               href={face}>Udostępnij</a>
            <br/>
            <br/>
              <button onClick={()=>addToFavorites(product.uid)}
                  disabled={favIds.includes(product.uid)}>
                  Dodaj do ulubionych
              </button>
                <button
                    onClick={() => removeFromFavorites(product.uid)}
                    disabled={!favIds.includes(product.uid)}>

                   Usuń
                </button>
                <div>
                    <label>

                        <Toggle
                            defaultChecked={this.state.eggsAreReady}
                            aria-label='Dodaj do ulubionych'
                            onChange={this.handleEggsChange}

                                 handleChange=() => {this.state.eggsAreReady? addToFavorites(product.uid):removeFromFavorites(product.uid)}


                        /> <br/>
                        <p>Dodaj do ulubionych</p>

                    </label>
                </div>

            </div>
          </Col>
          <Col className='Comp-firstRowButtons' lg={4}>
            <ButtonToolbar>
              <Button className="Comp-button" bsStyle="info">
                <img className='Comp-left Comp-img' src={process.env.PUBLIC_URL + '/nike.png'} alt=''/>
                <span className='Comp-price'>
                {(parseFloat(product.price)) + ' zł'}
                </span>
              </Button>
              <Button className="Comp-button" bsStyle="info">
                <img className="Comp-img" src={process.env.PUBLIC_URL + '/nike.png'} alt=''/>
                <span className='Comp-price'>
                {(parseFloat(product.price) + 15) + ' zł'}
                </span>
              </Button>
              <Button className="Comp-button" bsStyle="info">
                <img className="Comp-img" src={process.env.PUBLIC_URL + '/nike.png'} alt=''/>
                <span className='Comp-price'>
                {(parseFloat(product.price) + 20) + ' zł'}
                </span>
              </Button>
            </ButtonToolbar>
          </Col>
        </Row>

        <Row>
          <Col className='Comp-wykresik' lg={6}>
            <Chart
              series={[{data: [0,0,0,0,0,0,0].map(item => parseFloat(product.price)).map((item, index, array) => {
                if (index === 0) {
                  return item
                }
                return item + Math.round(Math.random() * 10) - 5
              }).reverse()}]}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}
)

