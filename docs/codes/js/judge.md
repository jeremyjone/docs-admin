# 判断类

一些通用的判断方法。

## 判断类型

```js
// 是否为null
export const isNull = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Null";
};

// 是否undefined
export const isUndefined = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Undefined";
};

// 是否对象
export const isObject = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Object";
};

// 是否数组
export const isArray = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Array";
};

// 是否时间对象
export const isDate = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Date";
};

// 是否函数
export const isFunction = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Function";
};

// 是否boolean
export const isBoolean = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
};

// 是否字符串
export const isString = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "String";
};

// 是否数字
export const isNumber = o => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Number";
};
```

## 对象完全相等

### 简易版本，足够使用

```js
export function isObjectValueEqual(a, b) {
  var o1 = a instanceof Object;
  var o2 = b instanceof Object;
  // 判断是不是对象
  if (!o1 || !o2) {
    return a === b;
  }

  //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
  //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (var o in a) {
    var t1 = a[o] instanceof Object;
    var t2 = b[o] instanceof Object;
    if (t1 && t2) {
      if (!isObjectValueEqual(a[o], b[o])) return false;
    } else if (a[o] !== b[o]) {
      return false;
    }
  }
  return true;
}
```

### 复杂版本，更加细致

```js
export function isDeepEqual (a, b) {
  const
    hasMap = typeof Map === 'function',
    hasSet = typeof Set === 'function',
    hasArrayBuffer = typeof ArrayBuffer === 'function'

  if (a === b) {
    return true
  }

  if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
    if (a.constructor !== b.constructor) {
      return false
    }

    let length, i

    if (a.constructor === Array) {
      length = a.length

      if (length !== b.length) {
        return false
      }

      for (i = length; i-- !== 0;) {
        if (isDeepEqual(a[i], b[i]) !== true) {
          return false
        }
      }

      return true
    }

    if (hasMap === true && a.constructor === Map) {
      if (a.size !== b.size) {
        return false
      }

      i = a.entries().next()
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false
        }
        i = i.next()
      }

      i = a.entries().next()
      while (i.done !== true) {
        if (isDeepEqual(i.value[1], b.get(i.value[0])) !== true) {
          return false
        }
        i = i.next()
      }

      return true
    }

    if (hasSet === true && a.constructor === Set) {
      if (a.size !== b.size) {
        return false
      }

      i = a.entries().next()
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false
        }
        i = i.next()
      }

      return true
    }

    if (hasArrayBuffer === true && a.buffer != null && a.buffer.constructor === ArrayBuffer) {
      length = a.length

      if (length !== b.length) {
        return false
      }

      for (i = length; i-- !== 0;) {
        if (a[i] !== b[i]) {
          return false
        }
      }

      return true
    }

    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags
    }

    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf()
    }

    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString()
    }

    const keys = Object.keys(a)
    length = keys.length

    if (length !== Object.keys(b).length) {
      return false
    }

    for (i = length; i-- !== 0;) {
      const key = keys[i]
      if (isDeepEqual(a[key], b[key]) !== true) {
        return false
      }
    }

    return true
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b // eslint-disable-line no-self-compare
}
```