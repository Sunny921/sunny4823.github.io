---
layout: post
title:  "Javascript 호출 스택 (call stack)"
date:   2020-08-18 10:00:00 +0530
categories: Javascript NodeJS
comments: true
---
Javascript 는 단일 쓰레드 (Single-Thread) 언어로 단일 호출 스택을 가진다.<br/>
콜 스택은 함수를 호출 하기 위한 정보를 담는 구조로 현재 동작하는 함수의 동작 정보, 호출 되어야하는 함수의 정보를 담고 있다.<br/>
스택이라는 이름에서도 알수 있듯이 콜 스택은 __선입선출(LIFO, Last In Last Out)__ 으로 동작한다.<br/>

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

가장먼저 first 함수가 호출되고 first내에서 second함수를, second 함수에서 third 함수를 호출하고 있다.<br/>
가장 먼저 호출된 first 가 가장 마지막에 스택에서 사라지며, 가장 나중에 호출된 third 가 스택에서 가장 먼저 사라지는 LIFO 를 확인할 수 있다.<br/><br/>
콜 스택을 시각화하여 표현하면 아래와 같이 나오게 된다. <br/>

```
                                 |third |
                     |second|    |second|    |second|
none -> |first | ->  |first | -> |first | -> |first | -> |first| -> none
```

#### 콜스택 확인해보기
콜스택을 확인해보기위해 Error 객체로 오류를 발생시켜보는 흔하디 흔한 예제이다.<br/>
크롬 브라우저 개발자 도구에서 디버그 포인트를 찍어서도 확인할 수 있다.<br/>
![오류발생 스택 트레이스](/assets/image/0818-callstack-01.png)


#### 스택 오버 플로우
만약 재귀를 잘못 구현하게 되어 무한루프가 돈다고 생각해보자. 과연 콜스택에 무슨일이 생길까?<br/>
짧은 시간에 pop 없이 스택에 함수 호출 정보 push 만 일어난다면, 무한정 스택에 정보를 쌓을 수 없기 때문에 브라우저는 "Maximum call stack size exceeded" 오류를 뱉어낸다.<br/>
직역하면 "최대 호출 스택 크기를 초과 했습니다" 이다.<br/>
팩토리얼 구현과 같은 알고리즘이나 적절한 상황에서의 재귀함수는 코드를 간결하게 만들어 줄 수 있지만 주의하지 않으면 위와 같은 불상사가 일어날 수 있으니 조심하도록 하자.<br/>


