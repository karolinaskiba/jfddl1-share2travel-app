
import React from 'react';
import Karola from'./Karola';
import FavoriteProducts from './FavoriteProducts'

// import Product from './Product'
// import {
//     BrowserRouter as Router,
//     Route
// } from 'react-router-dom'
// import SmartCounter from './SmartCounter'

// import Popup from './Popup';
// import Navbar from './Navbar';
// import Logo from './Logo'


// import './App.css';
import Comp from './Comp'
import Popup from './Popup'
// import PPopup from ',/PPopup'
import Login from './Login'


import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import {
  Grid,
  Col,
  Row,
} from 'react-bootstrap'
import { connect } from 'react-redux'

// import Home from './Home'


import BurgerMenuWrapper from './BurgerMenuWrapper'
import TopNavigation from './TopNavigation'

const links = [
  { path: '/', label: 'Home' },
  // { path: '/about', label: 'About' },
  { path: '/Karola', label: 'Wyszukaj' },
  { path: '/FavoriteProducts', label: 'Ulubione' },
]

const App = (props) => (
  <Router>
    <BurgerMenuWrapper
      isOpen={props.sidebarOpen}
      toggleSidebar={props.toggleSidebar}
      onStateChange={(state) => props.toggleSidebar(state.isOpen)}
      links={links}
    >

        <TopNavigation
          links={links}
          toggleSidebar={props.toggleSidebar}
        />
      <Grid>

        <Row>
          <Col md={12}>
            <Route exact path="/"  component={Login} />
            <Route path="/Karola" component={Karola}/>
            {/*<Route path="/about" component={About}/>*/}
            <Route path="/Comp" component={Comp}/>
            <Route path="/products/:productId" component={Comp}/>
            <Route path="/start" component={Popup}/>
            <Route path="/FavoriteProducts" component={FavoriteProducts}/>
          </Col>
        </Row>
      </Grid>
    </BurgerMenuWrapper>
  </Router>
)

const mapStateToProps = state => ({
  sidebarOpen: state.sidebar.sidebarOpen
})

const mapDispatchToProps = dispatch => ({
  toggleSidebar: (shouldBeOpen) => dispatch({ type: 'TOGGLE_SIDEBAR', shouldBeOpen: shouldBeOpen})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
