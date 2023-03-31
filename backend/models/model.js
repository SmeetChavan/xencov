const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    password: { type: String, required: false },
    mobileNumber: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    runningBalance: {
        wallet: { type: Number, required: true }, // CURRENT FUNDS STORED
        gold: { type: Number, required: true }, // CURRENT GOLD QTY IN GMS
        goldPrice: { type: Number, required: true }, // CURRENT GOLD PRICE
    }
}, { timestamps: true });

const goldTransactionSchema = new Schema({

    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // To store the user id
    quantity: { type: Number, required: true }, // Quantity of the gold in gms
    amount: { type: Number, required: true }, // Amount of the transaction done.
    type: { type: String, required: true, enums: ['CREDIT', 'DEBIT'] }, // Type - debit or credit.
    status: {
        type: String,
        required: true,
        enums: ['FAILED', 'SUCCESS', 'WAITING', 'CANCELED', 'PENDING'],
    }, // Status of the transaction being done.

    runningBalance: { type: Number, required: true }, // Running Balance of the user after each transaction.

} , { timestamps: true });


const walletTransactionSchema = new Schema({

    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // To store the user id
    amount: { type: Number, required: true }, // Amount of the transaction done.
    type: { type: String, required: true, enums: ['CREDIT', 'DEBIT'] }, // Type - debit or credit.
    status: {
        type: String,
        required: true,
        enums: ['FAILED', 'SUCCESS', 'PROCESSING'],
    }, // Status of the transaction being done.

    runningBalance: { type: Number, required: true }, // Running Balance of the user after each transaction.

    transaction: { type: mongoose.Types.ObjectId, ref: 'Transaction' }, // Gold transactions reference.

} , { timestamps: true });


const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction' , goldTransactionSchema);
const Wallet = mongoose.model('Wallet' , walletTransactionSchema);

module.exports = { User , Transaction , Wallet};