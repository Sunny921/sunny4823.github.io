---
title: Javascript 원시 타입 vs 참조 타입 (Primitive vs Reference)
author: Sunny
date: 2020-08-20 10:00:00
categories: [Javascript]
tags: [Javascript 33 concepts, Primitive Type]
---

Javascript에서 제공하는 타입에는 `원시 타입 (Primitive type)`과 `참조 타입 (Reference type)`이 존재한다.<br/>
원시 타입의 변수는 값 자체를 보관 한다. 값 자체는 변할 수 없는 **불변의 성질**을 가진다.


Primitive Type
----------------

|원시 타입|설명|
|------|---|
|Number|숫자|
|String|문자|
|Boolean|true/false|
|Undefined|값을 할당하지 않음|
|Null|의도적으로 존재 하지 않음|
|Symbol|심볼 (es6 에서 추가)|


<br/>
아래 정의된 addNum1, addNum2 함수를 자세히 들여다보자. 둘의 차이점이 뭘까?<br/>

```javascript
let a = 10;
function addNum1(num) {
    a + num;
}
function addNum2(num) {
    a = a + num;
}
console.log(10); // output: 10
addNum1(a);

console.log(10); // output: 10
addNum2(a);     // output: 20
```
두 함수의 차이점은 바로 변수에 값을 재할당 하느냐 하지 않느냐의 차이이다. <br/>
원시타입 변수는 값 자체를 저장하는 변수이다. 원시 값 자체는 변할 수 없는 '불변'이기때문에 a변수에 무엇을 더해도 a 자체는 변하지 않는다.  <br/>
때문에 addNum1 함수에서 a에 무엇을 더해도 a는 그대로 숫자10을 유지한다. <br/>
a의 값을 바꾸기 위해선 addNum2 함수처럼 a변수에 값을 재할당 해야한다. <br/>



Reference Type
----------------

참조 타입의 변수는 값이 아닌 가리키는 값의 메모리 주소를 가리키며, 이를 "참조한다" 라고 표현한다. 아마 c언어 포인터를 공부한 사람이라면
 쉽게 이해할 수 있을거라고 생각한다.<br/>
참조 변수에 새로운 값 (메모리 주소) 을 할당하여 변수가 가리키는 메모리 주소를 변경할 수 있다.

|참조 타입|설명|
|------|---|
|Object|객체|
|Array|배열|
|Function|함수|


<br/>
아래 배열을 잠조하고있는 참조변수가 2개가 있다. 내용을 확인해보자 <br/>

```javascript
let obj1 = [1, 2, 3]; // obj1에 array 메모리 주소 할당
console.log(obj1[0]); // output: 1

let obj2 = [100, 200, 300]; // obj2에 array 메모리 주소 할당
console.log(obj2[0]); // output: 100

obj2 = obj1; // obj2에 obj1 메모리 주소 할당
console.log(obj2[0]); //output: 1

```

obj1 은 배열 [1, 2, 3] 의 메모리를 참조하고 있고, obj2 는 배열 [100, 200, 300]의 메모리를 참조하고 있다.
각 변수에 할당되어있는 값은 배열의 `메모리 주소`이기 때문에 `참조 변수`이다.

line 7번을 보면 obj2 에 obj1 을 대입하고있다. 이것은 **obj2에 obj1 의 메모리 주소를 대입** 하는 것으로
두 변수는 같은 메모리 주소를 참조하게 된다.
