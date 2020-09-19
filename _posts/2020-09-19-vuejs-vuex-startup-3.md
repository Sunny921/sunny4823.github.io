---
title: (Vue.js) Vuex 상태관리자 시작하기 (3) - actions, mapActions 헬퍼
author: Sunny
date: 2020-09-19 11:00:00 +0800
categories: [Vue.js]
tags: [vue.js, vuex]
---

Vuex 에서 Actions 는 상태 커밋을 지시하는 역할을 합니다. <br/>

|------|---|---|
|속성|설명|사용|
|------|---|
|**Getters**|Vuex 상태의 계산된 속성 조회|store.state|
|**Mutations**|Vuex 상태 변이|store.commit(..)|
|**Actions**|Vuex 상태 변이 지시|store.dispatch(..)|

Actions 를 사용하지 않더라도 직접 Mutation commit 을 통해 상태 변이를 일으킬 수 있습니다. <br/>
그럼 우리는 왜, 언제 Actions 를 사용해야 할까요? <br/><br/>
우리는 어플리케이션을 개발할때 서버로부터 데이터를 받아와 화면에 표출하거나 커스텀하는 기능을 구현 합니다. 이 경우 당연히 비동기 코드가 들어가게 되죠 <br/>
> setTimeout, Promise, Api 호출 (ajax, axios ...) 등 모두 비동기 코드 입니다

Actions 는 바로 이런 **비동기** 동작을 수행하기 위해 사용합니다. <br/>
Vuex 의 핵심 컨셉을 보면 <u>변이는 무조건 동기적이어야 한다</u> 라고 나와 있습니다. 이 말은 즉 Mutations 핸들러 함수 내에서 api 호출과 같은 비동기 동작을
사용해선 안된다는 의미이죠 <br/>  

우리는 Vue 에서 공식적으로 제공하는 dev-tools 를 통해 Vuex 상태 변이의 스냅샷을 확인할 수 있습니다.<br/>
그런데 Mutations 핸들러 안에서 언제 상태가 commit 될지 모르는 비동기적 코드가 들어가 된다면 ? <br/> 디버깅이 힘들어지게 되겠죠. 그렇기 때문에 변이는 항상 **동기적** 이어야 합니다. <br/><br/>

이런 비동기 동작에 대한 갈증을 해소하기 위해 Actions 를 사용할 수 있습니다 <br/>
컴포넌트에서 Actions 를 `dispatch(발행)` 하고, Actions 안에서 api 호출과 같은 비동기 작업 수행 및 `commit` 합니다. <br/>

Actions dispatch (발행)
----------------------

```javascript
new Vuex.store({
    state: {
      currentProduct: null
    },
    mutations: {
      setCurrentProduct(state, product) {
        state.currentProduct = product // 3. 상태 업데이트 
      }
    },
    actions: {
      async fetchProduct(context, productNo) { // 1. 상품조회 api 호출
        const product = await axios.get('/api/product', { params: { productNo } }) 
        context.commit('setCurrentProduct', product) // 2. 상품 설정 commit 
      }
    }
  }
)
```

```vue
<template>
  <div>
    <p>상품명: {% raw %}{{ currentProduct.name }}{% endraw %}</p>
    <p>가격: {% raw %}{{ currentProduct.price }}{% endraw %}</p>
    <p>할인율: {% raw %}{{ currentProduct.discount }}%{% endraw %}</p>
    <button @click="getCurrentProduct()">상품조회</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: function () {
    return {
      productNo: 1000,
    }
  },
  computed: {
    ...mapGetters(['currentProduct'])
  }, 
  methods: {
    getCurrentProduct() {
      if (confirm(`${this.productNo}번 상품을 조회하겠습니까?`)) {
        //🍀 Dispatch(발행) 은 아래와 같은 2가지 타입으로 가능합니다 :)
        this.$store.dispath('fetchProduct', {productNo: this.productNo}) // 방법1) 콤마로 구분하여 전달
        // this.$store.dispath({ type: 'fetchProduct', productNo: this.productNo}) 방법2) 객체로 전달
      }
    }
  }
}
</script>
```


mapActions 헬퍼
----------------------
Actions 도 마찬가지로 Vuex 에서 헬퍼를 제공하기 때문에 컴포넌트 methods 에 매핑하여 좀 더 간단하게 사용할 수 있습니다 😊<br/>

```vue
<template>
  <div>
    <p>상품명: {% raw %}{{ currentProduct.name }}{% endraw %}</p>
    <p>가격: {% raw %}{{ currentProduct.price }}{% endraw %}</p>
    <p>할인율: {% raw %}{{ currentProduct.discount }}%{% endraw %}</p>
    <button @click="getCurrentProduct()">상품조회</button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: function () {
    return {
      productNo: 1000,
    }
  },
  computed: {
    ...mapGetters(['currentProduct'])
  }, 
  methods: {
    ...mapActions(['fetchProduct']), 
    getCurrentProduct() {
      if (confirm(`${this.productNo}번 상품을 조회하겠습니까?`)) {
        this.fetchProduct(productNo)
      }
    }
  }
}
</script>
```
