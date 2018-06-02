import React, { Component } from 'react';

export default class PeopleTable extends Component {
    constructor(props) {
        super(props);
        this.state = { peopleList: [] };
    }

    componentWillMount() {
        this.props.store.subscribe(() => {
            console.log('subscribe');
            this.setState({ peopleList: this.props.store.getState().peopleList });
        })
    }

    render() {
        return (
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
        );
    }

}