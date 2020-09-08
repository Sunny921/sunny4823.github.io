---
title: (Vue.js) 라우터 기초 (4) - 라우터 컴포넌트에서 props 속성 사용하기
author: Sunny
date: 2020-09-08 10:00:00 +0800
categories: [Vue.js]
tags: [vue.js, vue-router]
---

이전 포스팅: [Vue.js 라우터 기초 (3) ](https://sunny921.github.io/posts/vuejs-router-03/)

✨ 라우터 컴포넌트에서 props 를 사용하기 위한 방법에 대해 알아보겠습니다 🙂 <br/>
라우터 컴포넌트에 값을 전달하기 위한 방법으로 path params 을 사용하는 방법이 있습니다. `/user/:userId` 로 경로를 설정하면
컴포넌트 내에서 `$route.params.userId` 로 매칭되어 접근이 가능하죠.

VueRouter 에서 속성(props)에 대한 옵션을 지원합니다. <u>Boolean, Object, Function </u> 3가지 모드로 설정할 수 있습니다.

Boolean 모드
------------------------
props 속성에 true 값을 넘기면 route params 값을 컴포넌트 props 로 받아올 수 있습니다. 
>$route.params.goodsId -> this.goodsId <br/>

```javascript
const routes = [
  { 
    path: '/product/:goodsId', 
    component: ProductComponent, 
    props: true // Boolean mode 속성 설정
  } 
]
```

```vue
<template>
  <p> 상품번호 : {% raw %}{{ goodsId }}{% endraw %} </p>
</template>
<script>
export default {
    name: 'ProductComponent',
    props: [ 'goodsId' ],
}
</script>
```

 
Object 모드
------------------------
라우터 설정에서 props 가 객체로 설정되어있으면 그 형태 그대로 컴포넌트 props 로 전달됩니다.

```javascript
const routes = [
  {
    path: '/product/:goodsId', 
    component: ProductComponent, 
    props: { name: 'Shirts!', amount: 10000 } // Object mode 속성 설정
  } 
]
```

```vue
<template>
  <p> 상품이름 : {% raw %}{{ name }}{% endraw %} </p>
  <p> 가격 : {% raw %}{{ amount }}{% endraw %} </p>
</template>
<script>
export default {
    name: 'ProductComponent',
    props: [ 'name', 'amount' ],
}
</script>
```
 
Function 모드
------------------------
props 를 반환하는 함수를 설정할 수 있습니다.


```javascript
const routes = [
  {
    path: '/product/:goodsId', 
    component: ProductComponent, 
    props: () => {
        return { dynamicContent: new Date() }
    }
  } 
]
```

```vue
<template>
  <p> date : {% raw %}{{ dynamicContent }}{% endraw %} </p>
</template>
<script>
export default {
    name: 'ProductComponent',
    props: [ 'dynamicContent' ],
}
</script>
```


라우트의 props 를 잘 활용하면 외부에서 동적인 값을 계산하여 전달할 수 있으므로 재사용 가능한 컴포넌트를 만드는데 유리할 것 같습니다 ☺️ <br/>
단 props 는 **라우트 될 때마다 값이 변경** 되기 때문에 상태와 같은 성격의 데이터는 다루지 않는것이 좋겠습니다. <br/>
