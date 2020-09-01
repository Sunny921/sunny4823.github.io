---
title: (Vue.js) 필터 (filter) 를 사용해 문자열 형식화 하기
author: Sunny
date: 2020-09-01 10:00:00 +0800
categories: [Vue.js]
tags: [vue.js, filter]
---

Vue에서는 filter 를 사용해 문자열 형식화를 할 수 있습니다. <br/>
적용하는 방법은 두 가지입니다. 첫번째 방법으로는 vue 컴포넌트 옵션 사용하는 법이 있고, Vue 인스턴스를 생성하기 전에
전역으로 설정하는 방법이 있습니다. 


컴포넌트 옵션 필터 
----------------------------
컴포넌트 옵션으로 필터를 정의하기 위해 아래처럼 `filters` 옵션을 추가 하고 입력한 숫자를 원단위 콤마를 찍는 필터를 만들어보겠습니다.

```vue
<template>
   <div>
     <input type="number" v-model="num" placeholder="숫자를 입력하세요"/> <br/>
    {% raw %} {{ num | money }} {% endraw %}
   </div>
 </template>
 <script>
     export default {
         name: 'TextFilterTest',
         data() {
             return { num: 100 }
         },
         filters: {
             money: function (value) {
                 return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
             }
         }
     }
 </script>
```

filter 는 `mustache` 또는 `v-bind` 표현법으로 사용할 수 있습니다. <br />
렌더링하고 싶은 메시지 뒤에 파이프 (|) 을 추가한 후 필터명을 넣으면 됩니다. <br />

![keep-alive 전](/assets/post/0901-filter-02.gif )


전역 필터 
----------------------------
특정 컴포넌트가 아닌 모든 곳에서 사용할 수 있도록 전역 filter 를 만들 수 있습니다.<br/>
아래와 같이 Vue 인스턴슬르 만들기 전에 filter 를 정의하면 됩니다.

```js
Vue.filter('money', function (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

new Vue({})
```


필터 체이닝
----------------------------
필터는 여러개를 파이프 (|) 로 묶어 연결할 수 있습니다. (체이닝) 변환한 값을 반환하는 **함수** 이므로 
바로 앞에있는 필터가 적용된 문자열을 받습니다. <br/>
그렇기 때문에 아래와 같이 `money`, `won` 필터를 적용하면 단위당 콤마와 '원' 이 붙어 렌더링 됩니다.

```vue
Vue.filter('money', function (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
Vue.filter('won', function (value) {
    return `${value} 원`;
});

...
<template>
   <div>
     <input type="number" v-model="num" placeholder="숫자를 입력하세요"/> <br/>
    {% raw %} {{ num | money | won }} {% endraw %} // 필터 체이닝
   </div>
</template>
```
