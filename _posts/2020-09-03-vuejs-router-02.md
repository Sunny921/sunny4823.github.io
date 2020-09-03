---
title: (Vue.js) 라우터 기초 (2) - 동적 라우트 매칭
author: Sunny
date: 2020-09-03 10:00:00 +0800
categories: [Vue.js]
tags: [vue.js, vue-router]
---

이전 포스팅: [Vue.js 라우터 기초 (1) ](https://sunny921.github.io/posts/vuejs-router-01/)

Vue 라우터 두번째 포스팅 입니다 ☺️ <br/>
이번엔 Vue 라우터의 path parameter, URL을 파라미터로 받는 동적 라우트 매칭에 대해 알아보도록 하겠습니다.  


동적 라우트 매칭
----------------
우리가 쇼핑몰 상품 페이지를 개발 한다고 생각 해봅시다. <br/> 
상품을 보여줄때 우리는 중복된 페이지를 만들 필요 없이 상품 번호만 받아 api 를 호출해
상품 정보를 렌더링하는 페이지를 개발할 수 있습니다.<br/>

```js
const routes = [
    { path: '/product/:productNo', component: Product}
]
```

위와 같이 라우터 경로로 `:productNo` 로 지정하면 URL이 `/product/P0001`, `/product/P0002` 와 같이 들어올 경우
Vue 라우터는 "P0001", "P0002"를 productNo에 매칭 시킵니다. <br/>
Product 컴포넌트 안에서 $**this.$route.params.productNo** 로 매칭된 값을 받아오게 되는 거죠 . <br/>

Path param은 여러개 매칭이 가능 합니다. <br/>

`/product/:productNo/type/:typeId` 라고 했을때 $route 객체의 params 는 아래와 같은 형태로 값을 받게 됩니다.
```json
{
  "productNo": "xx",
  "typeId": "xx"
}
```


예제
----------------
렌더링 페이지 컴포넌트는 `Home.vue`, `Product.vue` 로
상품 번호에 따라 다른 내용을 렌더링하는 페이지를 만들어 보도록 하겠습니다. 


```javascript
// main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './DynamicRouteApp.vue'
import Home from './components/route/Home'
import Product from './components/route/Product'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/product/:productNo', component: Product }
]
const router = new VueRouter({ mode: 'history', routes })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

```

```vue
// App.vue
<template>
  <div>
    <ul>
      <li v-for="(productNo, index) in products" :key="productNo">
        <router-link :to="`/product/${productNo}`">상품 {% raw %} {{ index + 1 }} {% endraw %} </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
      name: 'App',
      data() {
          return { products: [ 'P0001', 'P0002', 'P0003' ] } // 상품번호 배열
      }
  }
</script>
```

```vue
// route/Home.vue
<template>
  <div>
    <h1> 상품을 선택하세요 </h1>
  </div>
</template>
<script>
  export default {
      name: 'Home'
  }
</script>

```

```vue
// route/Product.vue
<template>
  <div>
    <h1> ProductNo: {% raw %}  {{ this.$route.params.productNo }} {% endraw %} </h1>
    <button @click="goHome()">메인으로</button>
  </div>
</template>
<script>
  export default {
      name : 'Product',
      methods : {
          goHome() {
              this.$router.push('/')
          }
      }
  }
</script>
```

실행결과
----------------
✨크롬에서 제공하는 Vue 플러그인을 사용하면 Vue 라우터의 매칭 파라미터와 라우트 히스토리를 쉽게 확인할 수 있습니다 

![router-basic-02](/assets/post/0903-router-basic-2.gif)
