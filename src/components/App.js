import React from 'react';

import Filters from './Filters';
import PetBrowser from './PetBrowser';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

  onChangeType = animalType => {
    this.setState({
      filters: {
          type: animalType,
    }})
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === 'all') {
      return fetch('/api/pets')
    }
    return fetch(`/api/pets?type=${this.state.filters.type}`)
  }

  onAdoptPet = petId => {
    this.setState({
      adoptedPets: [...this.state.adoptedPets, petId],
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters filters={this.state.filters.type} onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
