---
title: (Vue.js) Vue nextTick 으로 DOM 업데이트 콜백 처리하기
author: Sunny
date: 2020-09-09 10:00:00 +0800
categories: [Vue.js]
tags: [vue.js, vue-router, nextTick]
---

Vue 는 DOM 업데이트를 **비동기**로 처리합니다.<br/>
우리는 Vue 의 반응형 데이터를 변경하여 컴퍼넌트를 재 렌더링 하지만 이것은 즉각 발생 하는 이벤트가 아닙니다. <br/>
데이터 변경 발생 시 이를 대기열에 넣고 이벤트 루프 tick 을 통해 큐의 플러쉬가 일어날 때 DOM 업데이트가 일어나는 것 입니다. <br/>

>자세한 내용은 [공식문서 - 비동기 갱신 큐](https://kr.vuejs.org/v2/guide/reactivity.html#%EB%B9%84%EB%8F%99%EA%B8%B0-%EA%B0%B1%EC%8B%A0-%ED%81%90https://kr.vuejs.org/v2/guide/reactivity.html#%EB%B9%84%EB%8F%99%EA%B8%B0-%EA%B0%B1%EC%8B%A0-%ED%81%90)를 참고하시기 바랍니다. <br/>
 
<br/><br/>
Vue 에서는 **데이터 중심**의 프로그래밍을 하는 것을 권장 하지만 개발을 하다 보면 의도치 않게 DOM을 직접 건드려야 하는 경우가 발생 합니다. <br/>
비동기로 처리되는 DOM 업데이트의 특성을 모르고 개발을 진행하면 낭패를 볼 수 있습니다 😅 <br/>

가장 흔하게 볼 수 있는 에러가 바로 dom을 찾을 수 없다는 `Cannot read property getElementsByTagName | getElementById of undefined` 같은 것이죠. <br/><br/>

$el 로 DOM 접근하기
---------------------
반응형 데이터로 colors 배열을 만들었습니다. 그리고 crated 라이프사이클 훅에서 2개의 color 데이터를 추가 하고 <br/>
각 color 이름에 맞는 스타일을 지정 해주는 코드를 개발하고 싶었습니다. <br/>

```vue
<template>
  <ul>
    <li :key="c" :id="`id-${c}`" v-for="c of colors">{% raw %}{{ c }}{% endraw %}</li>
  </ul>
</template>
<script>
export default {
  name: 'NextTickApp',
  data() {
    return { colors: [ 'pink', 'blue', 'green' ] }
  },
  created() {
    this.colors.push('skyblue')
    this.colors.push('red')

    const dom = this.$el.getElementsByTagName('li') // 오류 발생!
    for (let d of dom) {
      d.style.color = d.textContent
    }
  }
}
</script>
```

위 예제를 실행 하자 개발자 콘솔에서 오류가 확인 됩니다. 오류 발생 지점은 16라인의 $el 엘리먼트로 DOM 에 접근 하려는 부분이죠. <br/>
이는 당연한 결과 입니다. 일단 created 는 Dom Element가 생성 되기 전 호출 되는 라이프 사이클 훅 입니다. <br/>
그 안에서 $el 로 DOM 접근을 시도하였으니 undefined 오류가 발생게 되는 것 입니다. <br/>

![dom 오류 발생](/assets/post/0909-next-tick-01.png)

<br/>

$nextTick 콜백 처리
---------------------
Vue 에서는 `$nextTick` 으로 DOM 업데이트 처리 콜백을 받을 수 있습니다. <br/>
우리는 nextTick 콜백 함수 안에서 DOM 접근을 하여 Vue의 비동기 업데이트로 인한 오류를 방지할 수 있습니다 ☺️ <br/>

```vue
<template>
  <ul>
    <li :key="c" :id="`id-${c}`" v-for="c of colors"> {{ c }} </li>
  </ul>
</template>
<script>
export default {
  name: 'NextTickApp',
  data() {
    return { colors: [ 'pink', 'blue', 'green' ] }
  },
  created() {
    this.$nextTick(() => {
      console.log('---> NextTick callback')
      const dom = this.$el.getElementsByTagName('li')
      for (let d of dom) {
        d.style.color = d.textContent
     }
    })

    console.log('---> Before add colors')
    this.colors.push('skyblue')
    this.colors.push('red')
    console.log('---> After add colors')
  }
}
</script>
```

<br/>
✨ 콘솔 로그를 확인해 보면, DOM 이 모두 업데이트 되고 nextTick 콜백 함수가 호출되는 것을 확인할 수 있습니다.

![nextTick 처리](/assets/post/0909-next-tick-02.png)
