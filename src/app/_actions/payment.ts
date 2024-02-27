"use server";

import * as crypto from "crypto";

function getInvoiceNo(length: number): string {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function buildHttpQuery(data: Record<string, any>): string {
  let httpQuery = new URLSearchParams();
  Object.keys(data).forEach(function (parameterName) {
    httpQuery.append(parameterName, data[parameterName]);
  });
  return httpQuery.toString();
}

function buildSignature(data: string, secret: string): string {
  let token = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest()
    .toString("base64");
  return token;
}

export default function generatePaymentUrl(
  amount: number,
  description: string,
  returnUrl: string
): string {
  const time = Date.now();
  const invoiceNo = getInvoiceNo(8);

  const parameters = {
    merchantKey: process.env.MERCHANT_KEY,
    time: time,
    invoice_no: invoiceNo,
    amount: amount,
    description: description,
    return_url: returnUrl,
    back_url: returnUrl,
  };

  const httpQuery = buildHttpQuery(parameters);
  const message =
    "POST" +
    "\n" +
    process.env.PAYMENT_END_POINT +
    "/payments/create" +
    "\n" +
    time +
    "\n" +
    httpQuery;
  const signature = buildSignature(
    message,
    process.env.MERCHANT_SECRET_KEY || ""
  );

  const baseEncode = Buffer.from(JSON.stringify(parameters)).toString("base64");

  const httpBuild = {
    baseEncode: baseEncode,
    signature: signature,
  };

  const directUrl =
    process.env.PAYMENT_END_POINT + "/portal?" + buildHttpQuery(httpBuild);

  return directUrl;
}
