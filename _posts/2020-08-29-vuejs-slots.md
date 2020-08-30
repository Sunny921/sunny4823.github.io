---
title: (Vue.js) 슬롯 (Slots) 은 어떻게 활용할 수 있을까
author: Sunny
date:   2020-08-29 08:00:00
categories: [Vue.js]
tags: [vue.js, slots]
---

Vue에서 슬롯은 (Slots)은 특정 컴포넌트에서 자신에게 등록된 자식 컴포넌트의 내용을 재정의 할 수 있는 디렉티브 입니다. <br/>
Slot 의 의미를 나무위키에서 검색 하면 아래와 같이 나옵니다. <br />
`무언가를 집어넣도록 만든 통로` 정도로 이해하면 되겠네요 :)

![Slot 나무위키](/assets/post/0830-slots-wiki.png){: width="350"}


Vue.js 2.6.0 버전 이전에는 `slot` 과 `slot-scope`속성으로 슬롯을 다뤘으나 이후 버전부터는 `v-slot 디렉티브`로 통합 문법을 사용합니다.

이름이 있는 슬롯 (Named Slots)
----------------
이름이 있는 슬롯은 전달하는 쪽(상위)에서 `v-slot:${name}` 으로, 받는 쪽(하위)에서 `<slot name=${name}>` 문법 으로 사용 합니다.
만약 이름을 따로 정의하지 않고 받는 쪽에서 `<slot>` 으로 쓴다면 **default** 값이 사용 됩니다.<br />

아래 예제는 App 에서 `ChildSlotComponent` 컴포넌트를 가져다 쓰며, 슬롯의 내용을 정의하고 있습니다.

```vue
// ChildSlotComponent.vue 특정 컴포넌트 로부터 정의 당하는(?) 자식 컴포넌트
<template>
  <div class="container">
    <header>
      <slot name="header"><h1>정의 된게 없으면 기본값 표출할래요 🐒</h1></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script>
  export default {
      name: 'ChildSlotComponent',
  }
</script>

```

```vue
// App.vue 자식 컴포넌트 내용을 정의하는 상위 컴포넌트 
<template>
  <div id="app">
    <child-slot-component>
      <template v-slot:header>
        <h1>여기에 Header의 내용을 넣을거에요 👶🏻</h1> <!-- 이곳을 주석 처리 하면? -->
      </template>
      <h3>이부분은 어디에 들어갈까요?</h3>
      <template v-slot:footer>
        <h1>Footer 를 정의합니다. 🦶🏻</h1>
      </template>
    </child-slot-component>
  </div>
</template>

<script>
import ChildSlotComponent from './components/slots/ChildSlotComponent.vue'

export default {
  name: 'App',
  components: {
    ChildSlotComponent
  }
}
</script>
```

렌더링 결과는 아래와 같이 나옵니다. 이름이 있는 슬롯 header와 footer 는 전달한 값이 렌더링 되었고,
이름이 없는 슬롯은 기본값이 렌더링 되었습니다. <br/>
이렇게 슬롯을 잘 이용하면 내용이 자주 바뀌는 레이아웃에서 **코드 재사용성**을 높일 수 있습니다.

![Named Slots 렌더링 결과](/assets/post/0830-slots-named-result.png){: width="550"}

App.vue 에서 header 안의 <h1> 을 주석 처리하면 ChildSlotComponent.vue 에서는 자신이 정의한 기본값을 렌더링 합니다.
아래 처럼요 :)

![Named Slots 렌더링 결과](/assets/post/0830-slots-named-result-default.png){: width="550"}



범위가 있는 슬롯 (Scoped Slots)
----------------
자식 컴포넌트에 정의 되어있는 데이터를 부모에서 접근 하고 싶을땐 어떻게 해야할까요? <br />
이럴 때 사용할 수 있는게 바로 `슬롯 속성 (slot props)` 입니다. 자식 컴포넌트에서 전달 하고 싶은 데이터를 **슬롯 요소에 속성**으로 연결 시키는 것입니다.
속성으로 연결 시킨 데이터는 부모 컴포넌트의 범위(scope)에서 사용할 수 있게 되는 것 입니다. <br/>

문법은 아래와 같습니다 <br/>
자식 컴포넌트 `<slot v-bind:${부모에게 전달할 이름}="전달할 데이터">` <br/>
부모 컴포넌트 `<v-slot:${name(없으면 default)}=${파라미터명}>` <br/>

아래 예제를 한번 볼까요?

```vue
// 자식 컴포넌트의 데이터 user 바인드
<template>
  <div>
    <slot name="myName" v-bind:user="user">
        <input :value="user.lastName">
    </slot>
  </div>
</template>
<script>
  export default {
      name: 'ScopeSlotComponent',
      data() {
          return {
              user: {
                  firstName: 'Sunny',
                  lastName: 'Kim'
              },
          }
      }
  }
</script>
```

```vue
// 자식 컴포넌트의 데이터를 slotProps 파라미터로 받아 온다.
<template>
  <div id="app">
    <scope-slot-component>
      <template v-slot:myName="slotProps"> <!-- slotProps: 자식에서 슬롯 요소에서 바인딩 시킨 user 데이터를 가지고 있음 -->
        <input :value="slotProps.user.lastName">
      </template>
    </scope-slot-component>
  </div>
</template>

<script>
import ScopeSlotComponent from './components/slots/ScopeSlotComponent.vue'
export default {
  name: 'App',
  components: {
    ScopeSlotComponent,
  }
}
</script>
```

예제에는 부모 컴포넌트에서 자식의 user 데이터를 slotProps 로 받아 오지만 이것은 파라미터명이기 때문에 당연히 다른 이름으로 변경할 수 있습니다 :) <br/>
다음 포스팅 에서는 공식 사이트에서도 잘 다루고 있는 `슬롯의 속성 구조분해`와 `가변 슬롯 이름`에 대해 작성해 보도록 하겠습니다.


참고 자료
----------------
[Vue.js 공식사이트 - Slots](https://kr.vuejs.org/v2/guide/components-slots.html?#%EC%8A%AC%EB%A1%AF%EC%97%90-%EB%93%A4%EC%96%B4%EA%B0%80%EB%8A%94-%EB%82%B4%EC%9A%A9-Slot-Content)
