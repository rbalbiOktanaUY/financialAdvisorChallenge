import React, {Component} from 'react';
import '../../css/riskLevelChart.scss';
import {FaTable, FaChevronRight} from 'react-icons/fa';
import data from '../../data/risk-level-data.json';
import Donut from 'react-donut';
import constants from '../../ts/constants';
import {BrowserRouter as Router, Link
} from 'react-router-dom';
interface IProps{
    setTableView: Function,
    tableInfoIndex: number,
    toggleMainView: Function

}
interface IState{
  riskLevelSelected : number
}
interface IData{
    name : string,
    data: number
}
class RiskLevelChart extends Component<IProps, IState> {
  constructor(props : IProps){
    super(props);
    this.state = {
      riskLevelSelected: -1
    }
    this.toggleView = this.toggleView.bind(this);
    this.labelContent = this.labelContent.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.toggleMainView = this.toggleMainView.bind(this);
  }

  toggleMainView() : void{
    this.props.toggleMainView();
  }

  toggleView() : void{
      this.props.setTableView();
  }

  labelContent(e : any) : string{
      return e.category;
  }

  getChartData(): IData[]{
    return data[this.props.tableInfoIndex];
  }

  componentDidMount(){
    this.setState(
      {riskLevelSelected: this.props.tableInfoIndex}
    )
  }

  componentWillReceiveProps(nextProps : IProps){
    this.setState(
      {riskLevelSelected: nextProps.tableInfoIndex}
    )
  }
  render(){
    return (
        <div className="riskLevelChart">
            <div className="buttonsBottomRow">
              <button className="tableButton" onClick={this.toggleMainView}>
                <FaChevronRight/>
              </button>
              <button className="tableButton" onClick={this.toggleView}>
                <FaTable/>
              </button>
            </div>
            {this.state.riskLevelSelected !== -1 && <Donut
              chartData={[
                {name: constants.body.personalizedPortfolio.riskTable[0], data: constants.body.riskTable.bonds[this.state.riskLevelSelected]},
                {name: constants.body.personalizedPortfolio.riskTable[3], data: constants.body.riskTable.foreign[this.state.riskLevelSelected]},
                {name: constants.body.personalizedPortfolio.riskTable[2], data: constants.body.riskTable.midCap[this.state.riskLevelSelected]},
                {name: constants.body.personalizedPortfolio.riskTable[1], data: constants.body.riskTable.largeCap[this.state.riskLevelSelected]},
                {name: constants.body.personalizedPortfolio.riskTable[4], data: constants.body.riskTable.smallCap[this.state.riskLevelSelected]}
              ]}
              chartWidth={500}
              chartHeight={500}
              title={constants.body.chart.title}
              chartThemeConfig={{
                series:{
                  colors: constants.body.chart.colors
                },
              }}
              chartRadiusRange={constants.body.chart.chartRadiusRange}
              showChartLabel={true}
              legendAlignment='bottom'
            />}
        </div>
    );
  }
}

export default RiskLevelChart;
