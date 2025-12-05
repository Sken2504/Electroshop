const crypto = require('crypto');
const querystring = require('qs');
const axios = require('axios');
require('dotenv').config();

const VNPAY_TMN_CODE = process.env.VNPAY_TMN_CODE;
const VNPAY_HASH_SECRET = process.env.VNPAY_HASH_SECRET;
const VNPAY_URL = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; 
const VNPAY_RETURN_URL = process.env.VNPAY_RETURN_URL;

const MOMO_PARTNER_CODE = process.env.MOMO_PARTNER_CODE;
const MOMO_ACCESS_KEY = process.env.MOMO_ACCESS_KEY;
const MOMO_SECRET_KEY = process.env.MOMO_SECRET_KEY;
const MOMO_RETURN_URL = process.env.MOMO_RETURN_URL;
const MOMO_WEBHOOK_URL = process.env.MOMO_WEBHOOK_URL;
const MOMO_API_URL = process.env.MOMO_ENVIRONMENT === 'production' 
    ? 'https://payment.momo.vn/v2/gateway/api/create' 
    : 'https://test-payment.momo.vn/v2/gateway/api/create'; 

const VIETQR_ACCOUNT_NUMBER = process.env.VIETQR_ACCOUNT_NUMBER;
const VIETQR_BANK_CODE = process.env.VIETQR_BANK_CODE;
const VIETQR_ACCOUNT_NAME = process.env.VIETQR_ACCOUNT_NAME;
const VIETQR_TEMPLATE = process.env.VIETQR_TEMPLATE || 'compact';
const VIETQR_API_URL = 'https://api.vietqr.io/v2/generate';

function sortObject(obj) {
    let sorted = {};
    let keys = Object.keys(obj).sort();
    for (let key of keys) {
        sorted[key] = obj[key];
    }
    return sorted;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hour}${minute}${second}`;
}

exports.createVnPayUrl = (orderId, amount, ipAddr) => {
    console.log(`VNPAY DEBUG: Order ID=${orderId}, Amount=${amount}, IP=${ipAddr}`);

    if (!orderId || !amount || amount <= 0 || isNaN(amount)) {
        throw new Error('Order ID hoặc số tiền không hợp lệ');
    }

    const date = new Date();
    const createDate = formatDate(date);
    const expireDate = formatDate(new Date(date.getTime() + 15 * 60000));

    // Params raw values
    let vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: VNPAY_TMN_CODE,
        vnp_Locale: 'vn',
        vnp_CurrCode: 'VND',
        vnp_TxnRef: orderId.toString(),
        vnp_OrderInfo: `Thanh toan don hang ${orderId}`,  // Raw space
        vnp_OrderType: 'billpayment',
        vnp_Amount: Math.round(parseFloat(amount)) * 100,
        vnp_ReturnUrl: VNPAY_RETURN_URL, 
        vnp_IpAddr: ipAddr || '127.0.0.1',
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate
    };

    vnp_Params = sortObject(vnp_Params);

    let signDataArray = [];
    for (let key in vnp_Params) {
        if (vnp_Params[key] !== null && vnp_Params[key] !== undefined && vnp_Params[key] !== '') {
            let value = vnp_Params[key].toString();
            let encodedValue = encodeURIComponent(value).replace(/%20/g, '+');
            signDataArray.push(`${key}=${encodedValue}`);
        }
    }
    const signData = signDataArray.join('&');
    console.log('VNPAY DEBUG - signData (ENCODED +):', signData);  // Sẽ có + cho space

    const hmac = crypto.createHmac('sha512', VNPAY_HASH_SECRET);
    const vnp_SecureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    console.log('VNPAY DEBUG - vnp_SecureHash:', vnp_SecureHash);

    vnp_Params.vnp_SecureHash = vnp_SecureHash;
    const queryString = querystring.stringify(vnp_Params, { encode: false });
    const paymentUrl = VNPAY_URL + '?' + queryString;

    console.log('VNPAY DEBUG - Payment URL:', paymentUrl);
    return paymentUrl;
};

exports.createMomoUrl = async (orderId, amount, orderInfo) => {
    try {
        if (!MOMO_PARTNER_CODE || !MOMO_ACCESS_KEY || !MOMO_SECRET_KEY) {
            throw new Error('Thiếu cấu hình MoMo trong file .env.');
        }

        const requestId = MOMO_PARTNER_CODE + new Date().getTime(); 
        const amountInVND = parseInt(amount);
        
        const rawSignature = `accessKey=${MOMO_ACCESS_KEY}&amount=${amountInVND}&extraData=&ipnUrl=${MOMO_WEBHOOK_URL}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${MOMO_PARTNER_CODE}&redirectUrl=${MOMO_RETURN_URL}&requestId=${requestId}&requestType=captureWallet`;
        
        const signature = crypto.createHmac('sha256', MOMO_SECRET_KEY)
            .update(rawSignature)
            .digest('hex');

        const requestBody = {
            partnerCode: MOMO_PARTNER_CODE,
            accessKey: MOMO_ACCESS_KEY,
            requestId: requestId,
            amount: amountInVND, 
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: MOMO_RETURN_URL,
            ipnUrl: MOMO_WEBHOOK_URL,
            lang: 'vi',
            requestType: 'captureWallet',
            extraData: '',
            signature: signature
        };

        const response = await axios.post(MOMO_API_URL, requestBody);
        if (response.data && response.data.payUrl) {
            return response.data.payUrl;
        }
        
        console.error('Lỗi phản hồi MoMo:', response.data);
        throw new Error(response.data.message || 'Lỗi từ cổng MoMo.');
    } catch (error) {
        console.error('Lỗi tạo MoMo URL chi tiết:', error);
        throw new Error(error.response ? error.response.data.message : 'Lỗi kết nối hoặc cấu hình MoMo.');
    }
};

exports.createVietQRInfo = async (orderId, amount) => {
    try {
        if (!VIETQR_ACCOUNT_NUMBER || !VIETQR_BANK_CODE || !VIETQR_ACCOUNT_NAME) {
            throw new Error('Thiếu cấu hình VietQR (Bank Code/Account No/Name) trong file .env.');
        }

        const paymentContent = orderId;

        const requestBody = {
            accountNo: VIETQR_ACCOUNT_NUMBER,
            acqId: VIETQR_BANK_CODE, 
            amount: amount, 
            addInfo: paymentContent,
            format: 'text',
            template: VIETQR_TEMPLATE,
            accountName: VIETQR_ACCOUNT_NAME 
        };

        const response = await axios.post(VIETQR_API_URL, requestBody);
        
        if (response.data.code === '00' && response.data.data) {
            const bankName = response.data.data.bankName || VIETQR_BANK_CODE;
            
            return {
                qrUrl: response.data.data.qrDataURL, 
                bankInfo: {
                    bankName: bankName,
                    accountNo: VIETQR_ACCOUNT_NUMBER,
                    accountName: VIETQR_ACCOUNT_NAME,
                    amount: amount,
                    content: paymentContent 
                }
            };
        }
        
        console.error('Lỗi phản hồi API VietQR:', response.data);
        throw new Error('Lỗi từ cổng VietQR: ' + response.data.desc);

    } catch (error) {
        console.error('Lỗi tạo VietQR chi tiết:', error);
        throw new Error('Không thể tạo mã VietQR. Vui lòng kiểm tra Log Server.');
    }
};