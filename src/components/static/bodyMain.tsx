import React, {Component} from 'react';
import RiskLevelSlider from '../body/riskLevelSlider';
import RiskLevelTable from '../body/riskLevelTable';
import RiskLevelChart from '../body/riskLevelChart';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import '../../css/bodyMain.scss';
import {customHistory} from '../../App';
import constants from '../../ts/constants';
import {saveSelectedRiskLevel, getSelectedRiskLevel} from '../../ts/actions';
interface IProps{
  toggleMainView : Function
}
interface IState{
  selectedRow: number,
  chartView: boolean
}
class BodyMain extends Component<IProps & RouteComponentProps, IState> {
  constructor(props : IProps & RouteComponentProps){
    super(props);
    this.state =  {
      selectedRow: -1,
      chartView: false
    }

    this.toggleView = this.toggleView.bind(this);
    this.toggleMainView = this.toggleMainView.bind(this);
    this.selectRow = this.selectRow.bind(this);
  }

  componentDidMount(){
    customHistory.push(constants.routes.home);
    this.setState(
      {
        selectedRow: getSelectedRiskLevel()
      }
    );
  }

  toggleView() : void{
    let chartView = this.state.chartView;
    this.setState({
      chartView: !chartView
    });
  }

  toggleMainView(): void{
    this.props.toggleMainView();
  }

  selectRow(row : number): void{
    this.setState(
      {
        selectedRow: row
      }
    );
    saveSelectedRiskLevel(row);
  }

  render(){
    return (
        <div className="bodyMain">
            <div className="bodySubMain">
              <RiskLevelSlider
                  selectRow={this.selectRow}
              />
              {!this.state.chartView && <RiskLevelTable 
                  selectedRow={this.state.selectedRow}
                  setChartView={this.toggleView}
                  toggleMainView={this.toggleMainView}
              />}
              {this.state.chartView && <RiskLevelChart tableInfoIndex={this.state.selectedRow}
                                                        setTableView={this.toggleView}
                                                        toggleMainView={this.toggleMainView}/>}
            </div>
      </div>
    );
  }
}

export default withRouter(BodyMain);
