import React, {Component} from 'react';
import '../../css/currentPortfolio.scss';
import constants from '../../ts/constants';
import {FaBalanceScale} from 'react-icons/fa';
import classNames from 'classnames';
import {CurrentPortfolioAmounts, IPortfolio} from '../../applicationInterfaces';
import {rebalance as rebalanceAction, getDefaultPortfolioAmounts} from '../../ts/actions';

interface State{
    [key: string] :  boolean | number | undefined | CurrentPortfolioAmounts
}
interface IProps{
}
interface IState extends State{
    bonds: number,
    largeCap: number,
    midCap: number,
    foreign: number,
    smallCap: number,
    enableRebalance: boolean,
    currentAmountTotal: number,
    rebalanceDone: boolean,
    currentPortfolioAmounts: CurrentPortfolioAmounts
}

class CurrentPortfolio extends Component<IProps, IState> {
    constructor(props : IProps){
        super(props);
        this.state = {
            bonds: -1,
            largeCap: -1,
            midCap: -1,
            foreign: -1,
            smallCap: -1,
            enableRebalance: false,
            currentAmountTotal: -1,
            rebalanceDone: false,
            currentPortfolioAmounts: getDefaultPortfolioAmounts(null)
        };
        this.updateStateVariable = this.updateStateVariable.bind(this);
        this.rebalance = this.rebalance.bind(this);
        this.getDifference = this.getDifference.bind(this);
        this.getNewAmount = this.getNewAmount.bind(this);
        this.getRecommendedTransfers = this.getRecommendedTransfers.bind(this);
        this.getColorType = this.getColorType.bind(this);

    }

    rebalance():void{
        const currentAmounts : IPortfolio = {
            bonds: this.state.bonds,
            largeCap: this.state.largeCap,
            midCap: this.state.midCap,
            foreign: this.state.foreign,
            smallCap: this.state.smallCap
        }
        const rebalancedInfo: CurrentPortfolioAmounts = rebalanceAction(currentAmounts);

        this.setState({
            rebalanceDone: true,
            currentPortfolioAmounts: rebalancedInfo
        });
    }

    updateStateVariable(e : any){
        const currentValue : number = e.currentTarget.value === "" ? -1 : parseInt(e.currentTarget.value);
        const currentAmountTotal : number = Math.floor(100 * (this.state.bonds +
                                                            this.state.foreign +
                                                            this.state.largeCap +
                                                            this.state.midCap +
                                                            this.state.smallCap))/100;
        const currentTargetId : string = e.currentTarget.id;
        let enableRebalance = true;
        switch (currentTargetId) {
            case 'large cap': this.setState({largeCap: currentValue, rebalanceDone: false});
                break;
            case 'mid cap': this.setState({midCap: currentValue, rebalanceDone: false});
                break;
            case 'small cap': this.setState({smallCap: currentValue, rebalanceDone: false});
                break;
            case 'bonds': this.setState({bonds: currentValue, rebalanceDone: false});
                break;
            case 'foreign': this.setState({foreign: currentValue, rebalanceDone: false});
                break;
            default:
            break;
        }
        const currentInformation : IState = this.state;
        if(currentValue !== -1){
            Object.keys(currentInformation).forEach(
                (key : string) => {
                    enableRebalance = enableRebalance && currentInformation[key] !== -1
                }
            );
        } else {
            enableRebalance = false;
        }

        this.setState({enableRebalance, currentAmountTotal, rebalanceDone: false});
    }

    getDifference(row : string) : string{
        let difference : string = '';
        if(this.state.rebalanceDone){
            switch (row) {
                case 'large cap': difference = `${this.getColorType(row) ? '+' : '-'}${this.state.currentPortfolioAmounts.largeCap.difference}`;
                    break;
                case 'mid cap': difference = `${this.getColorType(row) ? '+' : '-'}${this.state.currentPortfolioAmounts.midCap.difference}`;
                    break;
                case 'small cap': difference = `${this.getColorType(row) ? '+' : '-'}${this.state.currentPortfolioAmounts.smallCap.difference}`;
                    break;
                case 'bonds': difference = `${this.getColorType(row) ? '+' : '-'}${this.state.currentPortfolioAmounts.bonds.difference}`;
                    break;
                case 'foreign': difference = `${this.getColorType(row) ? '+' : '-'}${this.state.currentPortfolioAmounts.foreign.difference}`;
                    break;
                default:
                break;
            }
        }
        return difference;
    }

