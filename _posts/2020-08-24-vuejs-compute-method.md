---
title: (Vue.js) Computed vs Methods 속성은 어떤 차이점을 가지고 있을까?
author: Sunny
date:   2020-08-27 20:00:00
categories: [Vue.js]
tags: [vue.js]
---

Vue 에서 함수를 구현하기 위한 속성으로 computed 와 methods 를 제공 한다. <br/>
그렇다면 어떤경우에 comptuted 를 사용해야하고 methods 를 사용해야할까? 둘의 차이점은 뭘까?

|속성|설명|
|------|---|
|computed|계산해야하는 목표 데이터를 정의하는 '선언형' 프로그래밍 방식. 저장된 결과(캐싱)를 반환하므로 종속 대상의 변경이 일어나기 전까지 호출되지 않는다.|
|methods|렌더링이 일어날때마다 항상 함수를 실행한다.|

Computed
----------------

먼서 computed 를 직역하면 `계산된` 이라는 의미를 가진다. <br/>
우리는 코드내의 복잡한 로직을 computed 속성 안에서 구현할 수 있다. 물론 템플릿안에 mustache 로도 구현할 수 있겠지만 가독성이 떨어지므로 추천하지 않는 방법이다. <br/>


computed의 가장큰 특징은 종속된 값에 의존하며, 반환하는 결과값을 **캐싱** 한다는 점이다. <br/>
여기서 종속된 값이란 우리가 data 속성에 정의한 반응형 데이터(reactive data) 를 가리킨다.

[예제 링크](https://github.com/Sunny921/vue-tutorial-1/blob/master/exam/computed-methods.html)

```vue
// 예제 링크 line: 20 참고
<script type="text/javascript">
let vm = new Vue({
    el: '#app',
    data: {
       message: 'Hello world'
    },
    computed: {
        reverse: function() {
            console.log('I am computed :: reverse')
            return this.message.split('').reverse().join('')
        },
        now: function() { // 아무곳에도 의존하지 않기때문에 절대로 업데이트 되지 않는다.
            console.log('I am computed :: now')
            return Date.now()
        }
    }
})

vm.message = '안녕 세계!' // message 를 업데이트하자 reverse 가 호출 된다.
</script>
```

위 예제에서 computed 속성 안에 reverse, now가 구현 되어 있다. <br/>
reverse 에 구현된 함수를 보면 message 라는 반응형 데이터 사용하여 값을 반환하고 있다. (message 값 에 의존한다) <br/>
now에 구현된 함수는 그냥 현재 시간을 반환하고 있다 (종속된 데이터가 없다)  <br/>

reverse는 리턴값을 캐싱하고 있어 `message` 값이 바뀔때만 업데이트 된다 (함수가 호출된다.).
now는 아무곳에도 의존하지 않기때문에 절대로 업데이트 되지 않는다.

Methods
----------------

Methods 속성은 우리가 일반적으로 함수를 정의할때 사용하는데, Computed 와 호출되는 조건이 다르다. <br/>
Methods는 종속된 값이란 개념없이 렌더링이 일어날 때마다 계속 호출될 것이다. <br/>
아래의 예제를 보자.. <br/>

```vue
<body>
    <div id="app">
      <input type="text" :value="fetchBanana()">
      <input type="text" :value="fetchApple()">
    </div>
</body>
<script type="text/javascript">
let vm = new Vue({
    el: '#app',
    data: {
       banana: '바나나',
       apple: '사과',
    },
    methods: {
        fetchBanana: function() {
            console.log('fetch banana')
            return `${this.banana} 가져왔어요!`
        },
        fetchApple: function() {
            console.log('fetch apple')
            return `${this.apple} 가져왔어요!`
        }
    }
})
vm.banana = '바나나 + 망고' // fetchBanana, fetchApple 모두 호출 되는것 확인!
</script>
```


![콘솔로그](/assets/post/0827-computed-methods.png)

`vm.banana = '바나나 + 망고'`로 banana 를 업데이트 했는데 콘솔 로그를 보니 fetchApple 까지 호출 된다. <br/>
이유는 바로 data의 변경으로 화면의 렌더링이 발생했고, 템플릿 안에서 fetchBanana(), fetchApple() 함수가 재호출 되었기 때문이다. <br/>
그럼 내가 템플릿안에서 10개의 함수 호출 구문을 넣었다면..? 그안에서 api 호출이나 무거운 로직을 넣었다면..? <br/>
바로 이런 차이가 성능 저하의 원인이 될 것이다.

이렇게 methods 는 값의 캐싱없이 화면 렌더링이 일어날 때마다 의도 하지 않는 함후 호출이 발생할 수 있다. <br/>
헤비한 로직이나 값의 캐싱하여 재사용이 필요한 부분은 적절히 Computed 속성으로 캐싱하는 것이 좋을 것 같다!
