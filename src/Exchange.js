import React, { Component } from 'react';

class Exchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: "",
            input1: "",
            input2: "",
            from: "1",
            to: "1",
            changeDirection: false,
            lastInput: ""
        }
    }
    componentDidMount() {
        fetch("http://data.fixer.io/api/latest?access_key=1d2d7693331543f2697742585cc8d7a0")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => {
            this.handleCalc(this.state.lastInput)
        });
    }
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value, lastInput: event.target.name }, () => {
            if (event.target.name === "input1") {
                this.handleCalc('input1')
            } else if (event.target.name === "input2") {
                this.handleCalc('input2')
            }
        });
    }
    handleCalc = (para) => {
        if (para === "input1") {
            this.setState({ input2: ((1 / this.state.from) * this.state.to) * this.state.input1 });
        } else if (para === "input2") {
            this.setState({ input1: ((1 / this.state.to) * this.state.from) * this.state.input2 });
        }
    }
    render() {
        return (
            <div>

                {this.state.isLoaded ?
                    <div>
                        <select name="from" id="" onChange={this.handleChange}>
                            <option value="1">EUR</option>
                            {Object.keys(this.state.data.rates).map((ele, key) => <option value={this.state.data.rates[ele]} key={key}>{ele}</option>)}
                        </select>

                        <select name="to" id="" onChange={this.handleChange}>
                            <option value="1">EUR</option>
                            {Object.keys(this.state.data.rates).map((ele, key) => <option value={this.state.data.rates[ele]} key={key}>{ele}</option>)}
                        </select>
                    </div>
                    : "Loading"}




                <input type="number" name="input1" value={this.state.input1} onChange={this.handleInput} />
                <input type="number" name="input2" value={this.state.input2} onChange={this.handleInput} />
            </div>
        );
    }
}

export default Exchange;