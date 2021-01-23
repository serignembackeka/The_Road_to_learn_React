import React, { Component } from 'react';

export class Search extends Component(){
    constructor(props){
        this.state = props
    }

    render(){
        const {
            value,
            onChange
        } = this.props
        return(
            <div>
                <form>
                    <input 
                        type="text"
                        value={value}
                        onChange={onChange}
                    />
                </form>
            </div>
        );
    }
}