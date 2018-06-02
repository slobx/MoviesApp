import React, {Component} from 'react';
import './Header.css';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form} from 'react-bootstrap';

const header_logo = require('../../Assets/header_logo.png');


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMoviesByYearOpen: false,
            isMoviesByGenreOpen: false,
        }
    }

    handleMoviesByYearOpen = () => {
        this.setState({isMoviesByYearOpen: true})
    };
    handleMoviesByYearClose = () => {
        this.setState({isMoviesByYearOpen: false})
    };
    handleMoviesByGenreOpen = () => {
        this.setState({isMoviesByGenreOpen: true})
    };
    handleMoviesByGenreClose = () => {
        this.setState({isMoviesByGenreOpen: false})
    };

    onNavFormSubmit = (event) =>{
        event.preventDefault();
      alert("Test");
    };


    render() {
        return (
            <div id="header_container">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <img id="header_logo" src={header_logo}/>
                    </Navbar.Header>
                    <Nav>
                        <NavItem className="NavItem" eventKey={1} href="#">
                            Top rated movies
                        </NavItem>
                        <NavDropdown className="NavItem"
                                     eventKey={2}
                                     title="Movies by genre"
                                     onMouseEnter={this.handleMoviesByGenreOpen}
                                     onMouseLeave={this.handleMoviesByGenreClose}
                                     open={this.state.isMoviesByGenreOpen}>
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Comedy</MenuItem>
                            <MenuItem eventKey={3.3}>Thriller</MenuItem>
                            <MenuItem eventKey={3.3}>Horror</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.4}>More...</MenuItem>
                        </NavDropdown>
                        <NavDropdown className="NavItem"
                                     eventKey={3}
                                     title="Movies by year"
                                     id="basic-nav-dropdown"
                                     onMouseEnter={this.handleMoviesByYearOpen}
                                     onMouseLeave={this.handleMoviesByYearClose}
                                     open={this.state.isMoviesByYearOpen}>
                            <MenuItem eventKey={3.1}>2010-2018</MenuItem>
                            <MenuItem eventKey={3.2}>2000-2009</MenuItem>
                            <MenuItem eventKey={3.3}>1990-1999</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey={3.4}>More..</MenuItem>
                        </NavDropdown>
                        <NavItem className="NavItem" eventKey={4} href="#">
                            TV Shows
                        </NavItem>
                        <NavItem className="NavItem" eventKey={5} href="#">
                            BoxOffice
                        </NavItem>
                    </Nav>
                    <Navbar.Form pullRight className="NavItem">
                        <Form onSubmit={this.onNavFormSubmit}>
                            <FormGroup className="navbar_search">
                                <FormControl id="navbar_search_box" type="text" placeholder="Search"/>
                            </FormGroup>{' '}
                        </Form>
                    </Navbar.Form>
                </Navbar>
            </div>
        )
    }
}

export default Header;