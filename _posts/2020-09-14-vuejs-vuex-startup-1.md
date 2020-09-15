---
title: (Vue.js) Vuex 상태관리자 시작하기 (1) - Vuex 컨셉, getters, mapGetters 헬퍼
author: Sunny
date: 2020-09-14 10:00:00 +0800
categories: [Vue.js]
tags: [vue.js, Vuex]
---

Vuex 는 상태를 저장하는 중앙 저장소 입니다. <br/>

우리는 상위 컴포넌트에서 하위 컴포넌트로 값을 전달할 때 `props` 를 사용 합니다. 하위 컴포넌트에서 상위 컴포넌트로
전달 할 때는 `이벤트 버스, $emit`을 사용 하여 전달 합니다. <br/><br/>

단순한 어플리케이션의 구조에서 props, $emit 을 사용하는데 문제가 없지만 어플리케이션의 규모가 커질 수록 컴포넌트 간 종속성, 트리가 복잡해지면
무분별한 props, $emit 의 사용으로 프로그램의 유지보수성을 떨어트리고 추적이 힘든 코드를 만들어 냅니다. <br/>
Vue 에서는 이와 같은 문제점을 해소기 위해 컴포넌트에서 접근 가능한 Vuex 저장소를 사용합니다. <br/>

>✨만약 컴포넌트의 값이 완벽하게 독립적이고, 어플리케이션 규모가 작다면 굳이 복잡하게 Vuex로 덩치를 키울 필요는 없습니다.

<br/>

Vuex 컨셉
-----------
Vuex 의 `저장소(store)`는 어플리케이션에서 하나만 존재할 수 있습니다.
Vuex 는 **동작(action)** 을 통해 중앙에서 공유된 **상태(state)** 를 관리하며 상태를 기반으로 **화면(View)** 를 업데이트 합니다. <br/>  
>✨state :Vuex 저장소의 반응형 데이터 객체<br/>
>state 의 업데이트가 발생하면 종속된 값을 사용하는 컴포넌트의 재렌더링이 일어난다.

Vuex를 시작하기 위해 main.js 에서 Vuex 저장소를 생성합니다. `new Vuex.store()` <br/>
```javascript
// 1. Vuex store 생성
const store = new Vuex.store({
  state: { 
    message: 'Hello Vuex' // 상태 정의
  }
})

// 2. Vue 인스턴스 생성 및 store 주입
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
```

위에서 Vue 인스턴스를 생성하며 Vuex store 를 주입 하였기 때문에, 자식 컴포넌트는 `$store` 로 저장소에 접근할 수 있습니다. <br/>
```vue
<template>
  <p> {% raw %}{{ message }}{% endraw %} </p>
</template>
<script>
export default {
  computed: {
    message: function() {
      return this.$store.state.message
    }
  }
}
</script>
```
자식 컴포넌트에서 `this.$store.state` 로 상태에 접근하여 값을 변경할 수 있지만 이렇게 직접적인 접근은 권장하지 않습니다. <br/>
우리는 Vuex 의 매커니즘 <u>getters, mutations, actions</u> 를 통해 state 를 관리해야 합니다. <br/>


<br/>

Getters (반환)
-----------
getters 는 의미 그대로 state 값을 **반환** 하는데 사용 합니다. <br/>
컴포넌트의 **계산된 속성 (computed)** 과 같은 매커니즘으로 동작하여 캐시된 값을 반환 하고, 종속된 값이 업데이트 되면 새롭게 계산한 값을 반환합니다. 🙂 <br/><br/>

Vuex store 를 생성할때 getters 를 정의할 수 있습니다. 첫번째 매개변수로 state 를 전달받습니다. <br/>
정의한 getters 함수는 컴포넌트에서 computed 에 매핑할 수 있습니다. <br/>
```javascript
// main.js
new Vuex.store({
  state: {
    shoppingList: [
      { id: 'ID-0001', itemName: '티셔츠', price: 13500 },
      { id: 'ID-0002', itemName: '청바지', price: 39900 },
      { id: 'ID-0003', itemName: '원피스', price: 73000 },
    ]
  },
  getters: {
    getFirstItem: state => {
      return state.shoppingList[0]
    }
  }
})
```

<br/>
Vuex 에서 제공하는 `mapGetters` 헬퍼를 사용하여 컴포넌트 computed 에 매핑합니다. <br/>
getters 에 정의한 이름을 그대로 사용할 수 도있고, 원하는 이름으로 매핑도 가능합니다. ☺️<br/>

```vue
// Vue component
<template>
  <div>
    <h1>장바구니 첫번째 아이템</h1>
    <p> {% raw %}상품명: {{ getFirstItem.itemName }}{% endraw %} </p>
    <p> {% raw %}가격: {{ getFirstItem.price }}{% endraw %} </p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex' // mapGetters 헬퍼
export default {
  computed: {
    ...mapGetters([ 
        'getFirstItem',
        // { myName: 'getFirstItem' }, <-- getFirstItem 를 myName 으로 매핑
    ]) 
  }
}
</script>
```

중앙에서 Vuex 의 계산된 속성 getters 를 정의하고, 컴포넌트에서 mapGetters 헬퍼를 통해 computed 로 값을 반환 받으면
값을 사용하는 자식 컴포넌트가 많을 수록 불필요한 중복 코드가 사라지고, 중앙에서 상태값 관리할 수 있어 유지보수에 좋은 코드가 나올 것 같습니다 ☺️ <br/><br/>

다음 포스팅에서는 상태를 변환시키는 `mutations` 에 대해 알아보도록 하겠습니다 !
