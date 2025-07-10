export const CREDIT_PACKS = [10,20,50,100];


export const PLAN_IDS = {
    UNLIMITED_YEARLY :{
        id:"",
        planName:"Unlimited Yearly",
        description:"yearly subscription 2 months free",
        totalBillinCycleCount: 5

    },
    UNLIMITED_MONTHLY :{
        id:"",
        planName:"Unlimite Monthly",
        description:"yearly subscription 2 months free",
        totalBillinCycleCount: 12
    }
};

export const pricingList = [
    {
        price: "Credit Packs",
        list: [
            {detail: "10 credits for Rs 10"},
            {detail: "20 credits for Rs 20"},
            {detail: "30 credits for Rs 30"},
            {detail: "40 credits for Rs 40"}
        ],
    },
    {
        price: "Unlimited Monthly",
        list:[
            {detail: "UNLIMITED LINKS"},
            {detail: "AUTO RENEWED"},
            {detail:"CHARGED MONTHLY"},
            {detail:"CANCEL ANYTIME"}
        ]

    },{
         price: "Unlimited Yearly",
        list:[
            {detail: "UNLIMITED LINKS"},
            {detail: "AUTO RENEWED"},
            {detail:"CHARGED Yearly"},
            {detail:"CANCEL ANYTIME"}
        ]
    }
];