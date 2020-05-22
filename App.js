import React, {Component} from 'react';
import './App.css';
import { render } from '@testing-library/react';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = 
    {
      list: null,
      loaded: false,
      city: null,
      name: '',
      url: "http://opentable.herokuapp.com/api/restaurants?city=",
    }

    
  }

  

  
  handle(event)
  {

    this.setState({list:[]});
    this.setState({loaded:true});
    this.setState({city:event.target.value});
    
    
    var url = "http://opentable.herokuapp.com/api/restaurants?city=" + event.target.value ;
    

    this.componentDidMount(url);


  }

   async componentDidMount( ) {
    //create api call using fetch
    
    
    const rests = await fetch(this.state.url)
    .then(response => response.json());

    var objs = [];
    objs = rests.restaurants;

    this.setState({list: objs});

    console.log(this.state.list);
    console.log(this.state.loaded);

  }
  
  render() {

    var {loaded, list} = this.state;

      if(!loaded)
      {
        return  <div className="App"> 
    
        Enter a city: 
        <input type="text" 
        name="city" 
        id="city"
        onChange = {(e) => this.setState({city:e.target.value})}
        placeholder="Enter a city"/>

        <br/>

        Search by name: 
        <input type="text" 
        name="name" 
        id="name" 
        onChange = {(e) => this.setState({name:e.target.value})}
        placeholder="Name" />
        <br/>
        
    
        <button onClick={
          ()=>this.setState({url:  this.state.url + this.state.city + "&&name=" + this.state.name})
          
          }>
          Set Filters</button>
        
        <br/>

        <button onClick={this.handle.bind(this)} >Search</button>
        </div>
      }

      else
      return(
        <div>

          <ul>
            {list.map(item => (
              <li key={item.id}>
              {item.name} | {item.address} | {item.price}
              </li>
            ))}





          </ul>
        </div>
      )
  
  }
}




export default App;
