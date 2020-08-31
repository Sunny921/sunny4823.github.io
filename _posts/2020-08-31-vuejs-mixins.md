---
title: (Vue.js) 믹스인 (Mixins) 를 활용한 재사용 가능한 기능을 구현해보자
author: Sunny
date: 2020-08-31 10:00:00 +0800
categories: [Vue.js]
tags: [vue.js, mixins]
---

Vue 에서 믹스인 (mixins) 이란 `재사용`이 필요한 요소들을 모아 놓은 객체를 의미 합니다. <br/>
믹스인으로 공통 관심사를 분리 하여 정의 하고 필요로하는 컴포넌트에서 가져다 쓰는 것 이지요. <br/>

Mixin의 Hook 호출
-----------------------------
Vue 에서 Mixin 의 훅은 컴포넌트의 훅 이전에 호출 됩니다 <br/>
아래 예제를 확인해 볼까요? <br/>

```js
// mixins/myMixin.js
export const myMixin = {
    data() {
        return { name: 'myMixin' }
    },
    created() {
        console.log(`created hook : ${myMixin}`)
    },
}
```

```vue
// MyComponent.vue
<template>
  <div><span v-text="this.name"></span></div> <!-- myMixin 출력 -->
</template>
<script>
  import {myMixin} from "./mixins/myMixin";

  export default {
      mixins: [myMixin],
      created() {
          console.log(`created hook : MyComponent`)
      }
  }
</script>
```

myMixin 객체 에서 created 훅과 data 요소가 정의 되어 있고, MyComponent 에서 이 mixin 을 가져다 쓰고 있습니다. <br />
아래 콘솔 로그를 보겠습니다. <br/>

![콘솔로그](/assets/post/0831-mixins-console.png)

myMixin 의 **create 훅이 먼저 실행** 되고, 컴포넌트의 created 훅이 그 다음 으로 실행 됩니다. <br/>
MyComponent의 `<template>` 을 안에서 자신의 컴포넌트에 존재 하지 않는 data를 렌더링 하려 하지만 <br/>
myMixin에 해당 data 가 정의 되어 있기 때문에 오류 없이 **믹스인의 데이터**가 렌더링 됩니다.  <br/>

Mixin 은 컴포넌트 우선으로 병합 된다
-----------------------------

Mixin에 data 와 methods 가 정의되어있고, 같은 이름으로 컴포넌트에도 data, methods 되어있다면 중복되는 값은 어떻게 처리 될까요? <br/>
`methods`, `directive`, `components`, `data` 와 같이 객체 값을 요구 하는 속성은 컴포넌트에 있는 요소를 우선 으로 **병합** 합니다. <br/>

```js
export const myMixin = {
    data() {
        return { name: 'myMixin' }
    },
    methods: {
        sayHello: function() {
            console.log('I am mixin hello')
        }
    }
}
```

```vue
<template>
  <div>
    <span v-text="this.name"></span> <br/>
    <span v-text="this.firstName"></span> <br/>
    <span v-text="this.lastName"></span> <br/>
    <button @click="sayHello()">hello</button>
  </div>
</template>
<script>
    import {myMixin} from "./mixins/myMixin";

    export default {
        mixins: [myMixin],
        data() {
            return {
                firstName: 'Sunny',
                lastName: 'Kim',
            }
        },
        methods: {
            sayHello: function() {
                console.log('I am component hello')
            }
        }
    }
</script>
```

hello 버튼을 누르고 콘솔 로그를 확인해보면 Mixin의 sayHello 가 아닌 컴포넌트의 sayHello 가 호출 된게 확인 됩니다. <br/>
data 에서는 컴포넌트에 없는 data 는 Mixin의 것을, 가지고 있는 data 는 컴포넌트 것을 사용 합니다. <br/>
우리가 Mixin 을 잘 활용 한다면 중복 되는 코드를 줄여 재사용, 유지보수에 용이 하게 만들 수 있습니다 :)

![콘솔로그](/assets/post/0831-mixins-console2.png)
