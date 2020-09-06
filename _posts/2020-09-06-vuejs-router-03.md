---
title: (Vue.js) 라우터 기초 (3) - push, replace, go 사용법
author: Sunny
date: 2020-09-06 10:00:00 +0800
categories: [Vue.js]
tags: [vue.js, vue-router]
---

이전 포스팅: [Vue.js 라우터 기초 (2) ](https://sunny921.github.io/posts/vuejs-router-02/)

✨ 이번 포스팅에서는 Vue 라우터를 이용한 페이지 이동 방법에 대해 알아보도록 하겠습니다 <br/>
첫번째 포스팅에서 우리는 `<router-link>`를 통해 a 태그로 페이지 전환을 하였습니다. 이 방법 외에도 우리는 `$router` 객체를 통해 **프로그래밍 방식
페이지 전환** 을 할 수 있습니다. <br/>

아래 표는 router 객체에서 제공하는 네비게이션 메소드 입니다.

|메소드|설명|
|------|---|
|push |URL 이동. 히스토리 스택에 추가되므로 뒤로가기 버튼 동작시 이전 URL 로 이동|
|replace|URL 이동. 현재 URL 을 대체하기 때문에  히스토리 스택 쌓지 않음|
|go |숫자만큼 뒤로가기 또는 앞으로 가기 (음수:backward, 양수: forward)|

> 👉🏻 Vue.js 2.2.0 이후로 push, replace 에서 onComplete, onAbort 콜백 함수를 제공합니다. <br/>
> onComplete : 탐색 성공  <br/>
> onAbort: 중단(현재 탐색이 완료되기 전 동일한 경로로 이동하거나 다른 경로 이동)  <br/>


$router.push
-------------------
template 내에서 <route-link :to="path"> 를 통해 페이지 이동을 하면 이는 내부에서 $router.push 를 호출하는 것입니다. 
push 메소드를 사용하면 **히스토리 스택**에 추가 됩니다. 아래와 같은 순서로 페이지를 push 하면 스택에 `home > product ('P0001') > product ('P0002')`
순으로 쌓이게 되고, 뒤로가기 버튼을 눌렀을때 순차적으로 스택에 쌓였던 전 페이지가 보이게 됩니다. <br/>

```javascript
this.$router.push('home') // <router-link to="/home">홈</router-link>
this.$router.push({ name: 'product', params: {productId: 'P0001'} })
this.$router.push({ name: 'product', params: {productId: 'P0002'} })
```


$router.replace
-------------------
$router.replace 는 push 와 같이 URL 이동을 시키지만 히스토리 스택을 쌓지 않습니다. <br/>
단순히 현재 페이지를 전환하는 역할을 하기 때문입니다. <br/>

```javascript
this.$router.push('home')
this.$router.replace('about') // home 에서 about 으로 대체
```



$router.go
-------------------
$router.go 는 인자로 넘긴 숫자만큼 히스토리 스택에서 앞, 뒤 페이지로 이동하는 메소드 입니다. <br/>
음수일 경우 이전페이지, 양수일 경우 다음 페이지를 보여줍니다. 해당 숫자의 URL 이 스택에 없으면 라우팅에 실패하게 됩니다 <br/>

```javascript
this.$router.go(-1) // 한 단계 뒤로
this.$router.go(2) // 두 단계 앞으로
```
