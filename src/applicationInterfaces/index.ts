export interface IPortfolioValue{
    currentAmount: number,
    difference: number,
    newAmmount: number
}

export interface IPortfolio{
    bonds: number,
    largeCap: number,
    midCap: number,
    foreign: number,
    smallCap: number
}

export interface RiskLevelPercentages extends IPortfolio{
}

export interface CurrentPortfolioAmounts{
    recommendedTransfers: string,
    bonds: IPortfolioValue,
    largeCap: IPortfolioValue,
    midCap: IPortfolioValue,
    foreign: IPortfolioValue,
    smallCap: IPortfolioValue
}

export interface IApplicationState{
    riskLevelSelected: number
}

export interface IReduxState{
    selectRiskLevel?: Function
}

export interface Differences extends IPortfolio{}