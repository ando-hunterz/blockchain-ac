"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) =>
  __defProp(target, "__esModule", { value: true });
var __require = /* @__PURE__ */ ((x) =>
  typeof require !== "undefined"
    ? require
    : typeof Proxy !== "undefined"
    ? new Proxy(x, {
        get: (a, b) => (typeof require !== "undefined" ? require : a)[b],
      })
    : x)(function (x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) =>
  function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])((fn = 0))), res;
  };
var __commonJS = (cb, mod2) =>
  function __require2() {
    return (
      mod2 ||
        (0, cb[__getOwnPropNames(cb)[0]])(
          (mod2 = { exports: {} }).exports,
          mod2
        ),
      mod2.exports
    );
  };
var __export = (target, all3) => {
  for (var name8 in all3)
    __defProp(target, name8, { get: all3[name8], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (
    (module2 && typeof module2 === "object") ||
    typeof module2 === "function"
  ) {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, {
          get: () => module2[key],
          enumerable:
            !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        "default",
        !isNodeMode && module2 && module2.__esModule
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true }
      )
    ),
    module2
  );
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return (
      (cache && cache.get(module2)) ||
      ((temp = __reExport(__markAsModule({}), module2, 1)),
      cache && cache.set(module2, temp),
      temp)
    );
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "node_modules/base64-js/index.js"(exports2) {
    "use strict";
    init_node_globals();
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code8 =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code8.length; i < len; ++i) {
      lookup[i] = code8[i];
      revLookup[code8.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - (validLen % 4);
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp =
          (revLookup[b64.charCodeAt(i2)] << 18) |
          (revLookup[b64.charCodeAt(i2 + 1)] << 12) |
          (revLookup[b64.charCodeAt(i2 + 2)] << 6) |
          revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = (tmp >> 16) & 255;
        arr[curByte++] = (tmp >> 8) & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp =
          (revLookup[b64.charCodeAt(i2)] << 2) |
          (revLookup[b64.charCodeAt(i2 + 1)] >> 4);
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp =
          (revLookup[b64.charCodeAt(i2)] << 10) |
          (revLookup[b64.charCodeAt(i2 + 1)] << 4) |
          (revLookup[b64.charCodeAt(i2 + 2)] >> 2);
        arr[curByte++] = (tmp >> 8) & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return (
        lookup[(num >> 18) & 63] +
        lookup[(num >> 12) & 63] +
        lookup[(num >> 6) & 63] +
        lookup[num & 63]
      );
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp =
          ((uint8[i2] << 16) & 16711680) +
          ((uint8[i2 + 1] << 8) & 65280) +
          (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (
        var i2 = 0, len22 = len2 - extraBytes;
        i2 < len22;
        i2 += maxChunkLength
      ) {
        parts.push(
          encodeChunk(
            uint8,
            i2,
            i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength
          )
        );
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(
          lookup[tmp >> 10] +
            lookup[(tmp >> 4) & 63] +
            lookup[(tmp << 2) & 63] +
            "="
        );
      }
      return parts.join("");
    }
  },
});

// node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "node_modules/ieee754/index.js"(exports2) {
    init_node_globals();
    exports2.read = function (buffer2, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer2[offset + i];
      i += d;
      e = s & ((1 << -nBits) - 1);
      s >>= -nBits;
      nBits += eLen;
      for (
        ;
        nBits > 0;
        e = e * 256 + buffer2[offset + i], i += d, nBits -= 8
      ) {}
      m = e & ((1 << -nBits) - 1);
      e >>= -nBits;
      nBits += mLen;
      for (
        ;
        nBits > 0;
        m = m * 256 + buffer2[offset + i], i += d, nBits -= 8
      ) {}
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports2.write = function (buffer2, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (
        ;
        mLen >= 8;
        buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8
      ) {}
      e = (e << mLen) | m;
      eLen += mLen;
      for (
        ;
        eLen > 0;
        buffer2[offset + i] = e & 255, i += d, e /= 256, eLen -= 8
      ) {}
      buffer2[offset + i - d] |= s * 128;
    };
  },
});

// node_modules/buffer/index.js
var require_buffer = __commonJS({
  "node_modules/buffer/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var base642 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol =
      typeof Symbol === "function" && typeof Symbol["for"] === "function"
        ? Symbol["for"]("nodejs.util.inspect.custom")
        : null;
    exports2.Buffer = Buffer2;
    exports2.SlowBuffer = SlowBuffer;
    exports2.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports2.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (
      !Buffer2.TYPED_ARRAY_SUPPORT &&
      typeof console !== "undefined" &&
      typeof console.error === "function"
    ) {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = {
          foo: function () {
            return 42;
          },
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function () {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      },
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function () {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      },
    });
    function createBuffer(length2) {
      if (length2 > K_MAX_LENGTH) {
        throw new RangeError(
          'The value "' + length2 + '" is invalid for option "size"'
        );
      }
      const buf2 = new Uint8Array(length2);
      Object.setPrototypeOf(buf2, Buffer2.prototype);
      return buf2;
    }
    function Buffer2(arg, encodingOrOffset, length2) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from3(arg, encodingOrOffset, length2);
    }
    Buffer2.poolSize = 8192;
    function from3(value, encodingOrOffset, length2) {
      if (typeof value === "string") {
        return fromString4(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof value
        );
      }
      if (
        isInstance(value, ArrayBuffer) ||
        (value && isInstance(value.buffer, ArrayBuffer))
      ) {
        return fromArrayBuffer(value, encodingOrOffset, length2);
      }
      if (
        typeof SharedArrayBuffer !== "undefined" &&
        (isInstance(value, SharedArrayBuffer) ||
          (value && isInstance(value.buffer, SharedArrayBuffer)))
      ) {
        return fromArrayBuffer(value, encodingOrOffset, length2);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length2);
      }
      const b = fromObject(value);
      if (b) return b;
      if (
        typeof Symbol !== "undefined" &&
        Symbol.toPrimitive != null &&
        typeof value[Symbol.toPrimitive] === "function"
      ) {
        return Buffer2.from(
          value[Symbol.toPrimitive]("string"),
          encodingOrOffset,
          length2
        );
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof value
      );
    }
    Buffer2.from = function (value, encodingOrOffset, length2) {
      return from3(value, encodingOrOffset, length2);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError(
          'The value "' + size + '" is invalid for option "size"'
        );
      }
    }
    function alloc2(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string"
          ? createBuffer(size).fill(fill, encoding)
          : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function (size, fill, encoding) {
      return alloc2(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function (size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function (size) {
      return allocUnsafe(size);
    };
    function fromString4(string2, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length2 = byteLength(string2, encoding) | 0;
      let buf2 = createBuffer(length2);
      const actual = buf2.write(string2, encoding);
      if (actual !== length2) {
        buf2 = buf2.slice(0, actual);
      }
      return buf2;
    }
    function fromArrayLike(array) {
      const length2 = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf2 = createBuffer(length2);
      for (let i = 0; i < length2; i += 1) {
        buf2[i] = array[i] & 255;
      }
      return buf2;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length2) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length2 || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf2;
      if (byteOffset === void 0 && length2 === void 0) {
        buf2 = new Uint8Array(array);
      } else if (length2 === void 0) {
        buf2 = new Uint8Array(array, byteOffset);
      } else {
        buf2 = new Uint8Array(array, byteOffset, length2);
      }
      Object.setPrototypeOf(buf2, Buffer2.prototype);
      return buf2;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf2 = createBuffer(len);
        if (buf2.length === 0) {
          return buf2;
        }
        obj.copy(buf2, 0, 0, len);
        return buf2;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length2) {
      if (length2 >= K_MAX_LENGTH) {
        throw new RangeError(
          "Attempt to allocate Buffer larger than maximum size: 0x" +
            K_MAX_LENGTH.toString(16) +
            " bytes"
        );
      }
      return length2 | 0;
    }
    function SlowBuffer(length2) {
      if (+length2 != length2) {
        length2 = 0;
      }
      return Buffer2.alloc(+length2);
    }
    Buffer2.isBuffer = function isBuffer3(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare2(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat3(list, length2) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length2 === void 0) {
        length2 = 0;
        for (i = 0; i < list.length; ++i) {
          length2 += list[i].length;
        }
      }
      const buffer2 = Buffer2.allocUnsafe(length2);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf2 = list[i];
        if (isInstance(buf2, Uint8Array)) {
          if (pos + buf2.length > buffer2.length) {
            if (!Buffer2.isBuffer(buf2)) buf2 = Buffer2.from(buf2);
            buf2.copy(buffer2, pos);
          } else {
            Uint8Array.prototype.set.call(buffer2, buf2, pos);
          }
        } else if (!Buffer2.isBuffer(buf2)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf2.copy(buffer2, pos);
        }
        pos += buf2.length;
      }
      return buffer2;
    };
    function byteLength(string2, encoding) {
      if (Buffer2.isBuffer(string2)) {
        return string2.length;
      }
      if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof string2
        );
      }
      const len = string2.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (;;) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes2(string2).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string2).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes2(string2).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice2(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString4() {
      const length2 = this.length;
      if (length2 === 0) return "";
      if (arguments.length === 0) return utf8Slice2(this, 0, length2);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals4(b) {
      if (!Buffer2.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports2.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max)
        .replace(/(.{2})/g, "$1 ")
        .trim();
      if (this.length > max) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare2(
      target,
      start,
      end,
      thisStart,
      thisEnd
    ) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (
        start < 0 ||
        end > target.length ||
        thisStart < 0 ||
        thisEnd > this.length
      ) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir) return -1;
        else byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(
              buffer2,
              val,
              byteOffset
            );
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (
          encoding === "ucs2" ||
          encoding === "ucs-2" ||
          encoding === "utf16le" ||
          encoding === "utf-16le"
        ) {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read2(buf2, i2) {
        if (indexSize === 1) {
          return buf2[i2];
        } else {
          return buf2.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (
            read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)
          ) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read2(arr, i + j) !== read2(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(
      val,
      byteOffset,
      encoding
    ) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf2, string2, offset, length2) {
      offset = Number(offset) || 0;
      const remaining = buf2.length - offset;
      if (!length2) {
        length2 = remaining;
      } else {
        length2 = Number(length2);
        if (length2 > remaining) {
          length2 = remaining;
        }
      }
      const strLen = string2.length;
      if (length2 > strLen / 2) {
        length2 = strLen / 2;
      }
      let i;
      for (i = 0; i < length2; ++i) {
        const parsed = parseInt(string2.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf2[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf2, string2, offset, length2) {
      return blitBuffer(
        utf8ToBytes2(string2, buf2.length - offset),
        buf2,
        offset,
        length2
      );
    }
    function asciiWrite(buf2, string2, offset, length2) {
      return blitBuffer(asciiToBytes(string2), buf2, offset, length2);
    }
    function base64Write(buf2, string2, offset, length2) {
      return blitBuffer(base64ToBytes(string2), buf2, offset, length2);
    }
    function ucs2Write(buf2, string2, offset, length2) {
      return blitBuffer(
        utf16leToBytes(string2, buf2.length - offset),
        buf2,
        offset,
        length2
      );
    }
    Buffer2.prototype.write = function write(
      string2,
      offset,
      length2,
      encoding
    ) {
      if (offset === void 0) {
        encoding = "utf8";
        length2 = this.length;
        offset = 0;
      } else if (length2 === void 0 && typeof offset === "string") {
        encoding = offset;
        length2 = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length2)) {
          length2 = length2 >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length2;
          length2 = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length2 === void 0 || length2 > remaining) length2 = remaining;
      if (
        (string2.length > 0 && (length2 < 0 || offset < 0)) ||
        offset > this.length
      ) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (;;) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string2, offset, length2);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string2, offset, length2);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string2, offset, length2);
          case "base64":
            return base64Write(this, string2, offset, length2);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string2, offset, length2);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    };
    function base64Slice(buf2, start, end) {
      if (start === 0 && end === buf2.length) {
        return base642.fromByteArray(buf2);
      } else {
        return base642.fromByteArray(buf2.slice(start, end));
      }
    }
    function utf8Slice2(buf2, start, end) {
      end = Math.min(buf2.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf2[i];
        let codePoint = null;
        let bytesPerSequence =
          firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf2[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf2[i + 1];
              thirdByte = buf2[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint =
                  ((firstByte & 15) << 12) |
                  ((secondByte & 63) << 6) |
                  (thirdByte & 63);
                if (
                  tempCodePoint > 2047 &&
                  (tempCodePoint < 55296 || tempCodePoint > 57343)
                ) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf2[i + 1];
              thirdByte = buf2[i + 2];
              fourthByte = buf2[i + 3];
              if (
                (secondByte & 192) === 128 &&
                (thirdByte & 192) === 128 &&
                (fourthByte & 192) === 128
              ) {
                tempCodePoint =
                  ((firstByte & 15) << 18) |
                  ((secondByte & 63) << 12) |
                  ((thirdByte & 63) << 6) |
                  (fourthByte & 63);
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(((codePoint >>> 10) & 1023) | 55296);
          codePoint = 56320 | (codePoint & 1023);
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray2(res);
    }
    var MAX_ARGUMENTS_LENGTH2 = 4096;
    function decodeCodePointsArray2(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH2) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH2))
        );
      }
      return res;
    }
    function asciiSlice(buf2, start, end) {
      let ret = "";
      end = Math.min(buf2.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf2[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf2, start, end) {
      let ret = "";
      end = Math.min(buf2.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf2[i]);
      }
      return ret;
    }
    function hexSlice(buf2, start, end) {
      const len = buf2.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf2[i]];
      }
      return out;
    }
    function utf16leSlice(buf2, start, end) {
      const bytes = buf2.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice2(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length2) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length2)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE =
      function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE =
      function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 =
      function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE =
      function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | (this[offset + 1] << 8);
      };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE =
      function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return (this[offset] << 8) | this[offset + 1];
      };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE =
      function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (
          (this[offset] | (this[offset + 1] << 8) | (this[offset + 2] << 16)) +
          this[offset + 3] * 16777216
        );
      };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE =
      function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (
          this[offset] * 16777216 +
          ((this[offset + 1] << 16) |
            (this[offset + 2] << 8) |
            this[offset + 3])
        );
      };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(
      function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo =
          first +
          this[++offset] * 2 ** 8 +
          this[++offset] * 2 ** 16 +
          this[++offset] * 2 ** 24;
        const hi =
          this[++offset] +
          this[++offset] * 2 ** 8 +
          this[++offset] * 2 ** 16 +
          last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      }
    );
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(
      function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi =
          first * 2 ** 24 +
          this[++offset] * 2 ** 16 +
          this[++offset] * 2 ** 8 +
          this[++offset];
        const lo =
          this[++offset] * 2 ** 24 +
          this[++offset] * 2 ** 16 +
          this[++offset] * 2 ** 8 +
          last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      }
    );
    Buffer2.prototype.readIntLE = function readIntLE(
      offset,
      byteLength2,
      noAssert
    ) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(
      offset,
      byteLength2,
      noAssert
    ) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | (this[offset + 1] << 8);
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | (this[offset] << 8);
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (
        this[offset] |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16) |
        (this[offset + 3] << 24)
      );
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (
        (this[offset] << 24) |
        (this[offset + 1] << 16) |
        (this[offset + 2] << 8) |
        this[offset + 3]
      );
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(
      function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val =
          this[offset + 4] +
          this[offset + 5] * 2 ** 8 +
          this[offset + 6] * 2 ** 16 +
          (last << 24);
        return (
          (BigInt(val) << BigInt(32)) +
          BigInt(
            first +
              this[++offset] * 2 ** 8 +
              this[++offset] * 2 ** 16 +
              this[++offset] * 2 ** 24
          )
        );
      }
    );
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(
      function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val =
          (first << 24) +
          this[++offset] * 2 ** 16 +
          this[++offset] * 2 ** 8 +
          this[++offset];
        return (
          (BigInt(val) << BigInt(32)) +
          BigInt(
            this[++offset] * 2 ** 24 +
              this[++offset] * 2 ** 16 +
              this[++offset] * 2 ** 8 +
              last
          )
        );
      }
    );
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf2, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf2))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf2.length)
        throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE =
      function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = (value / mul) & 255;
        }
        return offset + byteLength2;
      };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE =
      function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = (value / mul) & 255;
        }
        return offset + byteLength2;
      };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 =
      function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE =
      function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE =
      function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE =
      function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE =
      function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
    function wrtBigUInt64LE(buf2, value, offset, min, max) {
      checkIntBI(value, min, max, buf2, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf2[offset++] = lo;
      lo = lo >> 8;
      buf2[offset++] = lo;
      lo = lo >> 8;
      buf2[offset++] = lo;
      lo = lo >> 8;
      buf2[offset++] = lo;
      let hi = Number((value >> BigInt(32)) & BigInt(4294967295));
      buf2[offset++] = hi;
      hi = hi >> 8;
      buf2[offset++] = hi;
      hi = hi >> 8;
      buf2[offset++] = hi;
      hi = hi >> 8;
      buf2[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf2, value, offset, min, max) {
      checkIntBI(value, min, max, buf2, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf2[offset + 7] = lo;
      lo = lo >> 8;
      buf2[offset + 6] = lo;
      lo = lo >> 8;
      buf2[offset + 5] = lo;
      lo = lo >> 8;
      buf2[offset + 4] = lo;
      let hi = Number((value >> BigInt(32)) & BigInt(4294967295));
      buf2[offset + 3] = hi;
      hi = hi >> 8;
      buf2[offset + 2] = hi;
      hi = hi >> 8;
      buf2[offset + 1] = hi;
      hi = hi >> 8;
      buf2[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(
      function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(
          this,
          value,
          offset,
          BigInt(0),
          BigInt("0xffffffffffffffff")
        );
      }
    );
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(
      function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(
          this,
          value,
          offset,
          BigInt(0),
          BigInt("0xffffffffffffffff")
        );
      }
    );
    Buffer2.prototype.writeIntLE = function writeIntLE(
      value,
      offset,
      byteLength2,
      noAssert
    ) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (((value / mul) >> 0) - sub) & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(
      value,
      offset,
      byteLength2,
      noAssert
    ) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (((value / mul) >> 0) - sub) & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(
      value,
      offset,
      noAssert
    ) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(
      value,
      offset,
      noAssert
    ) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(
      value,
      offset,
      noAssert
    ) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(
      value,
      offset,
      noAssert
    ) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(
      function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(
          this,
          value,
          offset,
          -BigInt("0x8000000000000000"),
          BigInt("0x7fffffffffffffff")
        );
      }
    );
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(
      function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(
          this,
          value,
          offset,
          -BigInt("0x8000000000000000"),
          BigInt("0x7fffffffffffffff")
        );
      }
    );
    function checkIEEE754(buf2, value, offset, ext, max, min) {
      if (offset + ext > buf2.length)
        throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf2, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(
          buf2,
          value,
          offset,
          4,
          34028234663852886e22,
          -34028234663852886e22
        );
      }
      ieee754.write(buf2, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(
      value,
      offset,
      noAssert
    ) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(
      value,
      offset,
      noAssert
    ) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf2, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(
          buf2,
          value,
          offset,
          8,
          17976931348623157e292,
          -17976931348623157e292
        );
      }
      ieee754.write(buf2, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(
      value,
      offset,
      noAssert
    ) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(
      value,
      offset,
      noAssert
    ) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (
        this === target &&
        typeof Uint8Array.prototype.copyWithin === "function"
      ) {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code8 = val.charCodeAt(0);
          if ((encoding === "utf8" && code8 < 128) || encoding === "latin1") {
            val = code8;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError(
            'The value "' + val + '" is invalid for argument "value"'
          );
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true,
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true,
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function (name8) {
        if (name8) {
          return `${name8} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function (name8, actual) {
        return `The "${name8}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function (str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (
            input > BigInt(2) ** BigInt(32) ||
            input < -(BigInt(2) ** BigInt(32))
          ) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf2, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf2[offset] === void 0 || buf2[offset + byteLength2] === void 0) {
        boundsError(offset, buf2.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf2, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${
              (byteLength2 + 1) * 8 - 1
            }${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf2, offset, byteLength2);
    }
    function validateNumber(value, name8) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name8, "number", value);
      }
    }
    function boundsError(value, length2, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          "an integer",
          value
        );
      }
      if (length2 < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(
        type || "offset",
        `>= ${type ? 1 : 0} and <= ${length2}`,
        value
      );
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes2(string2, units) {
      units = units || Infinity;
      let codePoint;
      const length2 = string2.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length2; ++i) {
        codePoint = string2.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length2) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint =
            (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            (codePoint >> 12) | 224,
            ((codePoint >> 6) & 63) | 128,
            (codePoint & 63) | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            (codePoint >> 18) | 240,
            ((codePoint >> 12) & 63) | 128,
            ((codePoint >> 6) & 63) | 128,
            (codePoint & 63) | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base642.toByteArray(base64clean(str));
    }
    function blitBuffer(src2, dst, offset, length2) {
      let i;
      for (i = 0; i < length2; ++i) {
        if (i + offset >= dst.length || i >= src2.length) break;
        dst[i + offset] = src2[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return (
        obj instanceof type ||
        (obj != null &&
          obj.constructor != null &&
          obj.constructor.name != null &&
          obj.constructor.name === type.name)
      );
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = (function () {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    })();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  },
});

// node_modules/process/browser.js
var require_browser = __commonJS({
  "node_modules/process/browser.js"(exports2, module2) {
    init_node_globals();
    var process2 = (module2.exports = {});
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function () {
      try {
        if (typeof setTimeout === "function") {
          cachedSetTimeout = setTimeout;
        } else {
          cachedSetTimeout = defaultSetTimout;
        }
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        if (typeof clearTimeout === "function") {
          cachedClearTimeout = clearTimeout;
        } else {
          cachedClearTimeout = defaultClearTimeout;
        }
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
        return setTimeout(fun, 0);
      }
      if (
        (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
        setTimeout
      ) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e2) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
        return clearTimeout(marker);
      }
      if (
        (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
        clearTimeout
      ) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e2) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) {
        return;
      }
      draining = false;
      if (currentQueue.length) {
        queue = currentQueue.concat(queue);
      } else {
        queueIndex = -1;
      }
      if (queue.length) {
        drainQueue();
      }
    }
    function drainQueue() {
      if (draining) {
        return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
          if (currentQueue) {
            currentQueue[queueIndex].run();
          }
        }
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process2.nextTick = function (fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
      }
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    process2.title = "browser";
    process2.browser = true;
    process2.env = {};
    process2.argv = [];
    process2.version = "";
    process2.versions = {};
    function noop() {}
    process2.on = noop;
    process2.addListener = noop;
    process2.once = noop;
    process2.off = noop;
    process2.removeListener = noop;
    process2.removeAllListeners = noop;
    process2.emit = noop;
    process2.prependListener = noop;
    process2.prependOnceListener = noop;
    process2.listeners = function (name8) {
      return [];
    };
    process2.binding = function (name8) {
      throw new Error("process.binding is not supported");
    };
    process2.cwd = function () {
      return "/";
    };
    process2.chdir = function (dir) {
      throw new Error("process.chdir is not supported");
    };
    process2.umask = function () {
      return 0;
    };
  },
});

// src/modules/ipfs/node-globals.js
var Buffer, process, global;
var init_node_globals = __esm({
  "src/modules/ipfs/node-globals.js"() {
    Buffer = require_buffer().Buffer;
    process = require_browser();
    global =
      typeof global !== "undefined"
        ? global
        : typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
        ? self
        : typeof window !== "undefined"
        ? window
        : {};
    if (globalThis && globalThis.process && globalThis.process.env)
      globalThis.process.env.LIBP2P_FORCE_PNET = false;
  },
});

// node_modules/ipfs-core-utils/esm/src/multibases.js
var multibases_exports = {};
__export(multibases_exports, {
  Multibases: () => Multibases,
});
var LOAD_BASE, Multibases;
var init_multibases = __esm({
  "node_modules/ipfs-core-utils/esm/src/multibases.js"() {
    init_node_globals();
    LOAD_BASE = (name8) =>
      Promise.reject(new Error(`No base found for "${name8}"`));
    Multibases = class {
      constructor(options) {
        this._basesByName = {};
        this._basesByPrefix = {};
        this._loadBase = options.loadBase || LOAD_BASE;
        for (const base3 of options.bases) {
          this.addBase(base3);
        }
      }
      addBase(base3) {
        if (
          this._basesByName[base3.name] ||
          this._basesByPrefix[base3.prefix]
        ) {
          throw new Error(`Codec already exists for codec "${base3.name}"`);
        }
        this._basesByName[base3.name] = base3;
        this._basesByPrefix[base3.prefix] = base3;
      }
      removeBase(base3) {
        delete this._basesByName[base3.name];
        delete this._basesByPrefix[base3.prefix];
      }
      async getBase(nameOrPrefix) {
        if (this._basesByName[nameOrPrefix]) {
          return this._basesByName[nameOrPrefix];
        }
        if (this._basesByPrefix[nameOrPrefix]) {
          return this._basesByPrefix[nameOrPrefix];
        }
        const base3 = await this._loadBase(nameOrPrefix);
        if (
          this._basesByName[base3.name] == null &&
          this._basesByPrefix[base3.prefix] == null
        ) {
          this.addBase(base3);
        }
        return base3;
      }
      listBases() {
        return Object.values(this._basesByName);
      }
    };
  },
});

// node_modules/ipfs-core-utils/esm/src/multicodecs.js
var multicodecs_exports = {};
__export(multicodecs_exports, {
  Multicodecs: () => Multicodecs,
});
var LOAD_CODEC, Multicodecs;
var init_multicodecs = __esm({
  "node_modules/ipfs-core-utils/esm/src/multicodecs.js"() {
    init_node_globals();
    LOAD_CODEC = (codeOrName) =>
      Promise.reject(new Error(`No codec found for "${codeOrName}"`));
    Multicodecs = class {
      constructor(options) {
        this._codecsByName = {};
        this._codecsByCode = {};
        this._loadCodec = options.loadCodec || LOAD_CODEC;
        for (const codec of options.codecs) {
          this.addCodec(codec);
        }
      }
      addCodec(codec) {
        if (this._codecsByName[codec.name] || this._codecsByCode[codec.code]) {
          throw new Error(`Resolver already exists for codec "${codec.name}"`);
        }
        this._codecsByName[codec.name] = codec;
        this._codecsByCode[codec.code] = codec;
      }
      removeCodec(codec) {
        delete this._codecsByName[codec.name];
        delete this._codecsByCode[codec.code];
      }
      async getCodec(code8) {
        const table =
          typeof code8 === "string" ? this._codecsByName : this._codecsByCode;
        if (table[code8]) {
          return table[code8];
        }
        const codec = await this._loadCodec(code8);
        if (table[code8] == null) {
          this.addCodec(codec);
        }
        return codec;
      }
      listCodecs() {
        return Object.values(this._codecsByName);
      }
    };
  },
});

// node_modules/ipfs-core-utils/esm/src/multihashes.js
var multihashes_exports = {};
__export(multihashes_exports, {
  Multihashes: () => Multihashes,
});
var LOAD_HASHER, Multihashes;
var init_multihashes = __esm({
  "node_modules/ipfs-core-utils/esm/src/multihashes.js"() {
    init_node_globals();
    LOAD_HASHER = (codeOrName) =>
      Promise.reject(new Error(`No hasher found for "${codeOrName}"`));
    Multihashes = class {
      constructor(options) {
        this._hashersByName = {};
        this._hashersByCode = {};
        this._loadHasher = options.loadHasher || LOAD_HASHER;
        for (const hasher of options.hashers) {
          this.addHasher(hasher);
        }
      }
      addHasher(hasher) {
        if (
          this._hashersByName[hasher.name] ||
          this._hashersByCode[hasher.code]
        ) {
          throw new Error(`Resolver already exists for codec "${hasher.name}"`);
        }
        this._hashersByName[hasher.name] = hasher;
        this._hashersByCode[hasher.code] = hasher;
      }
      removeHasher(hasher) {
        delete this._hashersByName[hasher.name];
        delete this._hashersByCode[hasher.code];
      }
      async getHasher(code8) {
        const table =
          typeof code8 === "string" ? this._hashersByName : this._hashersByCode;
        if (table[code8]) {
          return table[code8];
        }
        const hasher = await this._loadHasher(code8);
        if (table[code8] == null) {
          this.addHasher(hasher);
        }
        return hasher;
      }
      listHashers() {
        return Object.values(this._hashersByName);
      }
    };
  },
});

// node_modules/multiformats/esm/vendor/varint.js
function encode(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = (num & 255) | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = (num & 255) | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode.bytes = offset - oldOffset + 1;
  return out;
}
function read(buf2, offset) {
  var res = 0,
    offset = offset || 0,
    shift = 0,
    counter = offset,
    b,
    l = buf2.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf2[counter++];
    res +=
      shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var encode_1,
  MSB,
  REST,
  MSBALL,
  INT,
  decode,
  MSB$1,
  REST$1,
  N1,
  N2,
  N3,
  N4,
  N5,
  N6,
  N7,
  N8,
  N9,
  length,
  varint,
  _brrp_varint,
  varint_default;
var init_varint = __esm({
  "node_modules/multiformats/esm/vendor/varint.js"() {
    init_node_globals();
    encode_1 = encode;
    MSB = 128;
    REST = 127;
    MSBALL = ~REST;
    INT = Math.pow(2, 31);
    decode = read;
    MSB$1 = 128;
    REST$1 = 127;
    N1 = Math.pow(2, 7);
    N2 = Math.pow(2, 14);
    N3 = Math.pow(2, 21);
    N4 = Math.pow(2, 28);
    N5 = Math.pow(2, 35);
    N6 = Math.pow(2, 42);
    N7 = Math.pow(2, 49);
    N8 = Math.pow(2, 56);
    N9 = Math.pow(2, 63);
    length = function (value) {
      return value < N1
        ? 1
        : value < N2
        ? 2
        : value < N3
        ? 3
        : value < N4
        ? 4
        : value < N5
        ? 5
        : value < N6
        ? 6
        : value < N7
        ? 7
        : value < N8
        ? 8
        : value < N9
        ? 9
        : 10;
    };
    varint = {
      encode: encode_1,
      decode,
      encodingLength: length,
    };
    _brrp_varint = varint;
    varint_default = _brrp_varint;
  },
});

// node_modules/multiformats/esm/src/varint.js
var varint_exports = {};
__export(varint_exports, {
  decode: () => decode2,
  encodeTo: () => encodeTo,
  encodingLength: () => encodingLength,
});
var decode2, encodeTo, encodingLength;
var init_varint2 = __esm({
  "node_modules/multiformats/esm/src/varint.js"() {
    init_node_globals();
    init_varint();
    decode2 = (data) => {
      const code8 = varint_default.decode(data);
      return [code8, varint_default.decode.bytes];
    };
    encodeTo = (int, target, offset = 0) => {
      varint_default.encode(int, target, offset);
      return target;
    };
    encodingLength = (int) => {
      return varint_default.encodingLength(int);
    };
  },
});

// node_modules/multiformats/esm/src/bytes.js
var bytes_exports = {};
__export(bytes_exports, {
  coerce: () => coerce,
  empty: () => empty,
  equals: () => equals,
  fromHex: () => fromHex,
  fromString: () => fromString,
  isBinary: () => isBinary,
  toHex: () => toHex,
  toString: () => toString,
});
var empty, toHex, fromHex, equals, coerce, isBinary, fromString, toString;
var init_bytes = __esm({
  "node_modules/multiformats/esm/src/bytes.js"() {
    init_node_globals();
    empty = new Uint8Array(0);
    toHex = (d) =>
      d.reduce((hex, byte) => hex + byte.toString(16).padStart(2, "0"), "");
    fromHex = (hex) => {
      const hexes = hex.match(/../g);
      return hexes ? new Uint8Array(hexes.map((b) => parseInt(b, 16))) : empty;
    };
    equals = (aa, bb) => {
      if (aa === bb) return true;
      if (aa.byteLength !== bb.byteLength) {
        return false;
      }
      for (let ii = 0; ii < aa.byteLength; ii++) {
        if (aa[ii] !== bb[ii]) {
          return false;
        }
      }
      return true;
    };
    coerce = (o) => {
      if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
        return o;
      if (o instanceof ArrayBuffer) return new Uint8Array(o);
      if (ArrayBuffer.isView(o)) {
        return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
      }
      throw new Error("Unknown type, must be binary type");
    };
    isBinary = (o) => o instanceof ArrayBuffer || ArrayBuffer.isView(o);
    fromString = (str) => new TextEncoder().encode(str);
    toString = (b) => new TextDecoder().decode(b);
  },
});

// node_modules/multiformats/esm/src/hashes/digest.js
var digest_exports = {};
__export(digest_exports, {
  Digest: () => Digest,
  create: () => create,
  decode: () => decode3,
  equals: () => equals2,
});
var create, decode3, equals2, Digest;
var init_digest = __esm({
  "node_modules/multiformats/esm/src/hashes/digest.js"() {
    init_node_globals();
    init_bytes();
    init_varint2();
    create = (code8, digest2) => {
      const size = digest2.byteLength;
      const sizeOffset = encodingLength(code8);
      const digestOffset = sizeOffset + encodingLength(size);
      const bytes = new Uint8Array(digestOffset + size);
      encodeTo(code8, bytes, 0);
      encodeTo(size, bytes, sizeOffset);
      bytes.set(digest2, digestOffset);
      return new Digest(code8, size, digest2, bytes);
    };
    decode3 = (multihash) => {
      const bytes = coerce(multihash);
      const [code8, sizeOffset] = decode2(bytes);
      const [size, digestOffset] = decode2(bytes.subarray(sizeOffset));
      const digest2 = bytes.subarray(sizeOffset + digestOffset);
      if (digest2.byteLength !== size) {
        throw new Error("Incorrect length");
      }
      return new Digest(code8, size, digest2, bytes);
    };
    equals2 = (a, b) => {
      if (a === b) {
        return true;
      } else {
        return (
          a.code === b.code && a.size === b.size && equals(a.bytes, b.bytes)
        );
      }
    };
    Digest = class {
      constructor(code8, size, digest2, bytes) {
        this.code = code8;
        this.size = size;
        this.digest = digest2;
        this.bytes = bytes;
      }
    };
  },
});

// node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name8) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode12(source) {
    if (source instanceof Uint8Array);
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(
        source.buffer,
        source.byteOffset,
        source.byteLength
      );
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (
        var it1 = size - 1;
        (carry !== 0 || i2 < length2) && it1 !== -1;
        it1--, i2++
      ) {
        carry += (256 * b58[it1]) >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = (carry / BASE) >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = ((source.length - psz) * FACTOR + 1) >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (
        var it3 = size - 1;
        (carry !== 0 || i2 < length2) && it3 !== -1;
        it3--, i2++
      ) {
        carry += (BASE * b256[it3]) >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = (carry / 256) >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode13(string2) {
    var buffer2 = decodeUnsafe(string2);
    if (buffer2) {
      return buffer2;
    }
    throw new Error(`Non-${name8} character`);
  }
  return {
    encode: encode12,
    decodeUnsafe,
    decode: decode13,
  };
}
var src, _brrp__multiformats_scope_baseX, base_x_default;
var init_base_x = __esm({
  "node_modules/multiformats/esm/vendor/base-x.js"() {
    init_node_globals();
    src = base;
    _brrp__multiformats_scope_baseX = src;
    base_x_default = _brrp__multiformats_scope_baseX;
  },
});

// node_modules/multiformats/esm/src/bases/base.js
var Encoder,
  Decoder,
  ComposedDecoder,
  or,
  Codec,
  from,
  baseX,
  decode4,
  encode2,
  rfc4648;
var init_base = __esm({
  "node_modules/multiformats/esm/src/bases/base.js"() {
    init_node_globals();
    init_base_x();
    init_bytes();
    Encoder = class {
      constructor(name8, prefix, baseEncode) {
        this.name = name8;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
      }
      encode(bytes) {
        if (bytes instanceof Uint8Array) {
          return `${this.prefix}${this.baseEncode(bytes)}`;
        } else {
          throw Error("Unknown type, must be binary type");
        }
      }
    };
    Decoder = class {
      constructor(name8, prefix, baseDecode) {
        this.name = name8;
        this.prefix = prefix;
        this.baseDecode = baseDecode;
      }
      decode(text) {
        if (typeof text === "string") {
          switch (text[0]) {
            case this.prefix: {
              return this.baseDecode(text.slice(1));
            }
            default: {
              throw Error(
                `Unable to decode multibase string ${JSON.stringify(text)}, ${
                  this.name
                } decoder only supports inputs prefixed with ${this.prefix}`
              );
            }
          }
        } else {
          throw Error("Can only multibase decode strings");
        }
      }
      or(decoder) {
        return or(this, decoder);
      }
    };
    ComposedDecoder = class {
      constructor(decoders) {
        this.decoders = decoders;
      }
      or(decoder) {
        return or(this, decoder);
      }
      decode(input) {
        const prefix = input[0];
        const decoder = this.decoders[prefix];
        if (decoder) {
          return decoder.decode(input);
        } else {
          throw RangeError(
            `Unable to decode multibase string ${JSON.stringify(
              input
            )}, only inputs prefixed with ${Object.keys(
              this.decoders
            )} are supported`
          );
        }
      }
    };
    or = (left, right) =>
      new ComposedDecoder({
        ...(left.decoders || { [left.prefix]: left }),
        ...(right.decoders || { [right.prefix]: right }),
      });
    Codec = class {
      constructor(name8, prefix, baseEncode, baseDecode) {
        this.name = name8;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name8, prefix, baseEncode);
        this.decoder = new Decoder(name8, prefix, baseDecode);
      }
      encode(input) {
        return this.encoder.encode(input);
      }
      decode(input) {
        return this.decoder.decode(input);
      }
    };
    from = ({ name: name8, prefix, encode: encode12, decode: decode13 }) =>
      new Codec(name8, prefix, encode12, decode13);
    baseX = ({ prefix, name: name8, alphabet }) => {
      const { encode: encode12, decode: decode13 } = base_x_default(
        alphabet,
        name8
      );
      return from({
        prefix,
        name: name8,
        encode: encode12,
        decode: (text) => coerce(decode13(text)),
      });
    };
    decode4 = (string2, alphabet, bitsPerChar, name8) => {
      const codes = {};
      for (let i = 0; i < alphabet.length; ++i) {
        codes[alphabet[i]] = i;
      }
      let end = string2.length;
      while (string2[end - 1] === "=") {
        --end;
      }
      const out = new Uint8Array(((end * bitsPerChar) / 8) | 0);
      let bits = 0;
      let buffer2 = 0;
      let written = 0;
      for (let i = 0; i < end; ++i) {
        const value = codes[string2[i]];
        if (value === void 0) {
          throw new SyntaxError(`Non-${name8} character`);
        }
        buffer2 = (buffer2 << bitsPerChar) | value;
        bits += bitsPerChar;
        if (bits >= 8) {
          bits -= 8;
          out[written++] = 255 & (buffer2 >> bits);
        }
      }
      if (bits >= bitsPerChar || 255 & (buffer2 << (8 - bits))) {
        throw new SyntaxError("Unexpected end of data");
      }
      return out;
    };
    encode2 = (data, alphabet, bitsPerChar) => {
      const pad = alphabet[alphabet.length - 1] === "=";
      const mask = (1 << bitsPerChar) - 1;
      let out = "";
      let bits = 0;
      let buffer2 = 0;
      for (let i = 0; i < data.length; ++i) {
        buffer2 = (buffer2 << 8) | data[i];
        bits += 8;
        while (bits > bitsPerChar) {
          bits -= bitsPerChar;
          out += alphabet[mask & (buffer2 >> bits)];
        }
      }
      if (bits) {
        out += alphabet[mask & (buffer2 << (bitsPerChar - bits))];
      }
      if (pad) {
        while ((out.length * bitsPerChar) & 7) {
          out += "=";
        }
      }
      return out;
    };
    rfc4648 = ({ name: name8, prefix, bitsPerChar, alphabet }) => {
      return from({
        prefix,
        name: name8,
        encode(input) {
          return encode2(input, alphabet, bitsPerChar);
        },
        decode(input) {
          return decode4(input, alphabet, bitsPerChar, name8);
        },
      });
    };
  },
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr,
});
var base58btc, base58flickr;
var init_base58 = __esm({
  "node_modules/multiformats/esm/src/bases/base58.js"() {
    init_node_globals();
    init_base();
    base58btc = baseX({
      name: "base58btc",
      prefix: "z",
      alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
    });
    base58flickr = baseX({
      name: "base58flickr",
      prefix: "Z",
      alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
    });
  },
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z,
});
var base32,
  base32upper,
  base32pad,
  base32padupper,
  base32hex,
  base32hexupper,
  base32hexpad,
  base32hexpadupper,
  base32z;
var init_base32 = __esm({
  "node_modules/multiformats/esm/src/bases/base32.js"() {
    init_node_globals();
    init_base();
    base32 = rfc4648({
      prefix: "b",
      name: "base32",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567",
      bitsPerChar: 5,
    });
    base32upper = rfc4648({
      prefix: "B",
      name: "base32upper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
      bitsPerChar: 5,
    });
    base32pad = rfc4648({
      prefix: "c",
      name: "base32pad",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
      bitsPerChar: 5,
    });
    base32padupper = rfc4648({
      prefix: "C",
      name: "base32padupper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
      bitsPerChar: 5,
    });
    base32hex = rfc4648({
      prefix: "v",
      name: "base32hex",
      alphabet: "0123456789abcdefghijklmnopqrstuv",
      bitsPerChar: 5,
    });
    base32hexupper = rfc4648({
      prefix: "V",
      name: "base32hexupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
      bitsPerChar: 5,
    });
    base32hexpad = rfc4648({
      prefix: "t",
      name: "base32hexpad",
      alphabet: "0123456789abcdefghijklmnopqrstuv=",
      bitsPerChar: 5,
    });
    base32hexpadupper = rfc4648({
      prefix: "T",
      name: "base32hexpadupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
      bitsPerChar: 5,
    });
    base32z = rfc4648({
      prefix: "h",
      name: "base32z",
      alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
      bitsPerChar: 5,
    });
  },
});

// node_modules/multiformats/esm/src/cid.js
var cid_exports = {};
__export(cid_exports, {
  CID: () => CID,
});
var CID,
  parseCIDtoBytes,
  toStringV0,
  toStringV1,
  DAG_PB_CODE,
  SHA_256_CODE,
  encodeCID,
  cidSymbol,
  readonly,
  hidden,
  version,
  deprecate,
  IS_CID_DEPRECATION;
var init_cid = __esm({
  "node_modules/multiformats/esm/src/cid.js"() {
    init_node_globals();
    init_varint2();
    init_digest();
    init_base58();
    init_base32();
    init_bytes();
    CID = class {
      constructor(version2, code8, multihash, bytes) {
        this.code = code8;
        this.version = version2;
        this.multihash = multihash;
        this.bytes = bytes;
        this.byteOffset = bytes.byteOffset;
        this.byteLength = bytes.byteLength;
        this.asCID = this;
        this._baseCache = /* @__PURE__ */ new Map();
        Object.defineProperties(this, {
          byteOffset: hidden,
          byteLength: hidden,
          code: readonly,
          version: readonly,
          multihash: readonly,
          bytes: readonly,
          _baseCache: hidden,
          asCID: hidden,
        });
      }
      toV0() {
        switch (this.version) {
          case 0: {
            return this;
          }
          default: {
            const { code: code8, multihash } = this;
            if (code8 !== DAG_PB_CODE) {
              throw new Error("Cannot convert a non dag-pb CID to CIDv0");
            }
            if (multihash.code !== SHA_256_CODE) {
              throw new Error(
                "Cannot convert non sha2-256 multihash CID to CIDv0"
              );
            }
            return CID.createV0(multihash);
          }
        }
      }
      toV1() {
        switch (this.version) {
          case 0: {
            const { code: code8, digest: digest2 } = this.multihash;
            const multihash = create(code8, digest2);
            return CID.createV1(this.code, multihash);
          }
          case 1: {
            return this;
          }
          default: {
            throw Error(
              `Can not convert CID version ${this.version} to version 0. This is a bug please report`
            );
          }
        }
      }
      equals(other) {
        return (
          other &&
          this.code === other.code &&
          this.version === other.version &&
          equals2(this.multihash, other.multihash)
        );
      }
      toString(base3) {
        const { bytes, version: version2, _baseCache } = this;
        switch (version2) {
          case 0:
            return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
          default:
            return toStringV1(bytes, _baseCache, base3 || base32.encoder);
        }
      }
      toJSON() {
        return {
          code: this.code,
          version: this.version,
          hash: this.multihash.bytes,
        };
      }
      get [Symbol.toStringTag]() {
        return "CID";
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
      }
      static isCID(value) {
        deprecate(/^0\.0/, IS_CID_DEPRECATION);
        return !!(value && (value[cidSymbol] || value.asCID === value));
      }
      get toBaseEncodedString() {
        throw new Error("Deprecated, use .toString()");
      }
      get codec() {
        throw new Error(
          '"codec" property is deprecated, use integer "code" property instead'
        );
      }
      get buffer() {
        throw new Error(
          "Deprecated .buffer property, use .bytes to get Uint8Array instead"
        );
      }
      get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
      }
      get prefix() {
        throw new Error('"prefix" property is deprecated');
      }
      static asCID(value) {
        if (value instanceof CID) {
          return value;
        } else if (value != null && value.asCID === value) {
          const { version: version2, code: code8, multihash, bytes } = value;
          return new CID(
            version2,
            code8,
            multihash,
            bytes || encodeCID(version2, code8, multihash.bytes)
          );
        } else if (value != null && value[cidSymbol] === true) {
          const { version: version2, multihash, code: code8 } = value;
          const digest2 = decode3(multihash);
          return CID.create(version2, code8, digest2);
        } else {
          return null;
        }
      }
      static create(version2, code8, digest2) {
        if (typeof code8 !== "number") {
          throw new Error("String codecs are no longer supported");
        }
        switch (version2) {
          case 0: {
            if (code8 !== DAG_PB_CODE) {
              throw new Error(
                `Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`
              );
            } else {
              return new CID(version2, code8, digest2, digest2.bytes);
            }
          }
          case 1: {
            const bytes = encodeCID(version2, code8, digest2.bytes);
            return new CID(version2, code8, digest2, bytes);
          }
          default: {
            throw new Error("Invalid version");
          }
        }
      }
      static createV0(digest2) {
        return CID.create(0, DAG_PB_CODE, digest2);
      }
      static createV1(code8, digest2) {
        return CID.create(1, code8, digest2);
      }
      static decode(bytes) {
        const [cid, remainder] = CID.decodeFirst(bytes);
        if (remainder.length) {
          throw new Error("Incorrect length");
        }
        return cid;
      }
      static decodeFirst(bytes) {
        const specs = CID.inspectBytes(bytes);
        const prefixSize = specs.size - specs.multihashSize;
        const multihashBytes = coerce(
          bytes.subarray(prefixSize, prefixSize + specs.multihashSize)
        );
        if (multihashBytes.byteLength !== specs.multihashSize) {
          throw new Error("Incorrect length");
        }
        const digestBytes = multihashBytes.subarray(
          specs.multihashSize - specs.digestSize
        );
        const digest2 = new Digest(
          specs.multihashCode,
          specs.digestSize,
          digestBytes,
          multihashBytes
        );
        const cid =
          specs.version === 0
            ? CID.createV0(digest2)
            : CID.createV1(specs.codec, digest2);
        return [cid, bytes.subarray(specs.size)];
      }
      static inspectBytes(initialBytes) {
        let offset = 0;
        const next = () => {
          const [i, length2] = decode2(initialBytes.subarray(offset));
          offset += length2;
          return i;
        };
        let version2 = next();
        let codec = DAG_PB_CODE;
        if (version2 === 18) {
          version2 = 0;
          offset = 0;
        } else if (version2 === 1) {
          codec = next();
        }
        if (version2 !== 0 && version2 !== 1) {
          throw new RangeError(`Invalid CID version ${version2}`);
        }
        const prefixSize = offset;
        const multihashCode = next();
        const digestSize = next();
        const size = offset + digestSize;
        const multihashSize = size - prefixSize;
        return {
          version: version2,
          codec,
          multihashCode,
          digestSize,
          multihashSize,
          size,
        };
      }
      static parse(source, base3) {
        const [prefix, bytes] = parseCIDtoBytes(source, base3);
        const cid = CID.decode(bytes);
        cid._baseCache.set(prefix, source);
        return cid;
      }
    };
    parseCIDtoBytes = (source, base3) => {
      switch (source[0]) {
        case "Q": {
          const decoder = base3 || base58btc;
          return [
            base58btc.prefix,
            decoder.decode(`${base58btc.prefix}${source}`),
          ];
        }
        case base58btc.prefix: {
          const decoder = base3 || base58btc;
          return [base58btc.prefix, decoder.decode(source)];
        }
        case base32.prefix: {
          const decoder = base3 || base32;
          return [base32.prefix, decoder.decode(source)];
        }
        default: {
          if (base3 == null) {
            throw Error(
              "To parse non base32 or base58btc encoded CID multibase decoder must be provided"
            );
          }
          return [source[0], base3.decode(source)];
        }
      }
    };
    toStringV0 = (bytes, cache, base3) => {
      const { prefix } = base3;
      if (prefix !== base58btc.prefix) {
        throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
      }
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes).slice(1);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    toStringV1 = (bytes, cache, base3) => {
      const { prefix } = base3;
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    DAG_PB_CODE = 112;
    SHA_256_CODE = 18;
    encodeCID = (version2, code8, multihash) => {
      const codeOffset = encodingLength(version2);
      const hashOffset = codeOffset + encodingLength(code8);
      const bytes = new Uint8Array(hashOffset + multihash.byteLength);
      encodeTo(version2, bytes, 0);
      encodeTo(code8, bytes, codeOffset);
      bytes.set(multihash, hashOffset);
      return bytes;
    };
    cidSymbol = Symbol.for("@ipld/js-cid/CID");
    readonly = {
      writable: false,
      configurable: false,
      enumerable: true,
    };
    hidden = {
      writable: false,
      enumerable: false,
      configurable: false,
    };
    version = "0.0.0-dev";
    deprecate = (range, message) => {
      if (range.test(version)) {
        console.warn(message);
      } else {
        throw new Error(message);
      }
    };
    IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
  },
});

// node_modules/@ipld/dag-pb/esm/src/pb-decode.js
function decodeVarint(bytes, offset) {
  let v = 0;
  for (let shift = 0; ; shift += 7) {
    if (shift >= 64) {
      throw new Error("protobuf: varint overflow");
    }
    if (offset >= bytes.length) {
      throw new Error("protobuf: unexpected end of data");
    }
    const b = bytes[offset++];
    v += shift < 28 ? (b & 127) << shift : (b & 127) * 2 ** shift;
    if (b < 128) {
      break;
    }
  }
  return [v, offset];
}
function decodeBytes(bytes, offset) {
  let byteLen;
  [byteLen, offset] = decodeVarint(bytes, offset);
  const postOffset = offset + byteLen;
  if (byteLen < 0 || postOffset < 0) {
    throw new Error("protobuf: invalid length");
  }
  if (postOffset > bytes.length) {
    throw new Error("protobuf: unexpected end of data");
  }
  return [bytes.subarray(offset, postOffset), postOffset];
}
function decodeKey(bytes, index) {
  let wire;
  [wire, index] = decodeVarint(bytes, index);
  return [wire & 7, wire >> 3, index];
}
function decodeLink(bytes) {
  const link = {};
  const l = bytes.length;
  let index = 0;
  while (index < l) {
    let wireType, fieldNum;
    [wireType, fieldNum, index] = decodeKey(bytes, index);
    if (fieldNum === 1) {
      if (link.Hash) {
        throw new Error("protobuf: (PBLink) duplicate Hash section");
      }
      if (wireType !== 2) {
        throw new Error(
          `protobuf: (PBLink) wrong wireType (${wireType}) for Hash`
        );
      }
      if (link.Name !== void 0) {
        throw new Error(
          "protobuf: (PBLink) invalid order, found Name before Hash"
        );
      }
      if (link.Tsize !== void 0) {
        throw new Error(
          "protobuf: (PBLink) invalid order, found Tsize before Hash"
        );
      }
      [link.Hash, index] = decodeBytes(bytes, index);
    } else if (fieldNum === 2) {
      if (link.Name !== void 0) {
        throw new Error("protobuf: (PBLink) duplicate Name section");
      }
      if (wireType !== 2) {
        throw new Error(
          `protobuf: (PBLink) wrong wireType (${wireType}) for Name`
        );
      }
      if (link.Tsize !== void 0) {
        throw new Error(
          "protobuf: (PBLink) invalid order, found Tsize before Name"
        );
      }
      let byts;
      [byts, index] = decodeBytes(bytes, index);
      link.Name = textDecoder.decode(byts);
    } else if (fieldNum === 3) {
      if (link.Tsize !== void 0) {
        throw new Error("protobuf: (PBLink) duplicate Tsize section");
      }
      if (wireType !== 0) {
        throw new Error(
          `protobuf: (PBLink) wrong wireType (${wireType}) for Tsize`
        );
      }
      [link.Tsize, index] = decodeVarint(bytes, index);
    } else {
      throw new Error(
        `protobuf: (PBLink) invalid fieldNumber, expected 1, 2 or 3, got ${fieldNum}`
      );
    }
  }
  if (index > l) {
    throw new Error("protobuf: (PBLink) unexpected end of data");
  }
  return link;
}
function decodeNode(bytes) {
  const l = bytes.length;
  let index = 0;
  let links;
  let linksBeforeData = false;
  let data;
  while (index < l) {
    let wireType, fieldNum;
    [wireType, fieldNum, index] = decodeKey(bytes, index);
    if (wireType !== 2) {
      throw new Error(
        `protobuf: (PBNode) invalid wireType, expected 2, got ${wireType}`
      );
    }
    if (fieldNum === 1) {
      if (data) {
        throw new Error("protobuf: (PBNode) duplicate Data section");
      }
      [data, index] = decodeBytes(bytes, index);
      if (links) {
        linksBeforeData = true;
      }
    } else if (fieldNum === 2) {
      if (linksBeforeData) {
        throw new Error("protobuf: (PBNode) duplicate Links section");
      } else if (!links) {
        links = [];
      }
      let byts;
      [byts, index] = decodeBytes(bytes, index);
      links.push(decodeLink(byts));
    } else {
      throw new Error(
        `protobuf: (PBNode) invalid fieldNumber, expected 1 or 2, got ${fieldNum}`
      );
    }
  }
  if (index > l) {
    throw new Error("protobuf: (PBNode) unexpected end of data");
  }
  const node = {};
  if (data) {
    node.Data = data;
  }
  node.Links = links || [];
  return node;
}
var textDecoder;
var init_pb_decode = __esm({
  "node_modules/@ipld/dag-pb/esm/src/pb-decode.js"() {
    init_node_globals();
    textDecoder = new TextDecoder();
  },
});

// node_modules/@ipld/dag-pb/esm/src/pb-encode.js
function encodeLink(link, bytes) {
  let i = bytes.length;
  if (typeof link.Tsize === "number") {
    if (link.Tsize < 0) {
      throw new Error("Tsize cannot be negative");
    }
    if (!Number.isSafeInteger(link.Tsize)) {
      throw new Error("Tsize too large for encoding");
    }
    i = encodeVarint(bytes, i, link.Tsize) - 1;
    bytes[i] = 24;
  }
  if (typeof link.Name === "string") {
    const nameBytes = textEncoder.encode(link.Name);
    i -= nameBytes.length;
    bytes.set(nameBytes, i);
    i = encodeVarint(bytes, i, nameBytes.length) - 1;
    bytes[i] = 18;
  }
  if (link.Hash) {
    i -= link.Hash.length;
    bytes.set(link.Hash, i);
    i = encodeVarint(bytes, i, link.Hash.length) - 1;
    bytes[i] = 10;
  }
  return bytes.length - i;
}
function encodeNode(node) {
  const size = sizeNode(node);
  const bytes = new Uint8Array(size);
  let i = size;
  if (node.Data) {
    i -= node.Data.length;
    bytes.set(node.Data, i);
    i = encodeVarint(bytes, i, node.Data.length) - 1;
    bytes[i] = 10;
  }
  if (node.Links) {
    for (let index = node.Links.length - 1; index >= 0; index--) {
      const size2 = encodeLink(node.Links[index], bytes.subarray(0, i));
      i -= size2;
      i = encodeVarint(bytes, i, size2) - 1;
      bytes[i] = 18;
    }
  }
  return bytes;
}
function sizeLink(link) {
  let n = 0;
  if (link.Hash) {
    const l = link.Hash.length;
    n += 1 + l + sov(l);
  }
  if (typeof link.Name === "string") {
    const l = textEncoder.encode(link.Name).length;
    n += 1 + l + sov(l);
  }
  if (typeof link.Tsize === "number") {
    n += 1 + sov(link.Tsize);
  }
  return n;
}
function sizeNode(node) {
  let n = 0;
  if (node.Data) {
    const l = node.Data.length;
    n += 1 + l + sov(l);
  }
  if (node.Links) {
    for (const link of node.Links) {
      const l = sizeLink(link);
      n += 1 + l + sov(l);
    }
  }
  return n;
}
function encodeVarint(bytes, offset, v) {
  offset -= sov(v);
  const base3 = offset;
  while (v >= maxUInt32) {
    bytes[offset++] = (v & 127) | 128;
    v /= 128;
  }
  while (v >= 128) {
    bytes[offset++] = (v & 127) | 128;
    v >>>= 7;
  }
  bytes[offset] = v;
  return base3;
}
function sov(x) {
  if (x % 2 === 0) {
    x++;
  }
  return Math.floor((len64(x) + 6) / 7);
}
function len64(x) {
  let n = 0;
  if (x >= maxInt32) {
    x = Math.floor(x / maxInt32);
    n = 32;
  }
  if (x >= 1 << 16) {
    x >>>= 16;
    n += 16;
  }
  if (x >= 1 << 8) {
    x >>>= 8;
    n += 8;
  }
  return n + len8tab[x];
}
var textEncoder, maxInt32, maxUInt32, len8tab;
var init_pb_encode = __esm({
  "node_modules/@ipld/dag-pb/esm/src/pb-encode.js"() {
    init_node_globals();
    textEncoder = new TextEncoder();
    maxInt32 = 2 ** 32;
    maxUInt32 = 2 ** 31;
    len8tab = [
      0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8, 8,
    ];
  },
});

// node_modules/@ipld/dag-pb/esm/src/util.js
function linkComparator(a, b) {
  if (a === b) {
    return 0;
  }
  const abuf = a.Name ? textEncoder2.encode(a.Name) : [];
  const bbuf = b.Name ? textEncoder2.encode(b.Name) : [];
  let x = abuf.length;
  let y = bbuf.length;
  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (abuf[i] !== bbuf[i]) {
      x = abuf[i];
      y = bbuf[i];
      break;
    }
  }
  return x < y ? -1 : y < x ? 1 : 0;
}
function hasOnlyProperties(node, properties) {
  return !Object.keys(node).some((p) => !properties.includes(p));
}
function asLink(link) {
  if (typeof link.asCID === "object") {
    const Hash = CID.asCID(link);
    if (!Hash) {
      throw new TypeError("Invalid DAG-PB form");
    }
    return { Hash };
  }
  if (typeof link !== "object" || Array.isArray(link)) {
    throw new TypeError("Invalid DAG-PB form");
  }
  const pbl = {};
  if (link.Hash) {
    let cid = CID.asCID(link.Hash);
    try {
      if (!cid) {
        if (typeof link.Hash === "string") {
          cid = CID.parse(link.Hash);
        } else if (link.Hash instanceof Uint8Array) {
          cid = CID.decode(link.Hash);
        }
      }
    } catch (e) {
      throw new TypeError(`Invalid DAG-PB form: ${e.message}`);
    }
    if (cid) {
      pbl.Hash = cid;
    }
  }
  if (!pbl.Hash) {
    throw new TypeError("Invalid DAG-PB form");
  }
  if (typeof link.Name === "string") {
    pbl.Name = link.Name;
  }
  if (typeof link.Tsize === "number") {
    pbl.Tsize = link.Tsize;
  }
  return pbl;
}
function prepare(node) {
  if (node instanceof Uint8Array || typeof node === "string") {
    node = { Data: node };
  }
  if (typeof node !== "object" || Array.isArray(node)) {
    throw new TypeError("Invalid DAG-PB form");
  }
  const pbn = {};
  if (node.Data !== void 0) {
    if (typeof node.Data === "string") {
      pbn.Data = textEncoder2.encode(node.Data);
    } else if (node.Data instanceof Uint8Array) {
      pbn.Data = node.Data;
    } else {
      throw new TypeError("Invalid DAG-PB form");
    }
  }
  if (node.Links !== void 0) {
    if (Array.isArray(node.Links)) {
      pbn.Links = node.Links.map(asLink);
      pbn.Links.sort(linkComparator);
    } else {
      throw new TypeError("Invalid DAG-PB form");
    }
  } else {
    pbn.Links = [];
  }
  return pbn;
}
function validate(node) {
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    throw new TypeError("Invalid DAG-PB form");
  }
  if (!hasOnlyProperties(node, pbNodeProperties)) {
    throw new TypeError("Invalid DAG-PB form (extraneous properties)");
  }
  if (node.Data !== void 0 && !(node.Data instanceof Uint8Array)) {
    throw new TypeError("Invalid DAG-PB form (Data must be a Uint8Array)");
  }
  if (!Array.isArray(node.Links)) {
    throw new TypeError("Invalid DAG-PB form (Links must be an array)");
  }
  for (let i = 0; i < node.Links.length; i++) {
    const link = node.Links[i];
    if (!link || typeof link !== "object" || Array.isArray(link)) {
      throw new TypeError("Invalid DAG-PB form (bad link object)");
    }
    if (!hasOnlyProperties(link, pbLinkProperties)) {
      throw new TypeError(
        "Invalid DAG-PB form (extraneous properties on link object)"
      );
    }
    if (!link.Hash) {
      throw new TypeError("Invalid DAG-PB form (link must have a Hash)");
    }
    if (link.Hash.asCID !== link.Hash) {
      throw new TypeError("Invalid DAG-PB form (link Hash must be a CID)");
    }
    if (link.Name !== void 0 && typeof link.Name !== "string") {
      throw new TypeError("Invalid DAG-PB form (link Name must be a string)");
    }
    if (
      link.Tsize !== void 0 &&
      (typeof link.Tsize !== "number" || link.Tsize % 1 !== 0)
    ) {
      throw new TypeError(
        "Invalid DAG-PB form (link Tsize must be an integer)"
      );
    }
    if (i > 0 && linkComparator(link, node.Links[i - 1]) === -1) {
      throw new TypeError(
        "Invalid DAG-PB form (links must be sorted by Name bytes)"
      );
    }
  }
}
function createNode(data, links = []) {
  return prepare({
    Data: data,
    Links: links,
  });
}
function createLink(name8, size, cid) {
  return asLink({
    Hash: cid,
    Name: name8,
    Tsize: size,
  });
}
var pbNodeProperties, pbLinkProperties, textEncoder2;
var init_util = __esm({
  "node_modules/@ipld/dag-pb/esm/src/util.js"() {
    init_node_globals();
    init_cid();
    pbNodeProperties = ["Data", "Links"];
    pbLinkProperties = ["Hash", "Name", "Tsize"];
    textEncoder2 = new TextEncoder();
  },
});

// node_modules/@ipld/dag-pb/esm/src/index.js
var src_exports = {};
__export(src_exports, {
  code: () => code,
  createLink: () => createLink,
  createNode: () => createNode,
  decode: () => decode5,
  encode: () => encode3,
  name: () => name,
  prepare: () => prepare,
  validate: () => validate,
});
function encode3(node) {
  validate(node);
  const pbn = {};
  if (node.Links) {
    pbn.Links = node.Links.map((l) => {
      const link = {};
      if (l.Hash) {
        link.Hash = l.Hash.bytes;
      }
      if (l.Name !== void 0) {
        link.Name = l.Name;
      }
      if (l.Tsize !== void 0) {
        link.Tsize = l.Tsize;
      }
      return link;
    });
  }
  if (node.Data) {
    pbn.Data = node.Data;
  }
  return encodeNode(pbn);
}
function decode5(bytes) {
  const pbn = decodeNode(bytes);
  const node = {};
  if (pbn.Data) {
    node.Data = pbn.Data;
  }
  if (pbn.Links) {
    node.Links = pbn.Links.map((l) => {
      const link = {};
      try {
        link.Hash = CID.decode(l.Hash);
      } catch (e) {}
      if (!link.Hash) {
        throw new Error("Invalid Hash field found in link, expected CID");
      }
      if (l.Name !== void 0) {
        link.Name = l.Name;
      }
      if (l.Tsize !== void 0) {
        link.Tsize = l.Tsize;
      }
      return link;
    });
  }
  return node;
}
var name, code;
var init_src = __esm({
  "node_modules/@ipld/dag-pb/esm/src/index.js"() {
    init_node_globals();
    init_cid();
    init_pb_decode();
    init_pb_encode();
    init_util();
    name = "dag-pb";
    code = 112;
  },
});

// node_modules/cborg/esm/lib/is.js
function is(value) {
  if (value === null) {
    return "null";
  }
  if (value === void 0) {
    return "undefined";
  }
  if (value === true || value === false) {
    return "boolean";
  }
  const typeOf = typeof value;
  if (typeofs.includes(typeOf)) {
    return typeOf;
  }
  if (typeOf === "function") {
    return "Function";
  }
  if (Array.isArray(value)) {
    return "Array";
  }
  if (isBuffer(value)) {
    return "Buffer";
  }
  const objectType = getObjectType(value);
  if (objectType) {
    return objectType;
  }
  return "Object";
}
function isBuffer(value) {
  return (
    value &&
    value.constructor &&
    value.constructor.isBuffer &&
    value.constructor.isBuffer.call(null, value)
  );
}
function getObjectType(value) {
  const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
  if (objectTypeNames.includes(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
}
var typeofs, objectTypeNames;
var init_is = __esm({
  "node_modules/cborg/esm/lib/is.js"() {
    init_node_globals();
    typeofs = ["string", "number", "bigint", "symbol"];
    objectTypeNames = [
      "Function",
      "Generator",
      "AsyncGenerator",
      "GeneratorFunction",
      "AsyncGeneratorFunction",
      "AsyncFunction",
      "Observable",
      "Array",
      "Buffer",
      "Object",
      "RegExp",
      "Date",
      "Error",
      "Map",
      "Set",
      "WeakMap",
      "WeakSet",
      "ArrayBuffer",
      "SharedArrayBuffer",
      "DataView",
      "Promise",
      "URL",
      "HTMLElement",
      "Int8Array",
      "Uint8Array",
      "Uint8ClampedArray",
      "Int16Array",
      "Uint16Array",
      "Int32Array",
      "Uint32Array",
      "Float32Array",
      "Float64Array",
      "BigInt64Array",
      "BigUint64Array",
    ];
  },
});

// node_modules/cborg/esm/lib/token.js
var Type, Token;
var init_token = __esm({
  "node_modules/cborg/esm/lib/token.js"() {
    init_node_globals();
    Type = class {
      constructor(major, name8, terminal) {
        this.major = major;
        this.majorEncoded = major << 5;
        this.name = name8;
        this.terminal = terminal;
      }
      toString() {
        return `Type[${this.major}].${this.name}`;
      }
      compare(typ) {
        return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
      }
    };
    Type.uint = new Type(0, "uint", true);
    Type.negint = new Type(1, "negint", true);
    Type.bytes = new Type(2, "bytes", true);
    Type.string = new Type(3, "string", true);
    Type.array = new Type(4, "array", false);
    Type.map = new Type(5, "map", false);
    Type.tag = new Type(6, "tag", false);
    Type.float = new Type(7, "float", true);
    Type.false = new Type(7, "false", true);
    Type.true = new Type(7, "true", true);
    Type.null = new Type(7, "null", true);
    Type.undefined = new Type(7, "undefined", true);
    Type.break = new Type(7, "break", true);
    Token = class {
      constructor(type, value, encodedLength) {
        this.type = type;
        this.value = value;
        this.encodedLength = encodedLength;
        this.encodedBytes = void 0;
        this.byteValue = void 0;
      }
      toString() {
        return `Token[${this.type}].${this.value}`;
      }
    };
  },
});

// node_modules/cborg/esm/lib/byte-utils.js
function isBuffer2(buf2) {
  return useBuffer && globalThis.Buffer.isBuffer(buf2);
}
function asU8A(buf2) {
  if (!(buf2 instanceof Uint8Array)) {
    return Uint8Array.from(buf2);
  }
  return isBuffer2(buf2)
    ? new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength)
    : buf2;
}
function compare(b1, b2) {
  if (isBuffer2(b1) && isBuffer2(b2)) {
    return b1.compare(b2);
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] === b2[i]) {
      continue;
    }
    return b1[i] < b2[i] ? -1 : 1;
  }
  return 0;
}
function utf8ToBytes(string2, units = Infinity) {
  let codePoint;
  const length2 = string2.length;
  let leadSurrogate = null;
  const bytes = [];
  for (let i = 0; i < length2; ++i) {
    codePoint = string2.charCodeAt(i);
    if (codePoint > 55295 && codePoint < 57344) {
      if (!leadSurrogate) {
        if (codePoint > 56319) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        } else if (i + 1 === length2) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          continue;
        }
        leadSurrogate = codePoint;
        continue;
      }
      if (codePoint < 56320) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
        leadSurrogate = codePoint;
        continue;
      }
      codePoint =
        (((leadSurrogate - 55296) << 10) | (codePoint - 56320)) + 65536;
    } else if (leadSurrogate) {
      if ((units -= 3) > -1) bytes.push(239, 191, 189);
    }
    leadSurrogate = null;
    if (codePoint < 128) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 2048) {
      if ((units -= 2) < 0) break;
      bytes.push((codePoint >> 6) | 192, (codePoint & 63) | 128);
    } else if (codePoint < 65536) {
      if ((units -= 3) < 0) break;
      bytes.push(
        (codePoint >> 12) | 224,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128
      );
    } else if (codePoint < 1114112) {
      if ((units -= 4) < 0) break;
      bytes.push(
        (codePoint >> 18) | 240,
        ((codePoint >> 12) & 63) | 128,
        ((codePoint >> 6) & 63) | 128,
        (codePoint & 63) | 128
      );
    } else {
      throw new Error("Invalid code point");
    }
  }
  return bytes;
}
function utf8Slice(buf2, offset, end) {
  const res = [];
  while (offset < end) {
    const firstByte = buf2[offset];
    let codePoint = null;
    let bytesPerSequence =
      firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
    if (offset + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint;
      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 128) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf2[offset + 1];
          if ((secondByte & 192) === 128) {
            tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
            if (tempCodePoint > 127) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
            tempCodePoint =
              ((firstByte & 15) << 12) |
              ((secondByte & 63) << 6) |
              (thirdByte & 63);
            if (
              tempCodePoint > 2047 &&
              (tempCodePoint < 55296 || tempCodePoint > 57343)
            ) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf2[offset + 1];
          thirdByte = buf2[offset + 2];
          fourthByte = buf2[offset + 3];
          if (
            (secondByte & 192) === 128 &&
            (thirdByte & 192) === 128 &&
            (fourthByte & 192) === 128
          ) {
            tempCodePoint =
              ((firstByte & 15) << 18) |
              ((secondByte & 63) << 12) |
              ((thirdByte & 63) << 6) |
              (fourthByte & 63);
            if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
              codePoint = tempCodePoint;
            }
          }
      }
    }
    if (codePoint === null) {
      codePoint = 65533;
      bytesPerSequence = 1;
    } else if (codePoint > 65535) {
      codePoint -= 65536;
      res.push(((codePoint >>> 10) & 1023) | 55296);
      codePoint = 56320 | (codePoint & 1023);
    }
    res.push(codePoint);
    offset += bytesPerSequence;
  }
  return decodeCodePointsArray(res);
}
function decodeCodePointsArray(codePoints) {
  const len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints);
  }
  let res = "";
  let i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
    );
  }
  return res;
}
var useBuffer,
  textDecoder2,
  textEncoder3,
  toString2,
  fromString2,
  fromArray,
  slice,
  concat,
  alloc,
  MAX_ARGUMENTS_LENGTH;
var init_byte_utils = __esm({
  "node_modules/cborg/esm/lib/byte-utils.js"() {
    init_node_globals();
    useBuffer =
      globalThis.process &&
      !globalThis.process.browser &&
      globalThis.Buffer &&
      typeof globalThis.Buffer.isBuffer === "function";
    textDecoder2 = new TextDecoder();
    textEncoder3 = new TextEncoder();
    toString2 = useBuffer
      ? (bytes, start, end) => {
          return end - start > 64
            ? globalThis.Buffer.from(bytes.subarray(start, end)).toString(
                "utf8"
              )
            : utf8Slice(bytes, start, end);
        }
      : (bytes, start, end) => {
          return end - start > 64
            ? textDecoder2.decode(bytes.subarray(start, end))
            : utf8Slice(bytes, start, end);
        };
    fromString2 = useBuffer
      ? (string2) => {
          return string2.length > 64
            ? globalThis.Buffer.from(string2)
            : utf8ToBytes(string2);
        }
      : (string2) => {
          return string2.length > 64
            ? textEncoder3.encode(string2)
            : utf8ToBytes(string2);
        };
    fromArray = (arr) => {
      return Uint8Array.from(arr);
    };
    slice = useBuffer
      ? (bytes, start, end) => {
          if (isBuffer2(bytes)) {
            return new Uint8Array(bytes.subarray(start, end));
          }
          return bytes.slice(start, end);
        }
      : (bytes, start, end) => {
          return bytes.slice(start, end);
        };
    concat = useBuffer
      ? (chunks, length2) => {
          chunks = chunks.map((c) =>
            c instanceof Uint8Array ? c : globalThis.Buffer.from(c)
          );
          return asU8A(globalThis.Buffer.concat(chunks, length2));
        }
      : (chunks, length2) => {
          const out = new Uint8Array(length2);
          let off = 0;
          for (let b of chunks) {
            if (off + b.length > out.length) {
              b = b.subarray(0, out.length - off);
            }
            out.set(b, off);
            off += b.length;
          }
          return out;
        };
    alloc = useBuffer
      ? (size) => {
          return globalThis.Buffer.allocUnsafe(size);
        }
      : (size) => {
          return new Uint8Array(size);
        };
    MAX_ARGUMENTS_LENGTH = 4096;
  },
});

// node_modules/cborg/esm/lib/bl.js
var defaultChunkSize, Bl;
var init_bl = __esm({
  "node_modules/cborg/esm/lib/bl.js"() {
    init_node_globals();
    init_byte_utils();
    defaultChunkSize = 256;
    Bl = class {
      constructor(chunkSize = defaultChunkSize) {
        this.chunkSize = chunkSize;
        this.cursor = 0;
        this.maxCursor = -1;
        this.chunks = [];
        this._initReuseChunk = null;
      }
      reset() {
        this.chunks = [];
        this.cursor = 0;
        this.maxCursor = -1;
        if (this._initReuseChunk !== null) {
          this.chunks.push(this._initReuseChunk);
          this.maxCursor = this._initReuseChunk.length - 1;
        }
      }
      push(bytes) {
        let topChunk = this.chunks[this.chunks.length - 1];
        const newMax = this.cursor + bytes.length;
        if (newMax <= this.maxCursor + 1) {
          const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
          topChunk.set(bytes, chunkPos);
        } else {
          if (topChunk) {
            const chunkPos =
              topChunk.length - (this.maxCursor - this.cursor) - 1;
            if (chunkPos < topChunk.length) {
              this.chunks[this.chunks.length - 1] = topChunk.subarray(
                0,
                chunkPos
              );
              this.maxCursor = this.cursor - 1;
            }
          }
          if (bytes.length < 64 && bytes.length < this.chunkSize) {
            topChunk = alloc(this.chunkSize);
            this.chunks.push(topChunk);
            this.maxCursor += topChunk.length;
            if (this._initReuseChunk === null) {
              this._initReuseChunk = topChunk;
            }
            topChunk.set(bytes, 0);
          } else {
            this.chunks.push(bytes);
            this.maxCursor += bytes.length;
          }
        }
        this.cursor += bytes.length;
      }
      toBytes(reset = false) {
        let byts;
        if (this.chunks.length === 1) {
          const chunk = this.chunks[0];
          if (reset && this.cursor > chunk.length / 2) {
            byts =
              this.cursor === chunk.length
                ? chunk
                : chunk.subarray(0, this.cursor);
            this._initReuseChunk = null;
            this.chunks = [];
          } else {
            byts = slice(chunk, 0, this.cursor);
          }
        } else {
          byts = concat(this.chunks, this.cursor);
        }
        if (reset) {
          this.reset();
        }
        return byts;
      }
    };
  },
});

// node_modules/cborg/esm/lib/common.js
function assertEnoughData(data, pos, need) {
  if (data.length - pos < need) {
    throw new Error(`${decodeErrPrefix} not enough data for type`);
  }
}
var decodeErrPrefix, encodeErrPrefix, uintMinorPrefixBytes;
var init_common = __esm({
  "node_modules/cborg/esm/lib/common.js"() {
    init_node_globals();
    decodeErrPrefix = "CBOR decode error:";
    encodeErrPrefix = "CBOR encode error:";
    uintMinorPrefixBytes = [];
    uintMinorPrefixBytes[23] = 1;
    uintMinorPrefixBytes[24] = 2;
    uintMinorPrefixBytes[25] = 3;
    uintMinorPrefixBytes[26] = 5;
    uintMinorPrefixBytes[27] = 9;
  },
});

// node_modules/cborg/esm/lib/0uint.js
function readUint8(data, offset, options) {
  assertEnoughData(data, offset, 1);
  const value = data[offset];
  if (options.strict === true && value < uintBoundaries[0]) {
    throw new Error(
      `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
    );
  }
  return value;
}
function readUint16(data, offset, options) {
  assertEnoughData(data, offset, 2);
  const value = (data[offset] << 8) | data[offset + 1];
  if (options.strict === true && value < uintBoundaries[1]) {
    throw new Error(
      `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
    );
  }
  return value;
}
function readUint32(data, offset, options) {
  assertEnoughData(data, offset, 4);
  const value =
    data[offset] * 16777216 +
    (data[offset + 1] << 16) +
    (data[offset + 2] << 8) +
    data[offset + 3];
  if (options.strict === true && value < uintBoundaries[2]) {
    throw new Error(
      `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
    );
  }
  return value;
}
function readUint64(data, offset, options) {
  assertEnoughData(data, offset, 8);
  const hi =
    data[offset] * 16777216 +
    (data[offset + 1] << 16) +
    (data[offset + 2] << 8) +
    data[offset + 3];
  const lo =
    data[offset + 4] * 16777216 +
    (data[offset + 5] << 16) +
    (data[offset + 6] << 8) +
    data[offset + 7];
  const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
  if (options.strict === true && value < uintBoundaries[3]) {
    throw new Error(
      `${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`
    );
  }
  if (value <= Number.MAX_SAFE_INTEGER) {
    return Number(value);
  }
  if (options.allowBigInt === true) {
    return value;
  }
  throw new Error(
    `${decodeErrPrefix} integers outside of the safe integer range are not supported`
  );
}
function decodeUint8(data, pos, _minor, options) {
  return new Token(Type.uint, readUint8(data, pos + 1, options), 2);
}
function decodeUint16(data, pos, _minor, options) {
  return new Token(Type.uint, readUint16(data, pos + 1, options), 3);
}
function decodeUint32(data, pos, _minor, options) {
  return new Token(Type.uint, readUint32(data, pos + 1, options), 5);
}
function decodeUint64(data, pos, _minor, options) {
  return new Token(Type.uint, readUint64(data, pos + 1, options), 9);
}
function encodeUint(buf2, token) {
  return encodeUintValue(buf2, 0, token.value);
}
function encodeUintValue(buf2, major, uint) {
  if (uint < uintBoundaries[0]) {
    const nuint = Number(uint);
    buf2.push([major | nuint]);
  } else if (uint < uintBoundaries[1]) {
    const nuint = Number(uint);
    buf2.push([major | 24, nuint]);
  } else if (uint < uintBoundaries[2]) {
    const nuint = Number(uint);
    buf2.push([major | 25, nuint >>> 8, nuint & 255]);
  } else if (uint < uintBoundaries[3]) {
    const nuint = Number(uint);
    buf2.push([
      major | 26,
      (nuint >>> 24) & 255,
      (nuint >>> 16) & 255,
      (nuint >>> 8) & 255,
      nuint & 255,
    ]);
  } else {
    const buint = BigInt(uint);
    if (buint < uintBoundaries[4]) {
      const set = [major | 27, 0, 0, 0, 0, 0, 0, 0];
      let lo = Number(buint & BigInt(4294967295));
      let hi = Number((buint >> BigInt(32)) & BigInt(4294967295));
      set[8] = lo & 255;
      lo = lo >> 8;
      set[7] = lo & 255;
      lo = lo >> 8;
      set[6] = lo & 255;
      lo = lo >> 8;
      set[5] = lo & 255;
      set[4] = hi & 255;
      hi = hi >> 8;
      set[3] = hi & 255;
      hi = hi >> 8;
      set[2] = hi & 255;
      hi = hi >> 8;
      set[1] = hi & 255;
      buf2.push(set);
    } else {
      throw new Error(
        `${decodeErrPrefix} encountered BigInt larger than allowable range`
      );
    }
  }
}
var uintBoundaries;
var init_uint = __esm({
  "node_modules/cborg/esm/lib/0uint.js"() {
    init_node_globals();
    init_token();
    init_common();
    uintBoundaries = [
      24,
      256,
      65536,
      4294967296,
      BigInt("18446744073709551616"),
    ];
    encodeUint.encodedSize = function encodedSize(token) {
      return encodeUintValue.encodedSize(token.value);
    };
    encodeUintValue.encodedSize = function encodedSize2(uint) {
      if (uint < uintBoundaries[0]) {
        return 1;
      }
      if (uint < uintBoundaries[1]) {
        return 2;
      }
      if (uint < uintBoundaries[2]) {
        return 3;
      }
      if (uint < uintBoundaries[3]) {
        return 5;
      }
      return 9;
    };
    encodeUint.compareTokens = function compareTokens(tok1, tok2) {
      return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : 0;
    };
  },
});

// node_modules/cborg/esm/lib/1negint.js
function decodeNegint8(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint8(data, pos + 1, options), 2);
}
function decodeNegint16(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint16(data, pos + 1, options), 3);
}
function decodeNegint32(data, pos, _minor, options) {
  return new Token(Type.negint, -1 - readUint32(data, pos + 1, options), 5);
}
function decodeNegint64(data, pos, _minor, options) {
  const int = readUint64(data, pos + 1, options);
  if (typeof int !== "bigint") {
    const value = -1 - int;
    if (value >= Number.MIN_SAFE_INTEGER) {
      return new Token(Type.negint, value, 9);
    }
  }
  if (options.allowBigInt !== true) {
    throw new Error(
      `${decodeErrPrefix} integers outside of the safe integer range are not supported`
    );
  }
  return new Token(Type.negint, neg1b - BigInt(int), 9);
}
function encodeNegint(buf2, token) {
  const negint = token.value;
  const unsigned =
    typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
  encodeUintValue(buf2, token.type.majorEncoded, unsigned);
}
var neg1b, pos1b;
var init_negint = __esm({
  "node_modules/cborg/esm/lib/1negint.js"() {
    init_node_globals();
    init_token();
    init_uint();
    init_common();
    neg1b = BigInt(-1);
    pos1b = BigInt(1);
    encodeNegint.encodedSize = function encodedSize3(token) {
      const negint = token.value;
      const unsigned =
        typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
      if (unsigned < uintBoundaries[0]) {
        return 1;
      }
      if (unsigned < uintBoundaries[1]) {
        return 2;
      }
      if (unsigned < uintBoundaries[2]) {
        return 3;
      }
      if (unsigned < uintBoundaries[3]) {
        return 5;
      }
      return 9;
    };
    encodeNegint.compareTokens = function compareTokens2(tok1, tok2) {
      return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : 0;
    };
  },
});

// node_modules/cborg/esm/lib/2bytes.js
function toToken(data, pos, prefix, length2) {
  assertEnoughData(data, pos, prefix + length2);
  const buf2 = slice(data, pos + prefix, pos + prefix + length2);
  return new Token(Type.bytes, buf2, prefix + length2);
}
function decodeBytesCompact(data, pos, minor, _options) {
  return toToken(data, pos, 1, minor);
}
function decodeBytes8(data, pos, _minor, options) {
  return toToken(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeBytes16(data, pos, _minor, options) {
  return toToken(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeBytes32(data, pos, _minor, options) {
  return toToken(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeBytes64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(
      `${decodeErrPrefix} 64-bit integer bytes lengths not supported`
    );
  }
  return toToken(data, pos, 9, l);
}
function tokenBytes(token) {
  if (token.encodedBytes === void 0) {
    token.encodedBytes =
      token.type === Type.string ? fromString2(token.value) : token.value;
  }
  return token.encodedBytes;
}
function encodeBytes(buf2, token) {
  const bytes = tokenBytes(token);
  encodeUintValue(buf2, token.type.majorEncoded, bytes.length);
  buf2.push(bytes);
}
function compareBytes(b1, b2) {
  return b1.length < b2.length
    ? -1
    : b1.length > b2.length
    ? 1
    : compare(b1, b2);
}
var init_bytes2 = __esm({
  "node_modules/cborg/esm/lib/2bytes.js"() {
    init_node_globals();
    init_token();
    init_common();
    init_uint();
    init_byte_utils();
    encodeBytes.encodedSize = function encodedSize4(token) {
      const bytes = tokenBytes(token);
      return encodeUintValue.encodedSize(bytes.length) + bytes.length;
    };
    encodeBytes.compareTokens = function compareTokens3(tok1, tok2) {
      return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
    };
  },
});

// node_modules/cborg/esm/lib/3string.js
function toToken2(data, pos, prefix, length2, options) {
  const totLength = prefix + length2;
  assertEnoughData(data, pos, totLength);
  const tok = new Token(
    Type.string,
    toString2(data, pos + prefix, pos + totLength),
    totLength
  );
  if (options.retainStringBytes === true) {
    tok.byteValue = slice(data, pos + prefix, pos + totLength);
  }
  return tok;
}
function decodeStringCompact(data, pos, minor, options) {
  return toToken2(data, pos, 1, minor, options);
}
function decodeString8(data, pos, _minor, options) {
  return toToken2(data, pos, 2, readUint8(data, pos + 1, options), options);
}
function decodeString16(data, pos, _minor, options) {
  return toToken2(data, pos, 3, readUint16(data, pos + 1, options), options);
}
function decodeString32(data, pos, _minor, options) {
  return toToken2(data, pos, 5, readUint32(data, pos + 1, options), options);
}
function decodeString64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(
      `${decodeErrPrefix} 64-bit integer string lengths not supported`
    );
  }
  return toToken2(data, pos, 9, l, options);
}
var encodeString;
var init_string = __esm({
  "node_modules/cborg/esm/lib/3string.js"() {
    init_node_globals();
    init_token();
    init_common();
    init_uint();
    init_bytes2();
    init_byte_utils();
    encodeString = encodeBytes;
  },
});

// node_modules/cborg/esm/lib/4array.js
function toToken3(_data, _pos, prefix, length2) {
  return new Token(Type.array, length2, prefix);
}
function decodeArrayCompact(data, pos, minor, _options) {
  return toToken3(data, pos, 1, minor);
}
function decodeArray8(data, pos, _minor, options) {
  return toToken3(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeArray16(data, pos, _minor, options) {
  return toToken3(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeArray32(data, pos, _minor, options) {
  return toToken3(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeArray64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(
      `${decodeErrPrefix} 64-bit integer array lengths not supported`
    );
  }
  return toToken3(data, pos, 9, l);
}
function decodeArrayIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken3(data, pos, 1, Infinity);
}
function encodeArray(buf2, token) {
  encodeUintValue(buf2, Type.array.majorEncoded, token.value);
}
var init_array = __esm({
  "node_modules/cborg/esm/lib/4array.js"() {
    init_node_globals();
    init_token();
    init_uint();
    init_common();
    encodeArray.compareTokens = encodeUint.compareTokens;
  },
});

// node_modules/cborg/esm/lib/5map.js
function toToken4(_data, _pos, prefix, length2) {
  return new Token(Type.map, length2, prefix);
}
function decodeMapCompact(data, pos, minor, _options) {
  return toToken4(data, pos, 1, minor);
}
function decodeMap8(data, pos, _minor, options) {
  return toToken4(data, pos, 2, readUint8(data, pos + 1, options));
}
function decodeMap16(data, pos, _minor, options) {
  return toToken4(data, pos, 3, readUint16(data, pos + 1, options));
}
function decodeMap32(data, pos, _minor, options) {
  return toToken4(data, pos, 5, readUint32(data, pos + 1, options));
}
function decodeMap64(data, pos, _minor, options) {
  const l = readUint64(data, pos + 1, options);
  if (typeof l === "bigint") {
    throw new Error(
      `${decodeErrPrefix} 64-bit integer map lengths not supported`
    );
  }
  return toToken4(data, pos, 9, l);
}
function decodeMapIndefinite(data, pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return toToken4(data, pos, 1, Infinity);
}
function encodeMap(buf2, token) {
  encodeUintValue(buf2, Type.map.majorEncoded, token.value);
}
var init_map = __esm({
  "node_modules/cborg/esm/lib/5map.js"() {
    init_node_globals();
    init_token();
    init_uint();
    init_common();
    encodeMap.compareTokens = encodeUint.compareTokens;
  },
});

// node_modules/cborg/esm/lib/6tag.js
function decodeTagCompact(_data, _pos, minor, _options) {
  return new Token(Type.tag, minor, 1);
}
function decodeTag8(data, pos, _minor, options) {
  return new Token(Type.tag, readUint8(data, pos + 1, options), 2);
}
function decodeTag16(data, pos, _minor, options) {
  return new Token(Type.tag, readUint16(data, pos + 1, options), 3);
}
function decodeTag32(data, pos, _minor, options) {
  return new Token(Type.tag, readUint32(data, pos + 1, options), 5);
}
function decodeTag64(data, pos, _minor, options) {
  return new Token(Type.tag, readUint64(data, pos + 1, options), 9);
}
function encodeTag(buf2, token) {
  encodeUintValue(buf2, Type.tag.majorEncoded, token.value);
}
var init_tag = __esm({
  "node_modules/cborg/esm/lib/6tag.js"() {
    init_node_globals();
    init_token();
    init_uint();
    encodeTag.compareTokens = encodeUint.compareTokens;
  },
});

// node_modules/cborg/esm/lib/7float.js
function decodeUndefined(_data, _pos, _minor, options) {
  if (options.allowUndefined === false) {
    throw new Error(`${decodeErrPrefix} undefined values are not supported`);
  } else if (options.coerceUndefinedToNull === true) {
    return new Token(Type.null, null, 1);
  }
  return new Token(Type.undefined, void 0, 1);
}
function decodeBreak(_data, _pos, _minor, options) {
  if (options.allowIndefinite === false) {
    throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
  }
  return new Token(Type.break, void 0, 1);
}
function createToken(value, bytes, options) {
  if (options) {
    if (options.allowNaN === false && Number.isNaN(value)) {
      throw new Error(`${decodeErrPrefix} NaN values are not supported`);
    }
    if (
      options.allowInfinity === false &&
      (value === Infinity || value === -Infinity)
    ) {
      throw new Error(`${decodeErrPrefix} Infinity values are not supported`);
    }
  }
  return new Token(Type.float, value, bytes);
}
function decodeFloat16(data, pos, _minor, options) {
  return createToken(readFloat16(data, pos + 1), 3, options);
}
function decodeFloat32(data, pos, _minor, options) {
  return createToken(readFloat32(data, pos + 1), 5, options);
}
function decodeFloat64(data, pos, _minor, options) {
  return createToken(readFloat64(data, pos + 1), 9, options);
}
function encodeFloat(buf2, token, options) {
  const float = token.value;
  if (float === false) {
    buf2.push([Type.float.majorEncoded | MINOR_FALSE]);
  } else if (float === true) {
    buf2.push([Type.float.majorEncoded | MINOR_TRUE]);
  } else if (float === null) {
    buf2.push([Type.float.majorEncoded | MINOR_NULL]);
  } else if (float === void 0) {
    buf2.push([Type.float.majorEncoded | MINOR_UNDEFINED]);
  } else {
    let decoded;
    let success = false;
    if (!options || options.float64 !== true) {
      encodeFloat16(float);
      decoded = readFloat16(ui8a, 1);
      if (float === decoded || Number.isNaN(float)) {
        ui8a[0] = 249;
        buf2.push(ui8a.slice(0, 3));
        success = true;
      } else {
        encodeFloat32(float);
        decoded = readFloat32(ui8a, 1);
        if (float === decoded) {
          ui8a[0] = 250;
          buf2.push(ui8a.slice(0, 5));
          success = true;
        }
      }
    }
    if (!success) {
      encodeFloat64(float);
      decoded = readFloat64(ui8a, 1);
      ui8a[0] = 251;
      buf2.push(ui8a.slice(0, 9));
    }
  }
}
function encodeFloat16(inp) {
  if (inp === Infinity) {
    dataView.setUint16(0, 31744, false);
  } else if (inp === -Infinity) {
    dataView.setUint16(0, 64512, false);
  } else if (Number.isNaN(inp)) {
    dataView.setUint16(0, 32256, false);
  } else {
    dataView.setFloat32(0, inp);
    const valu32 = dataView.getUint32(0);
    const exponent = (valu32 & 2139095040) >> 23;
    const mantissa = valu32 & 8388607;
    if (exponent === 255) {
      dataView.setUint16(0, 31744, false);
    } else if (exponent === 0) {
      dataView.setUint16(
        0,
        ((inp & 2147483648) >> 16) | (mantissa >> 13),
        false
      );
    } else {
      const logicalExponent = exponent - 127;
      if (logicalExponent < -24) {
        dataView.setUint16(0, 0);
      } else if (logicalExponent < -14) {
        dataView.setUint16(
          0,
          ((valu32 & 2147483648) >> 16) | (1 << (24 + logicalExponent)),
          false
        );
      } else {
        dataView.setUint16(
          0,
          ((valu32 & 2147483648) >> 16) |
            ((logicalExponent + 15) << 10) |
            (mantissa >> 13),
          false
        );
      }
    }
  }
}
function readFloat16(ui8a2, pos) {
  if (ui8a2.length - pos < 2) {
    throw new Error(`${decodeErrPrefix} not enough data for float16`);
  }
  const half = (ui8a2[pos] << 8) + ui8a2[pos + 1];
  if (half === 31744) {
    return Infinity;
  }
  if (half === 64512) {
    return -Infinity;
  }
  if (half === 32256) {
    return NaN;
  }
  const exp = (half >> 10) & 31;
  const mant = half & 1023;
  let val;
  if (exp === 0) {
    val = mant * 2 ** -24;
  } else if (exp !== 31) {
    val = (mant + 1024) * 2 ** (exp - 25);
  } else {
    val = mant === 0 ? Infinity : NaN;
  }
  return half & 32768 ? -val : val;
}
function encodeFloat32(inp) {
  dataView.setFloat32(0, inp, false);
}
function readFloat32(ui8a2, pos) {
  if (ui8a2.length - pos < 4) {
    throw new Error(`${decodeErrPrefix} not enough data for float32`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 4).getFloat32(0, false);
}
function encodeFloat64(inp) {
  dataView.setFloat64(0, inp, false);
}
function readFloat64(ui8a2, pos) {
  if (ui8a2.length - pos < 8) {
    throw new Error(`${decodeErrPrefix} not enough data for float64`);
  }
  const offset = (ui8a2.byteOffset || 0) + pos;
  return new DataView(ui8a2.buffer, offset, 8).getFloat64(0, false);
}
var MINOR_FALSE,
  MINOR_TRUE,
  MINOR_NULL,
  MINOR_UNDEFINED,
  buffer,
  dataView,
  ui8a;
var init_float = __esm({
  "node_modules/cborg/esm/lib/7float.js"() {
    init_node_globals();
    init_token();
    init_common();
    init_uint();
    MINOR_FALSE = 20;
    MINOR_TRUE = 21;
    MINOR_NULL = 22;
    MINOR_UNDEFINED = 23;
    encodeFloat.encodedSize = function encodedSize5(token, options) {
      const float = token.value;
      if (
        float === false ||
        float === true ||
        float === null ||
        float === void 0
      ) {
        return 1;
      }
      let decoded;
      if (!options || options.float64 !== true) {
        encodeFloat16(float);
        decoded = readFloat16(ui8a, 1);
        if (float === decoded || Number.isNaN(float)) {
          return 3;
        }
        encodeFloat32(float);
        decoded = readFloat32(ui8a, 1);
        if (float === decoded) {
          return 5;
        }
      }
      return 9;
    };
    buffer = new ArrayBuffer(9);
    dataView = new DataView(buffer, 1);
    ui8a = new Uint8Array(buffer, 0);
    encodeFloat.compareTokens = encodeUint.compareTokens;
  },
});

// node_modules/cborg/esm/lib/jump.js
function invalidMinor(data, pos, minor) {
  throw new Error(
    `${decodeErrPrefix} encountered invalid minor (${minor}) for major ${
      data[pos] >>> 5
    }`
  );
}
function errorer(msg) {
  return () => {
    throw new Error(`${decodeErrPrefix} ${msg}`);
  };
}
function quickEncodeToken(token) {
  switch (token.type) {
    case Type.false:
      return fromArray([244]);
    case Type.true:
      return fromArray([245]);
    case Type.null:
      return fromArray([246]);
    case Type.bytes:
      if (!token.value.length) {
        return fromArray([64]);
      }
      return;
    case Type.string:
      if (token.value === "") {
        return fromArray([96]);
      }
      return;
    case Type.array:
      if (token.value === 0) {
        return fromArray([128]);
      }
      return;
    case Type.map:
      if (token.value === 0) {
        return fromArray([160]);
      }
      return;
    case Type.uint:
      if (token.value < 24) {
        return fromArray([Number(token.value)]);
      }
      return;
    case Type.negint:
      if (token.value >= -24) {
        return fromArray([31 - Number(token.value)]);
      }
  }
}
var jump, quick;
var init_jump = __esm({
  "node_modules/cborg/esm/lib/jump.js"() {
    init_node_globals();
    init_token();
    init_uint();
    init_negint();
    init_bytes2();
    init_string();
    init_array();
    init_map();
    init_tag();
    init_float();
    init_common();
    init_byte_utils();
    jump = [];
    for (let i = 0; i <= 23; i++) {
      jump[i] = invalidMinor;
    }
    jump[24] = decodeUint8;
    jump[25] = decodeUint16;
    jump[26] = decodeUint32;
    jump[27] = decodeUint64;
    jump[28] = invalidMinor;
    jump[29] = invalidMinor;
    jump[30] = invalidMinor;
    jump[31] = invalidMinor;
    for (let i = 32; i <= 55; i++) {
      jump[i] = invalidMinor;
    }
    jump[56] = decodeNegint8;
    jump[57] = decodeNegint16;
    jump[58] = decodeNegint32;
    jump[59] = decodeNegint64;
    jump[60] = invalidMinor;
    jump[61] = invalidMinor;
    jump[62] = invalidMinor;
    jump[63] = invalidMinor;
    for (let i = 64; i <= 87; i++) {
      jump[i] = decodeBytesCompact;
    }
    jump[88] = decodeBytes8;
    jump[89] = decodeBytes16;
    jump[90] = decodeBytes32;
    jump[91] = decodeBytes64;
    jump[92] = invalidMinor;
    jump[93] = invalidMinor;
    jump[94] = invalidMinor;
    jump[95] = errorer("indefinite length bytes/strings are not supported");
    for (let i = 96; i <= 119; i++) {
      jump[i] = decodeStringCompact;
    }
    jump[120] = decodeString8;
    jump[121] = decodeString16;
    jump[122] = decodeString32;
    jump[123] = decodeString64;
    jump[124] = invalidMinor;
    jump[125] = invalidMinor;
    jump[126] = invalidMinor;
    jump[127] = errorer("indefinite length bytes/strings are not supported");
    for (let i = 128; i <= 151; i++) {
      jump[i] = decodeArrayCompact;
    }
    jump[152] = decodeArray8;
    jump[153] = decodeArray16;
    jump[154] = decodeArray32;
    jump[155] = decodeArray64;
    jump[156] = invalidMinor;
    jump[157] = invalidMinor;
    jump[158] = invalidMinor;
    jump[159] = decodeArrayIndefinite;
    for (let i = 160; i <= 183; i++) {
      jump[i] = decodeMapCompact;
    }
    jump[184] = decodeMap8;
    jump[185] = decodeMap16;
    jump[186] = decodeMap32;
    jump[187] = decodeMap64;
    jump[188] = invalidMinor;
    jump[189] = invalidMinor;
    jump[190] = invalidMinor;
    jump[191] = decodeMapIndefinite;
    for (let i = 192; i <= 215; i++) {
      jump[i] = decodeTagCompact;
    }
    jump[216] = decodeTag8;
    jump[217] = decodeTag16;
    jump[218] = decodeTag32;
    jump[219] = decodeTag64;
    jump[220] = invalidMinor;
    jump[221] = invalidMinor;
    jump[222] = invalidMinor;
    jump[223] = invalidMinor;
    for (let i = 224; i <= 243; i++) {
      jump[i] = errorer("simple values are not supported");
    }
    jump[244] = invalidMinor;
    jump[245] = invalidMinor;
    jump[246] = invalidMinor;
    jump[247] = decodeUndefined;
    jump[248] = errorer("simple values are not supported");
    jump[249] = decodeFloat16;
    jump[250] = decodeFloat32;
    jump[251] = decodeFloat64;
    jump[252] = invalidMinor;
    jump[253] = invalidMinor;
    jump[254] = invalidMinor;
    jump[255] = decodeBreak;
    quick = [];
    for (let i = 0; i < 24; i++) {
      quick[i] = new Token(Type.uint, i, 1);
    }
    for (let i = -1; i >= -24; i--) {
      quick[31 - i] = new Token(Type.negint, i, 1);
    }
    quick[64] = new Token(Type.bytes, new Uint8Array(0), 1);
    quick[96] = new Token(Type.string, "", 1);
    quick[128] = new Token(Type.array, 0, 1);
    quick[160] = new Token(Type.map, 0, 1);
    quick[244] = new Token(Type.false, false, 1);
    quick[245] = new Token(Type.true, true, 1);
    quick[246] = new Token(Type.null, null, 1);
  },
});

// node_modules/cborg/esm/lib/encode.js
function objectToTokens(obj, options = {}, refStack) {
  const typ = is(obj);
  const customTypeEncoder =
    (options && options.typeEncoders && options.typeEncoders[typ]) ||
    typeEncoders[typ];
  if (typeof customTypeEncoder === "function") {
    const tokens = customTypeEncoder(obj, typ, options, refStack);
    if (tokens != null) {
      return tokens;
    }
  }
  const typeEncoder = typeEncoders[typ];
  if (!typeEncoder) {
    throw new Error(`${encodeErrPrefix} unsupported type: ${typ}`);
  }
  return typeEncoder(obj, typ, options, refStack);
}
function sortMapEntries(entries, options) {
  if (options.mapSorter) {
    entries.sort(options.mapSorter);
  }
}
function mapSorter(e1, e2) {
  const keyToken1 = Array.isArray(e1[0]) ? e1[0][0] : e1[0];
  const keyToken2 = Array.isArray(e2[0]) ? e2[0][0] : e2[0];
  if (keyToken1.type !== keyToken2.type) {
    return keyToken1.type.compare(keyToken2.type);
  }
  const major = keyToken1.type.major;
  const tcmp = cborEncoders[major].compareTokens(keyToken1, keyToken2);
  if (tcmp === 0) {
    console.warn(
      "WARNING: complex key types used, CBOR key sorting guarantees are gone"
    );
  }
  return tcmp;
}
function tokensToEncoded(buf2, tokens, encoders, options) {
  if (Array.isArray(tokens)) {
    for (const token of tokens) {
      tokensToEncoded(buf2, token, encoders, options);
    }
  } else {
    encoders[tokens.type.major](buf2, tokens, options);
  }
}
function encodeCustom(data, encoders, options) {
  const tokens = objectToTokens(data, options);
  if (!Array.isArray(tokens) && options.quickEncodeToken) {
    const quickBytes = options.quickEncodeToken(tokens);
    if (quickBytes) {
      return quickBytes;
    }
    const encoder = encoders[tokens.type.major];
    if (encoder.encodedSize) {
      const size = encoder.encodedSize(tokens, options);
      const buf2 = new Bl(size);
      encoder(buf2, tokens, options);
      if (buf2.chunks.length !== 1) {
        throw new Error(
          `Unexpected error: pre-calculated length for ${tokens} was wrong`
        );
      }
      return asU8A(buf2.chunks[0]);
    }
  }
  tokensToEncoded(buf, tokens, encoders, options);
  return buf.toBytes(true);
}
function encode4(data, options) {
  options = Object.assign({}, defaultEncodeOptions, options);
  return encodeCustom(data, cborEncoders, options);
}
var defaultEncodeOptions, cborEncoders, buf, Ref, simpleTokens, typeEncoders;
var init_encode = __esm({
  "node_modules/cborg/esm/lib/encode.js"() {
    init_node_globals();
    init_is();
    init_token();
    init_bl();
    init_common();
    init_jump();
    init_byte_utils();
    init_uint();
    init_negint();
    init_bytes2();
    init_string();
    init_array();
    init_map();
    init_tag();
    init_float();
    defaultEncodeOptions = {
      float64: false,
      mapSorter,
      quickEncodeToken,
    };
    cborEncoders = [];
    cborEncoders[Type.uint.major] = encodeUint;
    cborEncoders[Type.negint.major] = encodeNegint;
    cborEncoders[Type.bytes.major] = encodeBytes;
    cborEncoders[Type.string.major] = encodeString;
    cborEncoders[Type.array.major] = encodeArray;
    cborEncoders[Type.map.major] = encodeMap;
    cborEncoders[Type.tag.major] = encodeTag;
    cborEncoders[Type.float.major] = encodeFloat;
    buf = new Bl();
    Ref = class {
      constructor(obj, parent) {
        this.obj = obj;
        this.parent = parent;
      }
      includes(obj) {
        let p = this;
        do {
          if (p.obj === obj) {
            return true;
          }
        } while ((p = p.parent));
        return false;
      }
      static createCheck(stack, obj) {
        if (stack && stack.includes(obj)) {
          throw new Error(
            `${encodeErrPrefix} object contains circular references`
          );
        }
        return new Ref(obj, stack);
      }
    };
    simpleTokens = {
      null: new Token(Type.null, null),
      undefined: new Token(Type.undefined, void 0),
      true: new Token(Type.true, true),
      false: new Token(Type.false, false),
      emptyArray: new Token(Type.array, 0),
      emptyMap: new Token(Type.map, 0),
    };
    typeEncoders = {
      number(obj, _typ, _options, _refStack) {
        if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
          return new Token(Type.float, obj);
        } else if (obj >= 0) {
          return new Token(Type.uint, obj);
        } else {
          return new Token(Type.negint, obj);
        }
      },
      bigint(obj, _typ, _options, _refStack) {
        if (obj >= BigInt(0)) {
          return new Token(Type.uint, obj);
        } else {
          return new Token(Type.negint, obj);
        }
      },
      Uint8Array(obj, _typ, _options, _refStack) {
        return new Token(Type.bytes, obj);
      },
      string(obj, _typ, _options, _refStack) {
        return new Token(Type.string, obj);
      },
      boolean(obj, _typ, _options, _refStack) {
        return obj ? simpleTokens.true : simpleTokens.false;
      },
      null(_obj, _typ, _options, _refStack) {
        return simpleTokens.null;
      },
      undefined(_obj, _typ, _options, _refStack) {
        return simpleTokens.undefined;
      },
      ArrayBuffer(obj, _typ, _options, _refStack) {
        return new Token(Type.bytes, new Uint8Array(obj));
      },
      DataView(obj, _typ, _options, _refStack) {
        return new Token(
          Type.bytes,
          new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength)
        );
      },
      Array(obj, _typ, options, refStack) {
        if (!obj.length) {
          if (options.addBreakTokens === true) {
            return [simpleTokens.emptyArray, new Token(Type.break)];
          }
          return simpleTokens.emptyArray;
        }
        refStack = Ref.createCheck(refStack, obj);
        const entries = [];
        let i = 0;
        for (const e of obj) {
          entries[i++] = objectToTokens(e, options, refStack);
        }
        if (options.addBreakTokens) {
          return [
            new Token(Type.array, obj.length),
            entries,
            new Token(Type.break),
          ];
        }
        return [new Token(Type.array, obj.length), entries];
      },
      Object(obj, typ, options, refStack) {
        const isMap = typ !== "Object";
        const keys = isMap ? obj.keys() : Object.keys(obj);
        const length2 = isMap ? obj.size : keys.length;
        if (!length2) {
          if (options.addBreakTokens === true) {
            return [simpleTokens.emptyMap, new Token(Type.break)];
          }
          return simpleTokens.emptyMap;
        }
        refStack = Ref.createCheck(refStack, obj);
        const entries = [];
        let i = 0;
        for (const key of keys) {
          entries[i++] = [
            objectToTokens(key, options, refStack),
            objectToTokens(isMap ? obj.get(key) : obj[key], options, refStack),
          ];
        }
        sortMapEntries(entries, options);
        if (options.addBreakTokens) {
          return [new Token(Type.map, length2), entries, new Token(Type.break)];
        }
        return [new Token(Type.map, length2), entries];
      },
    };
    typeEncoders.Map = typeEncoders.Object;
    typeEncoders.Buffer = typeEncoders.Uint8Array;
    for (const typ of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(
      " "
    )) {
      typeEncoders[`${typ}Array`] = typeEncoders.DataView;
    }
  },
});

// node_modules/cborg/esm/lib/decode.js
function tokenToArray(token, tokeniser, options) {
  const arr = [];
  for (let i = 0; i < token.value; i++) {
    const value = tokensToObject(tokeniser, options);
    if (value === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(
        `${decodeErrPrefix} got unexpected break to lengthed array`
      );
    }
    if (value === DONE) {
      throw new Error(
        `${decodeErrPrefix} found array but not enough entries (got ${i}, expected ${token.value})`
      );
    }
    arr[i] = value;
  }
  return arr;
}
function tokenToMap(token, tokeniser, options) {
  const useMaps = options.useMaps === true;
  const obj = useMaps ? void 0 : {};
  const m = useMaps ? /* @__PURE__ */ new Map() : void 0;
  for (let i = 0; i < token.value; i++) {
    const key = tokensToObject(tokeniser, options);
    if (key === BREAK) {
      if (token.value === Infinity) {
        break;
      }
      throw new Error(
        `${decodeErrPrefix} got unexpected break to lengthed map`
      );
    }
    if (key === DONE) {
      throw new Error(
        `${decodeErrPrefix} found map but not enough entries (got ${i} [no key], expected ${token.value})`
      );
    }
    if (useMaps !== true && typeof key !== "string") {
      throw new Error(
        `${decodeErrPrefix} non-string keys not supported (got ${typeof key})`
      );
    }
    const value = tokensToObject(tokeniser, options);
    if (value === DONE) {
      throw new Error(
        `${decodeErrPrefix} found map but not enough entries (got ${i} [no value], expected ${token.value})`
      );
    }
    if (useMaps) {
      m.set(key, value);
    } else {
      obj[key] = value;
    }
  }
  return useMaps ? m : obj;
}
function tokensToObject(tokeniser, options) {
  if (tokeniser.done()) {
    return DONE;
  }
  const token = tokeniser.next();
  if (token.type === Type.break) {
    return BREAK;
  }
  if (token.type.terminal) {
    return token.value;
  }
  if (token.type === Type.array) {
    return tokenToArray(token, tokeniser, options);
  }
  if (token.type === Type.map) {
    return tokenToMap(token, tokeniser, options);
  }
  if (token.type === Type.tag) {
    if (options.tags && typeof options.tags[token.value] === "function") {
      const tagged = tokensToObject(tokeniser, options);
      return options.tags[token.value](tagged);
    }
    throw new Error(`${decodeErrPrefix} tag not supported (${token.value})`);
  }
  throw new Error("unsupported");
}
function decode6(data, options) {
  if (!(data instanceof Uint8Array)) {
    throw new Error(`${decodeErrPrefix} data to decode must be a Uint8Array`);
  }
  options = Object.assign({}, defaultDecodeOptions, options);
  const tokeniser = options.tokenizer || new Tokeniser(data, options);
  const decoded = tokensToObject(tokeniser, options);
  if (decoded === DONE) {
    throw new Error(`${decodeErrPrefix} did not find any content to decode`);
  }
  if (decoded === BREAK) {
    throw new Error(`${decodeErrPrefix} got unexpected break`);
  }
  if (!tokeniser.done()) {
    throw new Error(
      `${decodeErrPrefix} too many terminals, data makes no sense`
    );
  }
  return decoded;
}
var defaultDecodeOptions, Tokeniser, DONE, BREAK;
var init_decode = __esm({
  "node_modules/cborg/esm/lib/decode.js"() {
    init_node_globals();
    init_common();
    init_token();
    init_jump();
    defaultDecodeOptions = {
      strict: false,
      allowIndefinite: true,
      allowUndefined: true,
      allowBigInt: true,
    };
    Tokeniser = class {
      constructor(data, options = {}) {
        this.pos = 0;
        this.data = data;
        this.options = options;
      }
      done() {
        return this.pos >= this.data.length;
      }
      next() {
        const byt = this.data[this.pos];
        let token = quick[byt];
        if (token === void 0) {
          const decoder = jump[byt];
          if (!decoder) {
            throw new Error(
              `${decodeErrPrefix} no decoder for major type ${
                byt >>> 5
              } (byte 0x${byt.toString(16).padStart(2, "0")})`
            );
          }
          const minor = byt & 31;
          token = decoder(this.data, this.pos, minor, this.options);
        }
        this.pos += token.encodedLength;
        return token;
      }
    };
    DONE = Symbol.for("DONE");
    BREAK = Symbol.for("BREAK");
  },
});

// node_modules/cborg/esm/cborg.js
var init_cborg = __esm({
  "node_modules/cborg/esm/cborg.js"() {
    init_node_globals();
    init_encode();
    init_decode();
    init_token();
  },
});

// node_modules/@ipld/dag-cbor/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  code: () => code2,
  decode: () => decode7,
  encode: () => encode5,
  name: () => name2,
});
function cidEncoder(obj) {
  if (obj.asCID !== obj) {
    return null;
  }
  const cid = CID.asCID(obj);
  if (!cid) {
    return null;
  }
  const bytes = new Uint8Array(cid.bytes.byteLength + 1);
  bytes.set(cid.bytes, 1);
  return [new Token(Type.tag, CID_CBOR_TAG), new Token(Type.bytes, bytes)];
}
function undefinedEncoder() {
  throw new Error(
    "`undefined` is not supported by the IPLD Data Model and cannot be encoded"
  );
}
function numberEncoder(num) {
  if (Number.isNaN(num)) {
    throw new Error(
      "`NaN` is not supported by the IPLD Data Model and cannot be encoded"
    );
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error(
      "`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded"
    );
  }
  return null;
}
function cidDecoder(bytes) {
  if (bytes[0] !== 0) {
    throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
  }
  return CID.decode(bytes.subarray(1));
}
var CID_CBOR_TAG, encodeOptions, decodeOptions, name2, code2, encode5, decode7;
var init_esm = __esm({
  "node_modules/@ipld/dag-cbor/esm/index.js"() {
    init_node_globals();
    init_cborg();
    init_cid();
    CID_CBOR_TAG = 42;
    encodeOptions = {
      float64: true,
      typeEncoders: {
        Object: cidEncoder,
        undefined: undefinedEncoder,
        number: numberEncoder,
      },
    };
    decodeOptions = {
      allowIndefinite: false,
      coerceUndefinedToNull: true,
      allowNaN: false,
      allowInfinity: false,
      allowBigInt: true,
      strict: true,
      useMaps: false,
      tags: [],
    };
    decodeOptions.tags[CID_CBOR_TAG] = cidDecoder;
    name2 = "dag-cbor";
    code2 = 113;
    encode5 = (node) => encode4(node, encodeOptions);
    decode7 = (data) => decode6(data, decodeOptions);
  },
});

// node_modules/multiformats/esm/src/hashes/hasher.js
var hasher_exports = {};
__export(hasher_exports, {
  Hasher: () => Hasher,
  from: () => from2,
});
var from2, Hasher;
var init_hasher = __esm({
  "node_modules/multiformats/esm/src/hashes/hasher.js"() {
    init_node_globals();
    init_digest();
    from2 = ({ name: name8, code: code8, encode: encode12 }) =>
      new Hasher(name8, code8, encode12);
    Hasher = class {
      constructor(name8, code8, encode12) {
        this.name = name8;
        this.code = code8;
        this.encode = encode12;
      }
      digest(input) {
        if (input instanceof Uint8Array) {
          const result = this.encode(input);
          return result instanceof Uint8Array
            ? create(this.code, result)
            : result.then((digest2) => create(this.code, digest2));
        } else {
          throw Error("Unknown type, must be binary type");
        }
      }
    };
  },
});

// node_modules/multiformats/esm/src/index.js
var init_src2 = __esm({
  "node_modules/multiformats/esm/src/index.js"() {
    init_node_globals();
    init_cid();
    init_varint2();
    init_bytes();
    init_hasher();
    init_digest();
  },
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad,
});
var base64, base64pad, base64url, base64urlpad;
var init_base64 = __esm({
  "node_modules/multiformats/esm/src/bases/base64.js"() {
    init_node_globals();
    init_base();
    base64 = rfc4648({
      prefix: "m",
      name: "base64",
      alphabet:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      bitsPerChar: 6,
    });
    base64pad = rfc4648({
      prefix: "M",
      name: "base64pad",
      alphabet:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      bitsPerChar: 6,
    });
    base64url = rfc4648({
      prefix: "u",
      name: "base64url",
      alphabet:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      bitsPerChar: 6,
    });
    base64urlpad = rfc4648({
      prefix: "U",
      name: "base64urlpad",
      alphabet:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
      bitsPerChar: 6,
    });
  },
});

// node_modules/cborg/esm/lib/json/encode.js
function mapSorter2(e1, e2) {
  if (Array.isArray(e1[0]) || Array.isArray(e2[0])) {
    throw new Error(`${encodeErrPrefix} complex map keys are not supported`);
  }
  const keyToken1 = e1[0];
  const keyToken2 = e2[0];
  if (keyToken1.type !== Type.string || keyToken2.type !== Type.string) {
    throw new Error(`${encodeErrPrefix} non-string map keys are not supported`);
  }
  if (keyToken1 < keyToken2) {
    return -1;
  }
  if (keyToken1 > keyToken2) {
    return 1;
  }
  throw new Error(
    `${encodeErrPrefix} unexpected duplicate map keys, this is not supported`
  );
}
function encode6(data, options) {
  options = Object.assign({}, defaultEncodeOptions2, options);
  return encodeCustom(data, new JSONEncoder(), options);
}
var JSONEncoder, defaultEncodeOptions2;
var init_encode2 = __esm({
  "node_modules/cborg/esm/lib/json/encode.js"() {
    init_node_globals();
    init_token();
    init_encode();
    init_common();
    init_byte_utils();
    JSONEncoder = class extends Array {
      constructor() {
        super();
        this.inRecursive = [];
      }
      prefix(buf2) {
        const recurs = this.inRecursive[this.inRecursive.length - 1];
        if (recurs) {
          if (recurs.type === Type.array) {
            recurs.elements++;
            if (recurs.elements !== 1) {
              buf2.push([44]);
            }
          }
          if (recurs.type === Type.map) {
            recurs.elements++;
            if (recurs.elements !== 1) {
              if (recurs.elements % 2 === 1) {
                buf2.push([44]);
              } else {
                buf2.push([58]);
              }
            }
          }
        }
      }
      [Type.uint.major](buf2, token) {
        this.prefix(buf2);
        const is2 = String(token.value);
        const isa = [];
        for (let i = 0; i < is2.length; i++) {
          isa[i] = is2.charCodeAt(i);
        }
        buf2.push(isa);
      }
      [Type.negint.major](buf2, token) {
        this[Type.uint.major](buf2, token);
      }
      [Type.bytes.major](_buf, _token) {
        throw new Error(`${encodeErrPrefix} unsupported type: Uint8Array`);
      }
      [Type.string.major](buf2, token) {
        this.prefix(buf2);
        const byts = fromString2(JSON.stringify(token.value));
        buf2.push(byts.length > 32 ? asU8A(byts) : byts);
      }
      [Type.array.major](buf2, _token) {
        this.prefix(buf2);
        this.inRecursive.push({
          type: Type.array,
          elements: 0,
        });
        buf2.push([91]);
      }
      [Type.map.major](buf2, _token) {
        this.prefix(buf2);
        this.inRecursive.push({
          type: Type.map,
          elements: 0,
        });
        buf2.push([123]);
      }
      [Type.tag.major](_buf, _token) {}
      [Type.float.major](buf2, token) {
        if (token.type.name === "break") {
          const recurs = this.inRecursive.pop();
          if (recurs) {
            if (recurs.type === Type.array) {
              buf2.push([93]);
            } else if (recurs.type === Type.map) {
              buf2.push([125]);
            } else {
              throw new Error(
                "Unexpected recursive type; this should not happen!"
              );
            }
            return;
          }
          throw new Error("Unexpected break; this should not happen!");
        }
        if (token.value === void 0) {
          throw new Error(`${encodeErrPrefix} unsupported type: undefined`);
        }
        this.prefix(buf2);
        if (token.type.name === "true") {
          buf2.push([116, 114, 117, 101]);
          return;
        } else if (token.type.name === "false") {
          buf2.push([102, 97, 108, 115, 101]);
          return;
        } else if (token.type.name === "null") {
          buf2.push([110, 117, 108, 108]);
          return;
        }
        const is2 = String(token.value);
        const isa = [];
        let dp = false;
        for (let i = 0; i < is2.length; i++) {
          isa[i] = is2.charCodeAt(i);
          if (!dp && (isa[i] === 46 || isa[i] === 101 || isa[i] === 69)) {
            dp = true;
          }
        }
        if (!dp) {
          isa.push(46);
          isa.push(48);
        }
        buf2.push(isa);
      }
    };
    defaultEncodeOptions2 = {
      addBreakTokens: true,
      mapSorter: mapSorter2,
    };
  },
});

// node_modules/cborg/esm/lib/json/decode.js
function decode8(data, options) {
  options = Object.assign({ tokenizer: new Tokenizer(data, options) }, options);
  return decode6(data, options);
}
var Tokenizer;
var init_decode2 = __esm({
  "node_modules/cborg/esm/lib/json/decode.js"() {
    init_node_globals();
    init_decode();
    init_token();
    init_byte_utils();
    init_common();
    Tokenizer = class {
      constructor(data, options = {}) {
        this.pos = 0;
        this.data = data;
        this.options = options;
        this.modeStack = ["value"];
        this.lastToken = "";
      }
      done() {
        return this.pos >= this.data.length;
      }
      ch() {
        return this.data[this.pos];
      }
      currentMode() {
        return this.modeStack[this.modeStack.length - 1];
      }
      skipWhitespace() {
        let c = this.ch();
        while (c === 32 || c === 9 || c === 13 || c === 10) {
          c = this.data[++this.pos];
        }
      }
      expect(str) {
        if (this.data.length - this.pos < str.length) {
          throw new Error(
            `${decodeErrPrefix} unexpected end of input at position ${this.pos}`
          );
        }
        for (let i = 0; i < str.length; i++) {
          if (this.data[this.pos++] !== str[i]) {
            throw new Error(
              `${decodeErrPrefix} unexpected token at position ${
                this.pos
              }, expected to find '${String.fromCharCode(...str)}'`
            );
          }
        }
      }
      parseNumber() {
        const startPos = this.pos;
        let negative = false;
        let float = false;
        const swallow = (chars) => {
          while (!this.done()) {
            const ch = this.ch();
            if (chars.includes(ch)) {
              this.pos++;
            } else {
              break;
            }
          }
        };
        if (this.ch() === 45) {
          negative = true;
          this.pos++;
        }
        if (this.ch() === 48) {
          this.pos++;
          if (this.ch() === 46) {
            this.pos++;
            float = true;
          } else {
            return new Token(Type.uint, 0, this.pos - startPos);
          }
        }
        swallow([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
        if (negative && this.pos === startPos + 1) {
          throw new Error(
            `${decodeErrPrefix} unexpected token at position ${this.pos}`
          );
        }
        if (!this.done() && this.ch() === 46) {
          if (float) {
            throw new Error(
              `${decodeErrPrefix} unexpected token at position ${this.pos}`
            );
          }
          float = true;
          this.pos++;
          swallow([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
        }
        if (!this.done() && (this.ch() === 101 || this.ch() === 69)) {
          float = true;
          this.pos++;
          if (!this.done() && (this.ch() === 43 || this.ch() === 45)) {
            this.pos++;
          }
          swallow([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
        }
        const numStr = String.fromCharCode.apply(
          null,
          this.data.subarray(startPos, this.pos)
        );
        const num = parseFloat(numStr);
        if (float) {
          return new Token(Type.float, num, this.pos - startPos);
        }
        if (this.options.allowBigInt !== true || Number.isSafeInteger(num)) {
          return new Token(
            num >= 0 ? Type.uint : Type.negint,
            num,
            this.pos - startPos
          );
        }
        return new Token(
          num >= 0 ? Type.uint : Type.negint,
          BigInt(numStr),
          this.pos - startPos
        );
      }
      parseString() {
        if (this.ch() !== 34) {
          throw new Error(
            `${decodeErrPrefix} unexpected character at position ${this.pos}; this shouldn't happen`
          );
        }
        this.pos++;
        for (
          let i = this.pos, l = 0;
          i < this.data.length && l < 65536;
          i++, l++
        ) {
          const ch = this.data[i];
          if (ch === 92 || ch < 32 || ch >= 128) {
            break;
          }
          if (ch === 34) {
            const str = String.fromCharCode.apply(
              null,
              this.data.subarray(this.pos, i)
            );
            this.pos = i + 1;
            return new Token(Type.string, str, l);
          }
        }
        const startPos = this.pos;
        const chars = [];
        const readu4 = () => {
          if (this.pos + 4 >= this.data.length) {
            throw new Error(
              `${decodeErrPrefix} unexpected end of unicode escape sequence at position ${this.pos}`
            );
          }
          let u4 = 0;
          for (let i = 0; i < 4; i++) {
            let ch = this.ch();
            if (ch >= 48 && ch <= 57) {
              ch -= 48;
            } else if (ch >= 97 && ch <= 102) {
              ch = ch - 97 + 10;
            } else if (ch >= 65 && ch <= 70) {
              ch = ch - 65 + 10;
            } else {
              throw new Error(
                `${decodeErrPrefix} unexpected unicode escape character at position ${this.pos}`
              );
            }
            u4 = u4 * 16 + ch;
            this.pos++;
          }
          return u4;
        };
        const readUtf8Char = () => {
          const firstByte = this.ch();
          let codePoint = null;
          let bytesPerSequence =
            firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (this.pos + bytesPerSequence > this.data.length) {
            throw new Error(
              `${decodeErrPrefix} unexpected unicode sequence at position ${this.pos}`
            );
          }
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = this.data[this.pos + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = ((firstByte & 31) << 6) | (secondByte & 63);
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = this.data[this.pos + 1];
              thirdByte = this.data[this.pos + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint =
                  ((firstByte & 15) << 12) |
                  ((secondByte & 63) << 6) |
                  (thirdByte & 63);
                if (
                  tempCodePoint > 2047 &&
                  (tempCodePoint < 55296 || tempCodePoint > 57343)
                ) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = this.data[this.pos + 1];
              thirdByte = this.data[this.pos + 2];
              fourthByte = this.data[this.pos + 3];
              if (
                (secondByte & 192) === 128 &&
                (thirdByte & 192) === 128 &&
                (fourthByte & 192) === 128
              ) {
                tempCodePoint =
                  ((firstByte & 15) << 18) |
                  ((secondByte & 63) << 12) |
                  ((thirdByte & 63) << 6) |
                  (fourthByte & 63);
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            chars.push(((codePoint >>> 10) & 1023) | 55296);
            codePoint = 56320 | (codePoint & 1023);
          }
          chars.push(codePoint);
          this.pos += bytesPerSequence;
        };
        while (!this.done()) {
          const ch = this.ch();
          let ch1;
          switch (ch) {
            case 92:
              this.pos++;
              if (this.done()) {
                throw new Error(
                  `${decodeErrPrefix} unexpected string termination at position ${this.pos}`
                );
              }
              ch1 = this.ch();
              this.pos++;
              switch (ch1) {
                case 34:
                case 39:
                case 92:
                case 47:
                  chars.push(ch1);
                  break;
                case 98:
                  chars.push(8);
                  break;
                case 116:
                  chars.push(9);
                  break;
                case 110:
                  chars.push(10);
                  break;
                case 102:
                  chars.push(12);
                  break;
                case 114:
                  chars.push(13);
                  break;
                case 117:
                  chars.push(readu4());
                  break;
                default:
                  throw new Error(
                    `${decodeErrPrefix} unexpected string escape character at position ${this.pos}`
                  );
              }
              break;
            case 34:
              this.pos++;
              return new Token(
                Type.string,
                decodeCodePointsArray(chars),
                this.pos - startPos
              );
            default:
              if (ch < 32) {
                throw new Error(
                  `${decodeErrPrefix} invalid control character at position ${this.pos}`
                );
              } else if (ch < 128) {
                chars.push(ch);
                this.pos++;
              } else {
                readUtf8Char();
              }
          }
        }
        throw new Error(
          `${decodeErrPrefix} unexpected end of string at position ${this.pos}`
        );
      }
      parseValue() {
        switch (this.ch()) {
          case 123:
            this.modeStack.push("obj-start");
            this.pos++;
            return new Token(Type.map, Infinity, 1);
          case 91:
            this.modeStack.push("array-start");
            this.pos++;
            return new Token(Type.array, Infinity, 1);
          case 34: {
            return this.parseString();
          }
          case 110:
            this.expect([110, 117, 108, 108]);
            return new Token(Type.null, null, 4);
          case 102:
            this.expect([102, 97, 108, 115, 101]);
            return new Token(Type.false, false, 5);
          case 116:
            this.expect([116, 114, 117, 101]);
            return new Token(Type.true, true, 4);
          case 45:
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            return this.parseNumber();
          default:
            throw new Error(
              `${decodeErrPrefix} unexpected character at position ${this.pos}`
            );
        }
      }
      next() {
        this.skipWhitespace();
        switch (this.currentMode()) {
          case "value":
            this.modeStack.pop();
            return this.parseValue();
          case "array-value": {
            this.modeStack.pop();
            if (this.ch() === 93) {
              this.pos++;
              this.skipWhitespace();
              return new Token(Type.break, void 0, 1);
            }
            if (this.ch() !== 44) {
              throw new Error(
                `${decodeErrPrefix} unexpected character at position ${
                  this.pos
                }, was expecting array delimiter but found '${String.fromCharCode(
                  this.ch()
                )}'`
              );
            }
            this.pos++;
            this.modeStack.push("array-value");
            this.skipWhitespace();
            return this.parseValue();
          }
          case "array-start": {
            this.modeStack.pop();
            if (this.ch() === 93) {
              this.pos++;
              this.skipWhitespace();
              return new Token(Type.break, void 0, 1);
            }
            this.modeStack.push("array-value");
            this.skipWhitespace();
            return this.parseValue();
          }
          case "obj-key":
            if (this.ch() === 125) {
              this.modeStack.pop();
              this.pos++;
              this.skipWhitespace();
              return new Token(Type.break, void 0, 1);
            }
            if (this.ch() !== 44) {
              throw new Error(
                `${decodeErrPrefix} unexpected character at position ${
                  this.pos
                }, was expecting object delimiter but found '${String.fromCharCode(
                  this.ch()
                )}'`
              );
            }
            this.pos++;
            this.skipWhitespace();
          case "obj-start": {
            this.modeStack.pop();
            if (this.ch() === 125) {
              this.pos++;
              this.skipWhitespace();
              return new Token(Type.break, void 0, 1);
            }
            const token = this.parseString();
            this.skipWhitespace();
            if (this.ch() !== 58) {
              throw new Error(
                `${decodeErrPrefix} unexpected character at position ${
                  this.pos
                }, was expecting key/value delimiter ':' but found '${String.fromCharCode(
                  this.ch()
                )}'`
              );
            }
            this.pos++;
            this.modeStack.push("obj-value");
            return token;
          }
          case "obj-value": {
            this.modeStack.pop();
            this.modeStack.push("obj-key");
            this.skipWhitespace();
            return this.parseValue();
          }
          default:
            throw new Error(
              `${decodeErrPrefix} unexpected parse state at position ${this.pos}; this shouldn't happen`
            );
        }
      }
    };
  },
});

// node_modules/cborg/esm/lib/json/json.js
var init_json = __esm({
  "node_modules/cborg/esm/lib/json/json.js"() {
    init_node_globals();
    init_encode2();
    init_decode2();
  },
});

// node_modules/@ipld/dag-json/esm/index.js
var esm_exports2 = {};
__export(esm_exports2, {
  code: () => code3,
  decode: () => decode9,
  encode: () => encode7,
  name: () => name3,
});
function cidEncoder2(obj) {
  if (obj.asCID !== obj) {
    return null;
  }
  const cid = CID.asCID(obj);
  if (!cid) {
    return null;
  }
  const cidString = cid.toString();
  return [
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, "/", 1),
    new Token(Type.string, cidString, cidString.length),
    new Token(Type.break, void 0, 1),
  ];
}
function bytesEncoder(bytes) {
  const bytesString = base64.encode(bytes).slice(1);
  return [
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, "/", 1),
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, "bytes", 5),
    new Token(Type.string, bytesString, bytesString.length),
    new Token(Type.break, void 0, 1),
    new Token(Type.break, void 0, 1),
  ];
}
function undefinedEncoder2() {
  throw new Error(
    "`undefined` is not supported by the IPLD Data Model and cannot be encoded"
  );
}
function numberEncoder2(num) {
  if (Number.isNaN(num)) {
    throw new Error(
      "`NaN` is not supported by the IPLD Data Model and cannot be encoded"
    );
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error(
      "`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded"
    );
  }
  return null;
}
var encodeOptions2,
  DagJsonTokenizer,
  decodeOptions2,
  name3,
  code3,
  encode7,
  decode9;
var init_esm2 = __esm({
  "node_modules/@ipld/dag-json/esm/index.js"() {
    init_node_globals();
    init_src2();
    init_base64();
    init_cborg();
    init_json();
    encodeOptions2 = {
      typeEncoders: {
        Object: cidEncoder2,
        Uint8Array: bytesEncoder,
        Buffer: bytesEncoder,
        undefined: undefinedEncoder2,
        number: numberEncoder2,
      },
    };
    DagJsonTokenizer = class extends Tokenizer {
      constructor(data, options) {
        super(data, options);
        this.tokenBuffer = [];
      }
      done() {
        return this.tokenBuffer.length === 0 && super.done();
      }
      _next() {
        if (this.tokenBuffer.length > 0) {
          return this.tokenBuffer.pop();
        }
        return super.next();
      }
      next() {
        const token = this._next();
        if (token.type === Type.map) {
          const keyToken = this._next();
          if (keyToken.type === Type.string && keyToken.value === "/") {
            const valueToken = this._next();
            if (valueToken.type === Type.string) {
              const breakToken = this._next();
              if (breakToken.type !== Type.break) {
                throw new Error("Invalid encoded CID form");
              }
              this.tokenBuffer.push(valueToken);
              return new Token(Type.tag, 42, 0);
            }
            if (valueToken.type === Type.map) {
              const innerKeyToken = this._next();
              if (
                innerKeyToken.type === Type.string &&
                innerKeyToken.value === "bytes"
              ) {
                const innerValueToken = this._next();
                if (innerValueToken.type === Type.string) {
                  for (let i = 0; i < 2; i++) {
                    const breakToken = this._next();
                    if (breakToken.type !== Type.break) {
                      throw new Error("Invalid encoded Bytes form");
                    }
                  }
                  const bytes = base64.decode(`m${innerValueToken.value}`);
                  return new Token(
                    Type.bytes,
                    bytes,
                    innerValueToken.value.length
                  );
                }
                this.tokenBuffer.push(innerValueToken);
              }
              this.tokenBuffer.push(innerKeyToken);
            }
            this.tokenBuffer.push(valueToken);
          }
          this.tokenBuffer.push(keyToken);
        }
        return token;
      }
    };
    decodeOptions2 = {
      allowIndefinite: false,
      allowUndefined: false,
      allowNaN: false,
      allowInfinity: false,
      allowBigInt: true,
      strict: true,
      useMaps: false,
      tags: [],
    };
    decodeOptions2.tags[42] = CID.parse;
    name3 = "dag-json";
    code3 = 297;
    encode7 = (node) => encode6(node, encodeOptions2);
    decode9 = (data) => {
      const options = Object.assign(decodeOptions2, {
        tokenizer: new DagJsonTokenizer(data, decodeOptions2),
      });
      return decode8(data, options);
    };
  },
});

// node_modules/dag-jose/lib/utils.js
var require_utils = __commonJS({
  "node_modules/dag-jose/lib/utils.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fromBase64url = exports2.toBase64url = void 0;
    var base64_1 = (init_base64(), __toCommonJS(base64_exports));
    function toBase64url(b) {
      return base64_1.base64url.encode(b).slice(1);
    }
    exports2.toBase64url = toBase64url;
    function fromBase64url(s) {
      return base64_1.base64url.decode(`u${s}`);
    }
    exports2.fromBase64url = fromBase64url;
  },
});

// node_modules/dag-jose/lib/signing.js
var require_signing = __commonJS({
  "node_modules/dag-jose/lib/signing.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils();
    var cid_1 = (init_cid(), __toCommonJS(cid_exports));
    function fromSplit(split) {
      const [protectedHeader, payload, signature] = split;
      return {
        payload,
        signatures: [{ protected: protectedHeader, signature }],
        link: cid_1.CID.decode(utils_1.fromBase64url(payload)),
      };
    }
    function encodeSignature(signature) {
      const encoded = {
        signature: utils_1.fromBase64url(signature.signature),
      };
      if (signature.header) encoded.header = signature.header;
      if (signature.protected)
        encoded.protected = utils_1.fromBase64url(signature.protected);
      return encoded;
    }
    function encode12(jws) {
      const payload = utils_1.fromBase64url(jws.payload);
      try {
        cid_1.CID.decode(payload);
      } catch (e) {
        throw new Error("Not a valid DagJWS");
      }
      const encodedJws = {
        payload,
        signatures: jws.signatures.map(encodeSignature),
      };
      return encodedJws;
    }
    function decodeSignature(encoded) {
      const sign = {
        signature: utils_1.toBase64url(encoded.signature),
      };
      if (encoded.header) sign.header = encoded.header;
      if (encoded.protected)
        sign.protected = utils_1.toBase64url(encoded.protected);
      return sign;
    }
    function decode13(encoded) {
      const decoded = {
        payload: utils_1.toBase64url(encoded.payload),
        signatures: encoded.signatures.map(decodeSignature),
      };
      decoded.link = cid_1.CID.decode(new Uint8Array(encoded.payload));
      return decoded;
    }
    exports2.default = {
      fromSplit,
      encode: encode12,
      decode: decode13,
    };
  },
});

// node_modules/dag-jose/lib/encryption.js
var require_encryption = __commonJS({
  "node_modules/dag-jose/lib/encryption.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils();
    function fromSplit(split) {
      const [protectedHeader, encrypted_key, iv, ciphertext, tag] = split;
      const jwe = {
        ciphertext,
        iv,
        protected: protectedHeader,
        tag,
      };
      if (encrypted_key) jwe.recipients = [{ encrypted_key }];
      return jwe;
    }
    function encodeRecipient(recipient) {
      const encRec = {};
      if (recipient.encrypted_key)
        encRec.encrypted_key = utils_1.fromBase64url(recipient.encrypted_key);
      if (recipient.header) encRec.header = recipient.header;
      return encRec;
    }
    function encode12(jwe) {
      const encJwe = {
        ciphertext: utils_1.fromBase64url(jwe.ciphertext),
        protected: utils_1.fromBase64url(jwe.protected),
        iv: utils_1.fromBase64url(jwe.iv),
        tag: utils_1.fromBase64url(jwe.tag),
      };
      if (jwe.aad) encJwe.aad = utils_1.fromBase64url(jwe.aad);
      if (jwe.recipients)
        encJwe.recipients = jwe.recipients.map(encodeRecipient);
      if (jwe.unprotected) encJwe.unprotected = jwe.unprotected;
      return encJwe;
    }
    function decodeRecipient(encoded) {
      const recipient = {};
      if (encoded.encrypted_key)
        recipient.encrypted_key = utils_1.toBase64url(encoded.encrypted_key);
      if (encoded.header) recipient.header = encoded.header;
      return recipient;
    }
    function decode13(encoded) {
      const jwe = {
        ciphertext: utils_1.toBase64url(encoded.ciphertext),
        protected: utils_1.toBase64url(encoded.protected),
        iv: utils_1.toBase64url(encoded.iv),
        tag: utils_1.toBase64url(encoded.tag),
      };
      if (encoded.aad) jwe.aad = utils_1.toBase64url(encoded.aad);
      if (encoded.recipients)
        jwe.recipients = encoded.recipients.map(decodeRecipient);
      if (encoded.unprotected) jwe.unprotected = encoded.unprotected;
      return jwe;
    }
    exports2.default = {
      fromSplit,
      decode: decode13,
      encode: encode12,
    };
  },
});

// node_modules/dag-jose/node_modules/@ipld/dag-cbor/esm/index.js
var esm_exports3 = {};
__export(esm_exports3, {
  code: () => code4,
  decode: () => decode10,
  encode: () => encode8,
  name: () => name4,
});
function cidEncoder3(obj) {
  if (obj.asCID !== obj) {
    return null;
  }
  const cid = CID.asCID(obj);
  if (!cid) {
    return null;
  }
  const bytes = new Uint8Array(cid.bytes.byteLength + 1);
  bytes.set(cid.bytes, 1);
  return [new Token(Type.tag, CID_CBOR_TAG2), new Token(Type.bytes, bytes)];
}
function undefinedEncoder3() {
  throw new Error(
    "`undefined` is not supported by the IPLD Data Model and cannot be encoded"
  );
}
function numberEncoder3(num) {
  if (Number.isNaN(num)) {
    throw new Error(
      "`NaN` is not supported by the IPLD Data Model and cannot be encoded"
    );
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error(
      "`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded"
    );
  }
  return null;
}
function cidDecoder2(bytes) {
  if (bytes[0] !== 0) {
    throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
  }
  return CID.decode(bytes.subarray(1));
}
var CID_CBOR_TAG2,
  encodeOptions3,
  decodeOptions3,
  name4,
  code4,
  encode8,
  decode10;
var init_esm3 = __esm({
  "node_modules/dag-jose/node_modules/@ipld/dag-cbor/esm/index.js"() {
    init_node_globals();
    init_cborg();
    init_cid();
    CID_CBOR_TAG2 = 42;
    encodeOptions3 = {
      float64: true,
      typeEncoders: {
        Object: cidEncoder3,
        undefined: undefinedEncoder3,
        number: numberEncoder3,
      },
    };
    decodeOptions3 = {
      allowIndefinite: false,
      allowUndefined: false,
      allowNaN: false,
      allowInfinity: false,
      allowBigInt: true,
      strict: true,
      useMaps: false,
      tags: [],
    };
    decodeOptions3.tags[CID_CBOR_TAG2] = cidDecoder2;
    name4 = "dag-cbor";
    code4 = 113;
    encode8 = (node) => encode4(node, encodeOptions3);
    decode10 = (data) => decode6(data, decodeOptions3);
  },
});

// node_modules/dag-jose/lib/index.js
var require_lib = __commonJS({
  "node_modules/dag-jose/lib/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var __createBinding =
      (exports2 && exports2.__createBinding) ||
      (Object.create
        ? function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            Object.defineProperty(o, k2, {
              enumerable: true,
              get: function () {
                return m[k];
              },
            });
          }
        : function (o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
    var __setModuleDefault =
      (exports2 && exports2.__setModuleDefault) ||
      (Object.create
        ? function (o, v) {
            Object.defineProperty(o, "default", { enumerable: true, value: v });
          }
        : function (o, v) {
            o["default"] = v;
          });
    var __importStar =
      (exports2 && exports2.__importStar) ||
      function (mod2) {
        if (mod2 && mod2.__esModule) return mod2;
        var result = {};
        if (mod2 != null) {
          for (var k in mod2)
            if (
              k !== "default" &&
              Object.prototype.hasOwnProperty.call(mod2, k)
            )
              __createBinding(result, mod2, k);
        }
        __setModuleDefault(result, mod2);
        return result;
      };
    var __importDefault =
      (exports2 && exports2.__importDefault) ||
      function (mod2) {
        return mod2 && mod2.__esModule ? mod2 : { default: mod2 };
      };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.decode =
      exports2.encode =
      exports2.toGeneral =
      exports2.code =
      exports2.name =
        void 0;
    var signing_1 = __importDefault(require_signing());
    var encryption_1 = __importDefault(require_encryption());
    var cbor = __importStar((init_esm3(), __toCommonJS(esm_exports3)));
    exports2.name = "dag-jose";
    exports2.code = 133;
    function isDagJWS(jose) {
      return (
        "payload" in jose &&
        typeof jose.payload === "string" &&
        "signatures" in jose &&
        Array.isArray(jose.signatures)
      );
    }
    function isEncodedJWS(jose) {
      return (
        "payload" in jose &&
        jose.payload instanceof Uint8Array &&
        "signatures" in jose &&
        Array.isArray(jose.signatures)
      );
    }
    function isEncodedJWE(jose) {
      return (
        "ciphertext" in jose &&
        jose.ciphertext instanceof Uint8Array &&
        "iv" in jose &&
        jose.iv instanceof Uint8Array &&
        "protected" in jose &&
        jose.protected instanceof Uint8Array &&
        "tag" in jose &&
        jose.tag instanceof Uint8Array
      );
    }
    function isDagJWE(jose) {
      return (
        "ciphertext" in jose &&
        typeof jose.ciphertext === "string" &&
        "iv" in jose &&
        typeof jose.iv === "string" &&
        "protected" in jose &&
        typeof jose.protected === "string" &&
        "tag" in jose &&
        typeof jose.tag === "string"
      );
    }
    function toGeneral(jose) {
      if (typeof jose === "string") {
        const split = jose.split(".");
        if (split.length === 3) {
          return signing_1.default.fromSplit(split);
        } else if (split.length === 5) {
          return encryption_1.default.fromSplit(split);
        }
        throw new Error("Not a valid JOSE string");
      }
      if (isDagJWS(jose) || isDagJWE(jose)) {
        return jose;
      }
      throw new Error("Not a valid unencoded JOSE object");
    }
    exports2.toGeneral = toGeneral;
    function encode12(obj) {
      if (typeof obj === "string") {
        obj = toGeneral(obj);
      }
      let encodedJose;
      if (isDagJWS(obj)) {
        encodedJose = signing_1.default.encode(obj);
      } else if (isDagJWE(obj)) {
        encodedJose = encryption_1.default.encode(obj);
      } else {
        throw new Error("Not a valid JOSE object");
      }
      return new Uint8Array(cbor.encode(encodedJose));
    }
    exports2.encode = encode12;
    function decode13(data) {
      let encoded;
      try {
        encoded = cbor.decode(data);
      } catch (e) {
        throw new Error("Not a valid DAG-JOSE object");
      }
      if (isEncodedJWS(encoded)) {
        return signing_1.default.decode(encoded);
      } else if (isEncodedJWE(encoded)) {
        return encryption_1.default.decode(encoded);
      } else {
        throw new Error("Not a valid DAG-JOSE object");
      }
    }
    exports2.decode = decode13;
  },
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity,
});
var code5, name5, encode9, digest, identity;
var init_identity = __esm({
  "node_modules/multiformats/esm/src/hashes/identity.js"() {
    init_node_globals();
    init_bytes();
    init_digest();
    code5 = 0;
    name5 = "identity";
    encode9 = coerce;
    digest = (input) => create(code5, encode9(input));
    identity = {
      code: code5,
      name: name5,
      encode: encode9,
      digest,
    };
  },
});

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2,
});
var identity2;
var init_identity2 = __esm({
  "node_modules/multiformats/esm/src/bases/identity.js"() {
    init_node_globals();
    init_base();
    init_bytes();
    identity2 = from({
      prefix: "\0",
      name: "identity",
      encode: (buf2) => toString(buf2),
      decode: (str) => fromString(str),
    });
  },
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2,
});
var base2;
var init_base2 = __esm({
  "node_modules/multiformats/esm/src/bases/base2.js"() {
    init_node_globals();
    init_base();
    base2 = rfc4648({
      prefix: "0",
      name: "base2",
      alphabet: "01",
      bitsPerChar: 1,
    });
  },
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8,
});
var base8;
var init_base8 = __esm({
  "node_modules/multiformats/esm/src/bases/base8.js"() {
    init_node_globals();
    init_base();
    base8 = rfc4648({
      prefix: "7",
      name: "base8",
      alphabet: "01234567",
      bitsPerChar: 3,
    });
  },
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10,
});
var base10;
var init_base10 = __esm({
  "node_modules/multiformats/esm/src/bases/base10.js"() {
    init_node_globals();
    init_base();
    base10 = baseX({
      prefix: "9",
      name: "base10",
      alphabet: "0123456789",
    });
  },
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper,
});
var base16, base16upper;
var init_base16 = __esm({
  "node_modules/multiformats/esm/src/bases/base16.js"() {
    init_node_globals();
    init_base();
    base16 = rfc4648({
      prefix: "f",
      name: "base16",
      alphabet: "0123456789abcdef",
      bitsPerChar: 4,
    });
    base16upper = rfc4648({
      prefix: "F",
      name: "base16upper",
      alphabet: "0123456789ABCDEF",
      bitsPerChar: 4,
    });
  },
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper,
});
var base36, base36upper;
var init_base36 = __esm({
  "node_modules/multiformats/esm/src/bases/base36.js"() {
    init_node_globals();
    init_base();
    base36 = baseX({
      prefix: "k",
      name: "base36",
      alphabet: "0123456789abcdefghijklmnopqrstuvwxyz",
    });
    base36upper = baseX({
      prefix: "K",
      name: "base36upper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    });
  },
});

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512,
});
var sha, sha256, sha512;
var init_sha2_browser = __esm({
  "node_modules/multiformats/esm/src/hashes/sha2-browser.js"() {
    init_node_globals();
    init_hasher();
    sha = (name8) => async (data) =>
      new Uint8Array(await crypto.subtle.digest(name8, data));
    sha256 = from2({
      name: "sha2-256",
      code: 18,
      encode: sha("SHA-256"),
    });
    sha512 = from2({
      name: "sha2-512",
      code: 19,
      encode: sha("SHA-512"),
    });
  },
});

// node_modules/multiformats/esm/src/codecs/raw.js
var raw_exports = {};
__export(raw_exports, {
  code: () => code6,
  decode: () => decode11,
  encode: () => encode10,
  name: () => name6,
});
var name6, code6, encode10, decode11;
var init_raw = __esm({
  "node_modules/multiformats/esm/src/codecs/raw.js"() {
    init_node_globals();
    init_bytes();
    name6 = "raw";
    code6 = 85;
    encode10 = (node) => coerce(node);
    decode11 = (data) => coerce(data);
  },
});

// node_modules/multiformats/esm/src/codecs/json.js
var json_exports2 = {};
__export(json_exports2, {
  code: () => code7,
  decode: () => decode12,
  encode: () => encode11,
  name: () => name7,
});
var textEncoder4, textDecoder3, name7, code7, encode11, decode12;
var init_json2 = __esm({
  "node_modules/multiformats/esm/src/codecs/json.js"() {
    init_node_globals();
    textEncoder4 = new TextEncoder();
    textDecoder3 = new TextDecoder();
    name7 = "json";
    code7 = 512;
    encode11 = (node) => textEncoder4.encode(JSON.stringify(node));
    decode12 = (data) => JSON.parse(textDecoder3.decode(data));
  },
});

// node_modules/multiformats/esm/src/basics.js
var basics_exports = {};
__export(basics_exports, {
  CID: () => CID,
  bases: () => bases,
  bytes: () => bytes_exports,
  codecs: () => codecs,
  digest: () => digest_exports,
  hasher: () => hasher_exports,
  hashes: () => hashes,
  varint: () => varint_exports,
});
var bases, hashes, codecs;
var init_basics = __esm({
  "node_modules/multiformats/esm/src/basics.js"() {
    init_node_globals();
    init_identity2();
    init_base2();
    init_base8();
    init_base10();
    init_base16();
    init_base32();
    init_base36();
    init_base58();
    init_base64();
    init_sha2_browser();
    init_identity();
    init_raw();
    init_json2();
    init_src2();
    bases = {
      ...identity_exports2,
      ...base2_exports,
      ...base8_exports,
      ...base10_exports,
      ...base16_exports,
      ...base32_exports,
      ...base36_exports,
      ...base58_exports,
      ...base64_exports,
    };
    hashes = {
      ...sha2_browser_exports,
      ...identity_exports,
    };
    codecs = {
      raw: raw_exports,
      json: json_exports2,
    };
  },
});

// node_modules/ip-regex/index.js
var require_ip_regex = __commonJS({
  "node_modules/ip-regex/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var word = "[a-fA-F\\d:]";
    var b = (options) =>
      options && options.includeBoundaries
        ? `(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))`
        : "";
    var v4 =
      "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
    var v6seg = "[a-fA-F\\d]{1,4}";
    var v6 = `
(?:
(?:${v6seg}:){7}(?:${v6seg}|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${v4}|:${v6seg}|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${v4}|(?::${v6seg}){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(?::${v6seg}){0,1}:${v4}|(?::${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(?::${v6seg}){0,2}:${v4}|(?::${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(?::${v6seg}){0,3}:${v4}|(?::${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(?::${v6seg}){0,4}:${v4}|(?::${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::${v6seg}){0,5}:${v4}|(?::${v6seg}){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`
      .replace(/\s*\/\/.*$/gm, "")
      .replace(/\n/g, "")
      .trim();
    var v46Exact = new RegExp(`(?:^${v4}$)|(?:^${v6}$)`);
    var v4exact = new RegExp(`^${v4}$`);
    var v6exact = new RegExp(`^${v6}$`);
    var ip = (options) =>
      options && options.exact
        ? v46Exact
        : new RegExp(
            `(?:${b(options)}${v4}${b(options)})|(?:${b(options)}${v6}${b(
              options
            )})`,
            "g"
          );
    ip.v4 = (options) =>
      options && options.exact
        ? v4exact
        : new RegExp(`${b(options)}${v4}${b(options)}`, "g");
    ip.v6 = (options) =>
      options && options.exact
        ? v6exact
        : new RegExp(`${b(options)}${v6}${b(options)}`, "g");
    module2.exports = ip;
  },
});

// node_modules/is-ip/index.js
var require_is_ip = __commonJS({
  "node_modules/is-ip/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var ipRegex = require_ip_regex();
    var isIp = (string2) => ipRegex({ exact: true }).test(string2);
    isIp.v4 = (string2) => ipRegex.v4({ exact: true }).test(string2);
    isIp.v6 = (string2) => ipRegex.v6({ exact: true }).test(string2);
    isIp.version = (string2) =>
      isIp(string2) ? (isIp.v4(string2) ? 4 : 6) : void 0;
    module2.exports = isIp;
  },
});

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name8, prefix, encode12, decode13) {
  return {
    name: name8,
    prefix,
    encoder: {
      name: name8,
      prefix,
      encode: encode12,
    },
    decoder: { decode: decode13 },
  };
}
var string, ascii, BASES, bases_default;
var init_bases = __esm({
  "node_modules/uint8arrays/esm/src/util/bases.js"() {
    init_node_globals();
    init_basics();
    string = createCodec(
      "utf8",
      "u",
      (buf2) => {
        const decoder = new TextDecoder("utf8");
        return "u" + decoder.decode(buf2);
      },
      (str) => {
        const encoder = new TextEncoder();
        return encoder.encode(str.substring(1));
      }
    );
    ascii = createCodec(
      "ascii",
      "a",
      (buf2) => {
        let string2 = "a";
        for (let i = 0; i < buf2.length; i++) {
          string2 += String.fromCharCode(buf2[i]);
        }
        return string2;
      },
      (str) => {
        str = str.substring(1);
        const buf2 = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
          buf2[i] = str.charCodeAt(i);
        }
        return buf2;
      }
    );
    BASES = {
      utf8: string,
      "utf-8": string,
      hex: bases.base16,
      latin1: ascii,
      ascii,
      binary: ascii,
      ...bases,
    };
    bases_default = BASES;
  },
});

// node_modules/uint8arrays/esm/src/to-string.js
var to_string_exports = {};
__export(to_string_exports, {
  toString: () => toString3,
});
function toString3(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base3.encoder.encode(array).substring(1);
}
var init_to_string = __esm({
  "node_modules/uint8arrays/esm/src/to-string.js"() {
    init_node_globals();
    init_bases();
  },
});

// node_modules/multiaddr/src/ip.js
var require_ip = __commonJS({
  "node_modules/multiaddr/src/ip.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var isIp = require_is_ip();
    var { toString: uint8ArrayToString } =
      (init_to_string(), __toCommonJS(to_string_exports));
    var isIP = isIp;
    var isV4 = isIp.v4;
    var isV6 = isIp.v6;
    var toBytes2 = function (ip, buff, offset) {
      offset = ~~offset;
      let result;
      if (isV4(ip)) {
        result = buff || new Uint8Array(offset + 4);
        ip.split(/\./g).map(function (byte) {
          result[offset++] = parseInt(byte, 10) & 255;
        });
      } else if (isV6(ip)) {
        const sections = ip.split(":", 8);
        let i;
        for (i = 0; i < sections.length; i++) {
          const isv4 = isV4(sections[i]);
          let v4Buffer;
          if (isv4) {
            v4Buffer = toBytes2(sections[i]);
            sections[i] = uint8ArrayToString(v4Buffer.slice(0, 2), "base16");
          }
          if (v4Buffer && ++i < 8) {
            sections.splice(
              i,
              0,
              uint8ArrayToString(v4Buffer.slice(2, 4), "base16")
            );
          }
        }
        if (sections[0] === "") {
          while (sections.length < 8) sections.unshift("0");
        } else if (sections[sections.length - 1] === "") {
          while (sections.length < 8) sections.push("0");
        } else if (sections.length < 8) {
          for (i = 0; i < sections.length && sections[i] !== ""; i++);
          const argv = [i, "1"];
          for (i = 9 - sections.length; i > 0; i--) {
            argv.push("0");
          }
          sections.splice.apply(sections, argv);
        }
        result = buff || new Uint8Array(offset + 16);
        for (i = 0; i < sections.length; i++) {
          const word = parseInt(sections[i], 16);
          result[offset++] = (word >> 8) & 255;
          result[offset++] = word & 255;
        }
      }
      if (!result) {
        throw Error("Invalid ip address: " + ip);
      }
      return result;
    };
    var toString4 = function (buff, offset, length2) {
      offset = ~~offset;
      length2 = length2 || buff.length - offset;
      const result = [];
      let string2;
      const view = new DataView(buff.buffer);
      if (length2 === 4) {
        for (let i = 0; i < length2; i++) {
          result.push(buff[offset + i]);
        }
        string2 = result.join(".");
      } else if (length2 === 16) {
        for (let i = 0; i < length2; i += 2) {
          result.push(view.getUint16(offset + i).toString(16));
        }
        string2 = result.join(":");
        string2 = string2.replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3");
        string2 = string2.replace(/:{3,4}/, "::");
      }
      return string2;
    };
    module2.exports = {
      isIP,
      isV4,
      isV6,
      toBytes: toBytes2,
      toString: toString4,
    };
  },
});

// node_modules/multiaddr/src/protocols-table.js
var require_protocols_table = __commonJS({
  "node_modules/multiaddr/src/protocols-table.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    function Protocols(proto) {
      if (typeof proto === "number") {
        if (Protocols.codes[proto]) {
          return Protocols.codes[proto];
        }
        throw new Error("no protocol with code: " + proto);
      } else if (typeof proto === "string") {
        if (Protocols.names[proto]) {
          return Protocols.names[proto];
        }
        throw new Error("no protocol with name: " + proto);
      }
      throw new Error("invalid protocol id type: " + proto);
    }
    var V = -1;
    Protocols.lengthPrefixedVarSize = V;
    Protocols.V = V;
    Protocols.table = [
      [4, 32, "ip4"],
      [6, 16, "tcp"],
      [33, 16, "dccp"],
      [41, 128, "ip6"],
      [42, V, "ip6zone"],
      [53, V, "dns", "resolvable"],
      [54, V, "dns4", "resolvable"],
      [55, V, "dns6", "resolvable"],
      [56, V, "dnsaddr", "resolvable"],
      [132, 16, "sctp"],
      [273, 16, "udp"],
      [275, 0, "p2p-webrtc-star"],
      [276, 0, "p2p-webrtc-direct"],
      [277, 0, "p2p-stardust"],
      [290, 0, "p2p-circuit"],
      [301, 0, "udt"],
      [302, 0, "utp"],
      [400, V, "unix", false, "path"],
      [421, V, "ipfs"],
      [421, V, "p2p"],
      [443, 0, "https"],
      [444, 96, "onion"],
      [445, 296, "onion3"],
      [446, V, "garlic64"],
      [460, 0, "quic"],
      [477, 0, "ws"],
      [478, 0, "wss"],
      [479, 0, "p2p-websocket-star"],
      [480, 0, "http"],
      [777, V, "memory"],
    ];
    Protocols.names = {};
    Protocols.codes = {};
    Protocols.table.map((row) => {
      const proto = p.apply(null, row);
      Protocols.codes[proto.code] = proto;
      Protocols.names[proto.name] = proto;
      return null;
    });
    Protocols.object = p;
    function p(code8, size, name8, resolvable, path) {
      return {
        code: code8,
        size,
        name: name8,
        resolvable: Boolean(resolvable),
        path: Boolean(path),
      };
    }
    module2.exports = Protocols;
  },
});

// node_modules/multiaddr/node_modules/varint/encode.js
var require_encode = __commonJS({
  "node_modules/multiaddr/node_modules/varint/encode.js"(exports2, module2) {
    init_node_globals();
    module2.exports = encode12;
    var MSB2 = 128;
    var REST2 = 127;
    var MSBALL2 = ~REST2;
    var INT2 = Math.pow(2, 31);
    function encode12(num, out, offset) {
      if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
        encode12.bytes = 0;
        throw new RangeError("Could not encode varint");
      }
      out = out || [];
      offset = offset || 0;
      var oldOffset = offset;
      while (num >= INT2) {
        out[offset++] = (num & 255) | MSB2;
        num /= 128;
      }
      while (num & MSBALL2) {
        out[offset++] = (num & 255) | MSB2;
        num >>>= 7;
      }
      out[offset] = num | 0;
      encode12.bytes = offset - oldOffset + 1;
      return out;
    }
  },
});

// node_modules/multiaddr/node_modules/varint/decode.js
var require_decode = __commonJS({
  "node_modules/multiaddr/node_modules/varint/decode.js"(exports2, module2) {
    init_node_globals();
    module2.exports = read2;
    var MSB2 = 128;
    var REST2 = 127;
    function read2(buf2, offset) {
      var res = 0,
        offset = offset || 0,
        shift = 0,
        counter = offset,
        b,
        l = buf2.length;
      do {
        if (counter >= l || shift > 49) {
          read2.bytes = 0;
          throw new RangeError("Could not decode varint");
        }
        b = buf2[counter++];
        res +=
          shift < 28 ? (b & REST2) << shift : (b & REST2) * Math.pow(2, shift);
        shift += 7;
      } while (b >= MSB2);
      read2.bytes = counter - offset;
      return res;
    }
  },
});

// node_modules/multiaddr/node_modules/varint/length.js
var require_length = __commonJS({
  "node_modules/multiaddr/node_modules/varint/length.js"(exports2, module2) {
    init_node_globals();
    var N12 = Math.pow(2, 7);
    var N22 = Math.pow(2, 14);
    var N32 = Math.pow(2, 21);
    var N42 = Math.pow(2, 28);
    var N52 = Math.pow(2, 35);
    var N62 = Math.pow(2, 42);
    var N72 = Math.pow(2, 49);
    var N82 = Math.pow(2, 56);
    var N92 = Math.pow(2, 63);
    module2.exports = function (value) {
      return value < N12
        ? 1
        : value < N22
        ? 2
        : value < N32
        ? 3
        : value < N42
        ? 4
        : value < N52
        ? 5
        : value < N62
        ? 6
        : value < N72
        ? 7
        : value < N82
        ? 8
        : value < N92
        ? 9
        : 10;
    };
  },
});

// node_modules/multiaddr/node_modules/varint/index.js
var require_varint = __commonJS({
  "node_modules/multiaddr/node_modules/varint/index.js"(exports2, module2) {
    init_node_globals();
    module2.exports = {
      encode: require_encode(),
      decode: require_decode(),
      encodingLength: require_length(),
    };
  },
});

// node_modules/uint8arrays/esm/src/from-string.js
var from_string_exports = {};
__export(from_string_exports, {
  fromString: () => fromString3,
});
function fromString3(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
var init_from_string = __esm({
  "node_modules/uint8arrays/esm/src/from-string.js"() {
    init_node_globals();
    init_bases();
  },
});

// node_modules/uint8arrays/esm/src/concat.js
var concat_exports = {};
__export(concat_exports, {
  concat: () => concat2,
});
function concat2(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = new Uint8Array(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}
var init_concat = __esm({
  "node_modules/uint8arrays/esm/src/concat.js"() {
    init_node_globals();
  },
});

// node_modules/multiaddr/src/convert.js
var require_convert = __commonJS({
  "node_modules/multiaddr/src/convert.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var ip = require_ip();
    var protocols = require_protocols_table();
    var { CID: CID2 } = (init_cid(), __toCommonJS(cid_exports));
    var { base32: base322 } = (init_base32(), __toCommonJS(base32_exports));
    var { base58btc: base58btc2 } =
      (init_base58(), __toCommonJS(base58_exports));
    var Digest2 = (init_digest(), __toCommonJS(digest_exports));
    var varint2 = require_varint();
    var { toString: uint8ArrayToString } =
      (init_to_string(), __toCommonJS(to_string_exports));
    var { fromString: uint8ArrayFromString } =
      (init_from_string(), __toCommonJS(from_string_exports));
    var { concat: uint8ArrayConcat } =
      (init_concat(), __toCommonJS(concat_exports));
    module2.exports = Convert;
    function Convert(proto, a) {
      if (a instanceof Uint8Array) {
        return Convert.toString(proto, a);
      } else {
        return Convert.toBytes(proto, a);
      }
    }
    Convert.toString = function convertToString(proto, buf2) {
      const protocol = protocols(proto);
      switch (protocol.code) {
        case 4:
        case 41:
          return bytes2ip(buf2);
        case 6:
        case 273:
        case 33:
        case 132:
          return bytes2port(buf2).toString();
        case 53:
        case 54:
        case 55:
        case 56:
        case 400:
        case 777:
          return bytes2str(buf2);
        case 421:
          return bytes2mh(buf2);
        case 444:
          return bytes2onion(buf2);
        case 445:
          return bytes2onion(buf2);
        default:
          return uint8ArrayToString(buf2, "base16");
      }
    };
    Convert.toBytes = function convertToBytes(proto, str) {
      const protocol = protocols(proto);
      switch (protocol.code) {
        case 4:
          return ip2bytes(str);
        case 41:
          return ip2bytes(str);
        case 6:
        case 273:
        case 33:
        case 132:
          return port2bytes(parseInt(str, 10));
        case 53:
        case 54:
        case 55:
        case 56:
        case 400:
        case 777:
          return str2bytes(str);
        case 421:
          return mh2bytes(str);
        case 444:
          return onion2bytes(str);
        case 445:
          return onion32bytes(str);
        default:
          return uint8ArrayFromString(str, "base16");
      }
    };
    function ip2bytes(ipString) {
      if (!ip.isIP(ipString)) {
        throw new Error("invalid ip address");
      }
      return ip.toBytes(ipString);
    }
    function bytes2ip(ipBuff) {
      const ipString = ip.toString(ipBuff);
      if (!ipString || !ip.isIP(ipString)) {
        throw new Error("invalid ip address");
      }
      return ipString;
    }
    function port2bytes(port) {
      const buf2 = new ArrayBuffer(2);
      const view = new DataView(buf2);
      view.setUint16(0, port);
      return new Uint8Array(buf2);
    }
    function bytes2port(buf2) {
      const view = new DataView(buf2.buffer);
      return view.getUint16(buf2.byteOffset);
    }
    function str2bytes(str) {
      const buf2 = uint8ArrayFromString(str);
      const size = Uint8Array.from(varint2.encode(buf2.length));
      return uint8ArrayConcat([size, buf2], size.length + buf2.length);
    }
    function bytes2str(buf2) {
      const size = varint2.decode(buf2);
      buf2 = buf2.slice(varint2.decode.bytes);
      if (buf2.length !== size) {
        throw new Error("inconsistent lengths");
      }
      return uint8ArrayToString(buf2);
    }
    function mh2bytes(hash) {
      let mh;
      if (hash[0] === "Q" || hash[0] === "1") {
        mh = Digest2.decode(base58btc2.decode(`z${hash}`)).bytes;
      } else {
        mh = CID2.parse(hash).multihash.bytes;
      }
      const size = Uint8Array.from(varint2.encode(mh.length));
      return uint8ArrayConcat([size, mh], size.length + mh.length);
    }
    function bytes2mh(buf2) {
      const size = varint2.decode(buf2);
      const address = buf2.slice(varint2.decode.bytes);
      if (address.length !== size) {
        throw new Error("inconsistent lengths");
      }
      return uint8ArrayToString(address, "base58btc");
    }
    function onion2bytes(str) {
      const addr = str.split(":");
      if (addr.length !== 2) {
        throw new Error(
          "failed to parse onion addr: " +
            addr +
            " does not contain a port number"
        );
      }
      if (addr[0].length !== 16) {
        throw new Error(
          "failed to parse onion addr: " + addr[0] + " not a Tor onion address."
        );
      }
      const buf2 = base322.decode("b" + addr[0]);
      const port = parseInt(addr[1], 10);
      if (port < 1 || port > 65536) {
        throw new Error("Port number is not in range(1, 65536)");
      }
      const portBuf = port2bytes(port);
      return uint8ArrayConcat([buf2, portBuf], buf2.length + portBuf.length);
    }
    function onion32bytes(str) {
      const addr = str.split(":");
      if (addr.length !== 2) {
        throw new Error(
          "failed to parse onion addr: " +
            addr +
            " does not contain a port number"
        );
      }
      if (addr[0].length !== 56) {
        throw new Error(
          "failed to parse onion addr: " +
            addr[0] +
            " not a Tor onion3 address."
        );
      }
      const buf2 = base322.decode("b" + addr[0]);
      const port = parseInt(addr[1], 10);
      if (port < 1 || port > 65536) {
        throw new Error("Port number is not in range(1, 65536)");
      }
      const portBuf = port2bytes(port);
      return uint8ArrayConcat([buf2, portBuf], buf2.length + portBuf.length);
    }
    function bytes2onion(buf2) {
      const addrBytes = buf2.slice(0, buf2.length - 2);
      const portBytes = buf2.slice(buf2.length - 2);
      const addr = uint8ArrayToString(addrBytes, "base32");
      const port = bytes2port(portBytes);
      return addr + ":" + port;
    }
  },
});

// node_modules/multiaddr/src/codec.js
var require_codec = __commonJS({
  "node_modules/multiaddr/src/codec.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var convert = require_convert();
    var protocols = require_protocols_table();
    var varint2 = require_varint();
    var { concat: uint8ArrayConcat } =
      (init_concat(), __toCommonJS(concat_exports));
    var { toString: uint8ArrayToString } =
      (init_to_string(), __toCommonJS(to_string_exports));
    module2.exports = {
      stringToStringTuples,
      stringTuplesToString,
      tuplesToStringTuples,
      stringTuplesToTuples,
      bytesToTuples,
      tuplesToBytes,
      bytesToString,
      stringToBytes,
      fromString: fromString4,
      fromBytes,
      validateBytes,
      isValidBytes,
      cleanPath,
      ParseError,
      protoFromTuple,
      sizeForAddr,
    };
    function stringToStringTuples(str) {
      const tuples = [];
      const parts = str.split("/").slice(1);
      if (parts.length === 1 && parts[0] === "") {
        return [];
      }
      for (let p = 0; p < parts.length; p++) {
        const part = parts[p];
        const proto = protocols(part);
        if (proto.size === 0) {
          tuples.push([part]);
          continue;
        }
        p++;
        if (p >= parts.length) {
          throw ParseError("invalid address: " + str);
        }
        if (proto.path) {
          tuples.push([part, cleanPath(parts.slice(p).join("/"))]);
          break;
        }
        tuples.push([part, parts[p]]);
      }
      return tuples;
    }
    function stringTuplesToString(tuples) {
      const parts = [];
      tuples.map((tup) => {
        const proto = protoFromTuple(tup);
        parts.push(proto.name);
        if (tup.length > 1) {
          parts.push(tup[1]);
        }
        return null;
      });
      return cleanPath(parts.join("/"));
    }
    function stringTuplesToTuples(tuples) {
      return tuples.map((tup) => {
        if (!Array.isArray(tup)) {
          tup = [tup];
        }
        const proto = protoFromTuple(tup);
        if (tup.length > 1) {
          return [proto.code, convert.toBytes(proto.code, tup[1])];
        }
        return [proto.code];
      });
    }
    function tuplesToStringTuples(tuples) {
      return tuples.map((tup) => {
        const proto = protoFromTuple(tup);
        if (tup[1]) {
          return [proto.code, convert.toString(proto.code, tup[1])];
        }
        return [proto.code];
      });
    }
    function tuplesToBytes(tuples) {
      return fromBytes(
        uint8ArrayConcat(
          tuples.map((tup) => {
            const proto = protoFromTuple(tup);
            let buf2 = Uint8Array.from(varint2.encode(proto.code));
            if (tup.length > 1) {
              buf2 = uint8ArrayConcat([buf2, tup[1]]);
            }
            return buf2;
          })
        )
      );
    }
    function sizeForAddr(p, addr) {
      if (p.size > 0) {
        return p.size / 8;
      } else if (p.size === 0) {
        return 0;
      } else {
        const size = varint2.decode(addr);
        return size + varint2.decode.bytes;
      }
    }
    function bytesToTuples(buf2) {
      const tuples = [];
      let i = 0;
      while (i < buf2.length) {
        const code8 = varint2.decode(buf2, i);
        const n = varint2.decode.bytes;
        const p = protocols(code8);
        const size = sizeForAddr(p, buf2.slice(i + n));
        if (size === 0) {
          tuples.push([code8]);
          i += n;
          continue;
        }
        const addr = buf2.slice(i + n, i + n + size);
        i += size + n;
        if (i > buf2.length) {
          throw ParseError(
            "Invalid address Uint8Array: " + uint8ArrayToString(buf2, "base16")
          );
        }
        tuples.push([code8, addr]);
      }
      return tuples;
    }
    function bytesToString(buf2) {
      const a = bytesToTuples(buf2);
      const b = tuplesToStringTuples(a);
      return stringTuplesToString(b);
    }
    function stringToBytes(str) {
      str = cleanPath(str);
      const a = stringToStringTuples(str);
      const b = stringTuplesToTuples(a);
      return tuplesToBytes(b);
    }
    function fromString4(str) {
      return stringToBytes(str);
    }
    function fromBytes(buf2) {
      const err = validateBytes(buf2);
      if (err) throw err;
      return Uint8Array.from(buf2);
    }
    function validateBytes(buf2) {
      try {
        bytesToTuples(buf2);
      } catch (err) {
        return err;
      }
    }
    function isValidBytes(buf2) {
      return validateBytes(buf2) === void 0;
    }
    function cleanPath(str) {
      return (
        "/" +
        str
          .trim()
          .split("/")
          .filter((a) => a)
          .join("/")
      );
    }
    function ParseError(str) {
      return new Error("Error parsing address: " + str);
    }
    function protoFromTuple(tup) {
      const proto = protocols(tup[0]);
      return proto;
    }
  },
});

// node_modules/err-code/index.js
var require_err_code = __commonJS({
  "node_modules/err-code/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    function assign(obj, props) {
      for (const key in props) {
        Object.defineProperty(obj, key, {
          value: props[key],
          enumerable: true,
          configurable: true,
        });
      }
      return obj;
    }
    function createError(err, code8, props) {
      if (!err || typeof err === "string") {
        throw new TypeError("Please pass an Error to err-code");
      }
      if (!props) {
        props = {};
      }
      if (typeof code8 === "object") {
        props = code8;
        code8 = "";
      }
      if (code8) {
        props.code = code8;
      }
      try {
        return assign(err, props);
      } catch (_) {
        props.message = err.message;
        props.stack = err.stack;
        const ErrClass = function () {};
        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
        const output = assign(new ErrClass(), props);
        return output;
      }
    }
    module2.exports = createError;
  },
});

// node_modules/uint8arrays/esm/src/equals.js
var equals_exports = {};
__export(equals_exports, {
  equals: () => equals3,
});
function equals3(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var init_equals = __esm({
  "node_modules/uint8arrays/esm/src/equals.js"() {
    init_node_globals();
  },
});

// node_modules/multiaddr/src/index.js
var require_src = __commonJS({
  "node_modules/multiaddr/src/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var codec = require_codec();
    var protocols = require_protocols_table();
    var varint2 = require_varint();
    var { CID: CID2 } = (init_cid(), __toCommonJS(cid_exports));
    var { base58btc: base58btc2 } =
      (init_base58(), __toCommonJS(base58_exports));
    var errCode6 = require_err_code();
    var inspect = Symbol.for("nodejs.util.inspect.custom");
    var { toString: uint8ArrayToString } =
      (init_to_string(), __toCommonJS(to_string_exports));
    var { equals: uint8ArrayEquals } =
      (init_equals(), __toCommonJS(equals_exports));
    var resolvers = /* @__PURE__ */ new Map();
    var symbol = Symbol.for("@multiformats/js-multiaddr/multiaddr");
    var Multiaddr2 = class {
      constructor(addr) {
        if (addr == null) {
          addr = "";
        }
        Object.defineProperty(this, symbol, { value: true });
        if (addr instanceof Uint8Array) {
          this.bytes = codec.fromBytes(addr);
        } else if (typeof addr === "string") {
          if (addr.length > 0 && addr.charAt(0) !== "/") {
            throw new Error(`multiaddr "${addr}" must start with a "/"`);
          }
          this.bytes = codec.fromString(addr);
        } else if (Multiaddr2.isMultiaddr(addr)) {
          this.bytes = codec.fromBytes(addr.bytes);
        } else {
          throw new Error(
            "addr must be a string, Buffer, or another Multiaddr"
          );
        }
      }
      toString() {
        return codec.bytesToString(this.bytes);
      }
      toJSON() {
        return this.toString();
      }
      toOptions() {
        const opts = {};
        const parsed = this.toString().split("/");
        opts.family = parsed[1] === "ip4" ? 4 : 6;
        opts.host = parsed[2];
        opts.transport = parsed[3];
        opts.port = parseInt(parsed[4]);
        return opts;
      }
      protos() {
        return this.protoCodes().map((code8) =>
          Object.assign({}, protocols(code8))
        );
      }
      protoCodes() {
        const codes = [];
        const buf2 = this.bytes;
        let i = 0;
        while (i < buf2.length) {
          const code8 = varint2.decode(buf2, i);
          const n = varint2.decode.bytes;
          const p = protocols(code8);
          const size = codec.sizeForAddr(p, buf2.slice(i + n));
          i += size + n;
          codes.push(code8);
        }
        return codes;
      }
      protoNames() {
        return this.protos().map((proto) => proto.name);
      }
      tuples() {
        return codec.bytesToTuples(this.bytes);
      }
      stringTuples() {
        const t = codec.bytesToTuples(this.bytes);
        return codec.tuplesToStringTuples(t);
      }
      encapsulate(addr) {
        addr = new Multiaddr2(addr);
        return new Multiaddr2(this.toString() + addr.toString());
      }
      decapsulate(addr) {
        const addrString = addr.toString();
        const s = this.toString();
        const i = s.lastIndexOf(addrString);
        if (i < 0) {
          throw new Error(
            "Address " + this + " does not contain subaddress: " + addr
          );
        }
        return new Multiaddr2(s.slice(0, i));
      }
      decapsulateCode(code8) {
        const tuples = this.tuples();
        for (let i = tuples.length - 1; i >= 0; i--) {
          if (tuples[i][0] === code8) {
            return new Multiaddr2(codec.tuplesToBytes(tuples.slice(0, i)));
          }
        }
        return this;
      }
      getPeerId() {
        try {
          const tuples = this.stringTuples().filter((tuple2) => {
            if (tuple2[0] === protocols.names.ipfs.code) {
              return true;
            }
            return false;
          });
          const tuple = tuples.pop();
          if (tuple && tuple[1]) {
            const peerIdStr = tuple[1];
            if (peerIdStr[0] === "Q" || peerIdStr[0] === "1") {
              return uint8ArrayToString(
                base58btc2.decode(`z${peerIdStr}`),
                "base58btc"
              );
            }
            return uint8ArrayToString(
              CID2.parse(peerIdStr).multihash.bytes,
              "base58btc"
            );
          }
          return null;
        } catch (e) {
          return null;
        }
      }
      getPath() {
        let path = null;
        try {
          path = this.stringTuples().filter((tuple) => {
            const proto = protocols(tuple[0]);
            if (proto.path) {
              return true;
            }
            return false;
          })[0][1];
          if (!path) {
            path = null;
          }
        } catch (e) {
          path = null;
        }
        return path;
      }
      equals(addr) {
        return uint8ArrayEquals(this.bytes, addr.bytes);
      }
      async resolve() {
        const resolvableProto = this.protos().find((p) => p.resolvable);
        if (!resolvableProto) {
          return [this];
        }
        const resolver = resolvers.get(resolvableProto.name);
        if (!resolver) {
          throw errCode6(
            new Error(`no available resolver for ${resolvableProto.name}`),
            "ERR_NO_AVAILABLE_RESOLVER"
          );
        }
        const addresses = await resolver(this);
        return addresses.map((a) => new Multiaddr2(a));
      }
      nodeAddress() {
        const codes = this.protoCodes();
        const names = this.protoNames();
        const parts = this.toString().split("/").slice(1);
        if (parts.length < 4) {
          throw new Error(
            'multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6}/{address}/{tcp, udp}/{port}".'
          );
        } else if (
          codes[0] !== 4 &&
          codes[0] !== 41 &&
          codes[0] !== 54 &&
          codes[0] !== 55
        ) {
          throw new Error(
            `no protocol with name: "'${names[0]}'". Must have a valid family name: "{ip4, ip6, dns4, dns6}".`
          );
        } else if (parts[2] !== "tcp" && parts[2] !== "udp") {
          throw new Error(
            `no protocol with name: "'${names[1]}'". Must have a valid transport protocol: "{tcp, udp}".`
          );
        }
        return {
          family: codes[0] === 41 || codes[0] === 55 ? 6 : 4,
          address: parts[1],
          port: parseInt(parts[3]),
        };
      }
      isThinWaistAddress(addr) {
        const protos = (addr || this).protos();
        if (protos.length !== 2) {
          return false;
        }
        if (protos[0].code !== 4 && protos[0].code !== 41) {
          return false;
        }
        if (protos[1].code !== 6 && protos[1].code !== 273) {
          return false;
        }
        return true;
      }
      static fromNodeAddress(addr, transport) {
        if (!addr) {
          throw new Error("requires node address object");
        }
        if (!transport) {
          throw new Error("requires transport protocol");
        }
        let ip;
        switch (addr.family) {
          case 4:
            ip = "ip4";
            break;
          case 6:
            ip = "ip6";
            break;
          default:
            throw Error(
              `Invalid addr family. Got '${addr.family}' instead of 4 or 6`
            );
        }
        return new Multiaddr2(
          "/" + [ip, addr.address, transport, addr.port].join("/")
        );
      }
      static isName(addr) {
        if (!Multiaddr2.isMultiaddr(addr)) {
          return false;
        }
        return addr.protos().some((proto) => proto.resolvable);
      }
      static isMultiaddr(value) {
        return value instanceof Multiaddr2 || Boolean(value && value[symbol]);
      }
      [inspect]() {
        return (
          "<Multiaddr " +
          uint8ArrayToString(this.bytes, "base16") +
          " - " +
          codec.bytesToString(this.bytes) +
          ">"
        );
      }
      inspect() {
        return (
          "<Multiaddr " +
          uint8ArrayToString(this.bytes, "base16") +
          " - " +
          codec.bytesToString(this.bytes) +
          ">"
        );
      }
    };
    Multiaddr2.protocols = protocols;
    Multiaddr2.resolvers = resolvers;
    function multiaddr(addr) {
      return new Multiaddr2(addr);
    }
    module2.exports = {
      Multiaddr: Multiaddr2,
      multiaddr,
      protocols,
      resolvers,
    };
  },
});

// node_modules/is-electron/index.js
var require_is_electron = __commonJS({
  "node_modules/is-electron/index.js"(exports2, module2) {
    init_node_globals();
    function isElectron() {
      if (
        typeof window !== "undefined" &&
        typeof window.process === "object" &&
        window.process.type === "renderer"
      ) {
        return true;
      }
      if (
        typeof process !== "undefined" &&
        typeof process.versions === "object" &&
        !!process.versions.electron
      ) {
        return true;
      }
      if (
        typeof navigator === "object" &&
        typeof navigator.userAgent === "string" &&
        navigator.userAgent.indexOf("Electron") >= 0
      ) {
        return true;
      }
      return false;
    }
    module2.exports = isElectron;
  },
});

// node_modules/ipfs-utils/src/env.js
var require_env = __commonJS({
  "node_modules/ipfs-utils/src/env.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var isElectron = require_is_electron();
    var IS_ENV_WITH_DOM =
      typeof window === "object" &&
      typeof document === "object" &&
      document.nodeType === 9;
    var IS_ELECTRON = isElectron();
    var IS_BROWSER = IS_ENV_WITH_DOM && !IS_ELECTRON;
    var IS_ELECTRON_MAIN = IS_ELECTRON && !IS_ENV_WITH_DOM;
    var IS_ELECTRON_RENDERER = IS_ELECTRON && IS_ENV_WITH_DOM;
    var IS_NODE =
      typeof __require === "function" &&
      typeof process !== "undefined" &&
      typeof process.release !== "undefined" &&
      process.release.name === "node" &&
      !IS_ELECTRON;
    var IS_WEBWORKER =
      typeof importScripts === "function" &&
      typeof self !== "undefined" &&
      typeof WorkerGlobalScope !== "undefined" &&
      self instanceof WorkerGlobalScope;
    var IS_TEST =
      typeof process !== "undefined" &&
      typeof process.env !== "undefined" &&
      false;
    var IS_REACT_NATIVE =
      typeof navigator !== "undefined" && navigator.product === "ReactNative";
    module2.exports = {
      isTest: IS_TEST,
      isElectron: IS_ELECTRON,
      isElectronMain: IS_ELECTRON_MAIN,
      isElectronRenderer: IS_ELECTRON_RENDERER,
      isNode: IS_NODE,
      isBrowser: IS_BROWSER,
      isWebWorker: IS_WEBWORKER,
      isEnvWithDom: IS_ENV_WITH_DOM,
      isReactNative: IS_REACT_NATIVE,
    };
  },
});

// node_modules/parse-duration/index.js
var require_parse_duration = __commonJS({
  "node_modules/parse-duration/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var durationRE =
      /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([\p{L}]*)/giu;
    module2.exports = parse;
    module2.exports.default = parse;
    parse.nanosecond = parse.ns = 1 / 1e6;
    parse["\xB5s"] = parse["\u03BCs"] = parse.us = parse.microsecond = 1 / 1e3;
    parse.millisecond = parse.ms = parse[""] = 1;
    parse.second = parse.sec = parse.s = parse.ms * 1e3;
    parse.minute = parse.min = parse.m = parse.s * 60;
    parse.hour = parse.hr = parse.h = parse.m * 60;
    parse.day = parse.d = parse.h * 24;
    parse.week = parse.wk = parse.w = parse.d * 7;
    parse.month = parse.b = parse.d * (365.25 / 12);
    parse.year = parse.yr = parse.y = parse.d * 365.25;
    function parse(str = "", format = "ms") {
      var result = null;
      str = (str + "").replace(/(\d)[,_](\d)/g, "$1$2");
      str.replace(durationRE, function (_, n, units) {
        units = unitRatio(units);
        if (units) result = (result || 0) + parseFloat(n, 10) * units;
      });
      return result && result / (unitRatio(format) || 1);
    }
    function unitRatio(str) {
      return parse[str] || parse[str.toLowerCase().replace(/s$/, "")];
    }
  },
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    init_node_globals();
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function (val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" +
          JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          str
        );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name8) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name8 + (isPlural ? "s" : "");
    }
  },
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    init_node_globals();
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce2;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          },
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(
          this.namespace +
            (typeof delimiter === "undefined" ? ":" : delimiter) +
            namespace
        );
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(
          /[\s,]+/
        );
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(
              new RegExp("^" + namespaces.substr(1) + "$")
            );
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips
            .map(toNamespace)
            .map((namespace) => "-" + namespace),
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name8) {
        if (name8[name8.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name8)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name8)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp
          .toString()
          .substring(2, regexp.toString().length - 2)
          .replace(/\.\*\?$/, "*");
      }
      function coerce2(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn(
          "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
        );
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  },
});

// node_modules/debug/src/browser.js
var require_browser2 = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    init_node_globals();
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn(
            "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
          );
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33",
    ];
    function useColors() {
      if (
        typeof window !== "undefined" &&
        window.process &&
        (window.process.type === "renderer" || window.process.__nwjs)
      ) {
        return true;
      }
      if (
        typeof navigator !== "undefined" &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ) {
        return false;
      }
      return (
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window !== "undefined" &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator !== "undefined" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
      );
    }
    function formatArgs(args) {
      args[0] =
        (this.useColors ? "%c" : "") +
        this.namespace +
        (this.useColors ? " %c" : " ") +
        args[0] +
        (this.useColors ? "%c " : " ") +
        "+" +
        module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {});
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {}
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug");
      } catch (error) {}
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {}
    }
    module2.exports = require_common()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function (v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  },
});

// node_modules/ipfs-utils/src/http/error.js
var require_error = __commonJS({
  "node_modules/ipfs-utils/src/http/error.js"(exports2) {
    "use strict";
    init_node_globals();
    var TimeoutError = class extends Error {
      constructor(message = "Request timed out") {
        super(message);
        this.name = "TimeoutError";
      }
    };
    exports2.TimeoutError = TimeoutError;
    var AbortError = class extends Error {
      constructor(message = "The operation was aborted.") {
        super(message);
        this.name = "AbortError";
      }
    };
    exports2.AbortError = AbortError;
    var HTTPError = class extends Error {
      constructor(response) {
        super(response.statusText);
        this.name = "HTTPError";
        this.response = response;
      }
    };
    exports2.HTTPError = HTTPError;
  },
});

// (disabled):node_modules/electron-fetch/lib/index.es.js
var require_index_es = __commonJS({
  "(disabled):node_modules/electron-fetch/lib/index.es.js"() {
    init_node_globals();
  },
});

// node_modules/node-fetch/browser.js
var require_browser3 = __commonJS({
  "node_modules/node-fetch/browser.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var getGlobal = function () {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global2 !== "undefined") {
        return global2;
      }
      throw new Error("unable to locate global object");
    };
    var global2 = getGlobal();
    module2.exports = exports2 = global2.fetch;
    if (global2.fetch) {
      exports2.default = global2.fetch.bind(global2);
    }
    exports2.Headers = global2.Headers;
    exports2.Request = global2.Request;
    exports2.Response = global2.Response;
  },
});

// node_modules/native-fetch/src/index.js
var require_src2 = __commonJS({
  "node_modules/native-fetch/src/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    if (
      globalThis.fetch &&
      globalThis.Headers &&
      globalThis.Request &&
      globalThis.Response
    ) {
      module2.exports = {
        default: globalThis.fetch,
        Headers: globalThis.Headers,
        Request: globalThis.Request,
        Response: globalThis.Response,
      };
    } else {
      module2.exports = {
        default: require_browser3().default,
        Headers: require_browser3().Headers,
        Request: require_browser3().Request,
        Response: require_browser3().Response,
      };
    }
  },
});

// node_modules/ipfs-utils/src/fetch.js
var require_fetch = __commonJS({
  "node_modules/ipfs-utils/src/fetch.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var { isElectronMain } = require_env();
    if (isElectronMain) {
      module2.exports = require_index_es();
    } else {
      module2.exports = require_src2();
    }
  },
});

// node_modules/ipfs-utils/src/http/fetch.browser.js
var require_fetch_browser = __commonJS({
  "node_modules/ipfs-utils/src/http/fetch.browser.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var { TimeoutError, AbortError } = require_error();
    var {
      Response: Response2,
      Request,
      Headers,
      default: fetch,
    } = require_fetch();
    var fetchWithProgress = (url, options = {}) => {
      const request = new XMLHttpRequest();
      request.open(options.method || "GET", url.toString(), true);
      const { timeout, headers } = options;
      if (timeout && timeout > 0 && timeout < Infinity) {
        request.timeout = timeout;
      }
      if (options.overrideMimeType != null) {
        request.overrideMimeType(options.overrideMimeType);
      }
      if (headers) {
        for (const [name8, value] of new Headers(headers)) {
          request.setRequestHeader(name8, value);
        }
      }
      if (options.signal) {
        options.signal.onabort = () => request.abort();
      }
      if (options.onUploadProgress) {
        request.upload.onprogress = options.onUploadProgress;
      }
      request.responseType = "arraybuffer";
      return new Promise((resolve, reject) => {
        const handleEvent = (event) => {
          switch (event.type) {
            case "error": {
              resolve(Response2.error());
              break;
            }
            case "load": {
              resolve(
                new ResponseWithURL(request.responseURL, request.response, {
                  status: request.status,
                  statusText: request.statusText,
                  headers: parseHeaders(request.getAllResponseHeaders()),
                })
              );
              break;
            }
            case "timeout": {
              reject(new TimeoutError());
              break;
            }
            case "abort": {
              reject(new AbortError());
              break;
            }
            default: {
              break;
            }
          }
        };
        request.onerror = handleEvent;
        request.onload = handleEvent;
        request.ontimeout = handleEvent;
        request.onabort = handleEvent;
        request.send(options.body);
      });
    };
    var fetchWithStreaming = fetch;
    var fetchWith = (url, options = {}) =>
      options.onUploadProgress != null
        ? fetchWithProgress(url, options)
        : fetchWithStreaming(url, options);
    var parseHeaders = (input) => {
      const headers = new Headers();
      for (const line of input.trim().split(/[\r\n]+/)) {
        const index = line.indexOf(": ");
        if (index > 0) {
          headers.set(line.slice(0, index), line.slice(index + 1));
        }
      }
      return headers;
    };
    var ResponseWithURL = class extends Response2 {
      constructor(url, body, options) {
        super(body, options);
        Object.defineProperty(this, "url", { value: url });
      }
    };
    module2.exports = {
      fetch: fetchWith,
      Request,
      Headers,
    };
  },
});

// node_modules/is-plain-obj/index.js
var require_is_plain_obj = __commonJS({
  "node_modules/is-plain-obj/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = (value) => {
      if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.prototype;
    };
  },
});

// node_modules/merge-options/index.js
var require_merge_options = __commonJS({
  "node_modules/merge-options/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var isOptionObject = require_is_plain_obj();
    var { hasOwnProperty } = Object.prototype;
    var { propertyIsEnumerable } = Object;
    var defineProperty = (object, name8, value) =>
      Object.defineProperty(object, name8, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    var globalThis2 = exports2;
    var defaultMergeOptions = {
      concatArrays: false,
      ignoreUndefined: false,
    };
    var getEnumerableOwnPropertyKeys = (value) => {
      const keys = [];
      for (const key in value) {
        if (hasOwnProperty.call(value, key)) {
          keys.push(key);
        }
      }
      if (Object.getOwnPropertySymbols) {
        const symbols = Object.getOwnPropertySymbols(value);
        for (const symbol of symbols) {
          if (propertyIsEnumerable.call(value, symbol)) {
            keys.push(symbol);
          }
        }
      }
      return keys;
    };
    function clone(value) {
      if (Array.isArray(value)) {
        return cloneArray(value);
      }
      if (isOptionObject(value)) {
        return cloneOptionObject(value);
      }
      return value;
    }
    function cloneArray(array) {
      const result = array.slice(0, 0);
      getEnumerableOwnPropertyKeys(array).forEach((key) => {
        defineProperty(result, key, clone(array[key]));
      });
      return result;
    }
    function cloneOptionObject(object) {
      const result =
        Object.getPrototypeOf(object) === null
          ? /* @__PURE__ */ Object.create(null)
          : {};
      getEnumerableOwnPropertyKeys(object).forEach((key) => {
        defineProperty(result, key, clone(object[key]));
      });
      return result;
    }
    var mergeKeys = (merged, source, keys, config) => {
      keys.forEach((key) => {
        if (typeof source[key] === "undefined" && config.ignoreUndefined) {
          return;
        }
        if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
          defineProperty(merged, key, merge(merged[key], source[key], config));
        } else {
          defineProperty(merged, key, clone(source[key]));
        }
      });
      return merged;
    };
    var concatArrays = (merged, source, config) => {
      let result = merged.slice(0, 0);
      let resultIndex = 0;
      [merged, source].forEach((array) => {
        const indices = [];
        for (let k = 0; k < array.length; k++) {
          if (!hasOwnProperty.call(array, k)) {
            continue;
          }
          indices.push(String(k));
          if (array === merged) {
            defineProperty(result, resultIndex++, array[k]);
          } else {
            defineProperty(result, resultIndex++, clone(array[k]));
          }
        }
        result = mergeKeys(
          result,
          array,
          getEnumerableOwnPropertyKeys(array).filter(
            (key) => !indices.includes(key)
          ),
          config
        );
      });
      return result;
    };
    function merge(merged, source, config) {
      if (
        config.concatArrays &&
        Array.isArray(merged) &&
        Array.isArray(source)
      ) {
        return concatArrays(merged, source, config);
      }
      if (!isOptionObject(source) || !isOptionObject(merged)) {
        return clone(source);
      }
      return mergeKeys(
        merged,
        source,
        getEnumerableOwnPropertyKeys(source),
        config
      );
    }
    module2.exports = function (...options) {
      const config = merge(
        clone(defaultMergeOptions),
        (this !== globalThis2 && this) || {},
        defaultMergeOptions
      );
      let merged = { _: {} };
      for (const option of options) {
        if (option === void 0) {
          continue;
        }
        if (!isOptionObject(option)) {
          throw new TypeError("`" + option + "` is not an Option Object");
        }
        merged = merge(merged, { _: option }, config);
      }
      return merged._;
    };
  },
});

// node_modules/iso-url/src/url-browser.js
var require_url_browser = __commonJS({
  "node_modules/iso-url/src/url-browser.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var isReactNative =
      typeof navigator !== "undefined" && navigator.product === "ReactNative";
    function getDefaultBase() {
      if (isReactNative) {
        return "http://localhost";
      }
      if (!self.location) {
        return "";
      }
      return self.location.protocol + "//" + self.location.host;
    }
    var URL2 = self.URL;
    var defaultBase = getDefaultBase();
    var URLWithLegacySupport = class {
      constructor(url = "", base3 = defaultBase) {
        this.super = new URL2(url, base3);
        this.path = this.pathname + this.search;
        this.auth =
          this.username && this.password
            ? this.username + ":" + this.password
            : null;
        this.query =
          this.search && this.search.startsWith("?")
            ? this.search.slice(1)
            : null;
      }
      get hash() {
        return this.super.hash;
      }
      get host() {
        return this.super.host;
      }
      get hostname() {
        return this.super.hostname;
      }
      get href() {
        return this.super.href;
      }
      get origin() {
        return this.super.origin;
      }
      get password() {
        return this.super.password;
      }
      get pathname() {
        return this.super.pathname;
      }
      get port() {
        return this.super.port;
      }
      get protocol() {
        return this.super.protocol;
      }
      get search() {
        return this.super.search;
      }
      get searchParams() {
        return this.super.searchParams;
      }
      get username() {
        return this.super.username;
      }
      set hash(hash) {
        this.super.hash = hash;
      }
      set host(host) {
        this.super.host = host;
      }
      set hostname(hostname) {
        this.super.hostname = hostname;
      }
      set href(href) {
        this.super.href = href;
      }
      set password(password) {
        this.super.password = password;
      }
      set pathname(pathname) {
        this.super.pathname = pathname;
      }
      set port(port) {
        this.super.port = port;
      }
      set protocol(protocol) {
        this.super.protocol = protocol;
      }
      set search(search) {
        this.super.search = search;
      }
      set username(username) {
        this.super.username = username;
      }
      static createObjectURL(o) {
        return URL2.createObjectURL(o);
      }
      static revokeObjectURL(o) {
        URL2.revokeObjectURL(o);
      }
      toJSON() {
        return this.super.toJSON();
      }
      toString() {
        return this.super.toString();
      }
      format() {
        return this.toString();
      }
    };
    function format(obj) {
      if (typeof obj === "string") {
        const url = new URL2(obj);
        return url.toString();
      }
      if (!(obj instanceof URL2)) {
        const userPass =
          obj.username && obj.password
            ? `${obj.username}:${obj.password}@`
            : "";
        const auth = obj.auth ? obj.auth + "@" : "";
        const port = obj.port ? ":" + obj.port : "";
        const protocol = obj.protocol ? obj.protocol + "//" : "";
        const host = obj.host || "";
        const hostname = obj.hostname || "";
        const search = obj.search || (obj.query ? "?" + obj.query : "");
        const hash = obj.hash || "";
        const pathname = obj.pathname || "";
        const path = obj.path || pathname + search;
        return `${protocol}${userPass || auth}${
          host || hostname + port
        }${path}${hash}`;
      }
    }
    module2.exports = {
      URLWithLegacySupport,
      URLSearchParams: self.URLSearchParams,
      defaultBase,
      format,
    };
  },
});

// node_modules/iso-url/src/relative.js
var require_relative = __commonJS({
  "node_modules/iso-url/src/relative.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var { URLWithLegacySupport, format } = require_url_browser();
    module2.exports = (
      url,
      location2 = {},
      protocolMap = {},
      defaultProtocol
    ) => {
      let protocol = location2.protocol
        ? location2.protocol.replace(":", "")
        : "http";
      protocol = (protocolMap[protocol] || defaultProtocol || protocol) + ":";
      let urlParsed;
      try {
        urlParsed = new URLWithLegacySupport(url);
      } catch (err) {
        urlParsed = {};
      }
      const base3 = Object.assign({}, location2, {
        protocol: protocol || urlParsed.protocol,
        host: location2.host || urlParsed.host,
      });
      return new URLWithLegacySupport(url, format(base3)).toString();
    };
  },
});

// node_modules/iso-url/index.js
var require_iso_url = __commonJS({
  "node_modules/iso-url/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var {
      URLWithLegacySupport,
      format,
      URLSearchParams: URLSearchParams2,
      defaultBase,
    } = require_url_browser();
    var relative = require_relative();
    module2.exports = {
      URL: URLWithLegacySupport,
      URLSearchParams: URLSearchParams2,
      format,
      relative,
      defaultBase,
    };
  },
});

// node_modules/any-signal/index.js
var require_any_signal = __commonJS({
  "node_modules/any-signal/index.js"(exports2, module2) {
    init_node_globals();
    var { AbortController: AbortController2 } = globalThis;
    function anySignal(signals) {
      const controller = new AbortController2();
      function onAbort() {
        controller.abort();
        for (const signal of signals) {
          if (!signal || !signal.removeEventListener) continue;
          signal.removeEventListener("abort", onAbort);
        }
      }
      for (const signal of signals) {
        if (!signal || !signal.addEventListener) continue;
        if (signal.aborted) {
          onAbort();
          break;
        }
        signal.addEventListener("abort", onAbort);
      }
      return controller.signal;
    }
    module2.exports = anySignal;
    module2.exports.anySignal = anySignal;
  },
});

// node_modules/ipfs-utils/src/http.js
var require_http = __commonJS({
  "node_modules/ipfs-utils/src/http.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var { fetch, Request, Headers } = require_fetch_browser();
    var { TimeoutError, HTTPError } = require_error();
    var merge = require_merge_options().bind({ ignoreUndefined: true });
    var { URL: URL2, URLSearchParams: URLSearchParams2 } = require_iso_url();
    var anySignal = require_any_signal();
    var timeout = (promise, ms, abortController) => {
      if (ms === void 0) {
        return promise;
      }
      const start = Date.now();
      const timedOut = () => {
        const time = Date.now() - start;
        return time >= ms;
      };
      return new Promise((resolve, reject) => {
        const timeoutID = setTimeout(() => {
          if (timedOut()) {
            reject(new TimeoutError());
            abortController.abort();
          }
        }, ms);
        const after = (next) => {
          const fn = (res) => {
            clearTimeout(timeoutID);
            if (timedOut()) {
              reject(new TimeoutError());
              return;
            }
            next(res);
          };
          return fn;
        };
        promise.then(after(resolve), after(reject));
      });
    };
    var defaults = {
      throwHttpErrors: true,
      credentials: "same-origin",
    };
    var HTTP = class {
      constructor(options = {}) {
        this.opts = merge(defaults, options);
      }
      async fetch(resource, options = {}) {
        const opts = merge(this.opts, options);
        const headers = new Headers(opts.headers);
        if (
          typeof resource !== "string" &&
          !(resource instanceof URL2 || resource instanceof Request)
        ) {
          throw new TypeError("`resource` must be a string, URL, or Request");
        }
        const url = new URL2(resource.toString(), opts.base);
        const { searchParams, transformSearchParams, json } = opts;
        if (searchParams) {
          if (typeof transformSearchParams === "function") {
            url.search = transformSearchParams(
              new URLSearchParams2(opts.searchParams)
            );
          } else {
            url.search = new URLSearchParams2(opts.searchParams);
          }
        }
        if (json) {
          opts.body = JSON.stringify(opts.json);
          headers.set("content-type", "application/json");
        }
        const abortController = new AbortController();
        const signal = anySignal([abortController.signal, opts.signal]);
        const response = await timeout(
          fetch(url.toString(), {
            ...opts,
            signal,
            timeout: void 0,
            headers,
          }),
          opts.timeout,
          abortController
        );
        if (!response.ok && opts.throwHttpErrors) {
          if (opts.handleError) {
            await opts.handleError(response);
          }
          throw new HTTPError(response);
        }
        response.iterator = function () {
          return fromStream(response.body);
        };
        response.ndjson = async function* () {
          for await (const chunk of ndjson(response.iterator())) {
            if (options.transform) {
              yield options.transform(chunk);
            } else {
              yield chunk;
            }
          }
        };
        return response;
      }
      post(resource, options = {}) {
        return this.fetch(resource, { ...options, method: "POST" });
      }
      get(resource, options = {}) {
        return this.fetch(resource, { ...options, method: "GET" });
      }
      put(resource, options = {}) {
        return this.fetch(resource, { ...options, method: "PUT" });
      }
      delete(resource, options = {}) {
        return this.fetch(resource, { ...options, method: "DELETE" });
      }
      options(resource, options = {}) {
        return this.fetch(resource, { ...options, method: "OPTIONS" });
      }
    };
    var ndjson = async function* (source) {
      const decoder = new TextDecoder();
      let buf2 = "";
      for await (const chunk of source) {
        buf2 += decoder.decode(chunk, { stream: true });
        const lines = buf2.split(/\r?\n/);
        for (let i = 0; i < lines.length - 1; i++) {
          const l = lines[i].trim();
          if (l.length > 0) {
            yield JSON.parse(l);
          }
        }
        buf2 = lines[lines.length - 1];
      }
      buf2 += decoder.decode();
      buf2 = buf2.trim();
      if (buf2.length !== 0) {
        yield JSON.parse(buf2);
      }
    };
    var fromStream = (source) => {
      if (isNodeReadableStream(source)) {
        const iter = source[Symbol.asyncIterator]();
        return {
          [Symbol.asyncIterator]() {
            return {
              next: iter.next.bind(iter),
              return(value) {
                source.destroy();
                if (typeof iter.return === "function") {
                  return iter.return();
                }
                return Promise.resolve({ done: true, value });
              },
            };
          },
        };
      }
      if (isWebReadableStream(source)) {
        const reader = source.getReader();
        return (async function* () {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) return;
              if (value) {
                yield value;
              }
            }
          } finally {
            reader.releaseLock();
          }
        })();
      }
      if (isAsyncIterable(source)) {
        return source;
      }
      throw new TypeError("Body can't be converted to AsyncIterable");
    };
    var isAsyncIterable = (value) => {
      return (
        typeof value === "object" &&
        value !== null &&
        typeof value[Symbol.asyncIterator] === "function"
      );
    };
    var isWebReadableStream = (value) => {
      return value && typeof value.getReader === "function";
    };
    var isNodeReadableStream = (value) =>
      Object.prototype.hasOwnProperty.call(value, "readable") &&
      Object.prototype.hasOwnProperty.call(value, "writable");
    HTTP.HTTPError = HTTPError;
    HTTP.TimeoutError = TimeoutError;
    HTTP.streamToAsyncIterator = fromStream;
    HTTP.post = (resource, options) =>
      new HTTP(options).post(resource, options);
    HTTP.get = (resource, options) => new HTTP(options).get(resource, options);
    HTTP.put = (resource, options) => new HTTP(options).put(resource, options);
    HTTP.delete = (resource, options) =>
      new HTTP(options).delete(resource, options);
    HTTP.options = (resource, options) =>
      new HTTP(options).options(resource, options);
    module2.exports = HTTP;
  },
});

// node_modules/multiaddr-to-uri/index.js
var require_multiaddr_to_uri = __commonJS({
  "node_modules/multiaddr-to-uri/index.js"(exports2, module2) {
    init_node_globals();
    var { Multiaddr: Multiaddr2 } = require_src();
    var reduceValue = (_, v) => v;
    var tcpUri = (str, port, parts, opts) => {
      if (opts && opts.assumeHttp === false) return `tcp://${str}:${port}`;
      let protocol = "tcp";
      let explicitPort = `:${port}`;
      const last = parts[parts.length - 1];
      if (last.protocol === "tcp") {
        protocol = port === "443" ? "https" : "http";
        explicitPort = port === "443" || port === "80" ? "" : explicitPort;
      }
      return `${protocol}://${str}${explicitPort}`;
    };
    var Reducers = {
      ip4: reduceValue,
      ip6: (str, content, i, parts) =>
        parts.length === 1 && parts[0].protocol === "ip6"
          ? content
          : `[${content}]`,
      tcp: (str, content, i, parts, opts) =>
        parts.some((p) => ["http", "https", "ws", "wss"].includes(p.protocol))
          ? `${str}:${content}`
          : tcpUri(str, content, parts, opts),
      udp: (str, content) => `udp://${str}:${content}`,
      dnsaddr: reduceValue,
      dns4: reduceValue,
      dns6: reduceValue,
      ipfs: (str, content) => `${str}/ipfs/${content}`,
      p2p: (str, content) => `${str}/p2p/${content}`,
      http: (str) => `http://${str}`,
      https: (str) => `https://${str}`,
      ws: (str) => `ws://${str}`,
      wss: (str) => `wss://${str}`,
      "p2p-websocket-star": (str) => `${str}/p2p-websocket-star`,
      "p2p-webrtc-star": (str) => `${str}/p2p-webrtc-star`,
      "p2p-webrtc-direct": (str) => `${str}/p2p-webrtc-direct`,
    };
    module2.exports = (multiaddr, opts) => {
      const ma = new Multiaddr2(multiaddr);
      const parts = multiaddr.toString().split("/").slice(1);
      return ma
        .tuples()
        .map((tuple) => ({
          protocol: parts.shift(),
          content: tuple[1] ? parts.shift() : null,
        }))
        .reduce((str, part, i, parts2) => {
          const reduce = Reducers[part.protocol];
          if (!reduce) throw new Error(`Unsupported protocol ${part.protocol}`);
          return reduce(str, part.content, i, parts2, opts);
        }, "");
    };
  },
});

// node_modules/ipfs-core-utils/esm/src/to-url-string.js
var to_url_string_exports = {};
__export(to_url_string_exports, {
  toUrlString: () => toUrlString,
});
function toUrlString(url) {
  try {
    url = (0, import_multiaddr_to_uri.default)(
      new import_multiaddr.Multiaddr(url)
    );
  } catch (err) {}
  url = url.toString();
  return url;
}
var import_multiaddr, import_multiaddr_to_uri;
var init_to_url_string = __esm({
  "node_modules/ipfs-core-utils/esm/src/to-url-string.js"() {
    init_node_globals();
    import_multiaddr = __toESM(require_src(), 1);
    import_multiaddr_to_uri = __toESM(require_multiaddr_to_uri(), 1);
  },
});

// node_modules/ipfs-core-utils/esm/src/agent.browser.js
var agent_browser_exports = {};
__export(agent_browser_exports, {
  default: () => agent_browser_default,
});
var agent_browser_default;
var init_agent_browser = __esm({
  "node_modules/ipfs-core-utils/esm/src/agent.browser.js"() {
    init_node_globals();
    agent_browser_default = () => {};
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/core.js
var require_core = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/core.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var multiaddr = require_src();
    var env_js = require_env();
    var parseDuration = require_parse_duration();
    var debug = require_browser2();
    var HTTP = require_http();
    var mergeOpts = require_merge_options();
    var toUrlString2 =
      (init_to_url_string(), __toCommonJS(to_url_string_exports));
    var getAgent = (init_agent_browser(), __toCommonJS(agent_browser_exports));
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var parseDuration__default =
      /* @__PURE__ */ _interopDefaultLegacy(parseDuration);
    var debug__default = /* @__PURE__ */ _interopDefaultLegacy(debug);
    var HTTP__default = /* @__PURE__ */ _interopDefaultLegacy(HTTP);
    var mergeOpts__default = /* @__PURE__ */ _interopDefaultLegacy(mergeOpts);
    var getAgent__default = /* @__PURE__ */ _interopDefaultLegacy(getAgent);
    var log = debug__default["default"]("ipfs-http-client:lib:error-handler");
    var merge = mergeOpts__default["default"].bind({ ignoreUndefined: true });
    var DEFAULT_PROTOCOL =
      env_js.isBrowser || env_js.isWebWorker ? location.protocol : "http";
    var DEFAULT_HOST =
      env_js.isBrowser || env_js.isWebWorker ? location.hostname : "localhost";
    var DEFAULT_PORT =
      env_js.isBrowser || env_js.isWebWorker ? location.port : "5001";
    var normalizeOptions = (options = {}) => {
      let url;
      let opts = {};
      let agent;
      if (
        typeof options === "string" ||
        multiaddr.Multiaddr.isMultiaddr(options)
      ) {
        url = new URL(toUrlString2.toUrlString(options));
      } else if (options instanceof URL) {
        url = options;
      } else if (
        typeof options.url === "string" ||
        multiaddr.Multiaddr.isMultiaddr(options.url)
      ) {
        url = new URL(toUrlString2.toUrlString(options.url));
        opts = options;
      } else if (options.url instanceof URL) {
        url = options.url;
        opts = options;
      } else {
        opts = options || {};
        const protocol = (opts.protocol || DEFAULT_PROTOCOL).replace(":", "");
        const host = (opts.host || DEFAULT_HOST).split(":")[0];
        const port = opts.port || DEFAULT_PORT;
        url = new URL(`${protocol}://${host}:${port}`);
      }
      if (opts.apiPath) {
        url.pathname = opts.apiPath;
      } else if (url.pathname === "/" || url.pathname === void 0) {
        url.pathname = "api/v0";
      }
      if (env_js.isNode) {
        const Agent = getAgent__default["default"](url);
        agent =
          opts.agent ||
          new Agent({
            keepAlive: true,
            maxSockets: 6,
          });
      }
      return {
        ...opts,
        host: url.host,
        protocol: url.protocol.replace(":", ""),
        port: Number(url.port),
        apiPath: url.pathname,
        url,
        agent,
      };
    };
    var errorHandler = async (response) => {
      let msg;
      try {
        if (
          (response.headers.get("Content-Type") || "").startsWith(
            "application/json"
          )
        ) {
          const data = await response.json();
          log(data);
          msg = data.Message || data.message;
        } else {
          msg = await response.text();
        }
      } catch (err) {
        log("Failed to parse error response", err);
        msg = err.message;
      }
      let error = new HTTP__default["default"].HTTPError(response);
      if (msg) {
        if (msg.includes("deadline has elapsed")) {
          error = new HTTP__default["default"].TimeoutError();
        }
        if (msg && msg.includes("context deadline exceeded")) {
          error = new HTTP__default["default"].TimeoutError();
        }
      }
      if (msg && msg.includes("request timed out")) {
        error = new HTTP__default["default"].TimeoutError();
      }
      if (msg) {
        error.message = msg;
      }
      throw error;
    };
    var KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g;
    var kebabCase = (str) => {
      return str.replace(KEBAB_REGEX, function (match) {
        return "-" + match.toLowerCase();
      });
    };
    var parseTimeout = (value) => {
      return typeof value === "string"
        ? parseDuration__default["default"](value)
        : value;
    };
    var Client = class extends HTTP__default["default"] {
      constructor(options = {}) {
        const opts = normalizeOptions(options);
        super({
          timeout: parseTimeout(opts.timeout || 0) || void 0,
          headers: opts.headers,
          base: `${opts.url}`,
          handleError: errorHandler,
          transformSearchParams: (search) => {
            const out = new URLSearchParams();
            for (const [key, value] of search) {
              if (
                value !== "undefined" &&
                value !== "null" &&
                key !== "signal"
              ) {
                out.append(kebabCase(key), value);
              }
              if (key === "timeout" && !isNaN(value)) {
                out.append(kebabCase(key), value);
              }
            }
            return out;
          },
          agent: opts.agent,
        });
        delete this.get;
        delete this.put;
        delete this.delete;
        delete this.options;
        const fetch = this.fetch;
        this.fetch = (resource, options2 = {}) => {
          if (typeof resource === "string" && !resource.startsWith("/")) {
            resource = `${opts.url}/${resource}`;
          }
          return fetch.call(
            this,
            resource,
            merge(options2, { method: "POST" })
          );
        };
      }
    };
    var HTTPError = HTTP__default["default"].HTTPError;
    exports2.Client = Client;
    exports2.HTTPError = HTTPError;
    exports2.errorHandler = errorHandler;
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/configure.js
var require_configure = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/configure.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var core = require_core();
    var configure = (fn) => {
      return (options) => {
        return fn(new core.Client(options), options);
      };
    };
    exports2.configure = configure;
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/mode-to-string.js
var require_mode_to_string = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/mode-to-string.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    function modeToString2(mode) {
      if (mode == null) {
        return void 0;
      }
      if (typeof mode === "string") {
        return mode;
      }
      return mode.toString(8).padStart(4, "0");
    }
    exports2.modeToString = modeToString2;
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/parse-mtime.js
var require_parse_mtime = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/parse-mtime.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var errCode6 = require_err_code();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var errCode__default = /* @__PURE__ */ _interopDefaultLegacy(errCode6);
    function parseMtime2(input) {
      if (input == null) {
        return void 0;
      }
      let mtime;
      if (input.secs != null) {
        mtime = {
          secs: input.secs,
          nsecs: input.nsecs,
        };
      }
      if (input.Seconds != null) {
        mtime = {
          secs: input.Seconds,
          nsecs: input.FractionalNanoseconds,
        };
      }
      if (Array.isArray(input)) {
        mtime = {
          secs: input[0],
          nsecs: input[1],
        };
      }
      if (input instanceof Date) {
        const ms = input.getTime();
        const secs = Math.floor(ms / 1e3);
        mtime = {
          secs,
          nsecs: (ms - secs * 1e3) * 1e3,
        };
      }
      if (!Object.prototype.hasOwnProperty.call(mtime, "secs")) {
        return void 0;
      }
      if (
        mtime != null &&
        mtime.nsecs != null &&
        (mtime.nsecs < 0 || mtime.nsecs > 999999999)
      ) {
        throw errCode__default["default"](
          new Error("mtime-nsecs must be within the range [0,999999999]"),
          "ERR_INVALID_MTIME_NSECS"
        );
      }
      return mtime;
    }
    exports2.parseMtime = parseMtime2;
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/to-url-search-params.js
var require_to_url_search_params = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/to-url-search-params.js"(
    exports2
  ) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var modeToString2 = require_mode_to_string();
    var parseMtime2 = require_parse_mtime();
    function toUrlSearchParams({
      arg,
      searchParams,
      hashAlg,
      mtime,
      mode,
      ...options
    } = {}) {
      if (searchParams) {
        options = {
          ...options,
          ...searchParams,
        };
      }
      if (hashAlg) {
        options.hash = hashAlg;
      }
      if (mtime != null) {
        mtime = parseMtime2.parseMtime(mtime);
        options.mtime = mtime.secs;
        options.mtimeNsecs = mtime.nsecs;
      }
      if (mode != null) {
        options.mode = modeToString2.modeToString(mode);
      }
      if (options.timeout && !isNaN(options.timeout)) {
        options.timeout = `${options.timeout}ms`;
      }
      if (arg === void 0 || arg === null) {
        arg = [];
      } else if (!Array.isArray(arg)) {
        arg = [arg];
      }
      const urlSearchParams = new URLSearchParams(options);
      arg.forEach((arg2) => urlSearchParams.append("arg", arg2));
      return urlSearchParams;
    }
    exports2.toUrlSearchParams = toUrlSearchParams;
  },
});

// node_modules/ipfs-http-client/cjs/src/bitswap/wantlist.js
var require_wantlist = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bitswap/wantlist.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createWantlist = configure.configure((api) => {
      async function wantlist(options = {}) {
        const res = await (
          await api.post("bitswap/wantlist", {
            signal: options.signal,
            searchParams: toUrlSearchParams.toUrlSearchParams(options),
            headers: options.headers,
          })
        ).json();
        return (res.Keys || []).map((k) => cid.CID.parse(k["/"]));
      }
      return wantlist;
    });
    exports2.createWantlist = createWantlist;
  },
});

// node_modules/ipfs-http-client/cjs/src/bitswap/wantlist-for-peer.js
var require_wantlist_for_peer = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bitswap/wantlist-for-peer.js"(
    exports2
  ) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createWantlistForPeer = configure.configure((api) => {
      async function wantlistForPeer(peerId, options = {}) {
        const res = await (
          await api.post("bitswap/wantlist", {
            signal: options.signal,
            searchParams: toUrlSearchParams.toUrlSearchParams({
              ...options,
              peer: peerId.toString(),
            }),
            headers: options.headers,
          })
        ).json();
        return (res.Keys || []).map((k) => cid.CID.parse(k["/"]));
      }
      return wantlistForPeer;
    });
    exports2.createWantlistForPeer = createWantlistForPeer;
  },
});

// node_modules/ipfs-http-client/cjs/src/bitswap/stat.js
var require_stat = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bitswap/stat.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createStat = configure.configure((api) => {
      async function stat(options = {}) {
        const res = await api.post("bitswap/stat", {
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          signal: options.signal,
          headers: options.headers,
        });
        return toCoreInterface(await res.json());
      }
      return stat;
    });
    function toCoreInterface(res) {
      return {
        provideBufLen: res.ProvideBufLen,
        wantlist: (res.Wantlist || []).map((k) => cid.CID.parse(k["/"])),
        peers: res.Peers || [],
        blocksReceived: BigInt(res.BlocksReceived),
        dataReceived: BigInt(res.DataReceived),
        blocksSent: BigInt(res.BlocksSent),
        dataSent: BigInt(res.DataSent),
        dupBlksReceived: BigInt(res.DupBlksReceived),
        dupDataReceived: BigInt(res.DupDataReceived),
      };
    }
    exports2.createStat = createStat;
  },
});

// node_modules/ipfs-http-client/cjs/src/bitswap/unwant.js
var require_unwant = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bitswap/unwant.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createUnwant = configure.configure((api) => {
      async function unwant(cid, options = {}) {
        const res = await api.post("bitswap/unwant", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: cid.toString(),
            ...options,
          }),
          headers: options.headers,
        });
        return res.json();
      }
      return unwant;
    });
    exports2.createUnwant = createUnwant;
  },
});

// node_modules/ipfs-http-client/cjs/src/bitswap/index.js
var require_bitswap = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bitswap/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var wantlist = require_wantlist();
    var wantlistForPeer = require_wantlist_for_peer();
    var stat = require_stat();
    var unwant = require_unwant();
    function createBitswap(config) {
      return {
        wantlist: wantlist.createWantlist(config),
        wantlistForPeer: wantlistForPeer.createWantlistForPeer(config),
        unwant: unwant.createUnwant(config),
        stat: stat.createStat(config),
      };
    }
    exports2.createBitswap = createBitswap;
  },
});

// node_modules/ipfs-http-client/cjs/src/block/get.js
var require_get = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/block/get.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createGet = configure.configure((api) => {
      async function get(cid, options = {}) {
        const res = await api.post("block/get", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: cid.toString(),
            ...options,
          }),
          headers: options.headers,
        });
        return new Uint8Array(await res.arrayBuffer());
      }
      return get;
    });
    exports2.createGet = createGet;
  },
});

// node_modules/it-peekable/index.js
var require_it_peekable = __commonJS({
  "node_modules/it-peekable/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    function peekableIterator(iterable) {
      const [iterator, symbol] = iterable[Symbol.asyncIterator]
        ? [iterable[Symbol.asyncIterator](), Symbol.asyncIterator]
        : [iterable[Symbol.iterator](), Symbol.iterator];
      const queue = [];
      return {
        peek: () => {
          return iterator.next();
        },
        push: (value) => {
          queue.push(value);
        },
        next: () => {
          if (queue.length) {
            return {
              done: false,
              value: queue.shift(),
            };
          }
          return iterator.next();
        },
        [symbol]() {
          return this;
        },
      };
    }
    module2.exports = peekableIterator;
  },
});

// node_modules/browser-readablestream-to-it/index.js
var require_browser_readablestream_to_it = __commonJS({
  "node_modules/browser-readablestream-to-it/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    async function* browserReadableStreamToIt(stream, options = {}) {
      const reader = stream.getReader();
      try {
        while (true) {
          const result = await reader.read();
          if (result.done) {
            return;
          }
          yield result.value;
        }
      } finally {
        if (options.preventCancel !== true) {
          reader.cancel();
        }
        reader.releaseLock();
      }
    }
    module2.exports = browserReadableStreamToIt;
  },
});

// node_modules/it-all/index.js
var require_it_all = __commonJS({
  "node_modules/it-all/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var all3 = async (source) => {
      const arr = [];
      for await (const entry of source) {
        arr.push(entry);
      }
      return arr;
    };
    module2.exports = all3;
  },
});

// node_modules/ipfs-core-utils/esm/src/files/utils.js
function isBytes(obj) {
  return ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer;
}
function isBlob(obj) {
  return (
    obj.constructor &&
    (obj.constructor.name === "Blob" || obj.constructor.name === "File") &&
    typeof obj.stream === "function"
  );
}
function isFileObject(obj) {
  return typeof obj === "object" && (obj.path || obj.content);
}
var isReadableStream;
var init_utils = __esm({
  "node_modules/ipfs-core-utils/esm/src/files/utils.js"() {
    init_node_globals();
    isReadableStream = (value) =>
      value && typeof value.getReader === "function";
  },
});

// node_modules/ipfs-core-utils/esm/src/files/normalise-content.browser.js
async function normaliseContent(input) {
  if (isBytes(input)) {
    return new Blob([input]);
  }
  if (typeof input === "string" || input instanceof String) {
    return new Blob([input.toString()]);
  }
  if (isBlob(input)) {
    return input;
  }
  if (isReadableStream(input)) {
    input = (0, import_browser_readablestream_to_it.default)(input);
  }
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    const peekable = (0, import_it_peekable.default)(input);
    const { value, done } = await peekable.peek();
    if (done) {
      return itToBlob(peekable);
    }
    peekable.push(value);
    if (Number.isInteger(value)) {
      return new Blob([
        Uint8Array.from(await (0, import_it_all.default)(peekable)),
      ]);
    }
    if (
      isBytes(value) ||
      typeof value === "string" ||
      value instanceof String
    ) {
      return itToBlob(peekable);
    }
  }
  throw (0, import_err_code.default)(
    new Error(`Unexpected input: ${input}`),
    "ERR_UNEXPECTED_INPUT"
  );
}
async function itToBlob(stream) {
  const parts = [];
  for await (const chunk of stream) {
    parts.push(chunk);
  }
  return new Blob(parts);
}
var import_err_code,
  import_it_peekable,
  import_browser_readablestream_to_it,
  import_it_all;
var init_normalise_content_browser = __esm({
  "node_modules/ipfs-core-utils/esm/src/files/normalise-content.browser.js"() {
    init_node_globals();
    import_err_code = __toESM(require_err_code(), 1);
    import_it_peekable = __toESM(require_it_peekable(), 1);
    import_browser_readablestream_to_it = __toESM(
      require_browser_readablestream_to_it(),
      1
    );
    import_it_all = __toESM(require_it_all(), 1);
    init_utils();
  },
});

// node_modules/it-map/index.js
var require_it_map = __commonJS({
  "node_modules/it-map/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var map3 = async function* (source, func) {
      for await (const val of source) {
        yield func(val);
      }
    };
    module2.exports = map3;
  },
});

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1),
        offset = 0,
        index = 2,
        pending = true;
      while (index < arguments.length) params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err) reject(err);
            else {
              var params2 = new Array(arguments.length - 1),
                offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  },
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var base642 = exports2;
    base642.length = function length2(string2) {
      var p = string2.length;
      if (!p) return 0;
      var n = 0;
      while (--p % 4 > 1 && string2.charAt(p) === "=") ++n;
      return Math.ceil(string2.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[
        (b64[i] =
          i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : (i - 59) | 43)
      ] = i++;
    var i;
    base642.encode = function encode12(buffer2, start, end) {
      var parts = null,
        chunk = [];
      var i2 = 0,
        j = 0,
        t;
      while (start < end) {
        var b = buffer2[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | (b >> 4)];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | (b >> 6)];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(
            String.fromCharCode.apply(String, chunk)
          );
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1) chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base642.decode = function decode13(string2, buffer2, offset) {
      var start = offset;
      var j = 0,
        t;
      for (var i2 = 0; i2 < string2.length; ) {
        var c = string2.charCodeAt(i2++);
        if (c === 61 && j > 1) break;
        if ((c = s64[c]) === void 0) throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer2[offset++] = (t << 2) | ((c & 48) >> 4);
            t = c;
            j = 2;
            break;
          case 2:
            buffer2[offset++] = ((t & 15) << 4) | ((c & 60) >> 2);
            t = c;
            j = 3;
            break;
          case 3:
            buffer2[offset++] = ((t & 3) << 6) | c;
            j = 0;
            break;
        }
      }
      if (j === 1) throw Error(invalidEncoding);
      return offset - start;
    };
    base642.test = function test(string2) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
        string2
      );
    };
  },
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this,
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0) this._listeners = {};
      else {
        if (fn === void 0) this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn) listeners.splice(i, 1);
            else ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [],
          i = 1;
        for (; i < arguments.length; ) args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  },
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function () {
          var f32 = new Float32Array([-0]),
            f8b = new Uint8Array(f32.buffer),
            le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf2, pos) {
            f32[0] = val;
            buf2[pos] = f8b[0];
            buf2[pos + 1] = f8b[1];
            buf2[pos + 2] = f8b[2];
            buf2[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf2, pos) {
            f32[0] = val;
            buf2[pos] = f8b[3];
            buf2[pos + 1] = f8b[2];
            buf2[pos + 2] = f8b[1];
            buf2[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf2, pos) {
            f8b[0] = buf2[pos];
            f8b[1] = buf2[pos + 1];
            f8b[2] = buf2[pos + 2];
            f8b[3] = buf2[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf2, pos) {
            f8b[3] = buf2[pos];
            f8b[2] = buf2[pos + 1];
            f8b[1] = buf2[pos + 2];
            f8b[0] = buf2[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function () {
          function writeFloat_ieee754(writeUint, val, buf2, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) writeUint(1 / val > 0 ? 0 : 2147483648, buf2, pos);
            else if (isNaN(val)) writeUint(2143289344, buf2, pos);
            else if (val > 34028234663852886e22)
              writeUint(((sign << 31) | 2139095040) >>> 0, buf2, pos);
            else if (val < 11754943508222875e-54)
              writeUint(
                ((sign << 31) | Math.round(val / 1401298464324817e-60)) >>> 0,
                buf2,
                pos
              );
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2),
                mantissa =
                  Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint(
                ((sign << 31) | ((exponent + 127) << 23) | mantissa) >>> 0,
                buf2,
                pos
              );
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf2, pos) {
            var uint = readUint(buf2, pos),
              sign = (uint >> 31) * 2 + 1,
              exponent = (uint >>> 23) & 255,
              mantissa = uint & 8388607;
            return exponent === 255
              ? mantissa
                ? NaN
                : sign * Infinity
              : exponent === 0
              ? sign * 1401298464324817e-60 * mantissa
              : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function () {
          var f64 = new Float64Array([-0]),
            f8b = new Uint8Array(f64.buffer),
            le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf2, pos) {
            f64[0] = val;
            buf2[pos] = f8b[0];
            buf2[pos + 1] = f8b[1];
            buf2[pos + 2] = f8b[2];
            buf2[pos + 3] = f8b[3];
            buf2[pos + 4] = f8b[4];
            buf2[pos + 5] = f8b[5];
            buf2[pos + 6] = f8b[6];
            buf2[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf2, pos) {
            f64[0] = val;
            buf2[pos] = f8b[7];
            buf2[pos + 1] = f8b[6];
            buf2[pos + 2] = f8b[5];
            buf2[pos + 3] = f8b[4];
            buf2[pos + 4] = f8b[3];
            buf2[pos + 5] = f8b[2];
            buf2[pos + 6] = f8b[1];
            buf2[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le
            ? writeDouble_f64_cpy
            : writeDouble_f64_rev;
          exports3.writeDoubleBE = le
            ? writeDouble_f64_rev
            : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf2, pos) {
            f8b[0] = buf2[pos];
            f8b[1] = buf2[pos + 1];
            f8b[2] = buf2[pos + 2];
            f8b[3] = buf2[pos + 3];
            f8b[4] = buf2[pos + 4];
            f8b[5] = buf2[pos + 5];
            f8b[6] = buf2[pos + 6];
            f8b[7] = buf2[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf2, pos) {
            f8b[7] = buf2[pos];
            f8b[6] = buf2[pos + 1];
            f8b[5] = buf2[pos + 2];
            f8b[4] = buf2[pos + 3];
            f8b[3] = buf2[pos + 4];
            f8b[2] = buf2[pos + 5];
            f8b[1] = buf2[pos + 6];
            f8b[0] = buf2[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function () {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf2, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign) val = -val;
            if (val === 0) {
              writeUint(0, buf2, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf2, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf2, pos + off0);
              writeUint(2146959360, buf2, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf2, pos + off0);
              writeUint(((sign << 31) | 2146435072) >>> 0, buf2, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf2, pos + off0);
                writeUint(
                  ((sign << 31) | (mantissa / 4294967296)) >>> 0,
                  buf2,
                  pos + off1
                );
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024) exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(
                  (mantissa * 4503599627370496) >>> 0,
                  buf2,
                  pos + off0
                );
                writeUint(
                  ((sign << 31) |
                    ((exponent + 1023) << 20) |
                    ((mantissa * 1048576) & 1048575)) >>>
                    0,
                  buf2,
                  pos + off1
                );
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(
            null,
            writeUintLE,
            0,
            4
          );
          exports3.writeDoubleBE = writeDouble_ieee754.bind(
            null,
            writeUintBE,
            4,
            0
          );
          function readDouble_ieee754(readUint, off0, off1, buf2, pos) {
            var lo = readUint(buf2, pos + off0),
              hi = readUint(buf2, pos + off1);
            var sign = (hi >> 31) * 2 + 1,
              exponent = (hi >>> 20) & 2047,
              mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047
              ? mantissa
                ? NaN
                : sign * Infinity
              : exponent === 0
              ? sign * 5e-324 * mantissa
              : sign *
                Math.pow(2, exponent - 1075) *
                (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(
            null,
            readUintLE,
            0,
            4
          );
          exports3.readDoubleBE = readDouble_ieee754.bind(
            null,
            readUintBE,
            4,
            0
          );
        })();
      return exports3;
    }
    function writeUintLE(val, buf2, pos) {
      buf2[pos] = val & 255;
      buf2[pos + 1] = (val >>> 8) & 255;
      buf2[pos + 2] = (val >>> 16) & 255;
      buf2[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf2, pos) {
      buf2[pos] = val >>> 24;
      buf2[pos + 1] = (val >>> 16) & 255;
      buf2[pos + 2] = (val >>> 8) & 255;
      buf2[pos + 3] = val & 255;
    }
    function readUintLE(buf2, pos) {
      return (
        (buf2[pos] |
          (buf2[pos + 1] << 8) |
          (buf2[pos + 2] << 16) |
          (buf2[pos + 3] << 24)) >>>
        0
      );
    }
    function readUintBE(buf2, pos) {
      return (
        ((buf2[pos] << 24) |
          (buf2[pos + 1] << 16) |
          (buf2[pos + 2] << 8) |
          buf2[pos + 3]) >>>
        0
      );
    }
  },
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    init_node_globals();
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length)) return mod;
      } catch (e) {}
      return null;
    }
  },
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    init_node_globals();
    var utf8 = exports2;
    utf8.length = function utf8_length(string2) {
      var len = 0,
        c = 0;
      for (var i = 0; i < string2.length; ++i) {
        c = string2.charCodeAt(i);
        if (c < 128) len += 1;
        else if (c < 2048) len += 2;
        else if (
          (c & 64512) === 55296 &&
          (string2.charCodeAt(i + 1) & 64512) === 56320
        ) {
          ++i;
          len += 4;
        } else len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer2, start, end) {
      var len = end - start;
      if (len < 1) return "";
      var parts = null,
        chunk = [],
        i = 0,
        t;
      while (start < end) {
        t = buffer2[start++];
        if (t < 128) chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = ((t & 31) << 6) | (buffer2[start++] & 63);
        else if (t > 239 && t < 365) {
          t =
            (((t & 7) << 18) |
              ((buffer2[start++] & 63) << 12) |
              ((buffer2[start++] & 63) << 6) |
              (buffer2[start++] & 63)) -
            65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] =
            ((t & 15) << 12) |
            ((buffer2[start++] & 63) << 6) |
            (buffer2[start++] & 63);
        if (i > 8191) {
          (parts || (parts = [])).push(
            String.fromCharCode.apply(String, chunk)
          );
          i = 0;
        }
      }
      if (parts) {
        if (i) parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string2, buffer2, offset) {
      var start = offset,
        c1,
        c2;
      for (var i = 0; i < string2.length; ++i) {
        c1 = string2.charCodeAt(i);
        if (c1 < 128) {
          buffer2[offset++] = c1;
        } else if (c1 < 2048) {
          buffer2[offset++] = (c1 >> 6) | 192;
          buffer2[offset++] = (c1 & 63) | 128;
        } else if (
          (c1 & 64512) === 55296 &&
          ((c2 = string2.charCodeAt(i + 1)) & 64512) === 56320
        ) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer2[offset++] = (c1 >> 18) | 240;
          buffer2[offset++] = ((c1 >> 12) & 63) | 128;
          buffer2[offset++] = ((c1 >> 6) & 63) | 128;
          buffer2[offset++] = (c1 & 63) | 128;
        } else {
          buffer2[offset++] = (c1 >> 12) | 224;
          buffer2[offset++] = ((c1 >> 6) & 63) | 128;
          buffer2[offset++] = (c1 & 63) | 128;
        }
      }
      return offset - start;
    };
  },
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = pool;
    function pool(alloc2, slice2, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX) return alloc2(size2);
        if (offset + size2 > SIZE) {
          slab = alloc2(SIZE);
          offset = 0;
        }
        var buf2 = slice2.call(slab, offset, (offset += size2));
        if (offset & 7) offset = (offset | 7) + 1;
        return buf2;
      };
    }
  },
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = (LongBits.zero = new LongBits(0, 0));
    zero.toNumber = function () {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function () {
      return this;
    };
    zero.length = function () {
      return 1;
    };
    var zeroHash = (LongBits.zeroHash = "\0\0\0\0\0\0\0\0");
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0) return zero;
      var sign = value < 0;
      if (sign) value = -value;
      var lo = value >>> 0,
        hi = ((value - lo) / 4294967296) >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295) hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from3(value) {
      if (typeof value === "number") return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long) value = util.Long.fromString(value);
        else return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high
        ? new LongBits(value.low >>> 0, value.high >>> 0)
        : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = (~this.lo + 1) >>> 0,
          hi = ~this.hi >>> 0;
        if (!lo) hi = (hi + 1) >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long
        ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
        : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash) return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) |
          (charCodeAt.call(hash, 1) << 8) |
          (charCodeAt.call(hash, 2) << 16) |
          (charCodeAt.call(hash, 3) << 24)) >>>
          0,
        (charCodeAt.call(hash, 4) |
          (charCodeAt.call(hash, 5) << 8) |
          (charCodeAt.call(hash, 6) << 16) |
          (charCodeAt.call(hash, 7) << 24)) >>>
          0
      );
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        (this.lo >>> 8) & 255,
        (this.lo >>> 16) & 255,
        this.lo >>> 24,
        this.hi & 255,
        (this.hi >>> 8) & 255,
        (this.hi >>> 16) & 255,
        this.hi >>> 24
      );
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ mask) >>> 0;
      this.lo = ((this.lo << 1) ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ mask) >>> 0;
      this.hi = ((this.hi >>> 1) ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length2() {
      var part0 = this.lo,
        part1 = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
        part2 = this.hi >>> 24;
      return part2 === 0
        ? part1 === 0
          ? part0 < 16384
            ? part0 < 128
              ? 1
              : 2
            : part0 < 2097152
            ? 3
            : 4
          : part1 < 16384
          ? part1 < 128
            ? 5
            : 6
          : part1 < 2097152
          ? 7
          : 8
        : part2 < 128
        ? 9
        : 10;
    };
  },
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    init_node_globals();
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(
      typeof global !== "undefined" &&
        global &&
        global.process &&
        global.process.versions &&
        global.process.versions.node
    );
    util.global =
      (util.isNode && global) ||
      (typeof window !== "undefined" && window) ||
      (typeof self !== "undefined" && self) ||
      exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util.isInteger =
      Number.isInteger ||
      function isInteger(value) {
        return (
          typeof value === "number" &&
          isFinite(value) &&
          Math.floor(value) === value
        );
      };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util.isset = util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return (
          typeof value !== "object" ||
          (Array.isArray(value) ? value.length : Object.keys(value).length) > 0
        );
      return false;
    };
    util.Buffer = (function () {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    })();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number"
        ? util.Buffer
          ? util._Buffer_allocUnsafe(sizeOrArray)
          : new util.Array(sizeOrArray)
        : util.Buffer
        ? util._Buffer_from(sizeOrArray)
        : typeof Uint8Array === "undefined"
        ? sizeOrArray
        : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long =
      (util.global.dcodeIO && util.global.dcodeIO.Long) ||
      util.global.Long ||
      util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value
        ? util.LongBits.from(value).toHash()
        : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src2, ifNotSet) {
      for (var keys = Object.keys(src2), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet) dst[keys[i]] = src2[keys[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name8) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", {
          get: function () {
            return message;
          },
        });
        if (Error.captureStackTrace) Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", {
            value: new Error().stack || "",
          });
        if (properties) merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor =
        CustomError;
      Object.defineProperty(CustomError.prototype, "name", {
        get: function () {
          return name8;
        },
      });
      CustomError.prototype.toString = function toString4() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i) fieldMap[fieldNames[i]] = 1;
      return function () {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (
            fieldMap[keys[i2]] === 1 &&
            this[keys[i2]] !== void 0 &&
            this[keys[i2]] !== null
          )
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function (name8) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name8) delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true,
    };
    util._configure = function () {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from =
        (Buffer2.from !== Uint8Array.from && Buffer2.from) ||
        function Buffer_from(value, encoding) {
          return new Buffer2(value, encoding);
        };
      util._Buffer_allocUnsafe =
        Buffer2.allocUnsafe ||
        function Buffer_allocUnsafe(size) {
          return new Buffer2(size);
        };
    };
  },
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base642 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {}
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create2 = function create3() {
      return util.Buffer
        ? function create_buffer_setup() {
            return (Writer.create = function create_buffer() {
              return new BufferWriter();
            })();
          }
        : function create_array() {
            return new Writer();
          };
    };
    Writer.create = create2();
    Writer.alloc = function alloc2(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf2, pos) {
      buf2[pos] = val & 255;
    }
    function writeVarint32(val, buf2, pos) {
      while (val > 127) {
        buf2[pos++] = (val & 127) | 128;
        val >>>= 7;
      }
      buf2[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next =
        new VarintOp(
          (value = value >>> 0) < 128
            ? 1
            : value < 16384
            ? 2
            : value < 2097152
            ? 3
            : value < 268435456
            ? 4
            : 5,
          value
        )).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0
        ? this._push(writeVarint64, 10, LongBits.fromNumber(value))
        : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32(((value << 1) ^ (value >> 31)) >>> 0);
    };
    function writeVarint64(val, buf2, pos) {
      while (val.hi) {
        buf2[pos++] = (val.lo & 127) | 128;
        val.lo = ((val.lo >>> 7) | (val.hi << 25)) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf2[pos++] = (val.lo & 127) | 128;
        val.lo = val.lo >>> 7;
      }
      buf2[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf2, pos) {
      buf2[pos] = val & 255;
      buf2[pos + 1] = (val >>> 8) & 255;
      buf2[pos + 2] = (val >>> 16) & 255;
      buf2[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(
        writeFixed32,
        4,
        bits.hi
      );
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set
      ? function writeBytes_set(val, buf2, pos) {
          buf2.set(val, pos);
        }
      : function writeBytes_for(val, buf2, pos) {
          for (var i = 0; i < val.length; ++i) buf2[pos + i] = val[i];
        };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len) return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf2 = Writer.alloc((len = base642.length(value)));
        base642.decode(value, buf2, 0);
        value = buf2;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len
        ? this.uint32(len)._push(utf8.write, len, value)
        : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head,
        tail = this.tail,
        len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next,
        buf2 = this.constructor.alloc(this.len),
        pos = 0;
      while (head) {
        head.fn(head.val, buf2, pos);
        pos += head.len;
        head = head.next;
      }
      return buf2;
    };
    Writer._configure = function (BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create2();
      BufferWriter._configure();
    };
  },
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor =
      BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function () {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer =
        util.Buffer &&
        util.Buffer.prototype instanceof Uint8Array &&
        util.Buffer.prototype.set.name === "set"
          ? function writeBytesBuffer_set(val, buf2, pos) {
              buf2.set(val, pos);
            }
          : function writeBytesBuffer_copy(val, buf2, pos) {
              if (val.copy) val.copy(buf2, pos, 0, val.length);
              else for (var i = 0; i < val.length; ) buf2[pos++] = val[i++];
            };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value)) value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len) this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf2, pos) {
      if (val.length < 40) util.utf8.write(val, buf2, pos);
      else if (buf2.utf8Write) buf2.utf8Write(val, pos);
      else buf2.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len) this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  },
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError(
        "index out of range: " +
          reader.pos +
          " + " +
          (writeLength || 1) +
          " > " +
          reader.len
      );
    }
    function Reader(buffer2) {
      this.buf = buffer2;
      this.pos = 0;
      this.len = buffer2.length;
    }
    var create_array =
      typeof Uint8Array !== "undefined"
        ? function create_typed_array(buffer2) {
            if (buffer2 instanceof Uint8Array || Array.isArray(buffer2))
              return new Reader(buffer2);
            throw Error("illegal buffer");
          }
        : function create_array2(buffer2) {
            if (Array.isArray(buffer2)) return new Reader(buffer2);
            throw Error("illegal buffer");
          };
    var create2 = function create3() {
      return util.Buffer
        ? function create_buffer_setup(buffer2) {
            return (Reader.create = function create_buffer(buffer3) {
              return util.Buffer.isBuffer(buffer3)
                ? new BufferReader(buffer3)
                : create_array(buffer3);
            })(buffer2);
          }
        : create_array;
    };
    Reader.create = create2();
    Reader.prototype._slice =
      util.Array.prototype.subarray || util.Array.prototype.slice;
    Reader.prototype.uint32 = (function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | ((this.buf[this.pos] & 127) << 7)) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | ((this.buf[this.pos] & 127) << 14)) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | ((this.buf[this.pos] & 127) << 21)) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        value = (value | ((this.buf[this.pos] & 15) << 28)) >>> 0;
        if (this.buf[this.pos++] < 128) return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    })();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return ((value >>> 1) ^ -(value & 1)) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << (i * 7))) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
        }
        bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << 28)) >>> 0;
        bits.hi = (bits.hi | ((this.buf[this.pos] & 127) >> 4)) >>> 0;
        if (this.buf[this.pos++] < 128) return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len) throw indexOutOfRange(this);
          bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << (i * 7))) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
        }
        bits.lo = (bits.lo | ((this.buf[this.pos++] & 127) << (i * 7))) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi =
            (bits.hi | ((this.buf[this.pos] & 127) << (i * 7 + 3))) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len) throw indexOutOfRange(this);
          bits.hi =
            (bits.hi | ((this.buf[this.pos] & 127) << (i * 7 + 3))) >>> 0;
          if (this.buf[this.pos++] < 128) return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf2, end) {
      return (
        (buf2[end - 4] |
          (buf2[end - 3] << 8) |
          (buf2[end - 2] << 16) |
          (buf2[end - 1] << 24)) >>>
        0
      );
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, (this.pos += 4));
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, (this.pos += 4)) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8);
      return new LongBits(
        readFixed32_end(this.buf, (this.pos += 4)),
        readFixed32_end(this.buf, (this.pos += 4))
      );
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length2 = this.uint32(),
        start = this.pos,
        end = this.pos + length2;
      if (end > this.len) throw indexOutOfRange(this, length2);
      this.pos += length2;
      if (Array.isArray(this.buf)) return this.buf.slice(start, end);
      return start === end
        ? new this.buf.constructor(0)
        : this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length2) {
      if (typeof length2 === "number") {
        if (this.pos + length2 > this.len) throw indexOutOfRange(this, length2);
        this.pos += length2;
      } else {
        do {
          if (this.pos >= this.len) throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader.prototype.skipType = function (wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error(
            "invalid wire type " + wireType + " at offset " + this.pos
          );
      }
      return this;
    };
    Reader._configure = function (BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create2();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : "toNumber";
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        },
      });
    };
  },
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor =
      BufferReader;
    var util = require_minimal();
    function BufferReader(buffer2) {
      Reader.call(this, buffer2);
    }
    BufferReader._configure = function () {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice
        ? this.buf.utf8Slice(
            this.pos,
            (this.pos = Math.min(this.pos + len, this.len))
          )
        : this.buf.toString(
            "utf-8",
            this.pos,
            (this.pos = Math.min(this.pos + len, this.len))
          );
    };
    BufferReader._configure();
  },
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(
      util.EventEmitter.prototype
    )).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(
      method,
      requestCtor,
      responseCtor,
      request,
      callback
    ) {
      if (!request) throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(
          rpcCall,
          self2,
          method,
          requestCtor,
          responseCtor,
          request
        );
      if (!self2.rpcImpl) {
        setTimeout(function () {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](
            request
          ).finish(),
          function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(true);
              return void 0;
            }
            if (!(response instanceof responseCtor)) {
              try {
                response =
                  responseCtor[
                    self2.responseDelimited ? "decodeDelimited" : "decode"
                  ](response);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response, method);
            return callback(null, response);
          }
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function () {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC) this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  },
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    init_node_globals();
    var rpc = exports2;
    rpc.Service = require_service();
  },
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = {};
  },
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    init_node_globals();
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  },
});

// node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    module2.exports = require_index_minimal();
  },
});

// node_modules/ipfs-unixfs/esm/src/unixfs.js
var import_minimal, $Reader, $Writer, $util, $root, Data, UnixTime, Metadata;
var init_unixfs = __esm({
  "node_modules/ipfs-unixfs/esm/src/unixfs.js"() {
    init_node_globals();
    import_minimal = __toESM(require_minimal2(), 1);
    $Reader = import_minimal.default.Reader;
    $Writer = import_minimal.default.Writer;
    $util = import_minimal.default.util;
    $root =
      import_minimal.default.roots["ipfs-unixfs"] ||
      (import_minimal.default.roots["ipfs-unixfs"] = {});
    Data = $root.Data = (() => {
      function Data2(p) {
        this.blocksizes = [];
        if (p) {
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
      }
      Data2.prototype.Type = 0;
      Data2.prototype.Data = $util.newBuffer([]);
      Data2.prototype.filesize = $util.Long
        ? $util.Long.fromBits(0, 0, true)
        : 0;
      Data2.prototype.blocksizes = $util.emptyArray;
      Data2.prototype.hashType = $util.Long
        ? $util.Long.fromBits(0, 0, true)
        : 0;
      Data2.prototype.fanout = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Data2.prototype.mode = 0;
      Data2.prototype.mtime = null;
      Data2.encode = function encode12(m, w) {
        if (!w) w = $Writer.create();
        w.uint32(8).int32(m.Type);
        if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
          w.uint32(18).bytes(m.Data);
        if (m.filesize != null && Object.hasOwnProperty.call(m, "filesize"))
          w.uint32(24).uint64(m.filesize);
        if (m.blocksizes != null && m.blocksizes.length) {
          for (var i = 0; i < m.blocksizes.length; ++i)
            w.uint32(32).uint64(m.blocksizes[i]);
        }
        if (m.hashType != null && Object.hasOwnProperty.call(m, "hashType"))
          w.uint32(40).uint64(m.hashType);
        if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
          w.uint32(48).uint64(m.fanout);
        if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
          w.uint32(56).uint32(m.mode);
        if (m.mtime != null && Object.hasOwnProperty.call(m, "mtime"))
          $root.UnixTime.encode(m.mtime, w.uint32(66).fork()).ldelim();
        return w;
      };
      Data2.decode = function decode13(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === void 0 ? r.len : r.pos + l,
          m = new $root.Data();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.Type = r.int32();
              break;
            case 2:
              m.Data = r.bytes();
              break;
            case 3:
              m.filesize = r.uint64();
              break;
            case 4:
              if (!(m.blocksizes && m.blocksizes.length)) m.blocksizes = [];
              if ((t & 7) === 2) {
                var c2 = r.uint32() + r.pos;
                while (r.pos < c2) m.blocksizes.push(r.uint64());
              } else m.blocksizes.push(r.uint64());
              break;
            case 5:
              m.hashType = r.uint64();
              break;
            case 6:
              m.fanout = r.uint64();
              break;
            case 7:
              m.mode = r.uint32();
              break;
            case 8:
              m.mtime = $root.UnixTime.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        if (!m.hasOwnProperty("Type"))
          throw $util.ProtocolError("missing required 'Type'", { instance: m });
        return m;
      };
      Data2.fromObject = function fromObject(d) {
        if (d instanceof $root.Data) return d;
        var m = new $root.Data();
        switch (d.Type) {
          case "Raw":
          case 0:
            m.Type = 0;
            break;
          case "Directory":
          case 1:
            m.Type = 1;
            break;
          case "File":
          case 2:
            m.Type = 2;
            break;
          case "Metadata":
          case 3:
            m.Type = 3;
            break;
          case "Symlink":
          case 4:
            m.Type = 4;
            break;
          case "HAMTShard":
          case 5:
            m.Type = 5;
            break;
        }
        if (d.Data != null) {
          if (typeof d.Data === "string")
            $util.base64.decode(
              d.Data,
              (m.Data = $util.newBuffer($util.base64.length(d.Data))),
              0
            );
          else if (d.Data.length) m.Data = d.Data;
        }
        if (d.filesize != null) {
          if ($util.Long)
            (m.filesize = $util.Long.fromValue(d.filesize)).unsigned = true;
          else if (typeof d.filesize === "string")
            m.filesize = parseInt(d.filesize, 10);
          else if (typeof d.filesize === "number") m.filesize = d.filesize;
          else if (typeof d.filesize === "object")
            m.filesize = new $util.LongBits(
              d.filesize.low >>> 0,
              d.filesize.high >>> 0
            ).toNumber(true);
        }
        if (d.blocksizes) {
          if (!Array.isArray(d.blocksizes))
            throw TypeError(".Data.blocksizes: array expected");
          m.blocksizes = [];
          for (var i = 0; i < d.blocksizes.length; ++i) {
            if ($util.Long)
              (m.blocksizes[i] = $util.Long.fromValue(
                d.blocksizes[i]
              )).unsigned = true;
            else if (typeof d.blocksizes[i] === "string")
              m.blocksizes[i] = parseInt(d.blocksizes[i], 10);
            else if (typeof d.blocksizes[i] === "number")
              m.blocksizes[i] = d.blocksizes[i];
            else if (typeof d.blocksizes[i] === "object")
              m.blocksizes[i] = new $util.LongBits(
                d.blocksizes[i].low >>> 0,
                d.blocksizes[i].high >>> 0
              ).toNumber(true);
          }
        }
        if (d.hashType != null) {
          if ($util.Long)
            (m.hashType = $util.Long.fromValue(d.hashType)).unsigned = true;
          else if (typeof d.hashType === "string")
            m.hashType = parseInt(d.hashType, 10);
          else if (typeof d.hashType === "number") m.hashType = d.hashType;
          else if (typeof d.hashType === "object")
            m.hashType = new $util.LongBits(
              d.hashType.low >>> 0,
              d.hashType.high >>> 0
            ).toNumber(true);
        }
        if (d.fanout != null) {
          if ($util.Long)
            (m.fanout = $util.Long.fromValue(d.fanout)).unsigned = true;
          else if (typeof d.fanout === "string")
            m.fanout = parseInt(d.fanout, 10);
          else if (typeof d.fanout === "number") m.fanout = d.fanout;
          else if (typeof d.fanout === "object")
            m.fanout = new $util.LongBits(
              d.fanout.low >>> 0,
              d.fanout.high >>> 0
            ).toNumber(true);
        }
        if (d.mode != null) {
          m.mode = d.mode >>> 0;
        }
        if (d.mtime != null) {
          if (typeof d.mtime !== "object")
            throw TypeError(".Data.mtime: object expected");
          m.mtime = $root.UnixTime.fromObject(d.mtime);
        }
        return m;
      };
      Data2.toObject = function toObject(m, o) {
        if (!o) o = {};
        var d = {};
        if (o.arrays || o.defaults) {
          d.blocksizes = [];
        }
        if (o.defaults) {
          d.Type = o.enums === String ? "Raw" : 0;
          if (o.bytes === String) d.Data = "";
          else {
            d.Data = [];
            if (o.bytes !== Array) d.Data = $util.newBuffer(d.Data);
          }
          if ($util.Long) {
            var n = new $util.Long(0, 0, true);
            d.filesize =
              o.longs === String
                ? n.toString()
                : o.longs === Number
                ? n.toNumber()
                : n;
          } else d.filesize = o.longs === String ? "0" : 0;
          if ($util.Long) {
            var n = new $util.Long(0, 0, true);
            d.hashType =
              o.longs === String
                ? n.toString()
                : o.longs === Number
                ? n.toNumber()
                : n;
          } else d.hashType = o.longs === String ? "0" : 0;
          if ($util.Long) {
            var n = new $util.Long(0, 0, true);
            d.fanout =
              o.longs === String
                ? n.toString()
                : o.longs === Number
                ? n.toNumber()
                : n;
          } else d.fanout = o.longs === String ? "0" : 0;
          d.mode = 0;
          d.mtime = null;
        }
        if (m.Type != null && m.hasOwnProperty("Type")) {
          d.Type = o.enums === String ? $root.Data.DataType[m.Type] : m.Type;
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
          d.Data =
            o.bytes === String
              ? $util.base64.encode(m.Data, 0, m.Data.length)
              : o.bytes === Array
              ? Array.prototype.slice.call(m.Data)
              : m.Data;
        }
        if (m.filesize != null && m.hasOwnProperty("filesize")) {
          if (typeof m.filesize === "number")
            d.filesize = o.longs === String ? String(m.filesize) : m.filesize;
          else
            d.filesize =
              o.longs === String
                ? $util.Long.prototype.toString.call(m.filesize)
                : o.longs === Number
                ? new $util.LongBits(
                    m.filesize.low >>> 0,
                    m.filesize.high >>> 0
                  ).toNumber(true)
                : m.filesize;
        }
        if (m.blocksizes && m.blocksizes.length) {
          d.blocksizes = [];
          for (var j = 0; j < m.blocksizes.length; ++j) {
            if (typeof m.blocksizes[j] === "number")
              d.blocksizes[j] =
                o.longs === String ? String(m.blocksizes[j]) : m.blocksizes[j];
            else
              d.blocksizes[j] =
                o.longs === String
                  ? $util.Long.prototype.toString.call(m.blocksizes[j])
                  : o.longs === Number
                  ? new $util.LongBits(
                      m.blocksizes[j].low >>> 0,
                      m.blocksizes[j].high >>> 0
                    ).toNumber(true)
                  : m.blocksizes[j];
          }
        }
        if (m.hashType != null && m.hasOwnProperty("hashType")) {
          if (typeof m.hashType === "number")
            d.hashType = o.longs === String ? String(m.hashType) : m.hashType;
          else
            d.hashType =
              o.longs === String
                ? $util.Long.prototype.toString.call(m.hashType)
                : o.longs === Number
                ? new $util.LongBits(
                    m.hashType.low >>> 0,
                    m.hashType.high >>> 0
                  ).toNumber(true)
                : m.hashType;
        }
        if (m.fanout != null && m.hasOwnProperty("fanout")) {
          if (typeof m.fanout === "number")
            d.fanout = o.longs === String ? String(m.fanout) : m.fanout;
          else
            d.fanout =
              o.longs === String
                ? $util.Long.prototype.toString.call(m.fanout)
                : o.longs === Number
                ? new $util.LongBits(
                    m.fanout.low >>> 0,
                    m.fanout.high >>> 0
                  ).toNumber(true)
                : m.fanout;
        }
        if (m.mode != null && m.hasOwnProperty("mode")) {
          d.mode = m.mode;
        }
        if (m.mtime != null && m.hasOwnProperty("mtime")) {
          d.mtime = $root.UnixTime.toObject(m.mtime, o);
        }
        return d;
      };
      Data2.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(
          this,
          import_minimal.default.util.toJSONOptions
        );
      };
      Data2.DataType = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[0] = "Raw")] = 0;
        values[(valuesById[1] = "Directory")] = 1;
        values[(valuesById[2] = "File")] = 2;
        values[(valuesById[3] = "Metadata")] = 3;
        values[(valuesById[4] = "Symlink")] = 4;
        values[(valuesById[5] = "HAMTShard")] = 5;
        return values;
      })();
      return Data2;
    })();
    UnixTime = $root.UnixTime = (() => {
      function UnixTime2(p) {
        if (p) {
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
      }
      UnixTime2.prototype.Seconds = $util.Long
        ? $util.Long.fromBits(0, 0, false)
        : 0;
      UnixTime2.prototype.FractionalNanoseconds = 0;
      UnixTime2.encode = function encode12(m, w) {
        if (!w) w = $Writer.create();
        w.uint32(8).int64(m.Seconds);
        if (
          m.FractionalNanoseconds != null &&
          Object.hasOwnProperty.call(m, "FractionalNanoseconds")
        )
          w.uint32(21).fixed32(m.FractionalNanoseconds);
        return w;
      };
      UnixTime2.decode = function decode13(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === void 0 ? r.len : r.pos + l,
          m = new $root.UnixTime();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.Seconds = r.int64();
              break;
            case 2:
              m.FractionalNanoseconds = r.fixed32();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        if (!m.hasOwnProperty("Seconds"))
          throw $util.ProtocolError("missing required 'Seconds'", {
            instance: m,
          });
        return m;
      };
      UnixTime2.fromObject = function fromObject(d) {
        if (d instanceof $root.UnixTime) return d;
        var m = new $root.UnixTime();
        if (d.Seconds != null) {
          if ($util.Long)
            (m.Seconds = $util.Long.fromValue(d.Seconds)).unsigned = false;
          else if (typeof d.Seconds === "string")
            m.Seconds = parseInt(d.Seconds, 10);
          else if (typeof d.Seconds === "number") m.Seconds = d.Seconds;
          else if (typeof d.Seconds === "object")
            m.Seconds = new $util.LongBits(
              d.Seconds.low >>> 0,
              d.Seconds.high >>> 0
            ).toNumber();
        }
        if (d.FractionalNanoseconds != null) {
          m.FractionalNanoseconds = d.FractionalNanoseconds >>> 0;
        }
        return m;
      };
      UnixTime2.toObject = function toObject(m, o) {
        if (!o) o = {};
        var d = {};
        if (o.defaults) {
          if ($util.Long) {
            var n = new $util.Long(0, 0, false);
            d.Seconds =
              o.longs === String
                ? n.toString()
                : o.longs === Number
                ? n.toNumber()
                : n;
          } else d.Seconds = o.longs === String ? "0" : 0;
          d.FractionalNanoseconds = 0;
        }
        if (m.Seconds != null && m.hasOwnProperty("Seconds")) {
          if (typeof m.Seconds === "number")
            d.Seconds = o.longs === String ? String(m.Seconds) : m.Seconds;
          else
            d.Seconds =
              o.longs === String
                ? $util.Long.prototype.toString.call(m.Seconds)
                : o.longs === Number
                ? new $util.LongBits(
                    m.Seconds.low >>> 0,
                    m.Seconds.high >>> 0
                  ).toNumber()
                : m.Seconds;
        }
        if (
          m.FractionalNanoseconds != null &&
          m.hasOwnProperty("FractionalNanoseconds")
        ) {
          d.FractionalNanoseconds = m.FractionalNanoseconds;
        }
        return d;
      };
      UnixTime2.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(
          this,
          import_minimal.default.util.toJSONOptions
        );
      };
      return UnixTime2;
    })();
    Metadata = $root.Metadata = (() => {
      function Metadata2(p) {
        if (p) {
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
      }
      Metadata2.prototype.MimeType = "";
      Metadata2.encode = function encode12(m, w) {
        if (!w) w = $Writer.create();
        if (m.MimeType != null && Object.hasOwnProperty.call(m, "MimeType"))
          w.uint32(10).string(m.MimeType);
        return w;
      };
      Metadata2.decode = function decode13(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === void 0 ? r.len : r.pos + l,
          m = new $root.Metadata();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.MimeType = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      Metadata2.fromObject = function fromObject(d) {
        if (d instanceof $root.Metadata) return d;
        var m = new $root.Metadata();
        if (d.MimeType != null) {
          m.MimeType = String(d.MimeType);
        }
        return m;
      };
      Metadata2.toObject = function toObject(m, o) {
        if (!o) o = {};
        var d = {};
        if (o.defaults) {
          d.MimeType = "";
        }
        if (m.MimeType != null && m.hasOwnProperty("MimeType")) {
          d.MimeType = m.MimeType;
        }
        return d;
      };
      Metadata2.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(
          this,
          import_minimal.default.util.toJSONOptions
        );
      };
      return Metadata2;
    })();
  },
});

// node_modules/ipfs-unixfs/esm/src/index.js
function parseMode(mode) {
  if (mode == null) {
    return void 0;
  }
  if (typeof mode === "number") {
    return mode & 4095;
  }
  mode = mode.toString();
  if (mode.substring(0, 1) === "0") {
    return parseInt(mode, 8) & 4095;
  }
  return parseInt(mode, 10) & 4095;
}
function parseMtime(input) {
  if (input == null) {
    return void 0;
  }
  let mtime;
  if (input.secs != null) {
    mtime = {
      secs: input.secs,
      nsecs: input.nsecs,
    };
  }
  if (input.Seconds != null) {
    mtime = {
      secs: input.Seconds,
      nsecs: input.FractionalNanoseconds,
    };
  }
  if (Array.isArray(input)) {
    mtime = {
      secs: input[0],
      nsecs: input[1],
    };
  }
  if (input instanceof Date) {
    const ms = input.getTime();
    const secs = Math.floor(ms / 1e3);
    mtime = {
      secs,
      nsecs: (ms - secs * 1e3) * 1e3,
    };
  }
  if (!Object.prototype.hasOwnProperty.call(mtime, "secs")) {
    return void 0;
  }
  if (
    mtime != null &&
    mtime.nsecs != null &&
    (mtime.nsecs < 0 || mtime.nsecs > 999999999)
  ) {
    throw (0, import_err_code2.default)(
      new Error("mtime-nsecs must be within the range [0,999999999]"),
      "ERR_INVALID_MTIME_NSECS"
    );
  }
  return mtime;
}
var import_err_code2, DEFAULT_FILE_MODE, DEFAULT_DIRECTORY_MODE;
var init_src3 = __esm({
  "node_modules/ipfs-unixfs/esm/src/index.js"() {
    init_node_globals();
    import_err_code2 = __toESM(require_err_code(), 1);
    init_unixfs();
    DEFAULT_FILE_MODE = parseInt("0644", 8);
    DEFAULT_DIRECTORY_MODE = parseInt("0755", 8);
  },
});

// node_modules/ipfs-core-utils/esm/src/files/normalise-candidate-multiple.js
async function* normaliseCandidateMultiple(input, normaliseContent3) {
  if (
    typeof input === "string" ||
    input instanceof String ||
    isBytes(input) ||
    isBlob(input) ||
    input._readableState
  ) {
    throw (0, import_err_code3.default)(
      new Error(
        "Unexpected input: single item passed - if you are using ipfs.addAll, please use ipfs.add instead"
      ),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  if (isReadableStream(input)) {
    input = (0, import_browser_readablestream_to_it2.default)(input);
  }
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    const peekable = (0, import_it_peekable2.default)(input);
    const { value, done } = await peekable.peek();
    if (done) {
      yield* [];
      return;
    }
    peekable.push(value);
    if (Number.isInteger(value)) {
      throw (0, import_err_code3.default)(
        new Error(
          "Unexpected input: single item passed - if you are using ipfs.addAll, please use ipfs.add instead"
        ),
        "ERR_UNEXPECTED_INPUT"
      );
    }
    if (value._readableState) {
      yield* (0, import_it_map.default)(peekable, (value2) =>
        toFileObject({ content: value2 }, normaliseContent3)
      );
      return;
    }
    if (isBytes(value)) {
      yield toFileObject({ content: peekable }, normaliseContent3);
      return;
    }
    if (
      isFileObject(value) ||
      value[Symbol.iterator] ||
      value[Symbol.asyncIterator] ||
      isReadableStream(value) ||
      isBlob(value)
    ) {
      yield* (0, import_it_map.default)(peekable, (value2) =>
        toFileObject(value2, normaliseContent3)
      );
      return;
    }
  }
  if (isFileObject(input)) {
    throw (0, import_err_code3.default)(
      new Error(
        "Unexpected input: single item passed - if you are using ipfs.addAll, please use ipfs.add instead"
      ),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  throw (0, import_err_code3.default)(
    new Error("Unexpected input: " + typeof input),
    "ERR_UNEXPECTED_INPUT"
  );
}
async function toFileObject(input, normaliseContent3) {
  const { path, mode, mtime, content } = input;
  const file = {
    path: path || "",
    mode: parseMode(mode),
    mtime: parseMtime(mtime),
  };
  if (content) {
    file.content = await normaliseContent3(content);
  } else if (!path) {
    file.content = await normaliseContent3(input);
  }
  return file;
}
var import_err_code3,
  import_browser_readablestream_to_it2,
  import_it_peekable2,
  import_it_map;
var init_normalise_candidate_multiple = __esm({
  "node_modules/ipfs-core-utils/esm/src/files/normalise-candidate-multiple.js"() {
    init_node_globals();
    import_err_code3 = __toESM(require_err_code(), 1);
    import_browser_readablestream_to_it2 = __toESM(
      require_browser_readablestream_to_it(),
      1
    );
    import_it_peekable2 = __toESM(require_it_peekable(), 1);
    import_it_map = __toESM(require_it_map(), 1);
    init_utils();
    init_src3();
  },
});

// node_modules/ipfs-core-utils/esm/src/files/normalise-input-multiple.browser.js
function normaliseInput(input) {
  return normaliseCandidateMultiple(input, normaliseContent, true);
}
var init_normalise_input_multiple_browser = __esm({
  "node_modules/ipfs-core-utils/esm/src/files/normalise-input-multiple.browser.js"() {
    init_node_globals();
    init_normalise_content_browser();
    init_normalise_candidate_multiple();
  },
});

// node_modules/ipfs-core-utils/esm/src/mode-to-string.js
function modeToString(mode) {
  if (mode == null) {
    return void 0;
  }
  if (typeof mode === "string") {
    return mode;
  }
  return mode.toString(8).padStart(4, "0");
}
var init_mode_to_string = __esm({
  "node_modules/ipfs-core-utils/esm/src/mode-to-string.js"() {
    init_node_globals();
  },
});

// node_modules/ipfs-core-utils/esm/src/multipart-request.browser.js
var multipart_request_browser_exports = {};
__export(multipart_request_browser_exports, {
  multipartRequest: () => multipartRequest,
});
async function multipartRequest(source, abortController, headers = {}) {
  const parts = [];
  const formData = new FormData();
  let index = 0;
  let total = 0;
  for await (const { content, path, mode, mtime } of normaliseInput(source)) {
    let fileSuffix = "";
    const type = content ? "file" : "dir";
    if (index > 0) {
      fileSuffix = `-${index}`;
    }
    let fieldName = type + fileSuffix;
    const qs = [];
    if (mode !== null && mode !== void 0) {
      qs.push(`mode=${modeToString(mode)}`);
    }
    if (mtime != null) {
      const { secs, nsecs } = mtime;
      qs.push(`mtime=${secs}`);
      if (nsecs != null) {
        qs.push(`mtime-nsecs=${nsecs}`);
      }
    }
    if (qs.length) {
      fieldName = `${fieldName}?${qs.join("&")}`;
    }
    if (content) {
      formData.set(
        fieldName,
        content,
        path != null ? encodeURIComponent(path) : void 0
      );
      const end = total + content.size;
      parts.push({
        name: path,
        start: total,
        end,
      });
      total = end;
    } else if (path != null) {
      formData.set(
        fieldName,
        new File([""], encodeURIComponent(path), {
          type: "application/x-directory",
        })
      );
    } else {
      throw new Error("path or content or both must be set");
    }
    index++;
  }
  return {
    total,
    parts,
    headers,
    body: formData,
  };
}
var init_multipart_request_browser = __esm({
  "node_modules/ipfs-core-utils/esm/src/multipart-request.browser.js"() {
    init_node_globals();
    init_normalise_input_multiple_browser();
    init_mode_to_string();
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/abort-signal.js
var require_abort_signal = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/abort-signal.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var anySignal = require_any_signal();
    function filter(signals) {
      return signals.filter(Boolean);
    }
    function abortSignal(...signals) {
      return anySignal.anySignal(filter(signals));
    }
    exports2.abortSignal = abortSignal;
  },
});

// node_modules/ipfs-http-client/cjs/src/block/put.js
var require_put = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/block/put.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var abortSignal = require_abort_signal();
    var createPut = configure.configure((api) => {
      async function put(data, options = {}) {
        const controller = new AbortController();
        const signal = abortSignal.abortSignal(
          controller.signal,
          options.signal
        );
        let res;
        try {
          const response = await api.post("block/put", {
            signal,
            searchParams: toUrlSearchParams.toUrlSearchParams(options),
            ...(await multipartRequest2.multipartRequest(
              [data],
              controller,
              options.headers
            )),
          });
          res = await response.json();
        } catch (err) {
          if (options.format === "dag-pb") {
            return put(data, {
              ...options,
              format: "protobuf",
            });
          } else if (options.format === "dag-cbor") {
            return put(data, {
              ...options,
              format: "cbor",
            });
          }
          throw err;
        }
        return cid.CID.parse(res.Key);
      }
      return put;
    });
    exports2.createPut = createPut;
  },
});

// node_modules/ipfs-http-client/cjs/src/block/rm.js
var require_rm = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/block/rm.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createRm = configure.configure((api) => {
      async function* rm(cid2, options = {}) {
        if (!Array.isArray(cid2)) {
          cid2 = [cid2];
        }
        const res = await api.post("block/rm", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: cid2.map((cid3) => cid3.toString()),
            "stream-channels": true,
            ...options,
          }),
          headers: options.headers,
        });
        for await (const removed of res.ndjson()) {
          yield toCoreInterface(removed);
        }
      }
      return rm;
    });
    function toCoreInterface(removed) {
      const out = { cid: cid.CID.parse(removed.Hash) };
      if (removed.Error) {
        out.error = new Error(removed.Error);
      }
      return out;
    }
    exports2.createRm = createRm;
  },
});

// node_modules/ipfs-http-client/cjs/src/block/stat.js
var require_stat2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/block/stat.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createStat = configure.configure((api) => {
      async function stat(cid$1, options = {}) {
        const res = await api.post("block/stat", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: cid$1.toString(),
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return {
          cid: cid.CID.parse(data.Key),
          size: data.Size,
        };
      }
      return stat;
    });
    exports2.createStat = createStat;
  },
});

// node_modules/ipfs-http-client/cjs/src/block/index.js
var require_block = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/block/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var get = require_get();
    var put = require_put();
    var rm = require_rm();
    var stat = require_stat2();
    function createBlock(config) {
      return {
        get: get.createGet(config),
        put: put.createPut(config),
        rm: rm.createRm(config),
        stat: stat.createStat(config),
      };
    }
    exports2.createBlock = createBlock;
  },
});

// node_modules/ipfs-http-client/cjs/src/bootstrap/add.js
var require_add = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bootstrap/add.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var multiaddr = require_src();
    var createAdd = configure.configure((api) => {
      async function add(addr, options = {}) {
        const res = await api.post("bootstrap/add", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: addr,
            ...options,
          }),
          headers: options.headers,
        });
        const { Peers } = await res.json();
        return { Peers: Peers.map((ma) => new multiaddr.Multiaddr(ma)) };
      }
      return add;
    });
    exports2.createAdd = createAdd;
  },
});

// node_modules/ipfs-http-client/cjs/src/bootstrap/clear.js
var require_clear = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bootstrap/clear.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var multiaddr = require_src();
    var createClear = configure.configure((api) => {
      async function clear(options = {}) {
        const res = await api.post("bootstrap/rm", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            ...options,
            all: true,
          }),
          headers: options.headers,
        });
        const { Peers } = await res.json();
        return { Peers: Peers.map((ma) => new multiaddr.Multiaddr(ma)) };
      }
      return clear;
    });
    exports2.createClear = createClear;
  },
});

// node_modules/ipfs-http-client/cjs/src/bootstrap/list.js
var require_list = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bootstrap/list.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var multiaddr = require_src();
    var createList = configure.configure((api) => {
      async function list(options = {}) {
        const res = await api.post("bootstrap/list", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        const { Peers } = await res.json();
        return { Peers: Peers.map((ma) => new multiaddr.Multiaddr(ma)) };
      }
      return list;
    });
    exports2.createList = createList;
  },
});

// node_modules/ipfs-http-client/cjs/src/bootstrap/reset.js
var require_reset = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bootstrap/reset.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var multiaddr = require_src();
    var createReset = configure.configure((api) => {
      async function reset(options = {}) {
        const res = await api.post("bootstrap/add", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            ...options,
            default: true,
          }),
          headers: options.headers,
        });
        const { Peers } = await res.json();
        return { Peers: Peers.map((ma) => new multiaddr.Multiaddr(ma)) };
      }
      return reset;
    });
    exports2.createReset = createReset;
  },
});

// node_modules/ipfs-http-client/cjs/src/bootstrap/rm.js
var require_rm2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bootstrap/rm.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var multiaddr = require_src();
    var createRm = configure.configure((api) => {
      async function rm(addr, options = {}) {
        const res = await api.post("bootstrap/rm", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: addr,
            ...options,
          }),
          headers: options.headers,
        });
        const { Peers } = await res.json();
        return { Peers: Peers.map((ma) => new multiaddr.Multiaddr(ma)) };
      }
      return rm;
    });
    exports2.createRm = createRm;
  },
});

// node_modules/ipfs-http-client/cjs/src/bootstrap/index.js
var require_bootstrap = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/bootstrap/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var add = require_add();
    var clear = require_clear();
    var list = require_list();
    var reset = require_reset();
    var rm = require_rm2();
    function createBootstrap(config) {
      return {
        add: add.createAdd(config),
        clear: clear.createClear(config),
        list: list.createList(config),
        reset: reset.createReset(config),
        rm: rm.createRm(config),
      };
    }
    exports2.createBootstrap = createBootstrap;
  },
});

// node_modules/ipfs-http-client/cjs/src/config/profiles/apply.js
var require_apply = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/config/profiles/apply.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createApply = configure.configure((api) => {
      async function apply(profile, options = {}) {
        const res = await api.post("config/profile/apply", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: profile,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return {
          original: data.OldCfg,
          updated: data.NewCfg,
        };
      }
      return apply;
    });
    exports2.createApply = createApply;
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/object-to-camel.js
var require_object_to_camel = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/object-to-camel.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    function objectToCamel(obj) {
      if (obj == null) {
        return obj;
      }
      const caps = /^[A-Z]+$/;
      const output = {};
      return Object.keys(obj).reduce((camelObj, k) => {
        if (caps.test(k)) {
          camelObj[k.toLowerCase()] = obj[k];
        } else if (caps.test(k[0])) {
          camelObj[k[0].toLowerCase() + k.slice(1)] = obj[k];
        } else {
          camelObj[k] = obj[k];
        }
        return camelObj;
      }, output);
    }
    exports2.objectToCamel = objectToCamel;
  },
});

// node_modules/ipfs-http-client/cjs/src/config/profiles/list.js
var require_list2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/config/profiles/list.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createList = configure.configure((api) => {
      async function list(options = {}) {
        const res = await api.post("config/profile/list", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        const data = await res.json();
        return data.map((profile) => objectToCamel.objectToCamel(profile));
      }
      return list;
    });
    exports2.createList = createList;
  },
});

// node_modules/ipfs-http-client/cjs/src/config/profiles/index.js
var require_profiles = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/config/profiles/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var apply = require_apply();
    var list = require_list2();
    function createProfiles(config) {
      return {
        apply: apply.createApply(config),
        list: list.createList(config),
      };
    }
    exports2.createProfiles = createProfiles;
  },
});

// node_modules/ipfs-http-client/cjs/src/config/get.js
var require_get2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/config/get.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createGet = configure.configure((api) => {
      const get = async (key, options = {}) => {
        if (!key) {
          throw new Error("key argument is required");
        }
        const res = await api.post("config", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: key,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return data.Value;
      };
      return get;
    });
    exports2.createGet = createGet;
  },
});

// node_modules/ipfs-http-client/cjs/src/config/get-all.js
var require_get_all = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/config/get-all.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createGetAll = configure.configure((api) => {
      const getAll = async (options = {}) => {
        const res = await api.post("config/show", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({ ...options }),
          headers: options.headers,
        });
        const data = await res.json();
        return data;
      };
      return getAll;
    });
    exports2.createGetAll = createGetAll;
  },
});

// node_modules/ipfs-http-client/cjs/src/config/replace.js
var require_replace = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/config/replace.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fromString4 = (init_from_string(), __toCommonJS(from_string_exports));
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var abortSignal = require_abort_signal();
    var createReplace = configure.configure((api) => {
      const replace = async (config, options = {}) => {
        const controller = new AbortController();
        const signal = abortSignal.abortSignal(
          controller.signal,
          options.signal
        );
        const res = await api.post("config/replace", {
          signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          ...(await multipartRequest2.multipartRequest(
            [fromString4.fromString(JSON.stringify(config))],
            controller,
            options.headers
          )),
        });
        await res.text();
      };
      return replace;
    });
    exports2.createReplace = createReplace;
  },
});

// node_modules/ipfs-http-client/cjs/src/config/set.js
var require_set = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/config/set.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createSet = configure.configure((api) => {
      const set = async (key, value, options = {}) => {
        if (typeof key !== "string") {
          throw new Error("Invalid key type");
        }
        const params = {
          ...options,
          ...encodeParam(key, value),
        };
        const res = await api.post("config", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(params),
          headers: options.headers,
        });
        await res.text();
      };
      return set;
    });
    var encodeParam = (key, value) => {
      switch (typeof value) {
        case "boolean":
          return {
            arg: [key, value.toString()],
            bool: true,
          };
        case "string":
          return {
            arg: [key, value],
          };
        default:
          return {
            arg: [key, JSON.stringify(value)],
            json: true,
          };
      }
    };
    exports2.createSet = createSet;
  },
});

// node_modules/ipfs-http-client/cjs/src/config/index.js
var require_config = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/config/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var index = require_profiles();
    var get = require_get2();
    var getAll = require_get_all();
    var replace = require_replace();
    var set = require_set();
    function createConfig(config) {
      return {
        getAll: getAll.createGetAll(config),
        get: get.createGet(config),
        set: set.createSet(config),
        replace: replace.createReplace(config),
        profiles: index.createProfiles(config),
      };
    }
    exports2.createConfig = createConfig;
  },
});

// node_modules/ipfs-http-client/cjs/src/dag/export.js
var require_export = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dag/export.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createExport = configure.configure((api) => {
      async function* dagExport(root, options = {}) {
        const res = await api.post("dag/export", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: root.toString(),
          }),
          headers: options.headers,
        });
        yield* res.iterator();
      }
      return dagExport;
    });
    exports2.createExport = createExport;
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/resolve.js
var require_resolve = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/resolve.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var errCode6 = require_err_code();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var errCode__default = /* @__PURE__ */ _interopDefaultLegacy(errCode6);
    async function* resolve(cid$1, path, codecs2, getBlock, options) {
      const load = async (cid2) => {
        const codec = await codecs2.getCodec(cid2.code);
        const block = await getBlock(cid2, options);
        return codec.decode(block);
      };
      const parts = path.split("/").filter(Boolean);
      let value = await load(cid$1);
      let lastCid = cid$1;
      while (parts.length) {
        const key = parts.shift();
        if (!key) {
          throw errCode__default["default"](
            new Error(`Could not resolve path "${path}"`),
            "ERR_INVALID_PATH"
          );
        }
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          value = value[key];
          yield {
            value,
            remainderPath: parts.join("/"),
          };
        } else {
          throw errCode__default["default"](
            new Error(`no link named "${key}" under ${lastCid}`),
            "ERR_NO_LINK"
          );
        }
        const cid$12 = cid.CID.asCID(value);
        if (cid$12) {
          lastCid = cid$12;
          value = await load(value);
        }
      }
      yield {
        value,
        remainderPath: "",
      };
    }
    exports2.resolve = resolve;
  },
});

// node_modules/it-first/index.js
var require_it_first = __commonJS({
  "node_modules/it-first/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var first = async (source) => {
      for await (const entry of source) {
        return entry;
      }
      return void 0;
    };
    module2.exports = first;
  },
});

// node_modules/it-last/index.js
var require_it_last = __commonJS({
  "node_modules/it-last/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var last = async (source) => {
      let res;
      for await (const entry of source) {
        res = entry;
      }
      return res;
    };
    module2.exports = last;
  },
});

// node_modules/ipfs-http-client/cjs/src/dag/get.js
var require_get3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dag/get.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var resolve = require_resolve();
    var first = require_it_first();
    var last = require_it_last();
    var errCode6 = require_err_code();
    var get = require_get();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var first__default = /* @__PURE__ */ _interopDefaultLegacy(first);
    var last__default = /* @__PURE__ */ _interopDefaultLegacy(last);
    var errCode__default = /* @__PURE__ */ _interopDefaultLegacy(errCode6);
    var createGet = (codecs2, options) => {
      const fn = configure.configure((api, opts) => {
        const getBlock = get.createGet(opts);
        const get$1 = async (cid, options2 = {}) => {
          if (options2.path) {
            const entry = options2.localResolve
              ? await first__default["default"](
                  resolve.resolve(
                    cid,
                    options2.path,
                    codecs2,
                    getBlock,
                    options2
                  )
                )
              : await last__default["default"](
                  resolve.resolve(
                    cid,
                    options2.path,
                    codecs2,
                    getBlock,
                    options2
                  )
                );
            const result = entry;
            if (!result) {
              throw errCode__default["default"](
                new Error("Not found"),
                "ERR_NOT_FOUND"
              );
            }
            return result;
          }
          const codec = await codecs2.getCodec(cid.code);
          const block = await getBlock(cid, options2);
          const node = codec.decode(block);
          return {
            value: node,
            remainderPath: "",
          };
        };
        return get$1;
      });
      return fn(options);
    };
    exports2.createGet = createGet;
  },
});

// node_modules/ipfs-http-client/cjs/src/dag/import.js
var require_import = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dag/import.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var abortSignal = require_abort_signal();
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var createImport = configure.configure((api) => {
      async function* dagImport(source, options = {}) {
        const controller = new AbortController();
        const signal = abortSignal.abortSignal(
          controller.signal,
          options.signal
        );
        const { headers, body } = await multipartRequest2.multipartRequest(
          source,
          controller,
          options.headers
        );
        const res = await api.post("dag/import", {
          signal,
          headers,
          body,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            "pin-roots": options.pinRoots,
          }),
        });
        for await (const { Root } of res.ndjson()) {
          if (Root !== void 0) {
            const {
              Cid: { "/": Cid },
              PinErrorMsg,
            } = Root;
            yield {
              root: {
                cid: cid.CID.parse(Cid),
                pinErrorMsg: PinErrorMsg,
              },
            };
          }
        }
      }
      return dagImport;
    });
    exports2.createImport = createImport;
  },
});

// node_modules/ipfs-http-client/cjs/src/dag/put.js
var require_put2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dag/put.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var toUrlSearchParams = require_to_url_search_params();
    var abortSignal = require_abort_signal();
    var createPut = (codecs2, options) => {
      const fn = configure.configure((api) => {
        const put = async (dagNode, options2 = {}) => {
          const settings = {
            storeCodec: "dag-cbor",
            hashAlg: "sha2-256",
            ...options2,
          };
          let serialized;
          if (settings.inputCodec) {
            if (!(dagNode instanceof Uint8Array)) {
              throw new Error(
                "Can only inputCodec on raw bytes that can be decoded"
              );
            }
            serialized = dagNode;
          } else {
            const storeCodec = await codecs2.getCodec(settings.storeCodec);
            serialized = storeCodec.encode(dagNode);
            settings.inputCodec = settings.storeCodec;
          }
          const controller = new AbortController();
          const signal = abortSignal.abortSignal(
            controller.signal,
            settings.signal
          );
          const res = await api.post("dag/put", {
            timeout: settings.timeout,
            signal,
            searchParams: toUrlSearchParams.toUrlSearchParams(settings),
            ...(await multipartRequest2.multipartRequest(
              [serialized],
              controller,
              settings.headers
            )),
          });
          const data = await res.json();
          return cid.CID.parse(data.Cid["/"]);
        };
        return put;
      });
      return fn(options);
    };
    exports2.createPut = createPut;
  },
});

// node_modules/ipfs-http-client/cjs/src/dag/resolve.js
var require_resolve2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dag/resolve.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createResolve = configure.configure((api) => {
      const resolve = async (ipfsPath, options = {}) => {
        const res = await api.post("dag/resolve", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: `${ipfsPath}${
              options.path ? `/${options.path}`.replace(/\/[/]+/g, "/") : ""
            }`,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return {
          cid: cid.CID.parse(data.Cid["/"]),
          remainderPath: data.RemPath,
        };
      };
      return resolve;
    });
    exports2.createResolve = createResolve;
  },
});

// node_modules/ipfs-http-client/cjs/src/dag/index.js
var require_dag = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dag/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var _export = require_export();
    var get = require_get3();
    var _import = require_import();
    var put = require_put2();
    var resolve = require_resolve2();
    function createDag(codecs2, config) {
      return {
        export: _export.createExport(config),
        get: get.createGet(codecs2, config),
        import: _import.createImport(config),
        put: put.createPut(codecs2, config),
        resolve: resolve.createResolve(config),
      };
    }
    exports2.createDag = createDag;
  },
});

// node_modules/ipfs-http-client/cjs/src/dht/response-types.js
var require_response_types = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dht/response-types.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var SendingQuery = 0;
    var PeerResponse = 1;
    var FinalPeer = 2;
    var QueryError = 3;
    var Provider = 4;
    var Value = 5;
    var AddingPeer = 6;
    var DialingPeer = 7;
    exports2.AddingPeer = AddingPeer;
    exports2.DialingPeer = DialingPeer;
    exports2.FinalPeer = FinalPeer;
    exports2.PeerResponse = PeerResponse;
    exports2.Provider = Provider;
    exports2.QueryError = QueryError;
    exports2.SendingQuery = SendingQuery;
    exports2.Value = Value;
  },
});

// node_modules/ipfs-http-client/cjs/src/dht/map-event.js
var require_map_event = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dht/map-event.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fromString4 = (init_from_string(), __toCommonJS(from_string_exports));
    var responseTypes = require_response_types();
    var multiaddr = require_src();
    var mapEvent = (event) => {
      if (event.Type === responseTypes.SendingQuery) {
        return {
          to: event.ID,
          name: "SENDING_QUERY",
          type: event.Type,
        };
      }
      if (event.Type === responseTypes.PeerResponse) {
        return {
          from: event.ID,
          name: "PEER_RESPONSE",
          type: event.Type,
          messageType: 0,
          messageName: "PUT_VALUE",
          closer: (event.Responses || []).map(({ ID, Addrs }) => ({
            id: ID,
            multiaddrs: Addrs.map((addr) => new multiaddr.Multiaddr(addr)),
          })),
          providers: (event.Responses || []).map(({ ID, Addrs }) => ({
            id: ID,
            multiaddrs: Addrs.map((addr) => new multiaddr.Multiaddr(addr)),
          })),
        };
      }
      if (event.Type === responseTypes.FinalPeer) {
        let peer = {
          id: event.ID,
          multiaddrs: [],
        };
        if (event.Responses && event.Responses.length) {
          peer = {
            id: event.Responses[0].ID,
            multiaddrs: event.Responses[0].Addrs.map(
              (addr) => new multiaddr.Multiaddr(addr)
            ),
          };
        }
        return {
          from: event.ID,
          name: "FINAL_PEER",
          type: event.Type,
          peer,
        };
      }
      if (event.Type === responseTypes.QueryError) {
        return {
          from: event.ID,
          name: "QUERY_ERROR",
          type: event.Type,
          error: new Error(event.Extra),
        };
      }
      if (event.Type === responseTypes.Provider) {
        return {
          from: event.ID,
          name: "PROVIDER",
          type: event.Type,
          providers: event.Responses.map(({ ID, Addrs }) => ({
            id: ID,
            multiaddrs: Addrs.map((addr) => new multiaddr.Multiaddr(addr)),
          })),
        };
      }
      if (event.Type === responseTypes.Value) {
        return {
          from: event.ID,
          name: "VALUE",
          type: event.Type,
          value: fromString4.fromString(event.Extra, "base64pad"),
        };
      }
      if (event.Type === responseTypes.AddingPeer) {
        const peers = event.Responses.map(({ ID }) => ID);
        if (!peers.length) {
          throw new Error("No peer found");
        }
        return {
          name: "ADDING_PEER",
          type: event.Type,
          peer: peers[0],
        };
      }
      if (event.Type === responseTypes.DialingPeer) {
        return {
          name: "DIALING_PEER",
          type: event.Type,
          peer: event.ID,
        };
      }
      throw new Error("Unknown DHT event type");
    };
    exports2.mapEvent = mapEvent;
  },
});

// node_modules/ipfs-http-client/cjs/src/dht/find-peer.js
var require_find_peer = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dht/find-peer.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var mapEvent = require_map_event();
    var createFindPeer = configure.configure((api) => {
      async function* findPeer(peerId, options = {}) {
        const res = await api.post("dht/findpeer", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: peerId,
            ...options,
          }),
          headers: options.headers,
        });
        for await (const event of res.ndjson()) {
          yield mapEvent.mapEvent(event);
        }
      }
      return findPeer;
    });
    exports2.createFindPeer = createFindPeer;
  },
});

// node_modules/ipfs-http-client/cjs/src/dht/find-provs.js
var require_find_provs = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dht/find-provs.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var mapEvent = require_map_event();
    var createFindProvs = configure.configure((api) => {
      async function* findProvs(cid, options = {}) {
        const res = await api.post("dht/findprovs", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: cid.toString(),
            ...options,
          }),
          headers: options.headers,
        });
        for await (const event of res.ndjson()) {
          yield mapEvent.mapEvent(event);
        }
      }
      return findProvs;
    });
    exports2.createFindProvs = createFindProvs;
  },
});

// node_modules/ipfs-http-client/cjs/src/dht/get.js
var require_get4 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dht/get.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var mapEvent = require_map_event();
    var toString4 = (init_to_string(), __toCommonJS(to_string_exports));
    var createGet = configure.configure((api) => {
      async function* get(key, options = {}) {
        const res = await api.post("dht/get", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg:
              key instanceof Uint8Array
                ? toString4.toString(key)
                : key.toString(),
            ...options,
          }),
          headers: options.headers,
        });
        for await (const event of res.ndjson()) {
          yield mapEvent.mapEvent(event);
        }
      }
      return get;
    });
    exports2.createGet = createGet;
  },
});

// node_modules/ipfs-http-client/cjs/src/dht/provide.js
var require_provide = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dht/provide.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var mapEvent = require_map_event();
    var createProvide = configure.configure((api) => {
      async function* provide(cids, options = { recursive: false }) {
        const cidArr = Array.isArray(cids) ? cids : [cids];
        const res = await api.post("dht/provide", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: cidArr.map((cid) => cid.toString()),
            ...options,
          }),
          headers: options.headers,
        });
        for await (const event of res.ndjson()) {
          yield mapEvent.mapEvent(event);
        }
      }
      return provide;
    });
    exports2.createProvide = createProvide;
  },
});

// node_modules/ipfs-http-client/cjs/src/dht/put.js
var require_put3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dht/put.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var abortSignal = require_abort_signal();
    var toString4 = (init_to_string(), __toCommonJS(to_string_exports));
    var mapEvent = require_map_event();
    var createPut = configure.configure((api) => {
      async function* put(key, value, options = {}) {
        const controller = new AbortController();
        const signal = abortSignal.abortSignal(
          controller.signal,
          options.signal
        );
        const res = await api.post("dht/put", {
          signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg:
              key instanceof Uint8Array
                ? toString4.toString(key)
                : key.toString(),
            ...options,
          }),
          ...(await multipartRequest2.multipartRequest(
            [value],
            controller,
            options.headers
          )),
        });
        for await (const event of res.ndjson()) {
          yield mapEvent.mapEvent(event);
        }
      }
      return put;
    });
    exports2.createPut = createPut;
  },
});

// node_modules/ipfs-http-client/cjs/src/dht/query.js
var require_query = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dht/query.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var mapEvent = require_map_event();
    var createQuery = configure.configure((api) => {
      async function* query(peerId, options = {}) {
        const res = await api.post("dht/query", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: peerId.toString(),
            ...options,
          }),
          headers: options.headers,
        });
        for await (const event of res.ndjson()) {
          yield mapEvent.mapEvent(event);
        }
      }
      return query;
    });
    exports2.createQuery = createQuery;
  },
});

// node_modules/ipfs-http-client/cjs/src/dht/index.js
var require_dht = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dht/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var findPeer = require_find_peer();
    var findProvs = require_find_provs();
    var get = require_get4();
    var provide = require_provide();
    var put = require_put3();
    var query = require_query();
    function createDht(config) {
      return {
        findPeer: findPeer.createFindPeer(config),
        findProvs: findProvs.createFindProvs(config),
        get: get.createGet(config),
        provide: provide.createProvide(config),
        put: put.createPut(config),
        query: query.createQuery(config),
      };
    }
    exports2.createDht = createDht;
  },
});

// node_modules/ipfs-http-client/cjs/src/diag/cmds.js
var require_cmds = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/diag/cmds.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createCmds = configure.configure((api) => {
      async function cmds(options = {}) {
        const res = await api.post("diag/cmds", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        return res.json();
      }
      return cmds;
    });
    exports2.createCmds = createCmds;
  },
});

// node_modules/ipfs-http-client/cjs/src/diag/net.js
var require_net = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/diag/net.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createNet = configure.configure((api) => {
      async function net(options = {}) {
        const res = await api.post("diag/net", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        return res.json();
      }
      return net;
    });
    exports2.createNet = createNet;
  },
});

// node_modules/ipfs-http-client/cjs/src/diag/sys.js
var require_sys = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/diag/sys.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createSys = configure.configure((api) => {
      async function sys(options = {}) {
        const res = await api.post("diag/sys", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        return res.json();
      }
      return sys;
    });
    exports2.createSys = createSys;
  },
});

// node_modules/ipfs-http-client/cjs/src/diag/index.js
var require_diag = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/diag/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cmds = require_cmds();
    var net = require_net();
    var sys = require_sys();
    function createDiag(config) {
      return {
        cmds: cmds.createCmds(config),
        net: net.createNet(config),
        sys: sys.createSys(config),
      };
    }
    exports2.createDiag = createDiag;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/chmod.js
var require_chmod = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/chmod.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createChmod = configure.configure((api) => {
      async function chmod(path, mode, options = {}) {
        const res = await api.post("files/chmod", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            mode,
            ...options,
          }),
          headers: options.headers,
        });
        await res.text();
      }
      return chmod;
    });
    exports2.createChmod = createChmod;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/cp.js
var require_cp = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/cp.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createCp = configure.configure((api) => {
      async function cp(sources, destination, options = {}) {
        const sourceArr = Array.isArray(sources) ? sources : [sources];
        const res = await api.post("files/cp", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: sourceArr
              .concat(destination)
              .map((src2) => (cid.CID.asCID(src2) ? `/ipfs/${src2}` : src2)),
            ...options,
          }),
          headers: options.headers,
        });
        await res.text();
      }
      return cp;
    });
    exports2.createCp = createCp;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/flush.js
var require_flush = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/flush.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createFlush = configure.configure((api) => {
      async function flush(path, options = {}) {
        if (!path || typeof path !== "string") {
          throw new Error("ipfs.files.flush requires a path");
        }
        const res = await api.post("files/flush", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return cid.CID.parse(data.Cid);
      }
      return flush;
    });
    exports2.createFlush = createFlush;
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/object-to-camel-with-metadata.js
var require_object_to_camel_with_metadata = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/object-to-camel-with-metadata.js"(
    exports2
  ) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    function objectToCamelWithMetadata(entry) {
      const file = objectToCamel.objectToCamel(entry);
      if (Object.prototype.hasOwnProperty.call(file, "mode")) {
        file.mode = parseInt(file.mode, 8);
      }
      if (Object.prototype.hasOwnProperty.call(file, "mtime")) {
        file.mtime = {
          secs: file.mtime,
          nsecs: file.mtimeNsecs || 0,
        };
        delete file.mtimeNsecs;
      }
      return file;
    }
    exports2.objectToCamelWithMetadata = objectToCamelWithMetadata;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/ls.js
var require_ls = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/ls.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var objectToCamelWithMetadata = require_object_to_camel_with_metadata();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createLs = configure.configure((api) => {
      async function* ls(path, options = {}) {
        if (!path) {
          throw new Error("ipfs.files.ls requires a path");
        }
        const res = await api.post("files/ls", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: cid.CID.asCID(path) ? `/ipfs/${path}` : path,
            long: true,
            ...options,
            stream: true,
          }),
          headers: options.headers,
        });
        for await (const result of res.ndjson()) {
          if ("Entries" in result) {
            for (const entry of result.Entries || []) {
              yield toCoreInterface(
                objectToCamelWithMetadata.objectToCamelWithMetadata(entry)
              );
            }
          } else {
            yield toCoreInterface(
              objectToCamelWithMetadata.objectToCamelWithMetadata(result)
            );
          }
        }
      }
      return ls;
    });
    function toCoreInterface(entry) {
      if (entry.hash) {
        entry.cid = cid.CID.parse(entry.hash);
      }
      delete entry.hash;
      entry.type = entry.type === 1 ? "directory" : "file";
      return entry;
    }
    exports2.createLs = createLs;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/mkdir.js
var require_mkdir = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/mkdir.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createMkdir = configure.configure((api) => {
      async function mkdir(path, options = {}) {
        const res = await api.post("files/mkdir", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            ...options,
          }),
          headers: options.headers,
        });
        await res.text();
      }
      return mkdir;
    });
    exports2.createMkdir = createMkdir;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/mv.js
var require_mv = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/mv.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createMv = configure.configure((api) => {
      async function mv(sources, destination, options = {}) {
        if (!Array.isArray(sources)) {
          sources = [sources];
        }
        const res = await api.post("files/mv", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: sources.concat(destination),
            ...options,
          }),
          headers: options.headers,
        });
        await res.text();
      }
      return mv;
    });
    exports2.createMv = createMv;
  },
});

// node_modules/stream-to-it/source.js
var require_source = __commonJS({
  "node_modules/stream-to-it/source.js"(exports2, module2) {
    init_node_globals();
    module2.exports = (readable) => {
      if (readable[Symbol.asyncIterator]) return readable;
      if (readable.getReader) {
        return (async function* () {
          const reader = readable.getReader();
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) return;
              yield value;
            }
          } finally {
            reader.releaseLock();
          }
        })();
      }
      throw new Error("unknown stream");
    };
  },
});

// node_modules/ipfs-http-client/cjs/src/files/read.js
var require_read = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/read.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var toIterable = require_source();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var toIterable__default = /* @__PURE__ */ _interopDefaultLegacy(toIterable);
    var createRead = configure.configure((api) => {
      async function* read2(path, options = {}) {
        const res = await api.post("files/read", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            count: options.length,
            ...options,
          }),
          headers: options.headers,
        });
        yield* toIterable__default["default"](res.body);
      }
      return read2;
    });
    exports2.createRead = createRead;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/rm.js
var require_rm3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/rm.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var HTTP = require_http();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var HTTP__default = /* @__PURE__ */ _interopDefaultLegacy(HTTP);
    var createRm = configure.configure((api) => {
      async function rm(path, options = {}) {
        const res = await api.post("files/rm", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            ...options,
          }),
          headers: options.headers,
        });
        const body = await res.text();
        if (body !== "") {
          const error = new HTTP__default["default"].HTTPError(res);
          error.message = body;
          throw error;
        }
      }
      return rm;
    });
    exports2.createRm = createRm;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/stat.js
var require_stat3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/stat.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var objectToCamelWithMetadata = require_object_to_camel_with_metadata();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createStat = configure.configure((api) => {
      async function stat(path, options = {}) {
        const res = await api.post("files/stat", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        data.WithLocality = data.WithLocality || false;
        return toCoreInterface(
          objectToCamelWithMetadata.objectToCamelWithMetadata(data)
        );
      }
      return stat;
    });
    function toCoreInterface(entry) {
      entry.cid = cid.CID.parse(entry.hash);
      delete entry.hash;
      return entry;
    }
    exports2.createStat = createStat;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/touch.js
var require_touch = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/touch.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createTouch = configure.configure((api) => {
      async function touch(path, options = {}) {
        const res = await api.post("files/touch", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            ...options,
          }),
          headers: options.headers,
        });
        await res.text();
      }
      return touch;
    });
    exports2.createTouch = createTouch;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/write.js
var require_write = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/write.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var modeToString2 = require_mode_to_string();
    var parseMtime2 = require_parse_mtime();
    var configure = require_configure();
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var toUrlSearchParams = require_to_url_search_params();
    var abortSignal = require_abort_signal();
    var createWrite = configure.configure((api) => {
      async function write(path, input, options = {}) {
        const controller = new AbortController();
        const signal = abortSignal.abortSignal(
          controller.signal,
          options.signal
        );
        const res = await api.post("files/write", {
          signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            streamChannels: true,
            count: options.length,
            ...options,
          }),
          ...(await multipartRequest2.multipartRequest(
            [
              {
                content: input,
                path: "arg",
                mode: modeToString2.modeToString(options.mode),
                mtime: parseMtime2.parseMtime(options.mtime),
              },
            ],
            controller,
            options.headers
          )),
        });
        await res.text();
      }
      return write;
    });
    exports2.createWrite = createWrite;
  },
});

// node_modules/ipfs-http-client/cjs/src/files/index.js
var require_files = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/files/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var chmod = require_chmod();
    var cp = require_cp();
    var flush = require_flush();
    var ls = require_ls();
    var mkdir = require_mkdir();
    var mv = require_mv();
    var read2 = require_read();
    var rm = require_rm3();
    var stat = require_stat3();
    var touch = require_touch();
    var write = require_write();
    function createFiles(config) {
      return {
        chmod: chmod.createChmod(config),
        cp: cp.createCp(config),
        flush: flush.createFlush(config),
        ls: ls.createLs(config),
        mkdir: mkdir.createMkdir(config),
        mv: mv.createMv(config),
        read: read2.createRead(config),
        rm: rm.createRm(config),
        stat: stat.createStat(config),
        touch: touch.createTouch(config),
        write: write.createWrite(config),
      };
    }
    exports2.createFiles = createFiles;
  },
});

// node_modules/ipfs-http-client/cjs/src/key/export.js
var require_export2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/key/export.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var errCode6 = require_err_code();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var errCode__default = /* @__PURE__ */ _interopDefaultLegacy(errCode6);
    var createExport = configure.configure((api) => {
      const exportKey = async (name8, password, options = {}) => {
        throw errCode__default["default"](
          new Error("Not implemented"),
          "ERR_NOT_IMPLEMENTED"
        );
      };
      return exportKey;
    });
    exports2.createExport = createExport;
  },
});

// node_modules/ipfs-http-client/cjs/src/key/gen.js
var require_gen = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/key/gen.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createGen = configure.configure((api) => {
      async function gen(
        name8,
        options = {
          type: "rsa",
          size: 2048,
        }
      ) {
        const res = await api.post("key/gen", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: name8,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return objectToCamel.objectToCamel(data);
      }
      return gen;
    });
    exports2.createGen = createGen;
  },
});

// node_modules/ipfs-http-client/cjs/src/key/import.js
var require_import2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/key/import.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createImport = configure.configure((api) => {
      async function importKey(name8, pem, password, options = {}) {
        const res = await api.post("key/import", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: name8,
            pem,
            password,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return objectToCamel.objectToCamel(data);
      }
      return importKey;
    });
    exports2.createImport = createImport;
  },
});

// node_modules/ipfs-http-client/cjs/src/key/info.js
var require_info = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/key/info.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var errCode6 = require_err_code();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var errCode__default = /* @__PURE__ */ _interopDefaultLegacy(errCode6);
    var createInfo = configure.configure((api) => {
      const info = async (name8, options = {}) => {
        throw errCode__default["default"](
          new Error("Not implemented"),
          "ERR_NOT_IMPLEMENTED"
        );
      };
      return info;
    });
    exports2.createInfo = createInfo;
  },
});

// node_modules/ipfs-http-client/cjs/src/key/list.js
var require_list3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/key/list.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createList = configure.configure((api) => {
      async function list(options = {}) {
        const res = await api.post("key/list", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        const data = await res.json();
        return (data.Keys || []).map((k) => objectToCamel.objectToCamel(k));
      }
      return list;
    });
    exports2.createList = createList;
  },
});

// node_modules/ipfs-http-client/cjs/src/key/rename.js
var require_rename = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/key/rename.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createRename = configure.configure((api) => {
      async function rename(oldName, newName, options = {}) {
        const res = await api.post("key/rename", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: [oldName, newName],
            ...options,
          }),
          headers: options.headers,
        });
        return objectToCamel.objectToCamel(await res.json());
      }
      return rename;
    });
    exports2.createRename = createRename;
  },
});

// node_modules/ipfs-http-client/cjs/src/key/rm.js
var require_rm4 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/key/rm.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createRm = configure.configure((api) => {
      async function rm(name8, options = {}) {
        const res = await api.post("key/rm", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: name8,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return objectToCamel.objectToCamel(data.Keys[0]);
      }
      return rm;
    });
    exports2.createRm = createRm;
  },
});

// node_modules/ipfs-http-client/cjs/src/key/index.js
var require_key = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/key/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var _export = require_export2();
    var gen = require_gen();
    var _import = require_import2();
    var info = require_info();
    var list = require_list3();
    var rename = require_rename();
    var rm = require_rm4();
    function createKey(config) {
      return {
        export: _export.createExport(config),
        gen: gen.createGen(config),
        import: _import.createImport(config),
        info: info.createInfo(config),
        list: list.createList(config),
        rename: rename.createRename(config),
        rm: rm.createRm(config),
      };
    }
    exports2.createKey = createKey;
  },
});

// node_modules/ipfs-http-client/cjs/src/log/level.js
var require_level = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/log/level.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createLevel = configure.configure((api) => {
      async function level(subsystem, level2, options = {}) {
        const res = await api.post("log/level", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: [subsystem, level2],
            ...options,
          }),
          headers: options.headers,
        });
        return objectToCamel.objectToCamel(await res.json());
      }
      return level;
    });
    exports2.createLevel = createLevel;
  },
});

// node_modules/ipfs-http-client/cjs/src/log/ls.js
var require_ls2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/log/ls.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createLs = configure.configure((api) => {
      async function ls(options = {}) {
        const res = await api.post("log/ls", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        const data = await res.json();
        return data.Strings;
      }
      return ls;
    });
    exports2.createLs = createLs;
  },
});

// node_modules/ipfs-http-client/cjs/src/log/tail.js
var require_tail = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/log/tail.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createTail = configure.configure((api) => {
      async function* tail(options = {}) {
        const res = await api.post("log/tail", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        yield* res.ndjson();
      }
      return tail;
    });
    exports2.createTail = createTail;
  },
});

// node_modules/ipfs-http-client/cjs/src/log/index.js
var require_log = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/log/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var level = require_level();
    var ls = require_ls2();
    var tail = require_tail();
    function createLog(config) {
      return {
        level: level.createLevel(config),
        ls: ls.createLs(config),
        tail: tail.createTail(config),
      };
    }
    exports2.createLog = createLog;
  },
});

// node_modules/ipfs-http-client/cjs/src/name/publish.js
var require_publish = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/name/publish.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createPublish = configure.configure((api) => {
      async function publish(path, options = {}) {
        const res = await api.post("name/publish", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: `${path}`,
            ...options,
          }),
          headers: options.headers,
        });
        return objectToCamel.objectToCamel(await res.json());
      }
      return publish;
    });
    exports2.createPublish = createPublish;
  },
});

// node_modules/ipfs-http-client/cjs/src/name/resolve.js
var require_resolve3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/name/resolve.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createResolve = configure.configure((api) => {
      async function* resolve(path, options = {}) {
        const res = await api.post("name/resolve", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            stream: true,
            ...options,
          }),
          headers: options.headers,
        });
        for await (const result of res.ndjson()) {
          yield result.Path;
        }
      }
      return resolve;
    });
    exports2.createResolve = createResolve;
  },
});

// node_modules/ipfs-http-client/cjs/src/name/pubsub/cancel.js
var require_cancel = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/name/pubsub/cancel.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createCancel = configure.configure((api) => {
      async function cancel(name8, options = {}) {
        const res = await api.post("name/pubsub/cancel", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: name8,
            ...options,
          }),
          headers: options.headers,
        });
        return objectToCamel.objectToCamel(await res.json());
      }
      return cancel;
    });
    exports2.createCancel = createCancel;
  },
});

// node_modules/ipfs-http-client/cjs/src/name/pubsub/state.js
var require_state = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/name/pubsub/state.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createState = configure.configure((api) => {
      async function state(options = {}) {
        const res = await api.post("name/pubsub/state", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        return objectToCamel.objectToCamel(await res.json());
      }
      return state;
    });
    exports2.createState = createState;
  },
});

// node_modules/ipfs-http-client/cjs/src/name/pubsub/subs.js
var require_subs = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/name/pubsub/subs.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createSubs = configure.configure((api) => {
      async function subs(options = {}) {
        const res = await api.post("name/pubsub/subs", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        const data = await res.json();
        return data.Strings || [];
      }
      return subs;
    });
    exports2.createSubs = createSubs;
  },
});

// node_modules/ipfs-http-client/cjs/src/name/pubsub/index.js
var require_pubsub = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/name/pubsub/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cancel = require_cancel();
    var state = require_state();
    var subs = require_subs();
    function createPubsub(config) {
      return {
        cancel: cancel.createCancel(config),
        state: state.createState(config),
        subs: subs.createSubs(config),
      };
    }
    exports2.createPubsub = createPubsub;
  },
});

// node_modules/ipfs-http-client/cjs/src/name/index.js
var require_name = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/name/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var publish = require_publish();
    var resolve = require_resolve3();
    var index = require_pubsub();
    function createName(config) {
      return {
        publish: publish.createPublish(config),
        resolve: resolve.createResolve(config),
        pubsub: index.createPubsub(config),
      };
    }
    exports2.createName = createName;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/data.js
var require_data = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/data.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createData = configure.configure((api) => {
      async function data(cid$1, options = {}) {
        const res = await api.post("object/data", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: `${
              cid$1 instanceof Uint8Array ? cid.CID.decode(cid$1) : cid$1
            }`,
            ...options,
          }),
          headers: options.headers,
        });
        const data2 = await res.arrayBuffer();
        return new Uint8Array(data2, 0, data2.byteLength);
      }
      return data;
    });
    exports2.createData = createData;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/get.js
var require_get5 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/get.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var fromString4 = (init_from_string(), __toCommonJS(from_string_exports));
    var createGet = configure.configure((api) => {
      async function get(cid$1, options = {}) {
        const res = await api.post("object/get", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: `${
              cid$1 instanceof Uint8Array ? cid.CID.decode(cid$1) : cid$1
            }`,
            dataEncoding: "base64",
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return {
          Data: fromString4.fromString(data.Data, "base64pad"),
          Links: (data.Links || []).map((link) => ({
            Name: link.Name,
            Hash: cid.CID.parse(link.Hash),
            Tsize: link.Size,
          })),
        };
      }
      return get;
    });
    exports2.createGet = createGet;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/links.js
var require_links = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/links.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createLinks = configure.configure((api) => {
      async function links(cid$1, options = {}) {
        const res = await api.post("object/links", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: `${
              cid$1 instanceof Uint8Array ? cid.CID.decode(cid$1) : cid$1
            }`,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return (data.Links || []).map((l) => ({
          Name: l.Name,
          Tsize: l.Size,
          Hash: cid.CID.parse(l.Hash),
        }));
      }
      return links;
    });
    exports2.createLinks = createLinks;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/new.js
var require_new = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/new.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createNew = configure.configure((api) => {
      async function newObject(options = {}) {
        const res = await api.post("object/new", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: options.template,
            ...options,
          }),
          headers: options.headers,
        });
        const { Hash } = await res.json();
        return cid.CID.parse(Hash);
      }
      return newObject;
    });
    exports2.createNew = createNew;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/put.js
var require_put4 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/put.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var put = require_put2();
    var createPut = (codecs2, options) => {
      const fn = configure.configure((api) => {
        const dagPut = put.createPut(codecs2, options);
        async function put$1(obj, options2 = {}) {
          return dagPut(obj, {
            ...options2,
            storeCodec: "dag-pb",
            hashAlg: "sha2-256",
            version: 1,
          });
        }
        return put$1;
      });
      return fn(options);
    };
    exports2.createPut = createPut;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/stat.js
var require_stat4 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/stat.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createStat = configure.configure((api) => {
      async function stat(cid$1, options = {}) {
        const res = await api.post("object/stat", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: `${cid$1}`,
            ...options,
          }),
          headers: options.headers,
        });
        const output = await res.json();
        return {
          ...output,
          Hash: cid.CID.parse(output.Hash),
        };
      }
      return stat;
    });
    exports2.createStat = createStat;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/patch/add-link.js
var require_add_link = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/patch/add-link.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createAddLink = configure.configure((api) => {
      async function addLink(cid$1, dLink, options = {}) {
        const res = await api.post("object/patch/add-link", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: [
              `${cid$1}`,
              dLink.Name || dLink.name || "",
              (dLink.Hash || dLink.cid || "").toString() || null,
            ],
            ...options,
          }),
          headers: options.headers,
        });
        const { Hash } = await res.json();
        return cid.CID.parse(Hash);
      }
      return addLink;
    });
    exports2.createAddLink = createAddLink;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/patch/append-data.js
var require_append_data = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/patch/append-data.js"(
    exports2
  ) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var abortSignal = require_abort_signal();
    var createAppendData = configure.configure((api) => {
      async function appendData(cid$1, data, options = {}) {
        const controller = new AbortController();
        const signal = abortSignal.abortSignal(
          controller.signal,
          options.signal
        );
        const res = await api.post("object/patch/append-data", {
          signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: `${cid$1}`,
            ...options,
          }),
          ...(await multipartRequest2.multipartRequest(
            [data],
            controller,
            options.headers
          )),
        });
        const { Hash } = await res.json();
        return cid.CID.parse(Hash);
      }
      return appendData;
    });
    exports2.createAppendData = createAppendData;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/patch/rm-link.js
var require_rm_link = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/patch/rm-link.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createRmLink = configure.configure((api) => {
      async function rmLink(cid$1, dLink, options = {}) {
        const res = await api.post("object/patch/rm-link", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: [`${cid$1}`, dLink.Name || dLink.name || null],
            ...options,
          }),
          headers: options.headers,
        });
        const { Hash } = await res.json();
        return cid.CID.parse(Hash);
      }
      return rmLink;
    });
    exports2.createRmLink = createRmLink;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/patch/set-data.js
var require_set_data = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/patch/set-data.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var abortSignal = require_abort_signal();
    var createSetData = configure.configure((api) => {
      async function setData(cid$1, data, options = {}) {
        const controller = new AbortController();
        const signal = abortSignal.abortSignal(
          controller.signal,
          options.signal
        );
        const res = await api.post("object/patch/set-data", {
          signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: [`${cid$1}`],
            ...options,
          }),
          ...(await multipartRequest2.multipartRequest(
            [data],
            controller,
            options.headers
          )),
        });
        const { Hash } = await res.json();
        return cid.CID.parse(Hash);
      }
      return setData;
    });
    exports2.createSetData = createSetData;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/patch/index.js
var require_patch = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/patch/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var addLink = require_add_link();
    var appendData = require_append_data();
    var rmLink = require_rm_link();
    var setData = require_set_data();
    function createPatch(config) {
      return {
        addLink: addLink.createAddLink(config),
        appendData: appendData.createAppendData(config),
        rmLink: rmLink.createRmLink(config),
        setData: setData.createSetData(config),
      };
    }
    exports2.createPatch = createPatch;
  },
});

// node_modules/ipfs-http-client/cjs/src/object/index.js
var require_object = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/object/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var data = require_data();
    var get = require_get5();
    var links = require_links();
    var _new = require_new();
    var put = require_put4();
    var stat = require_stat4();
    var index = require_patch();
    function createObject(codecs2, config) {
      return {
        data: data.createData(config),
        get: get.createGet(config),
        links: links.createLinks(config),
        new: _new.createNew(config),
        put: put.createPut(codecs2, config),
        stat: stat.createStat(config),
        patch: index.createPatch(config),
      };
    }
    exports2.createObject = createObject;
  },
});

// node_modules/ipfs-core-utils/esm/src/pins/normalise-input.js
var normalise_input_exports = {};
__export(normalise_input_exports, {
  normaliseInput: () => normaliseInput2,
});
async function* normaliseInput2(input) {
  if (input === null || input === void 0) {
    throw (0, import_err_code4.default)(
      new Error(`Unexpected input: ${input}`),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  const cid = CID.asCID(input);
  if (cid) {
    yield toPin({ cid });
    return;
  }
  if (input instanceof String || typeof input === "string") {
    yield toPin({ path: input });
    return;
  }
  if (input.cid != null || input.path != null) {
    return yield toPin(input);
  }
  if (Symbol.iterator in input) {
    const iterator = input[Symbol.iterator]();
    const first = iterator.next();
    if (first.done) return iterator;
    if (
      CID.asCID(first.value) ||
      first.value instanceof String ||
      typeof first.value === "string"
    ) {
      yield toPin({ cid: first.value });
      for (const cid2 of iterator) {
        yield toPin({ cid: cid2 });
      }
      return;
    }
    if (first.value.cid != null || first.value.path != null) {
      yield toPin(first.value);
      for (const obj of iterator) {
        yield toPin(obj);
      }
      return;
    }
    throw (0, import_err_code4.default)(
      new Error("Unexpected input: " + typeof input),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  if (Symbol.asyncIterator in input) {
    const iterator = input[Symbol.asyncIterator]();
    const first = await iterator.next();
    if (first.done) return iterator;
    if (
      CID.asCID(first.value) ||
      first.value instanceof String ||
      typeof first.value === "string"
    ) {
      yield toPin({ cid: first.value });
      for await (const cid2 of iterator) {
        yield toPin({ cid: cid2 });
      }
      return;
    }
    if (first.value.cid != null || first.value.path != null) {
      yield toPin(first.value);
      for await (const obj of iterator) {
        yield toPin(obj);
      }
      return;
    }
    throw (0, import_err_code4.default)(
      new Error("Unexpected input: " + typeof input),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  throw (0, import_err_code4.default)(
    new Error("Unexpected input: " + typeof input),
    "ERR_UNEXPECTED_INPUT"
  );
}
function toPin(input) {
  const path = input.cid || `${input.path}`;
  if (!path) {
    throw (0, import_err_code4.default)(
      new Error("Unexpected input: Please path either a CID or an IPFS path"),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  const pin = {
    path,
    recursive: input.recursive !== false,
  };
  if (input.metadata != null) {
    pin.metadata = input.metadata;
  }
  return pin;
}
var import_err_code4;
var init_normalise_input = __esm({
  "node_modules/ipfs-core-utils/esm/src/pins/normalise-input.js"() {
    init_node_globals();
    import_err_code4 = __toESM(require_err_code(), 1);
    init_cid();
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/add-all.js
var require_add_all = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/add-all.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var normaliseInput4 =
      (init_normalise_input(), __toCommonJS(normalise_input_exports));
    var toUrlSearchParams = require_to_url_search_params();
    var createAddAll = configure.configure((api) => {
      async function* addAll(source, options = {}) {
        for await (const {
          path,
          recursive,
          metadata,
        } of normaliseInput4.normaliseInput(source)) {
          const res = await api.post("pin/add", {
            signal: options.signal,
            searchParams: toUrlSearchParams.toUrlSearchParams({
              ...options,
              arg: path,
              recursive,
              metadata: metadata ? JSON.stringify(metadata) : void 0,
              stream: true,
            }),
            headers: options.headers,
          });
          for await (const pin of res.ndjson()) {
            if (pin.Pins) {
              for (const cid$1 of pin.Pins) {
                yield cid.CID.parse(cid$1);
              }
              continue;
            }
            yield cid.CID.parse(pin);
          }
        }
      }
      return addAll;
    });
    exports2.createAddAll = createAddAll;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/add.js
var require_add2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/add.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var addAll = require_add_all();
    var last = require_it_last();
    var configure = require_configure();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var last__default = /* @__PURE__ */ _interopDefaultLegacy(last);
    function createAdd(config) {
      const all3 = addAll.createAddAll(config);
      return configure.configure(() => {
        async function add(path, options = {}) {
          return last__default["default"](
            all3(
              [
                {
                  path,
                  ...options,
                },
              ],
              options
            )
          );
        }
        return add;
      })(config);
    }
    exports2.createAdd = createAdd;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/ls.js
var require_ls3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/ls.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    function toPin2(type, cid$1, metadata) {
      const pin = {
        type,
        cid: cid.CID.parse(cid$1),
      };
      if (metadata) {
        pin.metadata = metadata;
      }
      return pin;
    }
    var createLs = configure.configure((api) => {
      async function* ls(options = {}) {
        let paths = [];
        if (options.paths) {
          paths = Array.isArray(options.paths)
            ? options.paths
            : [options.paths];
        }
        const res = await api.post("pin/ls", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            ...options,
            arg: paths.map((path) => `${path}`),
            stream: true,
          }),
          headers: options.headers,
        });
        for await (const pin of res.ndjson()) {
          if (pin.Keys) {
            for (const cid2 of Object.keys(pin.Keys)) {
              yield toPin2(pin.Keys[cid2].Type, cid2, pin.Keys[cid2].Metadata);
            }
            return;
          }
          yield toPin2(pin.Type, pin.Cid, pin.Metadata);
        }
      }
      return ls;
    });
    exports2.createLs = createLs;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/rm-all.js
var require_rm_all = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/rm-all.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var normaliseInput4 =
      (init_normalise_input(), __toCommonJS(normalise_input_exports));
    var toUrlSearchParams = require_to_url_search_params();
    var createRmAll = configure.configure((api) => {
      async function* rmAll(source, options = {}) {
        for await (const { path, recursive } of normaliseInput4.normaliseInput(
          source
        )) {
          const searchParams = new URLSearchParams(options.searchParams);
          searchParams.append("arg", `${path}`);
          if (recursive != null)
            searchParams.set("recursive", String(recursive));
          const res = await api.post("pin/rm", {
            signal: options.signal,
            headers: options.headers,
            searchParams: toUrlSearchParams.toUrlSearchParams({
              ...options,
              arg: `${path}`,
              recursive,
            }),
          });
          for await (const pin of res.ndjson()) {
            if (pin.Pins) {
              yield* pin.Pins.map((cid$1) => cid.CID.parse(cid$1));
              continue;
            }
            yield cid.CID.parse(pin);
          }
        }
      }
      return rmAll;
    });
    exports2.createRmAll = createRmAll;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/rm.js
var require_rm5 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/rm.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var rmAll = require_rm_all();
    var last = require_it_last();
    var configure = require_configure();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var last__default = /* @__PURE__ */ _interopDefaultLegacy(last);
    var createRm = (config) => {
      const all3 = rmAll.createRmAll(config);
      return configure.configure(() => {
        async function rm(path, options = {}) {
          return last__default["default"](
            all3(
              [
                {
                  path,
                  ...options,
                },
              ],
              options
            )
          );
        }
        return rm;
      })(config);
    };
    exports2.createRm = createRm;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/utils.js
var require_utils2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/utils.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var toUrlSearchParams = require_to_url_search_params();
    var decodePin = ({ Name: name8, Status: status, Cid: cid$1 }) => {
      return {
        cid: cid.CID.parse(cid$1),
        name: name8,
        status,
      };
    };
    var encodeService = (service) => {
      if (typeof service === "string" && service !== "") {
        return service;
      } else {
        throw new TypeError("service name must be passed");
      }
    };
    var encodeCID2 = (cid$1) => {
      if (cid.CID.asCID(cid$1)) {
        return cid$1.toString();
      } else {
        throw new TypeError(`CID instance expected instead of ${typeof cid$1}`);
      }
    };
    var encodeQuery = ({
      service,
      cid: cid2,
      name: name8,
      status,
      all: all3,
    }) => {
      const query = toUrlSearchParams.toUrlSearchParams({
        service: encodeService(service),
        name: name8,
        force: all3 ? true : void 0,
      });
      if (cid2) {
        for (const value of cid2) {
          query.append("cid", encodeCID2(value));
        }
      }
      if (status) {
        for (const value of status) {
          query.append("status", value);
        }
      }
      return query;
    };
    var encodeAddParams = ({
      cid: cid2,
      service,
      background,
      name: name8,
      origins,
    }) => {
      const params = toUrlSearchParams.toUrlSearchParams({
        arg: encodeCID2(cid2),
        service: encodeService(service),
        name: name8,
        background: background ? true : void 0,
      });
      if (origins) {
        for (const origin of origins) {
          params.append("origin", origin.toString());
        }
      }
      return params;
    };
    exports2.decodePin = decodePin;
    exports2.encodeAddParams = encodeAddParams;
    exports2.encodeCID = encodeCID2;
    exports2.encodeQuery = encodeQuery;
    exports2.encodeService = encodeService;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/add.js
var require_add3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/add.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils = require_utils2();
    function createAdd(client) {
      async function add(cid, { timeout, signal, headers, ...query }) {
        const response = await client.post("pin/remote/add", {
          timeout,
          signal,
          headers,
          searchParams: utils.encodeAddParams({
            cid,
            ...query,
          }),
        });
        return utils.decodePin(await response.json());
      }
      return add;
    }
    exports2.createAdd = createAdd;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/ls.js
var require_ls4 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/ls.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils = require_utils2();
    function createLs(client) {
      async function* ls({ timeout, signal, headers, ...query }) {
        const response = await client.post("pin/remote/ls", {
          timeout,
          signal,
          headers,
          searchParams: utils.encodeQuery(query),
        });
        for await (const pin of response.ndjson()) {
          yield utils.decodePin(pin);
        }
      }
      return ls;
    }
    exports2.createLs = createLs;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/rm.js
var require_rm6 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/rm.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils = require_utils2();
    function createRm(client) {
      async function rm({ timeout, signal, headers, ...query }) {
        await client.post("pin/remote/rm", {
          timeout,
          signal,
          headers,
          searchParams: utils.encodeQuery({
            ...query,
            all: false,
          }),
        });
      }
      return rm;
    }
    exports2.createRm = createRm;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/rm-all.js
var require_rm_all2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/rm-all.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils = require_utils2();
    function createRmAll(client) {
      async function rmAll({ timeout, signal, headers, ...query }) {
        await client.post("pin/remote/rm", {
          timeout,
          signal,
          headers,
          searchParams: utils.encodeQuery({
            ...query,
            all: true,
          }),
        });
      }
      return rmAll;
    }
    exports2.createRmAll = createRmAll;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/service/utils.js
var require_utils3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/service/utils.js"(
    exports2
  ) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    function encodeEndpoint(url) {
      const href = String(url);
      if (href === "undefined") {
        throw Error("endpoint is required");
      }
      return href[href.length - 1] === "/" ? href.slice(0, -1) : href;
    }
    function decodeRemoteService(json) {
      return {
        service: json.Service,
        endpoint: new URL(json.ApiEndpoint),
        ...(json.Stat && { stat: decodeStat(json.Stat) }),
      };
    }
    function decodeStat(json) {
      switch (json.Status) {
        case "valid": {
          const { Pinning, Pinned, Queued, Failed } = json.PinCount;
          return {
            status: "valid",
            pinCount: {
              queued: Queued,
              pinning: Pinning,
              pinned: Pinned,
              failed: Failed,
            },
          };
        }
        case "invalid": {
          return { status: "invalid" };
        }
        default: {
          return { status: json.Status };
        }
      }
    }
    exports2.decodeRemoteService = decodeRemoteService;
    exports2.decodeStat = decodeStat;
    exports2.encodeEndpoint = encodeEndpoint;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/service/add.js
var require_add4 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/service/add.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var toUrlSearchParams = require_to_url_search_params();
    var utils = require_utils3();
    function createAdd(client) {
      async function add(name8, options) {
        const { endpoint, key, headers, timeout, signal } = options;
        await client.post("pin/remote/service/add", {
          timeout,
          signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: [name8, utils.encodeEndpoint(endpoint), key],
          }),
          headers,
        });
      }
      return add;
    }
    exports2.createAdd = createAdd;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/service/ls.js
var require_ls5 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/service/ls.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var toUrlSearchParams = require_to_url_search_params();
    var utils = require_utils3();
    function createLs(client) {
      async function ls(options = {}) {
        const { stat, headers, timeout, signal } = options;
        const response = await client.post("pin/remote/service/ls", {
          timeout,
          signal,
          headers,
          searchParams:
            stat === true
              ? toUrlSearchParams.toUrlSearchParams({ stat })
              : void 0,
        });
        const { RemoteServices } = await response.json();
        return RemoteServices.map(utils.decodeRemoteService);
      }
      return ls;
    }
    exports2.createLs = createLs;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/service/rm.js
var require_rm7 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/service/rm.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var toUrlSearchParams = require_to_url_search_params();
    function createRm(client) {
      async function rm(name8, options = {}) {
        await client.post("pin/remote/service/rm", {
          signal: options.signal,
          headers: options.headers,
          searchParams: toUrlSearchParams.toUrlSearchParams({ arg: name8 }),
        });
      }
      return rm;
    }
    exports2.createRm = createRm;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/service/index.js
var require_service2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/service/index.js"(
    exports2
  ) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var core = require_core();
    var add = require_add4();
    var ls = require_ls5();
    var rm = require_rm7();
    function createService(config) {
      const client = new core.Client(config);
      return {
        add: add.createAdd(client),
        ls: ls.createLs(client),
        rm: rm.createRm(client),
      };
    }
    exports2.createService = createService;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/remote/index.js
var require_remote = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/remote/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var core = require_core();
    var add = require_add3();
    var ls = require_ls4();
    var rm = require_rm6();
    var rmAll = require_rm_all2();
    var index = require_service2();
    function createRemote(config) {
      const client = new core.Client(config);
      return {
        add: add.createAdd(client),
        ls: ls.createLs(client),
        rm: rm.createRm(client),
        rmAll: rmAll.createRmAll(client),
        service: index.createService(config),
      };
    }
    exports2.createRemote = createRemote;
  },
});

// node_modules/ipfs-http-client/cjs/src/pin/index.js
var require_pin = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pin/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var addAll = require_add_all();
    var add = require_add2();
    var ls = require_ls3();
    var rmAll = require_rm_all();
    var rm = require_rm5();
    var index = require_remote();
    function createPin(config) {
      return {
        addAll: addAll.createAddAll(config),
        add: add.createAdd(config),
        ls: ls.createLs(config),
        rmAll: rmAll.createRmAll(config),
        rm: rm.createRm(config),
        remote: index.createRemote(config),
      };
    }
    exports2.createPin = createPin;
  },
});

// node_modules/ipfs-http-client/cjs/src/lib/http-rpc-wire-format.js
var require_http_rpc_wire_format = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/lib/http-rpc-wire-format.js"(
    exports2
  ) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fromString4 = (init_from_string(), __toCommonJS(from_string_exports));
    var toString4 = (init_to_string(), __toCommonJS(to_string_exports));
    var base642 = (init_base64(), __toCommonJS(base64_exports));
    var rpcArrayToTextArray = (strings) => {
      if (Array.isArray(strings)) {
        return strings.map(rpcToText);
      }
      return strings;
    };
    var rpcToText = (mb) => toString4.toString(rpcToBytes(mb));
    var rpcToBytes = (mb) => base642.base64url.decode(mb);
    var textToUrlSafeRpc = (text) =>
      base642.base64url.encode(fromString4.fromString(text));
    exports2.rpcArrayToTextArray = rpcArrayToTextArray;
    exports2.rpcToBytes = rpcToBytes;
    exports2.rpcToText = rpcToText;
    exports2.textToUrlSafeRpc = textToUrlSafeRpc;
  },
});

// node_modules/ipfs-http-client/cjs/src/pubsub/ls.js
var require_ls6 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pubsub/ls.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var httpRpcWireFormat = require_http_rpc_wire_format();
    var createLs = configure.configure((api) => {
      async function ls(options = {}) {
        const { Strings } = await (
          await api.post("pubsub/ls", {
            signal: options.signal,
            searchParams: toUrlSearchParams.toUrlSearchParams(options),
            headers: options.headers,
          })
        ).json();
        return httpRpcWireFormat.rpcArrayToTextArray(Strings) || [];
      }
      return ls;
    });
    exports2.createLs = createLs;
  },
});

// node_modules/ipfs-http-client/cjs/src/pubsub/peers.js
var require_peers = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pubsub/peers.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var httpRpcWireFormat = require_http_rpc_wire_format();
    var createPeers = configure.configure((api) => {
      async function peers(topic, options = {}) {
        const res = await api.post("pubsub/peers", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: httpRpcWireFormat.textToUrlSafeRpc(topic),
            ...options,
          }),
          headers: options.headers,
        });
        const { Strings } = await res.json();
        return Strings || [];
      }
      return peers;
    });
    exports2.createPeers = createPeers;
  },
});

// node_modules/ipfs-http-client/cjs/src/pubsub/publish.js
var require_publish2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pubsub/publish.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var abortSignal = require_abort_signal();
    var httpRpcWireFormat = require_http_rpc_wire_format();
    var createPublish = configure.configure((api) => {
      async function publish(topic, data, options = {}) {
        const searchParams = toUrlSearchParams.toUrlSearchParams({
          arg: httpRpcWireFormat.textToUrlSafeRpc(topic),
          ...options,
        });
        const controller = new AbortController();
        const signal = abortSignal.abortSignal(
          controller.signal,
          options.signal
        );
        const res = await api.post("pubsub/pub", {
          signal,
          searchParams,
          ...(await multipartRequest2.multipartRequest(
            [data],
            controller,
            options.headers
          )),
        });
        await res.text();
      }
      return publish;
    });
    exports2.createPublish = createPublish;
  },
});

// node_modules/ipfs-http-client/cjs/src/pubsub/subscribe.js
var require_subscribe = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pubsub/subscribe.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var debug = require_browser2();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var httpRpcWireFormat = require_http_rpc_wire_format();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var debug__default = /* @__PURE__ */ _interopDefaultLegacy(debug);
    var log = debug__default["default"]("ipfs-http-client:pubsub:subscribe");
    var createSubscribe = (options, subsTracker) => {
      return configure.configure((api) => {
        async function subscribe(topic, handler, options2 = {}) {
          options2.signal = subsTracker.subscribe(
            topic,
            handler,
            options2.signal
          );
          let done;
          let fail;
          const result = new Promise((resolve, reject) => {
            done = resolve;
            fail = reject;
          });
          const ffWorkaround = setTimeout(() => done(), 1e3);
          api
            .post("pubsub/sub", {
              signal: options2.signal,
              searchParams: toUrlSearchParams.toUrlSearchParams({
                arg: httpRpcWireFormat.textToUrlSafeRpc(topic),
                ...options2,
              }),
              headers: options2.headers,
            })
            .catch((err) => {
              subsTracker.unsubscribe(topic, handler);
              fail(err);
            })
            .then((response) => {
              clearTimeout(ffWorkaround);
              if (!response) {
                return;
              }
              readMessages(response, {
                onMessage: handler,
                onEnd: () => subsTracker.unsubscribe(topic, handler),
                onError: options2.onError,
              });
              done();
            });
          return result;
        }
        return subscribe;
      })(options);
    };
    async function readMessages(response, { onMessage, onEnd, onError }) {
      onError = onError || log;
      try {
        for await (const msg of response.ndjson()) {
          try {
            if (!msg.from) {
              continue;
            }
            onMessage({
              from: msg.from,
              data: httpRpcWireFormat.rpcToBytes(msg.data),
              seqno: httpRpcWireFormat.rpcToBytes(msg.seqno),
              topicIDs: httpRpcWireFormat.rpcArrayToTextArray(msg.topicIDs),
            });
          } catch (err) {
            err.message = `Failed to parse pubsub message: ${err.message}`;
            onError(err, false, msg);
          }
        }
      } catch (err) {
        if (!isAbortError(err)) {
          onError(err, true);
        }
      } finally {
        onEnd();
      }
    }
    var isAbortError = (error) => {
      switch (error.type) {
        case "aborted":
          return true;
        case "abort":
          return true;
        default:
          return error.name === "AbortError";
      }
    };
    exports2.createSubscribe = createSubscribe;
  },
});

// node_modules/ipfs-http-client/cjs/src/pubsub/unsubscribe.js
var require_unsubscribe = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pubsub/unsubscribe.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var createUnsubscribe = (options, subsTracker) => {
      async function unsubscribe(topic, handler) {
        subsTracker.unsubscribe(topic, handler);
      }
      return unsubscribe;
    };
    exports2.createUnsubscribe = createUnsubscribe;
  },
});

// node_modules/ipfs-http-client/cjs/src/pubsub/subscription-tracker.js
var require_subscription_tracker = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pubsub/subscription-tracker.js"(
    exports2
  ) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var SubscriptionTracker = class {
      constructor() {
        this._subs = /* @__PURE__ */ new Map();
      }
      subscribe(topic, handler, signal) {
        const topicSubs = this._subs.get(topic) || [];
        if (topicSubs.find((s) => s.handler === handler)) {
          throw new Error(`Already subscribed to ${topic} with this handler`);
        }
        const controller = new AbortController();
        this._subs.set(
          topic,
          [
            {
              handler,
              controller,
            },
          ].concat(topicSubs)
        );
        if (signal) {
          signal.addEventListener("abort", () =>
            this.unsubscribe(topic, handler)
          );
        }
        return controller.signal;
      }
      unsubscribe(topic, handler) {
        const subs = this._subs.get(topic) || [];
        let unsubs;
        if (handler) {
          this._subs.set(
            topic,
            subs.filter((s) => s.handler !== handler)
          );
          unsubs = subs.filter((s) => s.handler === handler);
        } else {
          this._subs.set(topic, []);
          unsubs = subs;
        }
        if (!(this._subs.get(topic) || []).length) {
          this._subs.delete(topic);
        }
        unsubs.forEach((s) => s.controller.abort());
      }
    };
    exports2.SubscriptionTracker = SubscriptionTracker;
  },
});

// node_modules/ipfs-http-client/cjs/src/pubsub/index.js
var require_pubsub2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/pubsub/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ls = require_ls6();
    var peers = require_peers();
    var publish = require_publish2();
    var subscribe = require_subscribe();
    var unsubscribe = require_unsubscribe();
    var subscriptionTracker = require_subscription_tracker();
    function createPubsub(config) {
      const subscriptionTracker$1 =
        new subscriptionTracker.SubscriptionTracker();
      return {
        ls: ls.createLs(config),
        peers: peers.createPeers(config),
        publish: publish.createPublish(config),
        subscribe: subscribe.createSubscribe(config, subscriptionTracker$1),
        unsubscribe: unsubscribe.createUnsubscribe(
          config,
          subscriptionTracker$1
        ),
      };
    }
    exports2.createPubsub = createPubsub;
  },
});

// node_modules/ipfs-http-client/cjs/src/refs/local.js
var require_local = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/refs/local.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createLocal = configure.configure((api) => {
      async function* refsLocal(options = {}) {
        const res = await api.post("refs/local", {
          signal: options.signal,
          transform: objectToCamel.objectToCamel,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        yield* res.ndjson();
      }
      return refsLocal;
    });
    exports2.createLocal = createLocal;
  },
});

// node_modules/ipfs-http-client/cjs/src/refs/index.js
var require_refs = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/refs/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var local = require_local();
    var createRefs = configure.configure((api, opts) => {
      const refs = async function* (args, options = {}) {
        const argsArr = Array.isArray(args) ? args : [args];
        const res = await api.post("refs", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: argsArr.map(
              (arg) =>
                `${arg instanceof Uint8Array ? cid.CID.decode(arg) : arg}`
            ),
            ...options,
          }),
          headers: options.headers,
          transform: objectToCamel.objectToCamel,
        });
        yield* res.ndjson();
      };
      return Object.assign(refs, { local: local.createLocal(opts) });
    });
    exports2.createRefs = createRefs;
  },
});

// node_modules/ipfs-http-client/cjs/src/repo/gc.js
var require_gc = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/repo/gc.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createGc = configure.configure((api) => {
      async function* gc(options = {}) {
        const res = await api.post("repo/gc", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
          transform: (res2) => {
            return {
              err: res2.Error ? new Error(res2.Error) : null,
              cid: (res2.Key || {})["/"] ? cid.CID.parse(res2.Key["/"]) : null,
            };
          },
        });
        yield* res.ndjson();
      }
      return gc;
    });
    exports2.createGc = createGc;
  },
});

// node_modules/ipfs-http-client/cjs/src/repo/stat.js
var require_stat5 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/repo/stat.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createStat = configure.configure((api) => {
      async function stat(options = {}) {
        const res = await api.post("repo/stat", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        const data = await res.json();
        return {
          numObjects: BigInt(data.NumObjects),
          repoSize: BigInt(data.RepoSize),
          repoPath: data.RepoPath,
          version: data.Version,
          storageMax: BigInt(data.StorageMax),
        };
      }
      return stat;
    });
    exports2.createStat = createStat;
  },
});

// node_modules/ipfs-http-client/cjs/src/repo/version.js
var require_version = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/repo/version.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createVersion = configure.configure((api) => {
      async function version2(options = {}) {
        const res = await (
          await api.post("repo/version", {
            signal: options.signal,
            searchParams: toUrlSearchParams.toUrlSearchParams(options),
            headers: options.headers,
          })
        ).json();
        return res.Version;
      }
      return version2;
    });
    exports2.createVersion = createVersion;
  },
});

// node_modules/ipfs-http-client/cjs/src/repo/index.js
var require_repo = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/repo/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var gc = require_gc();
    var stat = require_stat5();
    var version2 = require_version();
    function createRepo(config) {
      return {
        gc: gc.createGc(config),
        stat: stat.createStat(config),
        version: version2.createVersion(config),
      };
    }
    exports2.createRepo = createRepo;
  },
});

// node_modules/ipfs-http-client/cjs/src/stats/bw.js
var require_bw = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/stats/bw.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createBw = configure.configure((api) => {
      async function* bw(options = {}) {
        const res = await api.post("stats/bw", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
          transform: (stats) => ({
            totalIn: BigInt(stats.TotalIn),
            totalOut: BigInt(stats.TotalOut),
            rateIn: parseFloat(stats.RateIn),
            rateOut: parseFloat(stats.RateOut),
          }),
        });
        yield* res.ndjson();
      }
      return bw;
    });
    exports2.createBw = createBw;
  },
});

// node_modules/ipfs-http-client/cjs/src/stats/index.js
var require_stats = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/stats/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var stat = require_stat();
    var stat$1 = require_stat5();
    var bw = require_bw();
    function createStats(config) {
      return {
        bitswap: stat.createStat(config),
        repo: stat$1.createStat(config),
        bw: bw.createBw(config),
      };
    }
    exports2.createStats = createStats;
  },
});

// node_modules/ipfs-http-client/cjs/src/swarm/addrs.js
var require_addrs = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/swarm/addrs.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var multiaddr = require_src();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createAddrs = configure.configure((api) => {
      async function addrs(options = {}) {
        const res = await api.post("swarm/addrs", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        const { Addrs } = await res.json();
        return Object.keys(Addrs).map((id) => ({
          id,
          addrs: (Addrs[id] || []).map((a) => new multiaddr.Multiaddr(a)),
        }));
      }
      return addrs;
    });
    exports2.createAddrs = createAddrs;
  },
});

// node_modules/ipfs-http-client/cjs/src/swarm/connect.js
var require_connect = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/swarm/connect.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createConnect = configure.configure((api) => {
      async function connect(addr, options = {}) {
        const res = await api.post("swarm/connect", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: addr,
            ...options,
          }),
          headers: options.headers,
        });
        const { Strings } = await res.json();
        return Strings || [];
      }
      return connect;
    });
    exports2.createConnect = createConnect;
  },
});

// node_modules/ipfs-http-client/cjs/src/swarm/disconnect.js
var require_disconnect = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/swarm/disconnect.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createDisconnect = configure.configure((api) => {
      async function disconnect(addr, options = {}) {
        const res = await api.post("swarm/disconnect", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: addr,
            ...options,
          }),
          headers: options.headers,
        });
        const { Strings } = await res.json();
        return Strings || [];
      }
      return disconnect;
    });
    exports2.createDisconnect = createDisconnect;
  },
});

// node_modules/ipfs-http-client/cjs/src/swarm/local-addrs.js
var require_local_addrs = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/swarm/local-addrs.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var multiaddr = require_src();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createLocalAddrs = configure.configure((api) => {
      async function localAddrs(options = {}) {
        const res = await api.post("swarm/addrs/local", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        const { Strings } = await res.json();
        return (Strings || []).map((a) => new multiaddr.Multiaddr(a));
      }
      return localAddrs;
    });
    exports2.createLocalAddrs = createLocalAddrs;
  },
});

// node_modules/ipfs-http-client/cjs/src/swarm/peers.js
var require_peers2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/swarm/peers.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var multiaddr = require_src();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createPeers = configure.configure((api) => {
      async function peers(options = {}) {
        const res = await api.post("swarm/peers", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        const { Peers } = await res.json();
        return (Peers || []).map((peer) => {
          return {
            addr: new multiaddr.Multiaddr(peer.Addr),
            peer: peer.Peer,
            muxer: peer.Muxer,
            latency: peer.Latency,
            streams: peer.Streams,
            direction:
              peer.Direction == null
                ? void 0
                : peer.Direction === 0
                ? "inbound"
                : "outbound",
          };
        });
      }
      return peers;
    });
    exports2.createPeers = createPeers;
  },
});

// node_modules/ipfs-http-client/cjs/src/swarm/index.js
var require_swarm = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/swarm/index.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var addrs = require_addrs();
    var connect = require_connect();
    var disconnect = require_disconnect();
    var localAddrs = require_local_addrs();
    var peers = require_peers2();
    function createSwarm(config) {
      return {
        addrs: addrs.createAddrs(config),
        connect: connect.createConnect(config),
        disconnect: disconnect.createDisconnect(config),
        localAddrs: localAddrs.createLocalAddrs(config),
        peers: peers.createPeers(config),
      };
    }
    exports2.createSwarm = createSwarm;
  },
});

// node_modules/ipfs-http-client/cjs/src/add-all.js
var require_add_all2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/add-all.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var multipartRequest2 =
      (init_multipart_request_browser(),
      __toCommonJS(multipart_request_browser_exports));
    var toUrlSearchParams = require_to_url_search_params();
    var abortSignal = require_abort_signal();
    var createAddAll = configure.configure((api) => {
      async function* addAll(source, options = {}) {
        const controller = new AbortController();
        const signal = abortSignal.abortSignal(
          controller.signal,
          options.signal
        );
        const { headers, body, total, parts } =
          await multipartRequest2.multipartRequest(
            source,
            controller,
            options.headers
          );
        const [progressFn, onUploadProgress] =
          typeof options.progress === "function"
            ? createProgressHandler(total, parts, options.progress)
            : [void 0, void 0];
        const res = await api.post("add", {
          searchParams: toUrlSearchParams.toUrlSearchParams({
            "stream-channels": true,
            ...options,
            progress: Boolean(progressFn),
          }),
          onUploadProgress,
          signal,
          headers,
          body,
        });
        for await (let file of res.ndjson()) {
          file = objectToCamel.objectToCamel(file);
          if (file.hash !== void 0) {
            yield toCoreInterface(file);
          } else if (progressFn) {
            progressFn(file.bytes || 0, file.name);
          }
        }
      }
      return addAll;
    });
    var createProgressHandler = (total, parts, progress) =>
      parts
        ? [void 0, createOnUploadProgress(total, parts, progress)]
        : [progress, void 0];
    var createOnUploadProgress = (size, parts, progress) => {
      let index = 0;
      const count = parts.length;
      return ({ loaded, total }) => {
        const position = Math.floor((loaded / total) * size);
        while (index < count) {
          const { start, end, name: name8 } = parts[index];
          if (position < end) {
            progress(position - start, name8);
            break;
          } else {
            progress(end - start, name8);
            index += 1;
          }
        }
      };
    };
    function toCoreInterface({
      name: name8,
      hash,
      size,
      mode,
      mtime,
      mtimeNsecs,
    }) {
      const output = {
        path: name8,
        cid: cid.CID.parse(hash),
        size: parseInt(size),
      };
      if (mode != null) {
        output.mode = parseInt(mode, 8);
      }
      if (mtime != null) {
        output.mtime = {
          secs: mtime,
          nsecs: mtimeNsecs || 0,
        };
      }
      return output;
    }
    exports2.createAddAll = createAddAll;
  },
});

// node_modules/blob-to-it/index.js
var require_blob_to_it = __commonJS({
  "node_modules/blob-to-it/index.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var browserReadableStreamToIt = require_browser_readablestream_to_it();
    function blobToIt2(blob) {
      if (typeof blob.stream === "function") {
        return browserReadableStreamToIt(blob.stream());
      }
      return browserReadableStreamToIt(new Response(blob).body);
    }
    module2.exports = blobToIt2;
  },
});

// node_modules/ipfs-core-utils/esm/src/files/normalise-content.js
async function* toAsyncIterable(thing) {
  yield thing;
}
async function normaliseContent2(input) {
  if (isBytes(input)) {
    return toAsyncIterable(toBytes(input));
  }
  if (typeof input === "string" || input instanceof String) {
    return toAsyncIterable(toBytes(input.toString()));
  }
  if (isBlob(input)) {
    return (0, import_blob_to_it.default)(input);
  }
  if (isReadableStream(input)) {
    input = (0, import_browser_readablestream_to_it3.default)(input);
  }
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    const peekable = (0, import_it_peekable3.default)(input);
    const { value, done } = await peekable.peek();
    if (done) {
      return toAsyncIterable(new Uint8Array(0));
    }
    peekable.push(value);
    if (Number.isInteger(value)) {
      return toAsyncIterable(
        Uint8Array.from(await (0, import_it_all2.default)(peekable))
      );
    }
    if (
      isBytes(value) ||
      typeof value === "string" ||
      value instanceof String
    ) {
      return (0, import_it_map2.default)(peekable, toBytes);
    }
  }
  throw (0, import_err_code5.default)(
    new Error(`Unexpected input: ${input}`),
    "ERR_UNEXPECTED_INPUT"
  );
}
function toBytes(chunk) {
  if (chunk instanceof Uint8Array) {
    return chunk;
  }
  if (ArrayBuffer.isView(chunk)) {
    return new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
  }
  if (chunk instanceof ArrayBuffer) {
    return new Uint8Array(chunk);
  }
  if (Array.isArray(chunk)) {
    return Uint8Array.from(chunk);
  }
  return fromString3(chunk.toString());
}
var import_err_code5,
  import_browser_readablestream_to_it3,
  import_blob_to_it,
  import_it_peekable3,
  import_it_all2,
  import_it_map2;
var init_normalise_content = __esm({
  "node_modules/ipfs-core-utils/esm/src/files/normalise-content.js"() {
    init_node_globals();
    import_err_code5 = __toESM(require_err_code(), 1);
    init_from_string();
    import_browser_readablestream_to_it3 = __toESM(
      require_browser_readablestream_to_it(),
      1
    );
    import_blob_to_it = __toESM(require_blob_to_it(), 1);
    import_it_peekable3 = __toESM(require_it_peekable(), 1);
    import_it_all2 = __toESM(require_it_all(), 1);
    import_it_map2 = __toESM(require_it_map(), 1);
    init_utils();
  },
});

// node_modules/ipfs-core-utils/esm/src/files/normalise-candidate-single.js
async function* normaliseCandidateSingle(input, normaliseContent3) {
  if (input === null || input === void 0) {
    throw (0, import_err_code6.default)(
      new Error(`Unexpected input: ${input}`),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  if (typeof input === "string" || input instanceof String) {
    yield toFileObject2(input.toString(), normaliseContent3);
    return;
  }
  if (isBytes(input) || isBlob(input)) {
    yield toFileObject2(input, normaliseContent3);
    return;
  }
  if (isReadableStream(input)) {
    input = (0, import_browser_readablestream_to_it4.default)(input);
  }
  if (Symbol.iterator in input || Symbol.asyncIterator in input) {
    const peekable = (0, import_it_peekable4.default)(input);
    const { value, done } = await peekable.peek();
    if (done) {
      yield { content: [] };
      return;
    }
    peekable.push(value);
    if (
      Number.isInteger(value) ||
      isBytes(value) ||
      typeof value === "string" ||
      value instanceof String
    ) {
      yield toFileObject2(peekable, normaliseContent3);
      return;
    }
    throw (0, import_err_code6.default)(
      new Error(
        "Unexpected input: multiple items passed - if you are using ipfs.add, please use ipfs.addAll instead"
      ),
      "ERR_UNEXPECTED_INPUT"
    );
  }
  if (isFileObject(input)) {
    yield toFileObject2(input, normaliseContent3);
    return;
  }
  throw (0, import_err_code6.default)(
    new Error(
      'Unexpected input: cannot convert "' +
        typeof input +
        '" into ImportCandidate'
    ),
    "ERR_UNEXPECTED_INPUT"
  );
}
async function toFileObject2(input, normaliseContent3) {
  const { path, mode, mtime, content } = input;
  const file = {
    path: path || "",
    mode: parseMode(mode),
    mtime: parseMtime(mtime),
  };
  if (content) {
    file.content = await normaliseContent3(content);
  } else if (!path) {
    file.content = await normaliseContent3(input);
  }
  return file;
}
var import_err_code6, import_browser_readablestream_to_it4, import_it_peekable4;
var init_normalise_candidate_single = __esm({
  "node_modules/ipfs-core-utils/esm/src/files/normalise-candidate-single.js"() {
    init_node_globals();
    import_err_code6 = __toESM(require_err_code(), 1);
    import_browser_readablestream_to_it4 = __toESM(
      require_browser_readablestream_to_it(),
      1
    );
    import_it_peekable4 = __toESM(require_it_peekable(), 1);
    init_utils();
    init_src3();
  },
});

// node_modules/ipfs-core-utils/esm/src/files/normalise-input-single.js
var normalise_input_single_exports = {};
__export(normalise_input_single_exports, {
  normaliseInput: () => normaliseInput3,
});
function normaliseInput3(input) {
  return normaliseCandidateSingle(input, normaliseContent2);
}
var init_normalise_input_single = __esm({
  "node_modules/ipfs-core-utils/esm/src/files/normalise-input-single.js"() {
    init_node_globals();
    init_normalise_content();
    init_normalise_candidate_single();
  },
});

// node_modules/ipfs-http-client/cjs/src/add.js
var require_add5 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/add.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var addAll = require_add_all2();
    var last = require_it_last();
    var configure = require_configure();
    var normaliseInputSingle =
      (init_normalise_input_single(),
      __toCommonJS(normalise_input_single_exports));
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var last__default = /* @__PURE__ */ _interopDefaultLegacy(last);
    function createAdd(options) {
      const all3 = addAll.createAddAll(options);
      return configure.configure(() => {
        async function add(input, options2 = {}) {
          return await last__default["default"](
            all3(normaliseInputSingle.normaliseInput(input), options2)
          );
        }
        return add;
      })(options);
    }
    exports2.createAdd = createAdd;
  },
});

// node_modules/ipfs-http-client/cjs/src/cat.js
var require_cat = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/cat.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createCat = configure.configure((api) => {
      async function* cat(path, options = {}) {
        const res = await api.post("cat", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path.toString(),
            ...options,
          }),
          headers: options.headers,
        });
        yield* res.iterator();
      }
      return cat;
    });
    exports2.createCat = createCat;
  },
});

// node_modules/ipfs-http-client/cjs/src/commands.js
var require_commands = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/commands.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createCommands = configure.configure((api) => {
      const commands = async (options = {}) => {
        const res = await api.post("commands", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        return res.json();
      };
      return commands;
    });
    exports2.createCommands = createCommands;
  },
});

// node_modules/ipfs-http-client/cjs/src/dns.js
var require_dns = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/dns.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createDns = configure.configure((api) => {
      const dns = async (domain, options = {}) => {
        const res = await api.post("dns", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: domain,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        return data.Path;
      };
      return dns;
    });
    exports2.createDns = createDns;
  },
});

// node_modules/ipfs-http-client/cjs/src/get-endpoint-config.js
var require_get_endpoint_config = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/get-endpoint-config.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var createGetEndpointConfig = configure.configure((api) => {
      return () => {
        const url = new URL(api.opts.base || "");
        return {
          host: url.hostname,
          port: url.port,
          protocol: url.protocol,
          pathname: url.pathname,
          "api-path": url.pathname,
        };
      };
    });
    exports2.createGetEndpointConfig = createGetEndpointConfig;
  },
});

// node_modules/ipfs-http-client/cjs/src/get.js
var require_get6 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/get.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createGet = configure.configure((api) => {
      async function* get(path, options = {}) {
        const opts = {
          arg: `${path instanceof Uint8Array ? cid.CID.decode(path) : path}`,
          ...options,
        };
        if (opts.compressionLevel) {
          opts["compression-level"] = opts.compressionLevel;
          delete opts.compressionLevel;
        }
        const res = await api.post("get", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(opts),
          headers: options.headers,
        });
        yield* res.iterator();
      }
      return get;
    });
    exports2.createGet = createGet;
  },
});

// node_modules/ipfs-http-client/cjs/src/id.js
var require_id = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/id.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var multiaddr = require_src();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createId = configure.configure((api) => {
      async function id(options = {}) {
        const res = await api.post("id", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: options.peerId ? options.peerId.toString() : void 0,
            ...options,
          }),
          headers: options.headers,
        });
        const data = await res.json();
        const output = { ...objectToCamel.objectToCamel(data) };
        if (output.addresses) {
          output.addresses = output.addresses.map(
            (ma) => new multiaddr.Multiaddr(ma)
          );
        }
        return output;
      }
      return id;
    });
    exports2.createId = createId;
  },
});

// node_modules/ipfs-http-client/cjs/src/is-online.js
var require_is_online = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/is-online.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var id = require_id();
    var createIsOnline = (options) => {
      const id$1 = id.createId(options);
      async function isOnline(options2 = {}) {
        const res = await id$1(options2);
        return Boolean(res && res.addresses && res.addresses.length);
      }
      return isOnline;
    };
    exports2.createIsOnline = createIsOnline;
  },
});

// node_modules/ipfs-http-client/cjs/src/ls.js
var require_ls7 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/ls.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var stat = require_stat3();
    var createLs = configure.configure((api, opts) => {
      async function* ls(path, options = {}) {
        const pathStr = `${
          path instanceof Uint8Array ? cid.CID.decode(path) : path
        }`;
        async function mapLink(link) {
          let hash = link.Hash;
          if (hash.includes("/")) {
            const ipfsPath = hash.startsWith("/ipfs/") ? hash : `/ipfs/${hash}`;
            const stats = await stat.createStat(opts)(ipfsPath);
            hash = stats.cid;
          } else {
            hash = cid.CID.parse(hash);
          }
          const entry = {
            name: link.Name,
            path: pathStr + (link.Name ? `/${link.Name}` : ""),
            size: link.Size,
            cid: hash,
            type: typeOf(link),
          };
          if (link.Mode) {
            entry.mode = parseInt(link.Mode, 8);
          }
          if (link.Mtime !== void 0 && link.Mtime !== null) {
            entry.mtime = { secs: link.Mtime };
            if (link.MtimeNsecs !== void 0 && link.MtimeNsecs !== null) {
              entry.mtime.nsecs = link.MtimeNsecs;
            }
          }
          return entry;
        }
        const res = await api.post("ls", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: pathStr,
            ...options,
          }),
          headers: options.headers,
        });
        for await (let result of res.ndjson()) {
          result = result.Objects;
          if (!result) {
            throw new Error("expected .Objects in results");
          }
          result = result[0];
          if (!result) {
            throw new Error("expected one array in results.Objects");
          }
          const links = result.Links;
          if (!Array.isArray(links)) {
            throw new Error("expected one array in results.Objects[0].Links");
          }
          if (!links.length) {
            yield mapLink(result);
            return;
          }
          yield* links.map(mapLink);
        }
      }
      return ls;
    });
    function typeOf(link) {
      switch (link.Type) {
        case 1:
        case 5:
          return "dir";
        case 2:
          return "file";
        default:
          return "file";
      }
    }
    exports2.createLs = createLs;
  },
});

// node_modules/ipfs-http-client/cjs/src/mount.js
var require_mount = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/mount.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createMount = configure.configure((api) => {
      async function mount(options = {}) {
        const res = await api.post("dns", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        return objectToCamel.objectToCamel(await res.json());
      }
      return mount;
    });
    exports2.createMount = createMount;
  },
});

// node_modules/ipfs-http-client/cjs/src/ping.js
var require_ping = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/ping.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createPing = configure.configure((api) => {
      async function* ping(peerId, options = {}) {
        const res = await api.post("ping", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: `${peerId}`,
            ...options,
          }),
          headers: options.headers,
          transform: objectToCamel.objectToCamel,
        });
        yield* res.ndjson();
      }
      return ping;
    });
    exports2.createPing = createPing;
  },
});

// node_modules/ipfs-http-client/cjs/src/resolve.js
var require_resolve4 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/resolve.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createResolve = configure.configure((api) => {
      async function resolve(path, options = {}) {
        const res = await api.post("resolve", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams({
            arg: path,
            ...options,
          }),
          headers: options.headers,
        });
        const { Path } = await res.json();
        return Path;
      }
      return resolve;
    });
    exports2.createResolve = createResolve;
  },
});

// node_modules/ipfs-http-client/cjs/src/start.js
var require_start = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/start.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var errCode6 = require_err_code();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    var errCode__default = /* @__PURE__ */ _interopDefaultLegacy(errCode6);
    var createStart = configure.configure((api) => {
      const start = async (options = {}) => {
        throw errCode__default["default"](
          new Error("Not implemented"),
          "ERR_NOT_IMPLEMENTED"
        );
      };
      return start;
    });
    exports2.createStart = createStart;
  },
});

// node_modules/ipfs-http-client/cjs/src/stop.js
var require_stop = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/stop.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createStop = configure.configure((api) => {
      async function stop(options = {}) {
        const res = await api.post("shutdown", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        await res.text();
      }
      return stop;
    });
    exports2.createStop = createStop;
  },
});

// node_modules/ipfs-http-client/cjs/src/version.js
var require_version2 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/version.js"(exports2) {
    "use strict";
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var objectToCamel = require_object_to_camel();
    var configure = require_configure();
    var toUrlSearchParams = require_to_url_search_params();
    var createVersion = configure.configure((api) => {
      async function version2(options = {}) {
        const res = await api.post("version", {
          signal: options.signal,
          searchParams: toUrlSearchParams.toUrlSearchParams(options),
          headers: options.headers,
        });
        return {
          ...objectToCamel.objectToCamel(await res.json()),
          "ipfs-http-client": "1.0.0",
        };
      }
      return version2;
    });
    exports2.createVersion = createVersion;
  },
});

// (disabled):node_modules/ipfs-utils/src/files/glob-source.js
var require_glob_source = __commonJS({
  "(disabled):node_modules/ipfs-utils/src/files/glob-source.js"() {
    init_node_globals();
  },
});

// node_modules/ipfs-utils/src/files/url-source.js
var require_url_source = __commonJS({
  "node_modules/ipfs-utils/src/files/url-source.js"(exports2, module2) {
    "use strict";
    init_node_globals();
    var HTTP = require_http();
    var urlSource = (url, options) => {
      return {
        path: decodeURIComponent(new URL(url).pathname.split("/").pop() || ""),
        content: readURLContent(url, options),
      };
    };
    async function* readURLContent(url, options) {
      const http = new HTTP();
      const response = await http.get(url, options);
      yield* response.iterator();
    }
    module2.exports = urlSource;
  },
});

// node_modules/ipfs-http-client/cjs/src/index.js
var require_src3 = __commonJS({
  "node_modules/ipfs-http-client/cjs/src/index.js"(exports2) {
    init_node_globals();
    Object.defineProperty(exports2, "__esModule", { value: true });
    var multibases = (init_multibases(), __toCommonJS(multibases_exports));
    var multicodecs = (init_multicodecs(), __toCommonJS(multicodecs_exports));
    var multihashes = (init_multihashes(), __toCommonJS(multihashes_exports));
    var dagPB = (init_src(), __toCommonJS(src_exports));
    var dagCBOR = (init_esm(), __toCommonJS(esm_exports));
    var dagJSON = (init_esm2(), __toCommonJS(esm_exports2));
    var dagJOSE = require_lib();
    var identity3 = (init_identity(), __toCommonJS(identity_exports));
    var basics = (init_basics(), __toCommonJS(basics_exports));
    var index = require_bitswap();
    var index$1 = require_block();
    var index$2 = require_bootstrap();
    var index$3 = require_config();
    var index$4 = require_dag();
    var index$5 = require_dht();
    var index$6 = require_diag();
    var index$7 = require_files();
    var index$8 = require_key();
    var index$9 = require_log();
    var index$a = require_name();
    var index$b = require_object();
    var index$c = require_pin();
    var index$d = require_pubsub2();
    var index$e = require_refs();
    var index$f = require_repo();
    var index$g = require_stats();
    var index$h = require_swarm();
    var add = require_add5();
    var addAll = require_add_all2();
    var cat = require_cat();
    var commands = require_commands();
    var dns = require_dns();
    var getEndpointConfig = require_get_endpoint_config();
    var get = require_get6();
    var id = require_id();
    var isOnline = require_is_online();
    var ls = require_ls7();
    var mount = require_mount();
    var ping = require_ping();
    var resolve = require_resolve4();
    var start = require_start();
    var stop = require_stop();
    var version2 = require_version2();
    var globSourceImport = require_glob_source();
    var cid = (init_cid(), __toCommonJS(cid_exports));
    var multiaddr = require_src();
    var urlSource_js = require_url_source();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { default: e };
    }
    function _interopNamespace(e) {
      if (e && e.__esModule) return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function (k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(
              n,
              k,
              d.get
                ? d
                : {
                    enumerable: true,
                    get: function () {
                      return e[k];
                    },
                  }
            );
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var dagPB__namespace = /* @__PURE__ */ _interopNamespace(dagPB);
    var dagCBOR__namespace = /* @__PURE__ */ _interopNamespace(dagCBOR);
    var dagJSON__namespace = /* @__PURE__ */ _interopNamespace(dagJSON);
    var dagJOSE__namespace = /* @__PURE__ */ _interopNamespace(dagJOSE);
    var globSourceImport__default =
      /* @__PURE__ */ _interopDefaultLegacy(globSourceImport);
    var urlSource_js__default =
      /* @__PURE__ */ _interopDefaultLegacy(urlSource_js);
    function create2(options = {}) {
      const id$1 = {
        name: identity3.identity.name,
        code: identity3.identity.code,
        encode: (id2) => id2,
        decode: (id2) => id2,
      };
      const multibaseCodecs = Object.values(basics.bases);
      (options.ipld && options.ipld.bases ? options.ipld.bases : []).forEach(
        (base3) => multibaseCodecs.push(base3)
      );
      const multibases$1 = new multibases.Multibases({
        bases: multibaseCodecs,
        loadBase: options.ipld && options.ipld.loadBase,
      });
      const blockCodecs = Object.values(basics.codecs);
      [
        dagPB__namespace,
        dagCBOR__namespace,
        dagJSON__namespace,
        dagJOSE__namespace,
        id$1,
      ]
        .concat((options.ipld && options.ipld.codecs) || [])
        .forEach((codec) => blockCodecs.push(codec));
      const multicodecs$1 = new multicodecs.Multicodecs({
        codecs: blockCodecs,
        loadCodec: options.ipld && options.ipld.loadCodec,
      });
      const multihashHashers = Object.values(basics.hashes);
      (options.ipld && options.ipld.hashers
        ? options.ipld.hashers
        : []
      ).forEach((hasher) => multihashHashers.push(hasher));
      const multihashes$1 = new multihashes.Multihashes({
        hashers: multihashHashers,
        loadHasher: options.ipld && options.ipld.loadHasher,
      });
      const client = {
        add: add.createAdd(options),
        addAll: addAll.createAddAll(options),
        bitswap: index.createBitswap(options),
        block: index$1.createBlock(options),
        bootstrap: index$2.createBootstrap(options),
        cat: cat.createCat(options),
        commands: commands.createCommands(options),
        config: index$3.createConfig(options),
        dag: index$4.createDag(multicodecs$1, options),
        dht: index$5.createDht(options),
        diag: index$6.createDiag(options),
        dns: dns.createDns(options),
        files: index$7.createFiles(options),
        get: get.createGet(options),
        getEndpointConfig: getEndpointConfig.createGetEndpointConfig(options),
        id: id.createId(options),
        isOnline: isOnline.createIsOnline(options),
        key: index$8.createKey(options),
        log: index$9.createLog(options),
        ls: ls.createLs(options),
        mount: mount.createMount(options),
        name: index$a.createName(options),
        object: index$b.createObject(multicodecs$1, options),
        pin: index$c.createPin(options),
        ping: ping.createPing(options),
        pubsub: index$d.createPubsub(options),
        refs: index$e.createRefs(options),
        repo: index$f.createRepo(options),
        resolve: resolve.createResolve(options),
        start: start.createStart(options),
        stats: index$g.createStats(options),
        stop: stop.createStop(options),
        swarm: index$h.createSwarm(options),
        version: version2.createVersion(options),
        bases: multibases$1,
        codecs: multicodecs$1,
        hashers: multihashes$1,
      };
      return client;
    }
    var globSource = globSourceImport__default["default"];
    Object.defineProperty(exports2, "CID", {
      enumerable: true,
      get: function () {
        return cid.CID;
      },
    });
    Object.defineProperty(exports2, "multiaddr", {
      enumerable: true,
      get: function () {
        return multiaddr.Multiaddr;
      },
    });
    Object.defineProperty(exports2, "urlSource", {
      enumerable: true,
      get: function () {
        return urlSource_js__default["default"];
      },
    });
    exports2.create = create2;
    exports2.globSource = globSource;
  },
});
("use strict");
export default require_src3();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
//# sourceMappingURL=ipfs-http-client.js.map
