import React, {Component} from 'react';
import './Header.css';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Form} from 'react-bootstrap';

const header_logo = require('../../assets/header_logo.png');


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMoviesByYearOpen: false,
            isMoviesByGenreOpen: false,
            genresObj: {
                genres:[]
            }
        }
    }

    componentDidMount() {
        const url = "https://api.themoviedb.org/3/genre/movie/list?api_key=c6954690aae063d1bff3604d7db3741d&language=en-US";

        fetch(url).then(response => {
            return response.json()
        }).then(genres => {
            this.setState({genresObj: genres});
        });

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

    onNavFormSubmit = (event) => {
        event.preventDefault();
        //TODO implement search option
    };


    render() {
        return (
            <div id="header_container">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <img id="header_logo" alt="MoviesApp" src={header_logo}/>
                    </Navbar.Header>
                    <Nav>
                        <NavItem className="NavItem" eventKey={1} href="#">
                            Movies
                        </NavItem>
                        <NavDropdown id="sample" className="NavItem"
                                     eventKey={2}
                                     title="Movies by genre"
                                     onMouseEnter={this.handleMoviesByGenreOpen}
                                     onMouseLeave={this.handleMoviesByGenreClose}
                                     open={this.state.isMoviesByGenreOpen}>

                            {this.state.genresObj.genres.map((genre,id )=> {
                                return(
                                    <MenuItem eventKey={id}>{genre.name}</MenuItem>
                                )
                            })}
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