---
title: (Vue.js) Vuex 저장소 모듈로 분리하기 (modules)
author: Sunny
date: 2020-09-29 09:00:00 +0800
categories: [Vue.js]
tags: [vue.js, vuex, modules]
---

어플리케이션의 규모가 커질수록 저장소에 넣고 관리해야 할 상태가 많아지고 그 구조 또한 복잡해집니다. <br/>
쇼핑몰을 만든다고 가정 했을 때 `product` 이라는 이름의 상태는 중복된 의미를 가질 수 있습니다. <br/>

- 메인 리스트의 product
- 장바구니 리스트의 product
- 관심상품의 product

이 경우 저장소 내 트리형태 또는 네이밍으로 구분하여 상태 정의를 할 수 있겠지만 우리는 좀 더 가독성있고 관리를 편하게 하기위해 각 product 을 구분할 방법을 찾게 됩니다. <br/>
그 방법이 바로 Vuex 의 `모듈(modules)` 입니다. <br/>
저장소를 모듈로 분리하면 그 모듈은 별도의 <u>state, getters, mutations, action</u> 을 가지게 됩니다. <br/><br/>

지역 상태(state) 와 루트 상태(rootState)
-----------------------------

firstModules 이라는 모듈을 정의하고 Vuex 저장소에 `first` 로 매핑하였습니다. <br/>
이제부터 first 모듈 내 **state** 는 본인의 지역 상태이고, Vuex.store 최상단에 정의된 루트 상태는 **rootState** 로 접근할 수 있습니다. <br/>

```javascript
const firstModule = {
  state: {
    product : { name: '나는 지역 상품' }
  },
  getters: {
    getProduct(state) {
        // ✨첫번째 인자로 모듈의 지역 state 를 받는다
        return `${state.product.name} 입니다`
    },
    getRootProduct(state, getters, rootState) {
        // ✨첫번째 인자로 모듈의 지역 state 를 받는다
        // ✨두번째 인자로 모듈의 지역 getters 를 받는다
        // ✨세번째 인자로 루트의 상태 rootState 를 받는다
        return `${rootState.product.name} 입니다`
    }
  },
  mutations: (...),
  actions: (...),
}

const store = new Vuex.store({
  state: {
    product : { name: '나는 루트 상품' }
  },
  getters: (...),
  mutations: (...),
  actions: (...),
  modules: {
    first: firstModule,
  }
})
```

모듈에 별도 상태를 가지도록 state, getters, mutations, actions 를 정의해 보았습니다. <br/>
그렇다면 변이를 발생시키기 위해 모듈의 각 핸들러 함수에는 어떻게 접근할 수 있을까요? <br/><br/>

네임스페이스 옵션 (namespace)
-------------------------
먼저 모듈의 `네임스페이스(namespace)`의 개념을 간단하게 살펴보겠습니다 <br/>
우리가 모듈로 저장소를 분리하게되면 각 모듈은 기본으로 **전역 네임스페이스** 로 등록 되됩니다.<br/>
그렇기 때문에 각 모듈은 독립적으로 동작 하지 않고, B 모듈의 변이를 통해 A 모듈이 영향을 받을 수 있습니다. 우리는 독립적인 모듈 작성을 위해 모듈을 매핑할 때 `namespaced: true` 옵션을 줘서 네임스페이스를 지정할 수 있습니다. <br/>

```javascript
const store = new Vuex.store({
  state: {
    product : { name: '나는 루트 상품' }
  },
  getters: (...),
  mutations: (...),
  actions: (...),
  modules: {
    namespaced: true, // 네임스페이스 옵션 설정
    first: firstModule,
  }
})
```

네임스페이스 옵션을 줬을 때 저장소의 상태 구조가 어떻게 변하는지 다음 포스팅에서 좀 더 자세히 다뤄보도록 하겠습니다. 🙂
