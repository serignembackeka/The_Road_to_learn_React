import React, { Component } from 'react';

export class Table extends Component(){

    render(){
        const {
            list,
            pattern,
            onDismiss
        } = this.props
        return(
            <div>
            {list.filter(this.isSearched(pattern)).map(item => {
                return (
                <div key={item.ObjectID}>
                  <span>
                    <a href={item.url}>{item.title}</a>
                  </span>
                  <span>{item.author}</span>
                  <span>{item.num_comments}</span>
                  <span>{item.points}</span>
                  <span>
                    <button
                      onClick={()=>onDismiss(item.ObjectID)}
                      type="button"
                    >
                      Dismiss            
                    </button>
                  </span>
                </div>
                )
                })}

            </div>
        );
    }
}