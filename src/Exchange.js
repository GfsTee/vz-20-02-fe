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
            to: "1"
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
        this.setState({ [event.target.name]: event.target.value }, (event) => this.calc(event));
    }
    handleCalc = (event) => {
        let input = event.target.name;
        this.setState({ [event.target.name]: event.target.value }, () => {
            if (input === "input1") {
                this.setState({ input2: ((1 / this.state.from) * this.state.to) * this.state.input1 });
            } else if (input === "input2") {

            }
        });
    }
    calc = () => {
        return (1 / this.state.input1) * this.state.input2
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




                <input type="number" name="input1" value={this.state.input1} onChange={this.handleCalc} />
                <input type="number" name="input2" value={this.state.input2} onChange={this.handleCalc} />
            </div>
        );
    }
}

export default Exchange;