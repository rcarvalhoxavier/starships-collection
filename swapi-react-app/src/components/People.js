import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import PeopleSearch from '../components/PeopleSearch';
import PeopleTable from '../components/PeopleTable';


export default class People extends Component {

  constructor(props) {
    super(props);
    console.log('props');
    console.log(this.props);
    this.state = { peopleList: [] };

  }

  render() {
    console.log('render');
    return (
      <div className="content">
        <PeopleSearch store={this.props.route.store} />
        <PeopleTable store={this.props.route.store} />
      </div>
    );
  }
}


