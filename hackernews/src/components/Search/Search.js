import React, { Component } from 'react';

export class Search extends Component{

    render(){
        const {
            value,
            onChange,
            children
        } = this.props;
        return(
            <div>
                <form>
                    {children} <input 
                        type="text"
                        value={value}
                        onChange={onChange}
                    />
                </form>
            </div>
        );
    }
}