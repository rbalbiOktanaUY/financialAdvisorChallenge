import React, {Component} from 'react';
import constants from '../../ts/constants';
import '../../css/header.scss';
import '../../css/riskLevelTable.scss';
import {FaChartPie, FaChevronRight} from 'react-icons/fa';
import classNames from 'classnames';
import {BrowserRouter as Router, Link
} from 'react-router-dom';
interface IProps{
    selectedRow: number,
    setChartView: Function,
    setPersonalizedPortfolioView?: Function
    toggleMainView: Function
}
interface IState{}
interface HeaderProps{
    name : String,
    label: String
}
class RiskLevelTable extends Component<IProps, IState> {
  constructor(props : IProps){
    super(props);
    this.toggleView = this.toggleView.bind(this);
    this.showPersonalizedPortfolio = this.showPersonalizedPortfolio.bind(this);
    this.toggleMainView = this.toggleMainView.bind(this);
  }

  toggleMainView() : void{
    this.props.toggleMainView();
  }

  toggleView() : void{
    this.props.setChartView();
  }

  showPersonalizedPortfolio() : void{
    this.props.setPersonalizedPortfolioView && this.props.setPersonalizedPortfolioView();
  }
  render(){
    return (
      <React.Fragment>
        <div className="table">
            <table>
                <tbody>
                  <tr>
                    {
                        constants.body.riskTable.header.map(
                            (header : HeaderProps) => {
                              return(
                                  <th key={`header-${header.name}`} id={`header-${header.name}`}>{header.label}</th>
                              );
                            }
                        )
                    }
                  </tr>
                  {
                      constants.body.riskTable.rows.map(
                          (row : number, index : number) => {
                              return(
                                  <tr className={classNames('row', {active : this.props.selectedRow-1 === index})} key={`row-${row}`} id={`row-${row}`}>
                                      <td>{row}</td>
                                      <td>{constants.body.riskTable.bonds[index]}</td>
                                      <td>{constants.body.riskTable.largeCap[index]}</td>
                                      <td>{constants.body.riskTable.midCap[index]}</td>
                                      <td>{constants.body.riskTable.foreign[index]}</td>
                                      <td>{constants.body.riskTable.smallCap[index]}</td>
                                  </tr>
                              );
                          }
                      )
                  }
                </tbody>
            </table>
            <div className="buttonsBottomRow">
              <button className="continueButton" onClick={this.toggleMainView}>
                  <FaChevronRight/>
              </button>
              <button className="continueButton" onClick={this.toggleView}>
                  <FaChartPie/>
              </button>
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RiskLevelTable;
