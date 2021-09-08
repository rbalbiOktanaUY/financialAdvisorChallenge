import React, {Component} from 'react';
import '../../css/personalizedPortfolio.scss';
import constants from '../../ts/constants';
import CurrentPortfolio from './currentPortfolio';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {customHistory} from '../../App';
import {RiskLevelPercentages} from '../../applicationInterfaces';
import {getSelectedRiskLevel, getSelectedRiskLevelInfo} from '../../ts/actions';
interface IProps{
    riskLevelSelected?: number
}
interface IState{
    percentages: RiskLevelPercentages,
    riskLevelSelected: number
}

class PersonalizedPortfolio extends Component<IProps & RouteComponentProps, IState> {
  constructor(props : IProps & RouteComponentProps){
    super(props);
    this.state=
        {
            percentages:{
                bonds: -1,
                foreign: -1,
                largeCap: -1,
                midCap: -1,
                smallCap: -1
            },
            riskLevelSelected: -1
        };
  }

  componentDidMount(){
      customHistory.push(constants.routes.calculator);
      this.setState(
          {
            percentages: getSelectedRiskLevelInfo(),
            riskLevelSelected: getSelectedRiskLevel()
          }
      )
  }


  render(){
    return (
        <React.Fragment>
            {this.state.riskLevelSelected !== -1 && <div className="personalizedPortfolio">
                <div className="subtitle">{constants.body.personalizedPortfolio.subtitle}</div>
                <div className="riskLevelInfo">
                    <div className="riskLabel">{`${constants.body.personalizedPortfolio.riskLevelLabel} ${this.state.riskLevelSelected}`}</div>
                    <table>
                        <tbody>
                            <tr>
                            {
                                constants.body.personalizedPortfolio.riskTable.map(
                                    (header : string) => {
                                        return(
                                            <th key={`header-${header}`} id={`header-${header}`}>{header}</th>
                                        );
                                    }
                                )
                            }
                            </tr>
                            <tr className='row'>
                                <td>{`${this.state.percentages.bonds} %`}</td>
                                <td>{`${this.state.percentages.largeCap} %`}</td>
                                <td>{`${this.state.percentages.midCap} %`}</td>
                                <td>{`${this.state.percentages.foreign} %`}</td>
                                <td>{`${this.state.percentages.smallCap} %`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <CurrentPortfolio/>
            </div>}
            {this.state.riskLevelSelected === -1 &&
                <div className="personalizedPortfolio">
                    <span>
                        {constants.body.personalizedPortfolio.selectARiskLevel}
                    </span>
                </div>
            }
        </React.Fragment>
    );
  }
}

export default withRouter(PersonalizedPortfolio);
