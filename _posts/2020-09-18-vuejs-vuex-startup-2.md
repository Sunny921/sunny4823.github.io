---
title: (Vue.js) Vuex 상태관리자 시작하기 (2) - mutations, mapMutations 헬퍼
author: Sunny
date: 2020-09-18 10:00:00 +0800
categories: [Vue.js]
tags: [vue.js, vuex]
---

Vuex 의 헬퍼 Mutation 에 대해 알아보겠습니다 ☺️ <br/>
`mutation` 을 직역하면 **변화** 이라는 의미인데요, 이 의미처럼 Vuex 에서 mutations 은 상태를 변이시키는 역할을 합니다. <br/>
getters 와 마찬가지로 Vuex 스토어 생성시에 정의할 수 있습니다 <br/><br/>


mutation 핸들러 함수는 첫번째 인자로 state 를 받아오고, 다음 인자로는 mutation 핸들러 이벤트를 호출할 때 넘긴 payload 인자를 받아 옵니다. <br/>
 
```javascript
new Vuex.store({
  state: {
    price: 9900,
  },
  mutations: {
    discount (state, payload) { // mutation type: discount
       state.price = state.price * (100 - payload.percent) / 100
    }
  }
})
```
이렇게 정의한 mutation 변이 함수는 자식 컴포넌트 안에서 `this.$store.commit('type')` 으로 호출할 수 있습니다.
우리는 discount 함수에 payload 받아오도록 구현 했기 때문에 콤마로 payload 인자를 넘길 수 있습니다. <br/><br/>


Mutations 커밋
---------------------

mutation commit은 두 가지 방법이 있는데요 type 과 payload 를 콤마로 구분하여 전달하는 방법과 <br/>
중괄호로 묶어 객체로 전달하는 방법이 있습니다. <br/>
```javascript
// 1. 콤마로 구분
this.$store.commit('discount' /* type */, { percent: 25 } /* payload */)
```

```javascript
// 2. 객체로 넘기기
this.$store.commit({
  type: 'discount',
  percent: 25
})
```

mapMutations 헬퍼
---------------------

mutation 또한 Vuex 에서 헬퍼를 제공합니다. <br/>
mapMutations 헬퍼를 사용하여 자식 컴포넌트에서 method 로 매핑할 수 있습니다.

```vue
import { mapMutations } from 'vuex'
<script>
export default {
  methods: {
    ...mapMutations([
       'discount'
    ])
  }
}
</script>
```

이렇게 되면 this.$store.commit 으로 접근하지 않고, `this.discount(/*payload*/)` 로 mutation 핸들링이 가능하게 됩니다 :) <br/>
다음 포스팅에서는 변이(Mutations)를 발생시키는 Vuex의 액션에 대해 알아보도록 하겠습니다! <br/>

