import React, {Component} from 'react';
import './MainPage.css';

import {Grid, Row, Col} from 'react-bootstrap';
import Modal from 'react-responsive-modal';

const image_url = "https://image.tmdb.org/t/p/w500/";

class MainPage extends Component {

    constructor() {
        super();
        this.state = {
            movies: {
                results: []
            },
            show: false,
            open: false,
            id: null,
            selected_movie: {
                genres: []
            },
        }
    }


    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=c6954690aae063d1bff3604d7db3741d&language=en-US&page=1')
            .then(response => {
                return response.json()
            })
            .then(movies => {
                this.setState({movies: movies});
                console.log(this.state.movies);
            });
    }

    onCloseModal = () => {
        this.setState({open: false});
    };

    handleShow = (item) => {
        this.setState({open: true});
        this.setState({show: true, id: item.id});
        let url = 'https://api.themoviedb.org/3/movie/';
        url += item.id;
        url += '?api_key=c6954690aae063d1bff3604d7db3741d&language=en-US';
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(selected_movie => {
                this.setState({selected_movie: selected_movie});
                console.log(this.state.selected_movie);
            });

    };


    selectionHandler = () => {
        //TODO finish this selection handler - popular, toprated, latest
    };

    render() {

        const result = this.state.movies.results.map((movie, i) => {
            return i % 3 === 0 ? this.state.movies.results.slice(i, i + 3) : null;
        }).filter(movie => movie != null);
        const {open} = this.state;
        const {selected_movie} = this.state;

        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal} center
                       classNames={{overlay: 'custom-overlay', modal: 'custom-modal'}}>
                    <div className="modal_wrapper">
                        <div className="modal_left_side">
                            <img className="modal_img" src={image_url + selected_movie.poster_path}
                                 alt={selected_movie.title}/>
                        </div>
                        <div className="modal_right_side">
                            <h4 className="modal_title">{selected_movie.title}</h4>
                            {selected_movie.genres.map(genre => {
                                return (
                                    <div className="modal_genre_wrapper">
                                        <div className="modal_genre">
                                            {genre.name}
                                        </div>
                                    </div>
                                )
                            })
                            }
                            <div className="modal_overview">{selected_movie.overview}</div>
                        </div>

                    </div>
                </Modal>
                <Grid className="selection_row">
                    <Row>
                        <Col xs={6} md={4}>
                            <div className="selection_item" onClick={this.selectionHandler()}>Popular</div>
                        </Col>
                        <Col xs={6} md={4}>
                            <div className="selection_item" onClick={this.selectionHandler()}>Top Rated</div>
                        </Col>
                        <Col xs={6} md={4}>
                            <div className="selection_item" onClick={this.selectionHandler()}>Latest</div>
                        </Col>
                    </Row>
                </Grid>
                < Grid
                    className="card-flex">


                    {result.map((result, index) => {
                        return (<section key={index}>
                            {result.map(item =>
                                <Col md={4}>
                                    <div className="card-flex-wrapper" onClick={() => this.handleShow(item)}>
                                        <h5 className="card-title">{item.title}</h5>
                                        <div className="card-flex-item">
                                            <img className="card_img" src={image_url + item.poster_path}
                                                 alt={item.title}/>
                                        </div>
                                        <p className="card-text">{item.overview.substring(0, 250) + "..."}<strong>read
                                            more</strong></p>
                                    </div>
                                </Col>
                            )}
                        </section>);
                    })
                    }


                </Grid>

            </div>
        )
            ;
    }
}

export default MainPage;