---
title: (Vue.js) keep-alive, 동적 컴포넌트에 대하여
author: Sunny
date: 2020-08-31 15:00:00 +0800
categories: [Vue.js]
tags: [vue.js, keep-alive]
---

Vue 에서 동적으로 컴포넌트를 생성 하며 전환 효과를 주기 위해 `<component v-bind:is="컴포넌트명">` 을 사용할 수 있습니다.

컴포넌트 전환과 라이프 사이클
----------------
두 개의 컴포넌트 `Home.vue` 와 `About.vue` 를 만들어 App.vue 에서 두 컴포넌트의 전환 작업을 해보겠습니다. <br/>
두 컴포넌트는 모두 created 훅을 정의 하고 있습니다.

```vue
// About.vue
<template>
  <div>
    <h1>I'm About Component</h1>
  </div>
</template>
<script>
  export default {
      name: 'About',
      created() {
          console.log('About component')
      },
  }
</script>
```

```vue
// Home.vue
<template>
  <div>
    <h1>I'm Home Component : {{ count }}</h1>
    <button @click="addHomeCount()"> add home count </button>
  </div>
</template>
<script>
    export default {
        name: 'Home',
        created() {
            console.log('Home component')
        },
        data() {
            return { count : 0 }
        },
        methods: {
            addHomeCount: function () {
                this.count++
            }
        }
    }
</script>
```

```vue
// App.vue
<template>
  <div id="app">
    <a href="#" @click="changeComponent('Home')">Home;</a>
    <a href="#" @click="changeComponent('About')">About</a>
    <component v-bind:is="comp"></component> <!-- 선택한 컴포넌트 바인딩 -->
  </div>
</template>
<script>
  import Home from './components/keepAlive/Home'
  import About from './components/keepAlive/About'

  export default {
      data() {
          return { comp: 'Home' }
      },
      components: {
          Home,
          About,
      },
      methods: {
          changeComponent: function(componentName) {
              this.comp = componentName
          }
      }
  }
</script>
```

컴포넌트 전환 실행 결과
----------------
실행 결과 화면을 보면 상단의 Home, About 을 눌러 컴포넌트를 전환 하고 있습니다. <br/>
컴포넌트의 전환이 일어날 때마다 `created 훅`이 호출 되는게 보이나요? <br/>
created 훅이 호출 되는 것을 보고 전환이 일어날 때 마다 **vue 인스턴스의 소멸, 생성이 반복** 된다는 것을 알 수 있습니다. <br/>

![컴포넌트](/assets/post/0901-dynamic-component.gif)

***

상태유지 keep-alive 엘리먼트
----------------
컴포넌트의 전환 마다 페이지의 값이 초기화 되어야 한다면 문제가 없겠지만 만약 컴포넌트 안에서 값을 유지 해야 하거나 <br/>
성능상의 이유로 re-render를 피하고 싶다면 `<keep-alive>` 엘리먼트로 해결할 수 있습니다.
keep-alive 로 둘러싼 컴포넌트는 컴포넌트가 최초 생성되는 시점에 **캐시** 해 둡니다.
 
```vue
// keep-alive : App.vue
<template>
  <div id="app">
    <a href="#" @click="changeComponent('Home')">Home;</a>
    <a href="#" @click="changeComponent('About')">About</a>
    <keep-alive>
      <component v-bind:is="comp"></component> 
    </keep-alive>
  </div>
</template>
<script>
  import Home from './components/keepAlive/Home'
  import About from './components/keepAlive/About'

  export default {
      data() {
          return { comp: 'Home' }
      },
      components: {
          Home,
          About,
      },
      methods: {
          changeComponent: function(componentName) {
              this.comp = componentName
          }
      }
  }
</script>
```

***

keep-alive 전
----------------
keep-alive 엘리먼트 없이 전환이 일어나는 컴포넌트는 전환이 일어날 때 마다 생성과 소멸을 반복하므로 Home.vue 의 data 가 유지 되지 않습니다.
그렇기 때문에 count 를 증가 시키고 다른 컴포넌트에 다녀오면 count 가 다시 0부터 시작 됩니다.

![keep-alive 전](/assets/post/0901-dynamic-component-count.gif)

***

keep-alive 후
----------------
keep-alive 엘리먼트로 둘러 쌓인 컴포넌트는 최초 생성 시기에 (created) 캐시 되어 다른 컴포넌트에 다녀오더라도 
페이지의 새로고침이 발생 하기 전까지 data 의 상태가 유지 됩니다.

![keep-alive 전](/assets/post/0901-dynamic-component-keep.gif "keep-alive 후")
