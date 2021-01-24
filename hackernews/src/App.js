import React, {Component} from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  setSearchTopStories(result){
    this.setState({ result });
  }

  componentDidMount(){
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  onSearchChange (event){
    this.setState({ searchTerm: event.target.value });
  }

  

  render(){

    console.log(this.state);

    const {
      result,
      searchTerm
    } = this.state; // Destructuring the state to avoid writing "this.state.list" or
                    // "this.state.searchTerm" instead, now I can write "list" or "searchTerm"
    
    return (
      <div className="page">
        <div className="interactions">
          <Search
            children="Search"
            value={searchTerm} // The uncontrolled attribute or component is now controlled
            onChange={this.onSearchChange}
          />
        </div>

        {result
          ? <Table 
              list= {result.hits}
              pattern= {searchTerm}
              onDismiss= {this.onDismiss}
            />
          : null}
        
      </div>
    );
  }
}

const Search = ({value, onChange, children}) =>{

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

function Table({list, pattern, onDismiss}){

    const largeColumn = {
      width: "40%"
    }
    const midColumn = {
      width: "40%"
    }
    const smallColumn = {
      width: "40%"
    }

    const isSearched = searchTerm => {
      return function (item){
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      };
    }

    return(
      <div className="table">
        {list.filter(isSearched(pattern)).map((item) =>
            <div key={item.objectID} className="table-row">
              <span style={largeColumn}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span style={midColumn}>{item.author}</span>
              <span style={smallColumn}>{item.num_comments}</span>
              <span style={smallColumn}>{item.points}</span>
              <span style={smallColumn}>
                <Button
                  btn="Dismiss" 
                  type="type"
                  className="button-inline"
                  onClick={()=>onDismiss(item.ObjectID)}
                />
              </span>
            </div>
            )}
      </div>);
}

function Button(props){
    const {
      btn,
      type,
      className = "",
      onClick
    } = props

    return(
    <div>
      <button
        type={type}
        onClick={onClick}
        className={className}
      >
        {btn}
      </button>
    </div>);
}

export default App;
