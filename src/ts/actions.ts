import {CurrentPortfolioAmounts, IPortfolio, RiskLevelPercentages, Differences} from '../applicationInterfaces';
import constants from './constants';

export function getDefaultPortfolioAmounts(currentAmounts : IPortfolio | null) : CurrentPortfolioAmounts{
    let resoults : CurrentPortfolioAmounts = {
        recommendedTransfers: '',
        bonds: {
            currentAmount: currentAmounts === null ? 0 : currentAmounts.bonds,
            difference: 0,
            newAmmount: 0
        },
        largeCap: {
            currentAmount: currentAmounts === null ? 0 : currentAmounts.largeCap,
            difference: 0,
            newAmmount: 0
        },
        midCap: {
            currentAmount: currentAmounts === null ? 0 : currentAmounts.midCap,
            difference: 0,
            newAmmount: 0
        },
        foreign: {
            currentAmount: currentAmounts === null ? 0 : currentAmounts.foreign,
            difference: 0,
            newAmmount: 0
        },
        smallCap: {
            currentAmount: currentAmounts === null ? 0 : currentAmounts.smallCap,
            difference: 0,
            newAmmount: 0
        }
     };
    
    return resoults;
}

export function rebalance(currentAmounts : IPortfolio) : CurrentPortfolioAmounts {
    let results : CurrentPortfolioAmounts = getDefaultPortfolioAmounts(currentAmounts);
    const riskLevelPercentages : RiskLevelPercentages = getSelectedRiskLevelInfo();
    const total : number = results.bonds.currentAmount + results.foreign.currentAmount +
                        results.largeCap.currentAmount + results.midCap.currentAmount +
                        results.smallCap.currentAmount;
                        
    const newPercentages : Differences = getNewPercentages(total, riskLevelPercentages);

    setDifferences(results, currentAmounts, newPercentages);

    setNewAmounts(results, currentAmounts);

    setRecomendedTransfers(results);

    return results;
}

export function saveSelectedRiskLevel(riskLevelSelected : number) : void{
    sessionStorage.setItem(constants.sessionStorage.riskLevel, JSON.stringify(riskLevelSelected));
    const riskLevelSelectedInfo : RiskLevelPercentages = {
        bonds: constants.body.riskTable.bonds[riskLevelSelected-1],
        largeCap: constants.body.riskTable.largeCap[riskLevelSelected-1],
        midCap: constants.body.riskTable.midCap[riskLevelSelected-1],
        foreign: constants.body.riskTable.foreign[riskLevelSelected-1],
        smallCap: constants.body.riskTable.smallCap[riskLevelSelected-1]
    }
    sessionStorage.setItem(constants.sessionStorage.riskLevelInfo, JSON.stringify(riskLevelSelectedInfo));
}

export function getSelectedRiskLevel() : number{
    if(sessionStorage.getItem(constants.sessionStorage.riskLevel)){
        return parseInt(sessionStorage.getItem(constants.sessionStorage.riskLevel) || '-1');
    }
    return -1;
}

export function getSelectedRiskLevelInfo() : RiskLevelPercentages{
    let riskLevelInfoFromStorage : RiskLevelPercentages = {
        bonds: -1,
        largeCap: -1,
        midCap: -1,
        foreign: -1,
        smallCap: -1
    }
    if(sessionStorage.getItem(constants.sessionStorage.riskLevelInfo)){
        riskLevelInfoFromStorage = JSON.parse(sessionStorage.getItem(constants.sessionStorage.riskLevelInfo) || '{}');
    }
    return riskLevelInfoFromStorage;
}

function getPercentagesValues(total : number, percentage: number): number{
    return parseFloat(((total * percentage)/100).toFixed(4));
}

function getNewPercentages(total : number, riskLevelPercentages : RiskLevelPercentages) : Differences{
    const newPercentages : Differences = {
        bonds: getPercentagesValues(total, riskLevelPercentages.bonds),
        foreign: getPercentagesValues(total, riskLevelPercentages.foreign),
        midCap: getPercentagesValues(total, riskLevelPercentages.midCap),
        largeCap: getPercentagesValues(total, riskLevelPercentages.largeCap),
        smallCap: getPercentagesValues(total, riskLevelPercentages.smallCap)
    };
    return newPercentages;
}

function setDifferences(results : CurrentPortfolioAmounts, currentAmounts : IPortfolio, newPercentages : Differences) : void{
    results.bonds.difference = (newPercentages.bonds - currentAmounts.bonds)/100;
    results.foreign.difference = (newPercentages.foreign - currentAmounts.foreign)/100;
    results.midCap.difference = (newPercentages.midCap - currentAmounts.midCap)/100;
    results.largeCap.difference = (newPercentages.largeCap - currentAmounts.largeCap)/100;
    results.smallCap.difference = (newPercentages.smallCap - currentAmounts.smallCap)/100;
}

function setNewAmounts(results : CurrentPortfolioAmounts, currentAmounts : IPortfolio) : void{
    results.bonds.newAmmount = results.bonds.difference === 0 ? currentAmounts.bonds : currentAmounts.bonds - results.bonds.difference;
    results.foreign.newAmmount = results.foreign.difference === 0 ? currentAmounts.foreign : currentAmounts.foreign - results.foreign.difference;
    results.midCap.newAmmount = results.midCap.difference === 0 ? currentAmounts.midCap : currentAmounts.midCap - results.midCap.difference;
    results.largeCap.newAmmount = results.largeCap.difference === 0 ? currentAmounts.largeCap : currentAmounts.largeCap - results.largeCap.difference;
    results.smallCap.newAmmount = results.smallCap.difference === 0 ? currentAmounts.smallCap : currentAmounts.smallCap - results.smallCap.difference;
}

function setRecomendedTransfers(results : CurrentPortfolioAmounts) : void{
    
}