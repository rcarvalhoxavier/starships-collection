import React, { Component } from 'react';
import PeopleApi from '../api/PeopleApi';
import ReactCSSTransitionGroup from 'react-transition-group';


export default class People extends Component {

  constructor(props) {
    super(props);
    console.log('props');
    console.log(this.props);
    this.state = { peopleList: [] };

  }

  search(event) {
    event.preventDefault();
    this.props.route.store.dispatch(PeopleApi.search(this.searchText.value));
  };


  componentWillMount() {
    this.props.route.store.subscribe(() => {
      console.log('subscribe');
      this.setState({ peopleList: this.props.route.store.getState().peopleList });
    })
  }



  render() {
    console.log('render');
    return (
      <div className="content">
        <form className="header-busca" onSubmit={this.search.bind(this)}>
          <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.searchText = input} />
          <input type="submit" value="Buscar" className="header-busca-submit" />
        </form>

        <div>
          <table className="pure-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>              
                {
                  this.state.peopleList.map(function (person) {
                    return (
                      <tr key={person.url}>
                        <td>{person.name}</td>
                        <td>{person.birth_year}</td>
                      </tr>
                    );
                  })
                }              
            </tbody>
          </table>
        </div>

      </div>
    );
  }
}


