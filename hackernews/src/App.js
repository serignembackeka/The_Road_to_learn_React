import React, {Component} from 'react';
import './App.css';
import { Search } from './components/Search/Search';
import { Table } from './components/Table/Table';

const list = [
  {
    title: "React",
    url: 'https://facebook.github.io/react/',
    author: "Mister_K",
    num_comments: 3,
    points: 4,
    ObjectID: 0
  },
  {
    title: "Redux",
    url: 'https://facebook.github.io/react/',
    author: "SMK",
    num_comments: 2,
    points: 5,
    ObjectID: 1
  }
];
class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      list: list,
      searchTerm: ""
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.isSearched = this.isSearched.bind(this);
  }

  onDismiss(id){
    const updatedList = this.state.list.filter(item => item.ObjectID !== id);
    this.setState({list: updatedList});
  }

  onSearchChange (event){
    this.setState({ searchTerm: event.target.value });
  }

  isSearched (searchTerm){
    return function (item){
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    };
  }

  render(){

    const {
      list,
      searchTerm
    } = this.state; // Destructuring the state to avoid writing "this.state.list" or
                    // "this.state.searchTerm" instead, now I can write "list" or "searchTerm"

    return (
      <div className="App">

        <Search
          value={searchTerm} // The uncontrolled attribute or component is now controlled
          onChange={this.onSearchChange}
        />

        <Table 
          list= {list}
          pattern= {searchTerm}
          onDismiss= {this.onDismiss}
        />
        
      </div>
    );
  }
}

export default App;
