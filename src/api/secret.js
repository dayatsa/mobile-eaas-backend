const express = require('express');
const axios = require('axios');
const http = require('http');
const httpStatus = require('http-status');
const catchAsync = require('./catchAsync');

const router = express.Router();
const mypin = "123456";

const config = {
  headers: {
    'X-Vault-Token': 'hvs.NVkNOHXM5adLO1Zk5Pn9PnlU',
  },
};

const getKey = catchAsync(async (req, res) => {
  try {
    const httpReq = await axios.get('http://192.168.0.14:8200/v1/dev-mob-day/keys/test', config);
    const data = httpReq.data.data;

    const response = {
      status: 'success',
      data
    }
    res.send(response);
  } catch (error) {
    response = {
      "status": "fail",
      "message": error.message
    }
    res.status(httpStatus.NOT_FOUND).send(response)
  }
});


const authPin = catchAsync(async (req, res) => {
  try {
    // const httpReq = await axios.post('http://192.168.0.14:8200/v1/dev-mob-day/decrypt/test', { "ciphertext": req.body.payload }, config);
    // const plain64 = httpReq.data.data;
    // const plaintext = new Buffer.from(plain64.plaintext, 'base64').toString('utf-8');

    // const result = plaintext === mypin ? true : false;
    // console.log(result)
    const httpReq = await axios.post('http://192.168.0.14:8200/v1/dev-mob-day/keys/test/rotate', config);
    
    const response = {
      status: 'success',
      // data: {
      //   res: result,
      //   message: "key rotated"
      // }
    }
    res.send(response);
  } catch (error) {
    response = {
      "status": "fail",
      "message": error.message
    }
    res.status(httpStatus.NOT_FOUND).send(response)
  }
});


router.get('/', getKey);
router.post('/authpin', authPin);

module.exports = router;
