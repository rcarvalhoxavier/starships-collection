import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import PeopleSearch from '../components/PeopleSearch';


export default class People extends Component {

  constructor(props) {
    super(props);
    console.log('props');
    console.log(this.props);
    this.state = { peopleList: [] };

  }




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
        <PeopleSearch store={this.props.route.store} />
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


