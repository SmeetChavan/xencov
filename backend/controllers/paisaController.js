const {User , Transaction , Wallet} = require('../models/model');

const goldTransac = async (req , res) => {

    const {userId , quan , amount , type , status , runningBalance} = req.body;

    let quantity = quan;

    try{
        const transac = await Transaction.create({userId , quantity , amount , type , status , runningBalance});

        res.status(200).json({goldTransac_id : transac._id});
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}

const walletTransac = async (req , res) => {

    const {userId , amount , type , status , runningBalance , goldTransac_id} = req.body;

    try{
        const transac = await Wallet.create({userId , amount , type , status , runningBalance , goldTransac_id});

        res.status(200).json({success : true});
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}

const calcAnswer = async (req , res) => {

    const {userId} = req.body;

    try{

        const user = await User.findById(userId);

        const walletTransactions = await Wallet.find({userId : userId});

        const startingBalance = user.runningBalance.wallet;

        const walletGainLoss = walletTransactions.reduce((total, transaction) => {
            if(transaction.type === 'CREDIT') {
                return total + transaction.amount;
            }
            else{
                return total - transaction.amount;
            }
        }, 0);

        const gainOrLossPercentage = (walletGainLoss / startingBalance) * 100;

        const currentFund = user.runningBalance.wallet + walletGainLoss;
        // const currentFund = user.runningBalance.wallet;

        const netFundAdded = walletTransactions.reduce((total, transaction) => {
            if(transaction.type === 'CREDIT') {
                return total + transaction.amount;
            }
            else{
                return total;
            }
        }, 0);

        const netGrowthOrLoss = walletGainLoss;

        res.status(200).json({netFundAdded : netFundAdded , currentFund : currentFund , netGrowthOrLoss : netGrowthOrLoss , gainOrLossPercentage : gainOrLossPercentage});
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}

module.exports = {goldTransac , walletTransac , calcAnswer};