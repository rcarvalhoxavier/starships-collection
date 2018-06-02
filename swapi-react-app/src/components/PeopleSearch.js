import React, { Component } from 'react';
import PeopleApi from '../api/PeopleApi';

export default class PeopleSearch extends Component {

  search(event) {
    event.preventDefault();
    this.props.store.dispatch(PeopleApi.search(this.searchText.value));
  };


  render() {
    return (
      <header className="header container">
        <h1 className="header-logo">
          People
          </h1>
        <form className="header-busca" onSubmit={this.search.bind(this)}>
          <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.searchText = input} />
          <input type="submit" value="Buscar" className="header-busca-submit" />
        </form>
      </header>

    );
  }

}