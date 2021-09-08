import actionTypes from "./actionTypes";
import {rebalance as rebalanceAction,
    saveSelectedRiskLevel,
    getSelectedRiskLevel, 
    getSelectedRiskLevelInfo as getSelectedRiskLevelInfoAction
} from '../ts/actions';
import {IPortfolio, CurrentPortfolioAmounts} from '../applicationInterfaces';

export const updateRiskLevel = (riskLevel : number) => (dispatch : any) => {
    saveSelectedRiskLevel(riskLevel);
    dispatch({ type: actionTypes.SELECT_RISK_LEVEL, payload: riskLevel });
};
  
export const getRiskLevel = () => (dispatch : any) => {
    dispatch({ type: actionTypes.SELECT_RISK_LEVEL, payload: getSelectedRiskLevel() });
};

export const getSelectedRiskLevelInfo = () => (dispatch : any) =>{
    dispatch({type: actionTypes.GET_RISK_LEVEL_INFO, payload: getSelectedRiskLevelInfoAction()})
}

export const rebalance = (currentAmmounts : IPortfolio) => (dispatch : any) =>{
    dispatch({ type: actionTypes.REBALANCE, payload: rebalanceAction(currentAmmounts) });
}