import React, { Component } from 'react';
import data from './data.json'
import KlickMeSingle from './KlickMeSingle';


class KlickMe extends Component {
    state = {
        id: ""
    }
    handleClick = (para) => {
        this.setState({ id: para });
        console.log(para)
    }
    render() {
        return (
            <div>
                {data.map(ele => <KlickMeSingle key={ele.id} handleClick={() => this.handleClick(ele.id)} text={ele.text} />)}
                {this.state.id}
            </div>
        );
    }
}

export default KlickMe;