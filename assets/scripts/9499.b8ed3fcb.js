(self.webpackChunkrap=self.webpackChunkrap||[]).push([[9499],{39499:function(t){t.exports=function(){"use strict";var t=Math.imul,i=Math.clz32,e=Math.abs,n=Math.max,r=Math.floor;class _ extends Array{constructor(t,i){if(super(t),this.sign=i,t>_.__kMaxLength)throw new RangeError("Maximum BigInt size exceeded")}static BigInt(t){var i=Number.isFinite;if("number"==typeof t){if(0===t)return _.__zero();if(_.__isOneDigitInt(t))return 0>t?_.__oneDigit(-t,!0):_.__oneDigit(t,!1);if(!i(t)||r(t)!==t)throw new RangeError("The number "+t+" cannot be converted to BigInt because it is not an integer");return _.__fromDouble(t)}if("string"==typeof t){const i=_.__fromString(t);if(null===i)throw new SyntaxError("Cannot convert "+t+" to a BigInt");return i}if("boolean"==typeof t)return!0===t?_.__oneDigit(1,!1):_.__zero();if("object"==typeof t){if(t.constructor===_)return t;const i=_.__toPrimitive(t);return _.BigInt(i)}throw new TypeError("Cannot convert "+t+" to a BigInt")}toDebugString(){const t=["BigInt["];for(const i of this)t.push((i?(i>>>0).toString(16):i)+", ");return t.push("]"),t.join("")}toString(t=10){if(2>t||36<t)throw new RangeError("toString() radix argument must be between 2 and 36");return 0===this.length?"0":0==(t&t-1)?_.__toStringBasePowerOfTwo(this,t):_.__toStringGeneric(this,t,!1)}static toNumber(t){const i=t.length;if(0===i)return 0;if(1===i){const i=t.__unsignedDigit(0);return t.sign?-i:i}const e=t.__digit(i-1),n=_.__clz30(e),r=30*i-n;if(1024<r)return t.sign?-1/0:1/0;let o=r-1,s=e,l=i-1;const u=n+3;let g=32===u?0:s<<u;g>>>=12;const a=u-12;let f=12<=u?0:s<<20+u,c=20+u;for(0<a&&0<l&&(l--,s=t.__digit(l),g|=s>>>30-a,f=s<<a+2,c=a+2);0<c&&0<l;)l--,s=t.__digit(l),f|=30<=c?s<<c-30:s>>>30-c,c-=30;const h=_.__decideRounding(t,c,l,s);if((1===h||0===h&&1==(1&f))&&(f=f+1>>>0,0===f&&(g++,0!=g>>>20&&(g=0,o++,1023<o))))return t.sign?-1/0:1/0;const b=t.sign?-2147483648:0;return o=o+1023<<20,_.__kBitConversionInts[1]=b|o|g,_.__kBitConversionInts[0]=f,_.__kBitConversionDouble[0]}static unaryMinus(t){if(0===t.length)return t;const i=t.__copy();return i.sign=!t.sign,i}static bitwiseNot(t){return t.sign?_.__absoluteSubOne(t).__trim():_.__absoluteAddOne(t,!0)}static exponentiate(t,i){if(i.sign)throw new RangeError("Exponent must be positive");if(0===i.length)return _.__oneDigit(1,!1);if(0===t.length)return t;if(1===t.length&&1===t.__digit(0))return t.sign&&0==(1&i.__digit(0))?_.unaryMinus(t):t;if(1<i.length)throw new RangeError("BigInt too big");let e=i.__unsignedDigit(0);if(1===e)return t;if(e>=_.__kMaxLengthBits)throw new RangeError("BigInt too big");if(1===t.length&&2===t.__digit(0)){const i=1+(0|e/30),n=t.sign&&0!=(1&e),r=new _(i,n);r.__initializeDigits();const o=1<<e%30;return r.__setDigit(i-1,o),r}let n=null,r=t;for(0!=(1&e)&&(n=t),e>>=1;0!==e;e>>=1)r=_.multiply(r,r),0!=(1&e)&&(n=null===n?r:_.multiply(n,r));return n}static multiply(t,i){if(0===t.length)return t;if(0===i.length)return i;let e=t.length+i.length;30<=t.__clzmsd()+i.__clzmsd()&&e--;const n=new _(e,t.sign!==i.sign);n.__initializeDigits();for(let e=0;e<t.length;e++)_.__multiplyAccumulate(i,t.__digit(e),n,e);return n.__trim()}static divide(t,i){if(0===i.length)throw new RangeError("Division by zero");if(0>_.__absoluteCompare(t,i))return _.__zero();const e=t.sign!==i.sign,n=i.__unsignedDigit(0);let r;if(1===i.length&&32767>=n){if(1===n)return e===t.sign?t:_.unaryMinus(t);r=_.__absoluteDivSmall(t,n,null)}else r=_.__absoluteDivLarge(t,i,!0,!1);return r.sign=e,r.__trim()}static remainder(t,i){if(0===i.length)throw new RangeError("Division by zero");if(0>_.__absoluteCompare(t,i))return t;const e=i.__unsignedDigit(0);if(1===i.length&&32767>=e){if(1===e)return _.__zero();const i=_.__absoluteModSmall(t,e);return 0===i?_.__zero():_.__oneDigit(i,t.sign)}const n=_.__absoluteDivLarge(t,i,!1,!0);return n.sign=t.sign,n.__trim()}static add(t,i){const e=t.sign;return e===i.sign?_.__absoluteAdd(t,i,e):0<=_.__absoluteCompare(t,i)?_.__absoluteSub(t,i,e):_.__absoluteSub(i,t,!e)}static subtract(t,i){const e=t.sign;return e===i.sign?0<=_.__absoluteCompare(t,i)?_.__absoluteSub(t,i,e):_.__absoluteSub(i,t,!e):_.__absoluteAdd(t,i,e)}static leftShift(t,i){return 0===i.length||0===t.length?t:i.sign?_.__rightShiftByAbsolute(t,i):_.__leftShiftByAbsolute(t,i)}static signedRightShift(t,i){return 0===i.length||0===t.length?t:i.sign?_.__leftShiftByAbsolute(t,i):_.__rightShiftByAbsolute(t,i)}static unsignedRightShift(){throw new TypeError("BigInts have no unsigned right shift; use >> instead")}static lessThan(t,i){return 0>_.__compareToBigInt(t,i)}static lessThanOrEqual(t,i){return 0>=_.__compareToBigInt(t,i)}static greaterThan(t,i){return 0<_.__compareToBigInt(t,i)}static greaterThanOrEqual(t,i){return 0<=_.__compareToBigInt(t,i)}static equal(t,i){if(t.sign!==i.sign)return!1;if(t.length!==i.length)return!1;for(let e=0;e<t.length;e++)if(t.__digit(e)!==i.__digit(e))return!1;return!0}static notEqual(t,i){return!_.equal(t,i)}static bitwiseAnd(t,i){if(!t.sign&&!i.sign)return _.__absoluteAnd(t,i).__trim();if(t.sign&&i.sign){const e=n(t.length,i.length)+1;let r=_.__absoluteSubOne(t,e);const o=_.__absoluteSubOne(i);return r=_.__absoluteOr(r,o,r),_.__absoluteAddOne(r,!0,r).__trim()}return t.sign&&([t,i]=[i,t]),_.__absoluteAndNot(t,_.__absoluteSubOne(i)).__trim()}static bitwiseXor(t,i){if(!t.sign&&!i.sign)return _.__absoluteXor(t,i).__trim();if(t.sign&&i.sign){const e=n(t.length,i.length),r=_.__absoluteSubOne(t,e),o=_.__absoluteSubOne(i);return _.__absoluteXor(r,o,r).__trim()}const e=n(t.length,i.length)+1;t.sign&&([t,i]=[i,t]);let r=_.__absoluteSubOne(i,e);return r=_.__absoluteXor(r,t,r),_.__absoluteAddOne(r,!0,r).__trim()}static bitwiseOr(t,i){const e=n(t.length,i.length);if(!t.sign&&!i.sign)return _.__absoluteOr(t,i).__trim();if(t.sign&&i.sign){let n=_.__absoluteSubOne(t,e);const r=_.__absoluteSubOne(i);return n=_.__absoluteAnd(n,r,n),_.__absoluteAddOne(n,!0,n).__trim()}t.sign&&([t,i]=[i,t]);let r=_.__absoluteSubOne(i,e);return r=_.__absoluteAndNot(r,t,r),_.__absoluteAddOne(r,!0,r).__trim()}static asIntN(t,i){if(0===i.length)return i;if(0>(t=r(t)))throw new RangeError("Invalid value: not (convertible to) a safe integer");if(0===t)return _.__zero();if(t>=_.__kMaxLengthBits)return i;const e=0|(t+29)/30;if(i.length<e)return i;const n=i.__unsignedDigit(e-1),o=1<<(t-1)%30;if(i.length===e&&n<o)return i;if((n&o)!==o)return _.__truncateToNBits(t,i);if(!i.sign)return _.__truncateAndSubFromPowerOfTwo(t,i,!0);if(0==(n&o-1)){for(let n=e-2;0<=n;n--)if(0!==i.__digit(n))return _.__truncateAndSubFromPowerOfTwo(t,i,!1);return i.length===e&&n===o?i:_.__truncateToNBits(t,i)}return _.__truncateAndSubFromPowerOfTwo(t,i,!1)}static asUintN(t,i){if(0===i.length)return i;if(0>(t=r(t)))throw new RangeError("Invalid value: not (convertible to) a safe integer");if(0===t)return _.__zero();if(i.sign){if(t>_.__kMaxLengthBits)throw new RangeError("BigInt too big");return _.__truncateAndSubFromPowerOfTwo(t,i,!1)}if(t>=_.__kMaxLengthBits)return i;const e=0|(t+29)/30;if(i.length<e)return i;const n=t%30;if(i.length==e){if(0===n)return i;if(0==i.__digit(e-1)>>>n)return i}return _.__truncateToNBits(t,i)}static ADD(t,i){if(t=_.__toPrimitive(t),i=_.__toPrimitive(i),"string"==typeof t)return"string"!=typeof i&&(i=i.toString()),t+i;if("string"==typeof i)return t.toString()+i;if(t=_.__toNumeric(t),i=_.__toNumeric(i),_.__isBigInt(t)&&_.__isBigInt(i))return _.add(t,i);if("number"==typeof t&&"number"==typeof i)return t+i;throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")}static LT(t,i){return _.__compare(t,i,0)}static LE(t,i){return _.__compare(t,i,1)}static GT(t,i){return _.__compare(t,i,2)}static GE(t,i){return _.__compare(t,i,3)}static EQ(t,i){for(;;){if(_.__isBigInt(t))return _.__isBigInt(i)?_.equal(t,i):_.EQ(i,t);if("number"==typeof t){if(_.__isBigInt(i))return _.__equalToNumber(i,t);if("object"!=typeof i)return t==i;i=_.__toPrimitive(i)}else if("string"==typeof t){if(_.__isBigInt(i))return null!==(t=_.__fromString(t))&&_.equal(t,i);if("object"!=typeof i)return t==i;i=_.__toPrimitive(i)}else if("boolean"==typeof t){if(_.__isBigInt(i))return _.__equalToNumber(i,+t);if("object"!=typeof i)return t==i;i=_.__toPrimitive(i)}else if("symbol"==typeof t){if(_.__isBigInt(i))return!1;if("object"!=typeof i)return t==i;i=_.__toPrimitive(i)}else{if("object"!=typeof t)return t==i;if("object"==typeof i&&i.constructor!==_)return t==i;t=_.__toPrimitive(t)}}}static NE(t,i){return!_.EQ(t,i)}static __zero(){return new _(0,!1)}static __oneDigit(t,i){const e=new _(1,i);return e.__setDigit(0,t),e}__copy(){const t=new _(this.length,this.sign);for(let i=0;i<this.length;i++)t[i]=this[i];return t}__trim(){let t=this.length,i=this[t-1];for(;0===i;)t--,i=this[t-1],this.pop();return 0===t&&(this.sign=!1),this}__initializeDigits(){for(let t=0;t<this.length;t++)this[t]=0}static __decideRounding(t,i,e,n){if(0<i)return-1;let r;if(0>i)r=-i-1;else{if(0===e)return-1;e--,n=t.__digit(e),r=29}let _=1<<r;if(0==(n&_))return-1;if(_-=1,0!=(n&_))return 1;for(;0<e;)if(e--,0!==t.__digit(e))return 1;return 0}static __fromDouble(t){_.__kBitConversionDouble[0]=t;const i=(2047&_.__kBitConversionInts[1]>>>20)-1023,e=1+(0|i/30),n=new _(e,0>t);let r=1048575&_.__kBitConversionInts[1]|1048576,o=_.__kBitConversionInts[0];const s=20,l=i%30;let u,g=0;if(20>l){const t=s-l;g=t+32,u=r>>>t,r=r<<32-t|o>>>t,o<<=32-t}else if(20===l)g=32,u=r,r=o,o=0;else{const t=l-s;g=32-t,u=r<<t|o>>>32-t,r=o<<t,o=0}n.__setDigit(e-1,u);for(let t=e-2;0<=t;t--)0<g?(g-=30,u=r>>>2,r=r<<30|o>>>2,o<<=30):u=0,n.__setDigit(t,u);return n.__trim()}static __isWhitespace(t){return!!(13>=t&&9<=t)||(159>=t?32==t:131071>=t?160==t||5760==t:196607>=t?10>=(t&=131071)||40==t||41==t||47==t||95==t||4096==t:65279==t)}static __fromString(t,i=0){let e=0;const n=t.length;let r=0;if(r===n)return _.__zero();let o=t.charCodeAt(r);for(;_.__isWhitespace(o);){if(++r===n)return _.__zero();o=t.charCodeAt(r)}if(43===o){if(++r===n)return null;o=t.charCodeAt(r),e=1}else if(45===o){if(++r===n)return null;o=t.charCodeAt(r),e=-1}if(0===i){if(i=10,48===o){if(++r===n)return _.__zero();if(o=t.charCodeAt(r),88===o||120===o){if(i=16,++r===n)return null;o=t.charCodeAt(r)}else if(79===o||111===o){if(i=8,++r===n)return null;o=t.charCodeAt(r)}else if(66===o||98===o){if(i=2,++r===n)return null;o=t.charCodeAt(r)}}}else if(16===i&&48===o){if(++r===n)return _.__zero();if(o=t.charCodeAt(r),88===o||120===o){if(++r===n)return null;o=t.charCodeAt(r)}}if(0!=e&&10!==i)return null;for(;48===o;){if(++r===n)return _.__zero();o=t.charCodeAt(r)}const s=n-r;let l=_.__kMaxBitsPerChar[i],u=_.__kBitsPerCharTableMultiplier-1;if(s>1073741824/l)return null;const g=l*s+u>>>_.__kBitsPerCharTableShift,a=new _(0|(g+29)/30,!1),f=10>i?i:10,c=10<i?i-10:0;if(0==(i&i-1)){l>>=_.__kBitsPerCharTableShift;const i=[],e=[];let s=!1;do{let _=0,u=0;for(;;){let i;if(o-48>>>0<f)i=o-48;else{if(!((32|o)-97>>>0<c)){s=!0;break}i=(32|o)-87}if(u+=l,_=_<<l|i,++r===n){s=!0;break}if(o=t.charCodeAt(r),30<u+l)break}i.push(_),e.push(u)}while(!s);_.__fillFromParts(a,i,e)}else{a.__initializeDigits();let e=!1,s=0;do{let g=0,h=1;for(;;){let _;if(o-48>>>0<f)_=o-48;else{if(!((32|o)-97>>>0<c)){e=!0;break}_=(32|o)-87}const l=h*i;if(1073741823<l)break;if(h=l,g=g*i+_,s++,++r===n){e=!0;break}o=t.charCodeAt(r)}u=30*_.__kBitsPerCharTableMultiplier-1;const b=0|(l*s+u>>>_.__kBitsPerCharTableShift)/30;a.__inplaceMultiplyAdd(h,g,b)}while(!e)}if(r!==n){if(!_.__isWhitespace(o))return null;for(r++;r<n;r++)if(o=t.charCodeAt(r),!_.__isWhitespace(o))return null}return a.sign=-1==e,a.__trim()}static __fillFromParts(t,i,e){let n=0,r=0,_=0;for(let o=i.length-1;0<=o;o--){const s=i[o],l=e[o];r|=s<<_,_+=l,30===_?(t.__setDigit(n++,r),_=0,r=0):30<_&&(t.__setDigit(n++,1073741823&r),_-=30,r=s>>>l-_)}if(0!==r){if(n>=t.length)throw new Error("implementation bug");t.__setDigit(n++,r)}for(;n<t.length;n++)t.__setDigit(n,0)}static __toStringBasePowerOfTwo(t,i){const e=t.length;let n=i-1;n=(85&n>>>1)+(85&n),n=(51&n>>>2)+(51&n),n=(15&n>>>4)+(15&n);const r=n,o=i-1,s=t.__digit(e-1);let l=0|(30*e-_.__clz30(s)+r-1)/r;if(t.sign&&l++,268435456<l)throw new Error("string too long");const u=Array(l);let g=l-1,a=0,f=0;for(let i=0;i<e-1;i++){const e=t.__digit(i),n=(a|e<<f)&o;u[g--]=_.__kConversionChars[n];const s=r-f;for(a=e>>>s,f=30-s;f>=r;)u[g--]=_.__kConversionChars[a&o],a>>>=r,f-=r}const c=(a|s<<f)&o;for(u[g--]=_.__kConversionChars[c],a=s>>>r-f;0!==a;)u[g--]=_.__kConversionChars[a&o],a>>>=r;if(t.sign&&(u[g--]="-"),-1!=g)throw new Error("implementation bug");return u.join("")}static __toStringGeneric(t,i,e){const n=t.length;if(0===n)return"";if(1===n){let n=t.__unsignedDigit(0).toString(i);return!1===e&&t.sign&&(n="-"+n),n}const r=30*n-_.__clz30(t.__digit(n-1)),o=_.__kMaxBitsPerChar[i]-1;let s=r*_.__kBitsPerCharTableMultiplier;s+=o-1,s=0|s/o;const l=s+1>>1,u=_.exponentiate(_.__oneDigit(i,!1),_.__oneDigit(l,!1));let g,a;const f=u.__unsignedDigit(0);if(1===u.length&&32767>=f){g=new _(t.length,!1),g.__initializeDigits();let e=0;for(let i=2*t.length-1;0<=i;i--){const n=e<<15|t.__halfDigit(i);g.__setHalfDigit(i,0|n/f),e=0|n%f}a=e.toString(i)}else{const e=_.__absoluteDivLarge(t,u,!0,!0);g=e.quotient;const n=e.remainder.__trim();a=_.__toStringGeneric(n,i,!0)}g.__trim();let c=_.__toStringGeneric(g,i,!0);for(;a.length<l;)a="0"+a;return!1===e&&t.sign&&(c="-"+c),c+a}static __unequalSign(t){return t?-1:1}static __absoluteGreater(t){return t?-1:1}static __absoluteLess(t){return t?1:-1}static __compareToBigInt(t,i){const e=t.sign;if(e!==i.sign)return _.__unequalSign(e);const n=_.__absoluteCompare(t,i);return 0<n?_.__absoluteGreater(e):0>n?_.__absoluteLess(e):0}static __compareToNumber(t,i){if(_.__isOneDigitInt(i)){const n=t.sign,r=0>i;if(n!==r)return _.__unequalSign(n);if(0===t.length){if(r)throw new Error("implementation bug");return 0===i?0:-1}if(1<t.length)return _.__absoluteGreater(n);const o=e(i),s=t.__unsignedDigit(0);return s>o?_.__absoluteGreater(n):s<o?_.__absoluteLess(n):0}return _.__compareToDouble(t,i)}static __compareToDouble(t,i){if(i!=i)return i;if(i===1/0)return-1;if(i===-1/0)return 1;const e=t.sign;if(e!==0>i)return _.__unequalSign(e);if(0===i)throw new Error("implementation bug: should be handled elsewhere");if(0===t.length)return-1;_.__kBitConversionDouble[0]=i;const n=2047&_.__kBitConversionInts[1]>>>20;if(2047==n)throw new Error("implementation bug: handled elsewhere");const r=n-1023;if(0>r)return _.__absoluteGreater(e);const o=t.length;let s=t.__digit(o-1);const l=_.__clz30(s),u=30*o-l,g=r+1;if(u<g)return _.__absoluteLess(e);if(u>g)return _.__absoluteGreater(e);let a=1048576|1048575&_.__kBitConversionInts[1],f=_.__kBitConversionInts[0];const c=20,h=29-l;if(h!==(0|(u-1)%30))throw new Error("implementation bug");let b,d=0;if(20>h){const t=c-h;d=t+32,b=a>>>t,a=a<<32-t|f>>>t,f<<=32-t}else if(20===h)d=32,b=a,a=f,f=0;else{const t=h-c;d=32-t,b=a<<t|f>>>32-t,a=f<<t,f=0}if(s>>>=0,b>>>=0,s>b)return _.__absoluteGreater(e);if(s<b)return _.__absoluteLess(e);for(let i=o-2;0<=i;i--){0<d?(d-=30,b=a>>>2,a=a<<30|f>>>2,f<<=30):b=0;const n=t.__unsignedDigit(i);if(n>b)return _.__absoluteGreater(e);if(n<b)return _.__absoluteLess(e)}if(0!==a||0!==f){if(0===d)throw new Error("implementation bug");return _.__absoluteLess(e)}return 0}static __equalToNumber(t,i){return _.__isOneDigitInt(i)?0===i?0===t.length:1===t.length&&t.sign===0>i&&t.__unsignedDigit(0)===e(i):0===_.__compareToDouble(t,i)}static __comparisonResultToBool(t,i){return 0===i?0>t:1===i?0>=t:2===i?0<t:3===i?0<=t:void 0}static __compare(t,i,e){if(t=_.__toPrimitive(t),i=_.__toPrimitive(i),"string"==typeof t&&"string"==typeof i)switch(e){case 0:return t<i;case 1:return t<=i;case 2:return t>i;case 3:return t>=i}if(_.__isBigInt(t)&&"string"==typeof i)return null!==(i=_.__fromString(i))&&_.__comparisonResultToBool(_.__compareToBigInt(t,i),e);if("string"==typeof t&&_.__isBigInt(i))return null!==(t=_.__fromString(t))&&_.__comparisonResultToBool(_.__compareToBigInt(t,i),e);if(t=_.__toNumeric(t),i=_.__toNumeric(i),_.__isBigInt(t)){if(_.__isBigInt(i))return _.__comparisonResultToBool(_.__compareToBigInt(t,i),e);if("number"!=typeof i)throw new Error("implementation bug");return _.__comparisonResultToBool(_.__compareToNumber(t,i),e)}if("number"!=typeof t)throw new Error("implementation bug");if(_.__isBigInt(i))return _.__comparisonResultToBool(_.__compareToNumber(i,t),2^e);if("number"!=typeof i)throw new Error("implementation bug");return 0===e?t<i:1===e?t<=i:2===e?t>i:3===e?t>=i:void 0}__clzmsd(){return _.__clz30(this.__digit(this.length-1))}static __absoluteAdd(t,i,e){if(t.length<i.length)return _.__absoluteAdd(i,t,e);if(0===t.length)return t;if(0===i.length)return t.sign===e?t:_.unaryMinus(t);let n=t.length;(0===t.__clzmsd()||i.length===t.length&&0===i.__clzmsd())&&n++;const r=new _(n,e);let o=0,s=0;for(;s<i.length;s++){const e=t.__digit(s)+i.__digit(s)+o;o=e>>>30,r.__setDigit(s,1073741823&e)}for(;s<t.length;s++){const i=t.__digit(s)+o;o=i>>>30,r.__setDigit(s,1073741823&i)}return s<r.length&&r.__setDigit(s,o),r.__trim()}static __absoluteSub(t,i,e){if(0===t.length)return t;if(0===i.length)return t.sign===e?t:_.unaryMinus(t);const n=new _(t.length,e);let r=0,o=0;for(;o<i.length;o++){const e=t.__digit(o)-i.__digit(o)-r;r=1&e>>>30,n.__setDigit(o,1073741823&e)}for(;o<t.length;o++){const i=t.__digit(o)-r;r=1&i>>>30,n.__setDigit(o,1073741823&i)}return n.__trim()}static __absoluteAddOne(t,i,e=null){const n=t.length;null===e?e=new _(n,i):e.sign=i;let r=1;for(let i=0;i<n;i++){const n=t.__digit(i)+r;r=n>>>30,e.__setDigit(i,1073741823&n)}return 0!=r&&e.__setDigitGrow(n,1),e}static __absoluteSubOne(t,i){const e=t.length,n=new _(i=i||e,!1);let r=1;for(let i=0;i<e;i++){const e=t.__digit(i)-r;r=1&e>>>30,n.__setDigit(i,1073741823&e)}if(0!=r)throw new Error("implementation bug");for(let t=e;t<i;t++)n.__setDigit(t,0);return n}static __absoluteAnd(t,i,e=null){let n=t.length,r=i.length,o=r;if(n<r){o=n;const e=t,_=n;t=i,n=r,i=e,r=_}let s=o;null===e?e=new _(s,!1):s=e.length;let l=0;for(;l<o;l++)e.__setDigit(l,t.__digit(l)&i.__digit(l));for(;l<s;l++)e.__setDigit(l,0);return e}static __absoluteAndNot(t,i,e=null){const n=t.length,r=i.length;let o=r;n<r&&(o=n);let s=n;null===e?e=new _(s,!1):s=e.length;let l=0;for(;l<o;l++)e.__setDigit(l,t.__digit(l)&~i.__digit(l));for(;l<n;l++)e.__setDigit(l,t.__digit(l));for(;l<s;l++)e.__setDigit(l,0);return e}static __absoluteOr(t,i,e=null){let n=t.length,r=i.length,o=r;if(n<r){o=n;const e=t,_=n;t=i,n=r,i=e,r=_}let s=n;null===e?e=new _(s,!1):s=e.length;let l=0;for(;l<o;l++)e.__setDigit(l,t.__digit(l)|i.__digit(l));for(;l<n;l++)e.__setDigit(l,t.__digit(l));for(;l<s;l++)e.__setDigit(l,0);return e}static __absoluteXor(t,i,e=null){let n=t.length,r=i.length,o=r;if(n<r){o=n;const e=t,_=n;t=i,n=r,i=e,r=_}let s=n;null===e?e=new _(s,!1):s=e.length;let l=0;for(;l<o;l++)e.__setDigit(l,t.__digit(l)^i.__digit(l));for(;l<n;l++)e.__setDigit(l,t.__digit(l));for(;l<s;l++)e.__setDigit(l,0);return e}static __absoluteCompare(t,i){const e=t.length-i.length;if(0!=e)return e;let n=t.length-1;for(;0<=n&&t.__digit(n)===i.__digit(n);)n--;return 0>n?0:t.__unsignedDigit(n)>i.__unsignedDigit(n)?1:-1}static __multiplyAccumulate(t,i,e,n){if(0===i)return;const r=32767&i,o=i>>>15;let s=0,l=0;for(let i,u=0;u<t.length;u++,n++){i=e.__digit(n);const g=t.__digit(u),a=32767&g,f=g>>>15,c=_.__imul(a,r),h=_.__imul(a,o),b=_.__imul(f,r),d=_.__imul(f,o);i+=l+c+s,s=i>>>30,i&=1073741823,i+=((32767&h)<<15)+((32767&b)<<15),s+=i>>>30,l=d+(h>>>15)+(b>>>15),e.__setDigit(n,1073741823&i)}for(;0!=s||0!==l;n++){let t=e.__digit(n);t+=s+l,l=0,s=t>>>30,e.__setDigit(n,1073741823&t)}}static __internalMultiplyAdd(t,i,e,n,r){let o=e,s=0;for(let e=0;e<n;e++){const n=t.__digit(e),l=_.__imul(32767&n,i),u=_.__imul(n>>>15,i),g=l+((32767&u)<<15)+s+o;o=g>>>30,s=u>>>15,r.__setDigit(e,1073741823&g)}if(r.length>n)for(r.__setDigit(n++,o+s);n<r.length;)r.__setDigit(n++,0);else if(0!==o+s)throw new Error("implementation bug")}__inplaceMultiplyAdd(t,i,e){e>this.length&&(e=this.length);const n=32767&t,r=t>>>15;let o=0,s=i;for(let t=0;t<e;t++){const i=this.__digit(t),e=32767&i,l=i>>>15,u=_.__imul(e,n),g=_.__imul(e,r),a=_.__imul(l,n),f=_.__imul(l,r);let c=s+u+o;o=c>>>30,c&=1073741823,c+=((32767&g)<<15)+((32767&a)<<15),o+=c>>>30,s=f+(g>>>15)+(a>>>15),this.__setDigit(t,1073741823&c)}if(0!=o||0!==s)throw new Error("implementation bug")}static __absoluteDivSmall(t,i,e=null){null===e&&(e=new _(t.length,!1));let n=0;for(let r,_=2*t.length-1;0<=_;_-=2){r=(n<<15|t.__halfDigit(_))>>>0;const o=0|r/i;n=0|r%i,r=(n<<15|t.__halfDigit(_-1))>>>0;const s=0|r/i;n=0|r%i,e.__setDigit(_>>>1,o<<15|s)}return e}static __absoluteModSmall(t,i){let e=0;for(let n=2*t.length-1;0<=n;n--)e=0|((e<<15|t.__halfDigit(n))>>>0)%i;return e}static __absoluteDivLarge(t,i,e,n){const r=i.__halfDigitLength(),o=i.length,s=t.__halfDigitLength()-r;let l=null;e&&(l=new _(s+2>>>1,!1),l.__initializeDigits());const u=new _(r+2>>>1,!1);u.__initializeDigits();const g=_.__clz15(i.__halfDigit(r-1));0<g&&(i=_.__specialLeftShift(i,g,0));const a=_.__specialLeftShift(t,g,1),f=i.__halfDigit(r-1);let c=0;for(let t,n=s;0<=n;n--){t=32767;const s=a.__halfDigit(n+r);if(s!==f){const e=(s<<15|a.__halfDigit(n+r-1))>>>0;t=0|e/f;let o=0|e%f;const l=i.__halfDigit(r-2),u=a.__halfDigit(n+r-2);for(;_.__imul(t,l)>>>0>(o<<16|u)>>>0&&(t--,o+=f,!(32767<o)););}_.__internalMultiplyAdd(i,t,0,o,u);let g=a.__inplaceSub(u,n,r+1);0!==g&&(g=a.__inplaceAdd(i,n,r),a.__setHalfDigit(n+r,32767&a.__halfDigit(n+r)+g),t--),e&&(1&n?c=t<<15:l.__setDigit(n>>>1,c|t))}if(n)return a.__inplaceRightShift(g),e?{quotient:l,remainder:a}:a;if(e)return l;throw new Error("unreachable")}static __clz15(t){return _.__clz30(t)-15}__inplaceAdd(t,i,e){let n=0;for(let r=0;r<e;r++){const e=this.__halfDigit(i+r)+t.__halfDigit(r)+n;n=e>>>15,this.__setHalfDigit(i+r,32767&e)}return n}__inplaceSub(t,i,e){let n=0;if(1&i){i>>=1;let r=this.__digit(i),_=32767&r,o=0;for(;o<e-1>>>1;o++){const e=t.__digit(o),s=(r>>>15)-(32767&e)-n;n=1&s>>>15,this.__setDigit(i+o,(32767&s)<<15|32767&_),r=this.__digit(i+o+1),_=(32767&r)-(e>>>15)-n,n=1&_>>>15}const s=t.__digit(o),l=(r>>>15)-(32767&s)-n;if(n=1&l>>>15,this.__setDigit(i+o,(32767&l)<<15|32767&_),i+o+1>=this.length)throw new RangeError("out of bounds");0==(1&e)&&(r=this.__digit(i+o+1),_=(32767&r)-(s>>>15)-n,n=1&_>>>15,this.__setDigit(i+t.length,1073709056&r|32767&_))}else{i>>=1;let r=0;for(;r<t.length-1;r++){const e=this.__digit(i+r),_=t.__digit(r),o=(32767&e)-(32767&_)-n;n=1&o>>>15;const s=(e>>>15)-(_>>>15)-n;n=1&s>>>15,this.__setDigit(i+r,(32767&s)<<15|32767&o)}const _=this.__digit(i+r),o=t.__digit(r),s=(32767&_)-(32767&o)-n;n=1&s>>>15;let l=0;0==(1&e)&&(l=(_>>>15)-(o>>>15)-n,n=1&l>>>15),this.__setDigit(i+r,(32767&l)<<15|32767&s)}return n}__inplaceRightShift(t){if(0===t)return;let i=this.__digit(0)>>>t;const e=this.length-1;for(let n=0;n<e;n++){const e=this.__digit(n+1);this.__setDigit(n,1073741823&e<<30-t|i),i=e>>>t}this.__setDigit(e,i)}static __specialLeftShift(t,i,e){const n=t.length,r=new _(n+e,!1);if(0===i){for(let i=0;i<n;i++)r.__setDigit(i,t.__digit(i));return 0<e&&r.__setDigit(n,0),r}let o=0;for(let e=0;e<n;e++){const n=t.__digit(e);r.__setDigit(e,1073741823&n<<i|o),o=n>>>30-i}return 0<e&&r.__setDigit(n,o),r}static __leftShiftByAbsolute(t,i){const e=_.__toShiftAmount(i);if(0>e)throw new RangeError("BigInt too big");const n=0|e/30,r=e%30,o=t.length,s=0!==r&&0!=t.__digit(o-1)>>>30-r,l=o+n+(s?1:0),u=new _(l,t.sign);if(0===r){let i=0;for(;i<n;i++)u.__setDigit(i,0);for(;i<l;i++)u.__setDigit(i,t.__digit(i-n))}else{let i=0;for(let t=0;t<n;t++)u.__setDigit(t,0);for(let e=0;e<o;e++){const _=t.__digit(e);u.__setDigit(e+n,1073741823&_<<r|i),i=_>>>30-r}if(s)u.__setDigit(o+n,i);else if(0!==i)throw new Error("implementation bug")}return u.__trim()}static __rightShiftByAbsolute(t,i){const e=t.length,n=t.sign,r=_.__toShiftAmount(i);if(0>r)return _.__rightShiftByMaximum(n);const o=0|r/30,s=r%30;let l=e-o;if(0>=l)return _.__rightShiftByMaximum(n);let u=!1;if(n)if(0!=(t.__digit(o)&(1<<s)-1))u=!0;else for(let i=0;i<o;i++)if(0!==t.__digit(i)){u=!0;break}u&&0===s&&0==~t.__digit(e-1)&&l++;let g=new _(l,n);if(0===s){g.__setDigit(l-1,0);for(let i=o;i<e;i++)g.__setDigit(i-o,t.__digit(i))}else{let i=t.__digit(o)>>>s;const n=e-o-1;for(let e=0;e<n;e++){const n=t.__digit(e+o+1);g.__setDigit(e,1073741823&n<<30-s|i),i=n>>>s}g.__setDigit(n,i)}return u&&(g=_.__absoluteAddOne(g,!0,g)),g.__trim()}static __rightShiftByMaximum(t){return t?_.__oneDigit(1,!0):_.__zero()}static __toShiftAmount(t){if(1<t.length)return-1;const i=t.__unsignedDigit(0);return i>_.__kMaxLengthBits?-1:i}static __toPrimitive(t,i="default"){if("object"!=typeof t)return t;if(t.constructor===_)return t;if("undefined"!=typeof Symbol&&"symbol"==typeof Symbol.toPrimitive){const e=t[Symbol.toPrimitive];if(e){const t=e(i);if("object"!=typeof t)return t;throw new TypeError("Cannot convert object to primitive value")}}const e=t.valueOf;if(e){const i=e.call(t);if("object"!=typeof i)return i}const n=t.toString;if(n){const i=n.call(t);if("object"!=typeof i)return i}throw new TypeError("Cannot convert object to primitive value")}static __toNumeric(t){return _.__isBigInt(t)?t:+t}static __isBigInt(t){return"object"==typeof t&&null!==t&&t.constructor===_}static __truncateToNBits(t,i){const e=0|(t+29)/30,n=new _(e,i.sign),r=e-1;for(let t=0;t<r;t++)n.__setDigit(t,i.__digit(t));let o=i.__digit(r);if(0!=t%30){const i=32-t%30;o=o<<i>>>i}return n.__setDigit(r,o),n.__trim()}static __truncateAndSubFromPowerOfTwo(t,i,e){var n=Math.min;const r=0|(t+29)/30,o=new _(r,e);let s=0;const l=r-1;let u=0;for(const t=n(l,i.length);s<t;s++){const t=0-i.__digit(s)-u;u=1&t>>>30,o.__setDigit(s,1073741823&t)}for(;s<l;s++)o.__setDigit(s,0|1073741823&-u);let g=l<i.length?i.__digit(l):0;const a=t%30;let f;if(0==a)f=0-g-u,f&=1073741823;else{const t=32-a;g=g<<t>>>t;const i=1<<32-t;f=i-g-u,f&=i-1}return o.__setDigit(l,f),o.__trim()}__digit(t){return this[t]}__unsignedDigit(t){return this[t]>>>0}__setDigit(t,i){this[t]=0|i}__setDigitGrow(t,i){this[t]=0|i}__halfDigitLength(){const t=this.length;return 32767>=this.__unsignedDigit(t-1)?2*t-1:2*t}__halfDigit(t){return 32767&this[t>>>1]>>>15*(1&t)}__setHalfDigit(t,i){const e=t>>>1,n=this.__digit(e),r=1&t?32767&n|i<<15:1073709056&n|32767&i;this.__setDigit(e,r)}static __digitPow(t,i){let e=1;for(;0<i;)1&i&&(e*=t),i>>>=1,t*=t;return e}static __isOneDigitInt(t){return(1073741823&t)===t}}return _.__kMaxLength=33554432,_.__kMaxLengthBits=_.__kMaxLength<<5,_.__kMaxBitsPerChar=[0,0,32,51,64,75,83,90,96,102,107,111,115,119,122,126,128,131,134,136,139,141,143,145,147,149,151,153,154,156,158,159,160,162,163,165,166],_.__kBitsPerCharTableShift=5,_.__kBitsPerCharTableMultiplier=1<<_.__kBitsPerCharTableShift,_.__kConversionChars=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],_.__kBitConversionBuffer=new ArrayBuffer(8),_.__kBitConversionDouble=new Float64Array(_.__kBitConversionBuffer),_.__kBitConversionInts=new Int32Array(_.__kBitConversionBuffer),_.__clz30=i?function(t){return i(t)-2}:function(t){var i=Math.LN2,e=Math.log;return 0===t?30:0|29-(0|e(t>>>0)/i)},_.__imul=t||function(t,i){return 0|t*i},_}()}}]);
//# sourceMappingURL=9499.b8ed3fcb.js.map