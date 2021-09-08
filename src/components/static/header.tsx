import React, {Component} from 'react';
import constants from '../../ts/constants';
import '../../css/header.scss';
import {FaHome} from 'react-icons/fa';
import {BrowserRouter as Router, Link
} from 'react-router-dom';
interface IProps{
  homeView: Function
}
interface IState{}
class Header extends Component<IProps, IState> {
  constructor(props : IProps){
    super(props);
    this.goToHome = this.goToHome.bind(this);
  }

  goToHome() : void {
    this.props.homeView();
  }
  render(){
    return (
        <div className="header">
            <div className="header-label">{constants.header}</div>
            <button className="homeButton" onClick={this.goToHome}><FaHome/></button>
        </div>
    );
  }
}

export default Header;
