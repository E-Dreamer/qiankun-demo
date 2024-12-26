// 加密解密
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min';
//处理字符串过长加密报错 解决Message too long for RSA
const b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const b64pad = '=';
// 加密
JSEncrypt.prototype.encryptLong2 = function (string) {
  const k = this.getKey();
  try {
    let ct = '';
    //RSA每次加密117bytes，需要辅助方法判断字符串截取位置
    //1.获取字符串截取点
    const bytes = [];
    bytes.push(0);
    let byteNo = 0;
    let len, c;
    len = string.length;
    let temp = 0;
    for (let i = 0; i < len; i++) {
      c = string.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10ffff) {
        byteNo += 4;
      } else if (c >= 0x000800 && c <= 0x00ffff) {
        byteNo += 3;
      } else if (c >= 0x000080 && c <= 0x0007ff) {
        byteNo += 2;
      } else {
        byteNo += 1;
      }
      if (byteNo % 117 >= 114 || byteNo % 117 === 0) {
        if (byteNo - temp >= 114) {
          bytes.push(i);
          temp = byteNo;
        }
      }
    }
    //2.截取字符串并分段加密
    if (bytes.length > 1) {
      for (let i = 0; i < bytes.length - 1; i++) {
        let str;
        if (i === 0) {
          str = string.substring(0, bytes[i + 1] + 1);
        } else {
          str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
        }
        const t1 = k.encrypt(str);
        ct += addPreZero(t1, 256);
      }
      if (bytes[bytes.length - 1] !== string.length - 1) {
        const lastStr = string.substring(bytes[bytes.length - 1] + 1);
        const rsaStr = k.encrypt(lastStr);
        ct += addPreZero(rsaStr, 256);
      }
      //console.log("加密完的数据："+ct);
      return hex2b64(ct);
    }
    const t = k.encrypt(string);
    const y = hex2b64(t);
    return y;
  } catch (ex) {
    return false;
  }
};
// 解密
JSEncrypt.prototype.decryptLong2 = function (string) {
  const k = this.getKey();
  // let maxLength = ((k.n.bitLength()+7)>>3);
  const MAX_DECRYPT_BLOCK = 128;
  try {
    let ct = '';
    let t1;
    let bufTmp;
    let hexTmp;
    const str = b64ToHex(string);
    const buf = hexToBytes(str);
    const inputLen = buf.length;
    //开始长度
    let offSet = 0;
    //结束长度
    let endOffSet = MAX_DECRYPT_BLOCK;

    //分段解密
    console.log(inputLen + '----' + offSet);
    while (inputLen - offSet > 0) {
      if (inputLen - offSet > MAX_DECRYPT_BLOCK) {
        bufTmp = buf.slice(offSet, endOffSet);
        hexTmp = bytesToHex(bufTmp);
        t1 = k.decrypt(hexTmp);
        ct += t1;
      } else {
        bufTmp = buf.slice(offSet, inputLen);
        hexTmp = bytesToHex(bufTmp);
        t1 = k.decrypt(hexTmp);
        ct += t1;
      }
      offSet += MAX_DECRYPT_BLOCK;
      endOffSet += MAX_DECRYPT_BLOCK;
    }
    return ct;
  } catch (ex) {
    return false;
  }
};
// 加密辅助方法
function hex2b64(h) {
  let i;
  let c;
  let ret = '';
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 === h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 === h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) ret += b64pad;
  return ret;
}
function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}
function bytesToHex(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xf).toString(16));
  }
  return hex.join('');
}
function b64ToHex(str) {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, '')), hex = []; i < bin.length; ++i) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = '0' + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join('');
}
function addPreZero(num, length) {
  let t = (num + '').length,
    s = '';
  for (let i = 0; i < length - t; i++) {
    s += '0';
  }
  return s + num;
}