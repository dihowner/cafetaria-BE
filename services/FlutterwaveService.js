import httpRequest from "../utility/httpRequest.js";
import {config} from "../utility/config.js"

class FlutterwaveService {
    
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.BASE_URL  = "https://api.flutterwave.com/v3"
        this.header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.secretKey}`,
        };
    }

    generatePaymentLink = async (paymentData)  => {
        try {
            const reservePayment = await httpRequest.post(`${this.BASE_URL}/payments`, paymentData, this.header )
            return reservePayment;
        }
        catch(error) {
            return {error: error.message};
        }
    }

    verifyPayment = async(reference) => {
        try {
            const verifyPayment = await httpRequest.get(`${this.BASE_URL}/transactions/${reference}/verify`, '', this.header )
            return verifyPayment;
        }
        catch(error) {
            return {error: error.message};
        }
    }

    fetchAllBanks = async() => {
        try {
            const verifyPayment = await httpRequest.get(`${this.BASE_URL}/banks/NG`, '', this.header )
            return verifyPayment;
        }
        catch(error) {
            return {error: error.message};
        }
    }

    verifyAccount = async(bankCode, accountNumber) => {
        try {
            const accountData = {
                account_number: accountNumber,
                account_bank: bankCode
            }
            const verifyPayment = await httpRequest.post(`${this.BASE_URL}/accounts/resolve`, accountData, this.header )
            return verifyPayment;
        }
        catch(error) {
            return {error: error.message};
        }
    }
}

export default new FlutterwaveService(config.FLW_SECRET);