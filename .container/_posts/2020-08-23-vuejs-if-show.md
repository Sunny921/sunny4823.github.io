---
title: (Vue.js) v-if 와 v-show 의 차이
author: Sunny
date:   2020-08-23 20:15:00
categories: [Vue.js]
tags: [vue.js, directive]
---

Vue.js는 화면 표출 조건을 설정할 수있는 `v-` 접두사 directive 를 지원한다.
조건부 렌더링 directive 는 `v-if`와 `v-show`로 둘은 모두 Boolean type true || false 로 렌더링 여부를
판단한다. 

v-if
-----------------
- v-if : 단일 조건에서 사용
- v-else : if 가 아닐 경우 else 표출
- v-if, v-else-if, v-else : 다중 조건에서 사용


```vuejs
<template>
    <div v-if="fruit === 'apple'">
        나는 사과
    </div>
    <div v-else-if="fruit === 'banana'">
        나는 바나나
    </div>
    <div v-else-if="fruit === 'grape'">
        나는 포도
    </div>
    <div v-else>
        Who am I?
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            fruit : 'banana'
        }
    }
}
</script>
```
위 예제에서 fruit 반응형 데이터에 'banana' 가 들어있으므로 두번째 div가 화면에 렌더링 된다.
나머지 사과, 포도, Who am I 의 DOM에 존재하지 않는다.
**v-if 디렉티브는 false 의 경우 DOM 이 생성되지 않는다.** 

v-show
-----------------

v-show 는 조건부 표출 디렉티브이지만 DOM에 관점에서는 완전히 다르다. <br />
v-show 는 v-if 와 마찬가지로 true 일 경우만 경우 사용자 인터페이스에 나타나고 false 일때 화면에서 보이지 않는다.<br />
하지만 여기서 v-if와 크게 다른 점은 바로 **값이 false 여도 엘리먼트가 DOM 에서 사라지지 않는 것** 이다.<br />
v-show는 값이 false 일 경우에 DOM을 삭제하지 않고 대상 엘리먼트의 style 속성을 이용해 display 값만 제어하여 화면에서 숨긴다.

```vuejs
<template>
    <div v-show="isShow">
        난 사라진척 할 수 있어. 하지만 여전히 존재하지 😎
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            isShow : false
        }
    }
}
</script>
```
