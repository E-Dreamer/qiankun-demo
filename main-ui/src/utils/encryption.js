import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'
//处理字符串过长加密报错 解决Message too long for RSA
import './jsencryptlong.js';
// 密钥对生成 http://web.chacuo.net/netrsakeypair
const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv29GyHHBSAXQQdv3R6On
QyauZAPyrrcZbeWvBcSf9t5bbmhKT2ur8DEeX+T3dufZQvQPUwvFiOd3T744NALI
KrV+d94oraPPx2e+5Q0wJ/1QcbgxcI+OgNPKF7KJjZk4ISaC2R4IRbanHvtFCwEX
K5fSCc8VLmIL009QI1Y9hG5dMM8dU6NiggtpfNRI0bc7XdeeL4CtuJtFIoV5Q6O2
vdN025nyml+kUDZB/5M0DgcpStWwvSzjAenWtQ8x+smlC0zEQWUFx8vf6BvIUuhg
5BMFQtfXIyPFPSR6N0M1fj/cx/fcIrdteedTMebmpRZ7EB1sipaX3xYr4+qSvOoe
NQIDAQAB`

const privateKey = `MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIpi2grhUkZEcCAggA
MBQGCCqGSIb3DQMHBAi4f9myXaGJLQSCBMhqz7noI8zWztDmdYLsjgAwwe5wWdS2
1NBGWxg/RM2Lsuh/UzC38JYe5P8WbDxlTE18ibfL6kgWnd68Djza3SV8WabuwKCq
n+cLt+j91gg2sod1iHqOLlh6EY0kjr4giJmM31bwGQJOphc6WqTRnc9BX8QvD2+v
hrISKF1lytY+PS5CEfsKualED00wZm5Ev1i9PL3Ek4lF4rLd4KT+TwVaCXmZSobq
yd41O8zLPNH08T0KRE7BnNodhNeFRdpmKPlycTOx/Q9JXx6gsWuYVDpIKadWBojX
qjU2JW96boDszRvjSqe+LT1W05otN50D5+2nUHpuC18BlFgcIdiQnAX4Ngi11uiq
0paC1XmwqfPjb+/d4emqAjVNEcw3JRU2wTi/dmvcIZoLk3lHo3pPj/Ns8rA4qfRo
2zqvry5+N+IYGH8Jhe3faszyNosqK0S2X2/jpwzvHo1UmLWZABWFf6o5R8YGd6EQ
Zt4VMQ0EgKpRE5cvbusKxOV3uBXN6SkLpYLwovTQBb6JjYL/Yt6IYXS3JfSSqWLg
biQZ0ajAg9QhOCFurYl+Yb7D3A64/Ery67RlgjaEM4WcJHsCgBliljy60rq0sCb6
Kpq3JtfTPdjkg8tdc4E5zvZg6sxkZEUpVlZ0GCJGwXr1jgeXeacFdmXNJrj8lgkr
uEsdwudA0WYZSzOQH+SxuisUQSiWjseK0dYHAeW/TdYBaQKbBTSpRo4pfHG9Go/K
MnX+6KGQTqmBdRKVTDRtwsg+Yoa6tojm7roUK+QtdkPjD8xmY1qe7qJBDlEICv9l
rLJJaAJRHBhx60HpfrjruwJ+1UwzT+5DtWXjlpnyPfpHE9HbXhZCLAhcM4AhfEOh
UjZAfqKXrCV6EWGCDo+VR0+MayoXxt79J/GPebuQU0uPEWzB5eomvIouQEL2MdXP
VNSUfTegAxj9qQr2HRFLp1W4Mjg/3pVdBELmz3nooI2TxiNQYcl2+GkcQNwedS6T
F/PZ2pefVCj1v3+Xu5zEK+MdNlIjn8Roq4PEYyf46JDTLOu5W8QnthpCOBZw7VWW
f66lpUFdYJq+hnm+L9X0w68g8i0m76RBTaQZwmIfsPIF3C3MuEHXmKtmgoWxRFKf
W+g+CVdR2p8a7xspLHWFq72Soi5kr9wUxPzSWK83kw3yaKGEwYkz/iKDVMFRhd4G
aoKauL8RuEN5HbvpbtgDpAvqXemmUlteBw1A+MNpHDXuwfl29fmNwckdWJrI6sPV
yVc/c6eAZVaYKwjyNmISWTomAHBjjnKZwcth1Jy4Z8977eljn1uGfZOAd9gvPLKB
7SAa3kBoxsdV+vfEGyMpLjrokOTrBRscSDPvl5JqhYxklqyWIjEgznBSLV8HJelw
Tj3sGOSwdg8Y4BG9bX5R8j0F38t0VvlJ8RrldEORMPrqt30Yii0YH1TB35M4lPCS
RCB9T00gA/KBLRPko7naWS2VROAcIH/pTuGolq6Tsc7O8TYVFHiJxc/ZWrgF0cUv
0Rjo09DXCTDkR99qBNyhnI3rgEAuVlGZbC5f1TpS0fWyds8TBW7qTLYYB7+dDfzu
2o/ySzlM0eNs4Wlx8tV7lSpFAyRZlywoneG1uOY1H2BvmWp6goq8UH4RNZlySnM3
duc=`
// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  // 对数据进行解密
  if (txt.length >= 117) {
    return encryptor.encryptLong2(txt);
  } else {
    return encryptor.encrypt(txt);
  }
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey); // 设置私钥
  // 对数据进行解密
  if (txt.length >= 117) {
    return encryptor.decryptLong2(txt);
  } else {
    return encryptor.decrypt(txt);
  }
}