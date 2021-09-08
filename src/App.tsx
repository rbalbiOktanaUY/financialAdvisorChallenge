import React, {Component} from 'react';
import Header from './components/static/header';
import BodyMain from './components/static/bodyMain';
import PersonalizedPortfolio from './components/body/personalizedPortfolio';
import {Router, withRouter,
  Switch, Route
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import constants from './ts/constants';
export const customHistory = createBrowserHistory();

interface IProps{}
interface IState{
  toggleView : boolean
}

class App extends Component<IProps, IState> {

  constructor(props : IProps){
    super(props);
    this.state =  {
      toggleView: false
    }

    this.toggleView = this.toggleView.bind(this);
    this.setHomeView = this.setHomeView.bind(this);
  }


  toggleView() : void{
    let toggleView = this.state.toggleView;
    this.setState({
      toggleView: !toggleView
    });
  }

  setHomeView() : void{
    this.setState({
      toggleView: false
    });
  }
  render(){
    return (
      <div className="App">
        <Router history={customHistory}>
          <Header homeView={this.setHomeView}/>
        {
          !this.state.toggleView && <BodyMain toggleMainView={this.toggleView}/>
        }
        {
          this.state.toggleView && <PersonalizedPortfolio/>
        }
        </Router>
      </div>
    );
  }
}

export default App;