    getNewAmount(row : string) : string{
        let newAmmount : string = '';
        if(this.state.rebalanceDone){
            switch (row) {
                case 'large cap': newAmmount = `${this.state.currentPortfolioAmounts.largeCap.newAmmount}`;
                    break;
                case 'mid cap': newAmmount = `${this.state.currentPortfolioAmounts.midCap.newAmmount}`;
                    break;
                case 'small cap': newAmmount = `${this.state.currentPortfolioAmounts.smallCap.newAmmount}`;
                    break;
                case 'bonds': newAmmount = `${this.state.currentPortfolioAmounts.bonds.newAmmount}`;
                    break;
                case 'foreign': newAmmount = `${this.state.currentPortfolioAmounts.foreign.newAmmount}`;
                    break;
                default:
                break;
            }
        }
        return newAmmount;
    }

    getRecommendedTransfers() : string{
        let recommendedTransfers : string = '';
        if(this.state.rebalanceDone){
            recommendedTransfers = this.state.currentPortfolioAmounts.recommendedTransfers;
        }
        return recommendedTransfers;
    }

    getColorType(row : string) : boolean{
        let colorToReturn : boolean = false;
        switch (row) {
            case 'large cap': colorToReturn = this.state.largeCap >= 0;
                break;
            case 'mid cap': colorToReturn = this.state.midCap >= 0;
                break;
            case 'small cap': colorToReturn = this.state.smallCap >= 0;
                break;
            case 'bonds': colorToReturn = this.state.bonds >= 0;
                break;
            case 'foreign': colorToReturn = this.state.foreign >= 0;
                break;
            default:
            break;
        }

        return colorToReturn;
    }


  render(){
    return (
        <div className="currentPortfolio">
            <div className="actionHeader">
                <div>{constants.body.personalizedPortfolio.rebalance.subtitle}</div>
                <button className={classNames('button', {disable: !this.state.enableRebalance})} 
                        disabled={!this.state.enableRebalance} onClick={this.rebalance}>
                        {constants.body.personalizedPortfolio.rebalance.buttonLabel}
                        <FaBalanceScale/>
                </button>
            </div>
            <table cellSpacing={0}>
                <tbody>
                    <tr>
                        {
                            constants.body.personalizedPortfolio.rebalance.table.headers.map(
                                (header : string, index : number) => {
                                    return <th key={`${header}-${index}`} className="headerTablePersonalizedPortfolio" colSpan={index === 0 ? 2 : 1}>{header}</th>
                                }
                            )
                        }
                    </tr>
                    {
                        constants.body.personalizedPortfolio.riskTable.map(
                            (row : string, index : number) => {
                                return(
                                    <tr key={`${row}-${index}`}>
                                        <td colSpan={2}>{`${row} $`} <input id={row} onKeyUp={this.updateStateVariable} type="number"/></td>
                                        <td><input disabled
                                                   id={row}
                                                   className={
                                                       classNames(
                                                           {inputRed: !this.getColorType(row),
                                                           inputGreen: this.getColorType(row)}
                                                        )
                                                    }
                                                    value={this.getDifference(row)}
                                                    type="text"/>
                                        </td>
                                        <td><input disabled
                                                    id={row}
                                                    className="inputBlue"
                                                    value={this.getNewAmount(row)}
                                                    type="text"/>
                                        </td>
                                        {index === 0 && <td className="inputTransfer" rowSpan={5}><input disabled
                                                                              id="recomendedTransfers"
                                                                              className="inputDisableTransfer"
                                                                              value={this.getRecommendedTransfers()}></input></td>}
                                    </tr>
                                );
                            }
                        )
                    }
                </tbody>
            </table>
        </div>
    );
  }
}

export default CurrentPortfolio;
