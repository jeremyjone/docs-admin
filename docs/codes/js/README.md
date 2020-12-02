# 通用方法

一些通用函数。

## 拷贝

```js
function clone(data) {
  if (!isObject(data)) {
    return data;
  } else {
    var d = isArray(data) ? [] : {};
    for (var i in data) {
      d[i] = isObject(data[i]) ? clone(data[i]) : data[i];
    }
    return d;
  }
}

// 对 JSON 转换做了一些小处理，避免了转换出错，但仍然可能出现问题。
function clone(data) {
  const s = JSON.stringify(data);
  if (s) {
    return JSON.parse(s);
  }
}
```

## 无聊的等待方式

有时候，需要一些无聊的等待，比如等待某个 Element 挂载，所以就有了一个无聊的它。

```js
/**
 * 它是一个 Promise，使用 `await` 等待它，需要一个回调方法，它会定时检查传入的条件是否为真。10秒超时返回错误。
 * @param { () => boolean } cond
 * @example await boringWait(() => condition)
 */
const boringWait = cond => {
  return new Promise((resolve, reject) => {
    let timeout = 0;
    const t = setInterval(() => {
      timeout++;
      if (cond()) {
        clearInterval(t);
        resolve();
      }
      if (timeout > 100) {
        // 大于10秒，超时
        clearInterval(t);
        reject();
      }
    }, 100);
  });
};
```
