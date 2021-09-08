import React, {Component} from 'react';
import constants from  '../../ts/constants';
import '../../css/riskLevelSlider.scss';
import classNames from 'classnames';
import {getSelectedRiskLevel} from '../../ts/actions';


interface IProps{
    selectRow: Function
}
interface IState{
    selectedButtonAndRow : boolean[]
}
class RiskLevelSlider extends Component<IProps, IState> {
    constructor(props : IProps){
        super(props);
        this.state = {
            selectedButtonAndRow: []
        }
        this.initEmptyList = this.initEmptyList.bind(this);
        this.selectMark = this.selectMark.bind(this)
    }

    componentDidMount(){
        this.initEmptyList();
        const selectedRow : number = getSelectedRiskLevel();
        if(selectedRow !== -1) {
            this.selectMark({currentTarget: {id: `row-${selectedRow}`}});
        }
    }

    getEmptyList() : boolean[]{
        let selectedInit : boolean[] = [];
        selectedInit.push(false);
        constants.body.riskTable.rows.forEach(
            (row : number) => {
                selectedInit.push(false);
            }
        )
        return selectedInit;
    }

    initEmptyList() : void{
        this.setState({selectedButtonAndRow : this.getEmptyList()});
    }

    selectMark(e : any) : void{
        let selectedButtonAndRow : boolean[] = this.getEmptyList();
        this.initEmptyList();
        const selectedNumber : number = Number.parseInt(e.currentTarget.id.split('-')[1]);
        selectedButtonAndRow[selectedNumber] = true;
        this.setState({selectedButtonAndRow});
        this.props.selectRow(selectedNumber);
    }

    render(){
        return (
        <div className="riskLevel">
            <div className="label">{constants.body.subtitle}</div>
            <div className="slider">
                <div className="range left">{constants.body.riskLevelSlider.low}</div>
                <div className="buttons">
                    {
                        constants.body.riskLevelSlider.values.getSlider().map(
                            (mark : number) => {
                                return <button id={`button-${mark}`}
                                                key={`button-${mark}`}
                                            className={classNames('button', {active : this.state.selectedButtonAndRow[mark]})}
                                            onClick={this.selectMark}>
                                        {mark}
                                        </button>
                            }
                        )
                    }
                </div>
                <div className="range right">{constants.body.riskLevelSlider.high}</div>
            </div>
        </div>
        );
    }
  }
  
export default RiskLevelSlider;