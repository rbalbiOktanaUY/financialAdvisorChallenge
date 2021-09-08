const constants = {
    header: 'Financial Advisor',
    body: {
        subtitle: 'please select a risk level for your investment portfolio',
        riskLevelSlider:{
            low: 'low',
            high: 'high',
            values:{
                low: 1,
                max: 10,
                step: 1,
                getSlider: () => {
                    let numbers : number[] = [];
                    for(let i : number = 1; i<11; i++){
                        numbers.push(i);
                    }
                    return numbers;
                }
            }
        },
        riskTable:{
            continue: 'continue',
            header: [
                {name:'risk', label:'Risk'},
                {name:'bonds', label:'Bonds %'},
                {name:'largeCap', label:'Large Cap %'},
                {name:'midCap', label:'Mid Cap %'},
                {name:'foreign', label:'Foreign %'},
                {name:'smallCap', label:'Small Cap %'}
            ],
            rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            bonds: [80, 70, 60, 50, 40, 35, 20, 10, 5, 0],
            largeCap: [20, 15, 15, 20, 20, 25, 25, 20, 15, 5],
            midCap: [0, 15, 15, 20, 20, 5, 25, 40, 40, 25],
            foreign: [0, 0, 10, 10, 20, 30, 25, 20, 25, 30],
            smallCap: [0, 0, 0, 0, 0, 5, 5, 10, 15, 40]
        },
        personalizedPortfolio:{
            subtitle: 'personalized portfolio',
            riskLevelLabel: 'risk level',
            riskTable: [
                'bonds', 'large cap', 'mid cap', 'foreign', 'small cap'
            ],
            rebalance:{
                subtitle: 'please enter your current portfolio',
                buttonLabel: 'rebalance',
                table:{
                    headers:[
                        'current amount', 'difference', 'new amount', 'recommended transfers'
                    ]
                }
            },
            selectARiskLevel: 'please select a risk level before continuing.'
        },
        chart:{
            title: 'Investment Portfolio',
            colors: ['#ffe0bd', '#670303', '#6cbfce', '#7c15d6', '#8cd615'],
            chartRadiusRange: ['50%', '100%']
        }
    },
    sessionStorage:{
        riskLevel: 'RISK_LEVEL_SELECTED',
        riskLevelInfo: 'RISK_LEVEL_INFO'
    },
    routes:{
        home: '/',
        calculator: '/calculator'
    }
};

export default constants;