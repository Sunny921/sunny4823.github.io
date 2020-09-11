---
title: (Vue.js) 라우터 - 지연된 로딩 (Component Lazy Loading) 
author: Sunny
date: 2020-09-11 10:00:00 +0800
categories: [Vue.js]
tags: [vue.js, vue-router, nextTick]
---

SPA (Single Page Application) 의 큰 특징은 페이지 진입 시 리소스를 한번에 다운 받아 자연스러운 페이지 전환을 시켜 준다는 것 입니다. <br/>
하지만 프로젝트의 규모가 커질수록 리소스 다운로드에 많은 시간이 소요되어 이는 SPA 의 장점 이자 단점 으로 작용 합니다. <br/>
SPA의 대표적인 프레임워크로 꼽히는 Angular, React, Vue 에서는 이와 같은 단점을 보완하기 위해 **지연된 로딩 (Lazy Loading)** 을 활용합니다.<br/><br/>

``지연된 로딩 (Lazy Loading)`` 이란 해당 기능이 필요한 타이밍에 로딩 하여 사용 하는 방법 입니다. <br/>
불필요하게 index 페이지에서 당장 사용 하지 않는 리소스 다운 시간을 단축시켜 줍니다 ☺️ <br/>

Vue Router - 컴포넌트 import
-----------------------------
아래 Vue 라우트 설정을 보도록 하겠습니다. <br/>
상단에서 Login, Home, About 컴포넌트를 모두 import 하고 있습니다. 그렇기 때문에 해당 경로에 진입하지 않더라도 모든 컴포넌트 리소스를 다운로드 받게 됩니다.
규모가 작은 프로젝트라면 이렇게 하더라도 큰 문제가 없겠지만 규모가 커질수록 이와 같은 코드는 성능적으로 문제가 생기게 됩니다. <br/>

```javascript
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home },
    { path: '/about', component: About }
  ]
})
```
<br/>
아래와 같이 컴포넌트 import 코드를 routes 내에서 하면 해당 경로로 들어왔을때 리소스를 다운 받게 됩니다. <br/>
라우트 설정에 컴포넌트를 반환하는 함수를 정의하면 매칭되는 경로로 들어왔을때 컴포넌트를 import와 함께 반환 하게 됩니다 <br/>

```javascript
const router = new VueRouter({
  routes: [
    { path: '/login', component: () => import('./components/Login.vue') },
    { path: '/home', component: () => import('./components/Home.vue') },
    { path: '/about', component: () => import('./components/About.vue') },
  ]
})
```

개발자 콘솔창을 열어서 확인해보면 경로가 매칭 될때마다 리소스를 다운 받는 것을 확인할 수 있습니다 🙂

![vue-router-lazy-load](/assets/post/0911-rourter-05.gif)
<p style="text-align: center; color: rgba(128,128,128,0.66); font-size: 14px;">[ 지연로딩 Vue 컴포넌트 리소스 다운로드 ]</p>
