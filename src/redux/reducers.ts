import {IApplicationState, IPortfolio, CurrentPortfolioAmounts} from '../applicationInterfaces';

const initialState : IApplicationState = {
    riskLevelSelected : 0
}

export function selectRiskLevel(
    state : IApplicationState = initialState,
    action: any
) : IApplicationState {
    const newState = {...state};
    newState.riskLevelSelected = action.payload
    return newState
}