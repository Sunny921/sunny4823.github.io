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

### 이름이 있는 슬롯
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


### 참고 자료
[Vue.js 공식사이트 - Slots](https://kr.vuejs.org/v2/guide/components-slots.html?#%EC%8A%AC%EB%A1%AF%EC%97%90-%EB%93%A4%EC%96%B4%EA%B0%80%EB%8A%94-%EB%82%B4%EC%9A%A9-Slot-Content)
