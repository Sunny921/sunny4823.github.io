---
title: Javascript 호출 스택 (call stack)
author: Sunny
date:   2020-08-18 10:00:00
categories: [Javascript]
tags: [Javascript's 33 concepts]
---
Javascript 는 단일 쓰레드 (Single-Thread) 프로그래밍 언어로 단일 호출 스택(call stack)을 가진다.<br/>
단일 스택을 가지고 있다는 것은 한번에 하나의 task 만 처리할 수 있다는 의미이다.<br/>
콜 스택은 함수를 호출 하기 위한 정보를 담는 구조이다.<br/>
스택이라는 이름에서도 알수 있듯이 콜 스택은 __후입선출(LIFO, Last In First Out)__ 으로 동작한다.<br/>

먼저 아래의 예제를 보자.<br/>
```javascript
function third() {
    console.log('hello 🙃')
   // throw new Error('error T.T') 
}

function second() {
  third();
}

function first() {
  second();
}

first()
```

가장먼저 first가 호출되고 first내에서 second 호출, second에서 third를 호출하고 있다.<br/>
가장 마지막에 호출된 third가 가장 먼저 콜스택에서 사라지며, 가장 먼저 호출된 first가 스택에서 마지막에 사라지는 LIFO 를 확인할 수 있다.<br/><br/>
콜 스택을 시각화하여 표현하면 아래와 같이 나오게 된다. <br/>

```
                                 |third |
                     |second|    |second|    |second|
none -> |first | ->  |first | -> |first | -> |first | -> |first| -> none
```

#### 콜스택 확인해보기
아래는 콜 스택을 확인해보기 위해 함수내에서 Error 객체로 오류를 발생 시켜보는 흔하디 흔한 예제이다.<br/>
third 함수내에서 Error 객체를 사용하여 오류를 발생시키자 순차적으로 third, second, first 함수의 호출 정보와 코드라인까지 확인이 가능하다.
![오류발생 스택 트레이스](/assets/post/0818-callstack-01.png)


#### 스택 오버플로우
만약 재귀를 잘못 구현하게 되어 무한루프가 돈다고 생각해보자. 과연 콜스택에 무슨일이 생길까?<br/>
스택에 pop 없이 호출 정보 push 만 일어난다면, 무한정 스택에 정보를 쌓을 수 없기 때문에 브라우저는 <br/>
`Maximum call stack size exceeded` 오류를 뱉어낸다.<br/>
직역하면 "최대 호출 스택 크기를 초과 했습니다"로 스택 오버플로우가 일어난 것이다. (콜 스택의 최대치는 브라우저마다 다르다)<br/>
재귀 함수는 팩토리얼 구현과 같은 알고리즘이나 적절한 상황에서 코드를 간결하게 만들어 줄 수 있지만 주의하지 않으면 스택 오버프로우와 같은 불상사가 일어날 수 있으니 조심하도록 하자.<br/>


