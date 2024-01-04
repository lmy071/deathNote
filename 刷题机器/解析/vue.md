# 1.nextTick运行原理
### 定义
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
### 总结
* 把回调函数放入callbacks等待执行
* 将执行函数放到微任务或者宏任务中
* 事件循环到了微任务或者宏任务，执行函数依次执行callbacks中的回调
# 2.vue生命周期
### 大致流程
在调用beforeCreate之前，数据初始化并未完成，像data、props这些属性无法访问到  
初始化顺序：props、methods、data  
到了created的时候，数据已经初始化完成，能够访问data、props这些属性，但这时候并未完成dom的挂载，因此无法访问到dom元素

挂载方法是调用vm.$mount方法，这时候才会挂载到真实的dom上  
### 完整流程图:
![](images\44114780-3aca-11eb-85f6-6fac77c0c9b3.png)
### 具体分析
beforeCreate -> created

初始化vue实例，进行数据观测
created

完成数据观测，属性与方法的运算，watch、event事件回调的配置
可调用methods中的方法，访问和修改data数据触发响应式渲染dom，可通过computed和watch完成数据计算
此时vm.$el 并没有被创建
created -> beforeMount

判断是否存在el选项，若不存在则停止编译，直到调用vm.$mount(el)才会继续编译
优先级：render > template > outerHTML
vm.el获取到的是挂载DOM的
beforeMount

在此阶段可获取到vm.el
此阶段vm.el虽已完成DOM初始化，但并未挂载在el选项上
beforeMount -> mounted

此阶段vm.el完成挂载，vm.$el生成的DOM替换了el选项所对应的DOM
mounted

vm.el已完成DOM的挂载与渲染，此刻打印vm.$el，发现之前的挂载点及内容已被替换成新的DOM
beforeUpdate

更新的数据必须是被渲染在模板上的（el、template、render之一）
此时view层还未更新
若在beforeUpdate中再次修改数据，不会再次触发更新方法
updated

完成view层的更新
若在updated中再次修改数据，会再次触发更新方法（beforeUpdate、updated）
beforeDestroy

实例被销毁前调用，此时实例属性与方法仍可访问
destroyed

完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
并不能清除DOM，仅仅销毁实例

# 10.数据请求在created和mouted的区别
created是在组件实例一旦创建完成的时候立刻调用，这时候页面dom节点并未生成；mounted是在页面dom节点渲染完毕之后就立刻执行的。触发时机上created是比mounted要更早的，两者的相同点：都能拿到实例对象的属性和方法。 讨论这个问题本质就是触发的时机，放在mounted中的请求有可能导致页面闪动（因为此时页面dom结构已经生成），但如果在页面加载前完成请求，则不会出现此情况。建议对页面内容的改动放在created生命周期当中
# 11.v-if和v-for放一起使用
### vue2
结论:v-for优先级比v-if高
````JavaScript
export function genElement (el: ASTElement, state: CodegenState): string {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre
  }
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    ...
}
````
### vue3
结论:v-if优先级比v-for高

# 12.为什么data属性是一个函数而不是一个对象？
根实例对象data可以是对象也可以是函数（根实例是单例），不会产生数据污染情况  
组件实例对象data必须为函数，目的是为了防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象

# 14.Vue组件之间的通信方式都有哪些？
### 组件间通信的分类可以分成以下
* 父子组件之间的通信
* 兄弟组件之间的通信
* 祖孙与后代组件之间的通信
* 非关系组件间之间的通信
### 关系图
![](images\85b92400-3aca-11eb-ab90-d9ae814b240d.png)
### 整理vue中8种常规的通信方案
* 通过 props 传递
* 通过 $emit 触发自定义事件
* 使用 ref
* EventBus
* $parent 或$root
* attrs 与 listeners
* Provide 与 Inject
* Vuex
#### EventBus
使用场景：兄弟组件传值
* 1.创建一个中央事件总线EventBus
* 2.兄弟组件通过$emit触发自定义事件，$emit第二个参数为传递的数值
* 3.另一个兄弟组件通过$on监听自定义事件
````JavaScript
// bus.js
// 创建一个中央时间总线类  
class Bus {  
  constructor() {  
    this.callbacks = {};   // 存放事件的名字  
  }  
  $on(name, fn) {  
    this.callbacks[name] = this.callbacks[name] || [];  
    this.callbacks[name].push(fn);  
  }  
  $emit(name, args) {  
    if (this.callbacks[name]) {  
      this.callbacks[name].forEach((cb) => cb(args));  
    }  
  }  
}  
  
// main.js  
Vue.prototype.$bus = new Bus() // 将$bus挂载到vue实例的原型上  
// 另一种方式  
Vue.prototype.$bus = new Vue() // Vue已经实现了Bus的功能  

this.$bus.$emit('foo')  // Children1.vue

this.$bus.$on('foo', this.handle)  //Children2.vue
````
#### vuex
适用场景: 复杂关系的组件数据传递

* Vuex作用相当于一个用来存储共享变量的容器  
* state用来存放共享变量的地方

* getter，可以增加一个getter派生状态，(相当于store中的计算属性），用来获得共享变量的值

* mutations用来存放修改state的方法。

* actions也是用来存放修改state的方法，不过action是在mutations的基础上进行。常用来做一些异步操作
![](images\fa207cd0-3aca-11eb-ab90-d9ae814b240d.png)

# 15.双向绑定
[双向绑定具体内容](https://vue3js.cn/interview/vue/bind.html#%E4%BA%8C%E3%80%81%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
* new Vue()首先执行初始化，对data执行响应化处理，这个过程发生Observe中
* 同时对模板执行编译，找到其中动态绑定的数据，从data中获取并初始化视图，这个过程发生在Compile中
* 同时定义⼀个更新函数和Watcher，将来对应数据变化时Watcher会调用更新函数
* 由于data的某个key在⼀个视图中可能出现多次，所以每个key都需要⼀个管家Dep来管理多个Watcher
* 将来data中数据⼀旦发生变化，会首先找到对应的Dep，通知所有Watcher执行更新函数
* 流程图如下:  
![](images\e5369850-3ac9-11eb-85f6-6fac77c0c9b3.png)  

# 16.对于slot的理解
### 默认插槽
子组件用\<slot>标签来确定渲染的位置，标签里面可以放DOM结构，当父组件使用的时候没有往插槽传入内容，标签内DOM结构就会显示在页面

父组件在使用的时候，直接在子组件的标签内写入内容即可
### 具名插槽
子组件用name属性来表示插槽的名字，不传为默认插槽
父组件中在使用时在默认插槽的基础上加上slot属性，值为子组件插槽name属性值
### 作用域插槽
子组件在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件v-slot接受的对象上
父组件中在使用时通过v-slot:（简写：#）获取子组件的信息，在内容中使用
### 原理
渲染插槽函数renderSlot（做了简化）
````JavaScript
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  // 得到渲染插槽内容的函数    
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  // 如果存在插槽渲染函数，则执行插槽渲染函数，生成nodes节点返回
  // 否则使用默认值
  nodes = scopedSlotFn(props) || fallback;
  return nodes;
}
````

# 17.vue中key的原理
举个例子：

创建一个实例，2秒后往items数组插入数据
````JavaScript
<body>
  <div id="demo">
    <p v-for="item in items" :key="item">{{item}}</p>
  </div>
  <script src="../../dist/vue.js"></script>
  <script>
    // 创建实例
    const app = new Vue({
      el: '#demo',
      data: { items: ['a', 'b', 'c', 'd', 'e'] },
      mounted () {
        setTimeout(() => { 
          this.items.splice(2, 0, 'f')  // 
       }, 2000);
     },
   });
  </script>
</body>
````
#### 在不使用key的情况，vue会进行这样的操作：  
![](images\c9da6790-3f41-11eb-85f6-6fac77c0c9b3.png)  
分析下整体流程：

* 比较A，A，相同类型的节点，进行patch，但数据相同，不发生dom操作
* 比较B，B，相同类型的节点，进行patch，但数据相同，不发生dom操作
* 比较C，F，相同类型的节点，进行patch，数据不同，发生dom操作
* 比较D，C，相同类型的节点，进行patch，数据不同，发生dom操作
* 比较E，D，相同类型的节点，进行patch，数据不同，发生dom操作
* 循环结束，将E插入到DOM中
* 一共发生了3次更新，1次插入操作

#### 在使用key的情况：vue会进行这样的操作：

* 比较A，A，相同类型的节点，进行patch，但数据相同，不发生dom操作
* 比较B，B，相同类型的节点，进行patch，但数据相同，不发生dom操作
* 比较C，F，不相同类型的节点
* 比较E、E，相同类型的节点，进行patch，但数据相同，不发生dom操作
* 比较D、D，相同类型的节点，进行patch，但数据相同，不发生dom操作
* 比较C、C，相同类型的节点，进行patch，但数据相同，不发生dom操作
* 循环结束，将F插入到C之前
* 一共发生了0次更新，1次插入操作

通过上面两个小例子，可见设置key能够大大减少对页面的DOM操作，提高了diff效率

#### 设置key值一定能提高diff效率吗？
其实不然，文档中也明确表示

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素

这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出

建议尽可能在使用 v-for 时提供 key，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升
### 原理

# 18.什么是虚拟DOM？如何实现一个虚拟DOM？
### 什么是虚拟DOM
在Javascript对象中，虚拟DOM 表现为一个 Object对象。并且最少包含标签名 (tag)、属性 (attrs) 和子元素对象 (children) 三个属性，不同框架对这三个属性的名命可能会有差别

创建虚拟DOM就是为了更好将虚拟的节点渲染到页面视图中，所以虚拟DOM对象的节点与真实DOM的属性一一照应

### 为什么需要虚拟DOM
你用传统的原生api或jQuery去操作DOM时，浏览器会从构建DOM树开始从头到尾执行一遍流程

当你在一次操作时，需要更新10个DOM节点，浏览器没这么智能，收到第一个更新DOM请求后，并不知道后续还有9次更新操作，因此会马上执行流程，最终执行10次流程

而通过VNode，同样更新10个DOM节点，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地的一个js对象中，最终将这个js对象一次性attach到DOM树上，避免大量的无谓计算

很多人认为虚拟 DOM 最大的优势是 diff 算法，减少 JavaScript 操作真实 DOM 的带来的性能消耗。虽然这一个虚拟 DOM 带来的一个优势，但并不是全部。虚拟 DOM 最大的优势在于抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的 DOM，可以是安卓和 IOS 的原生组件，可以是近期很火热的小程序，也可以是各种GUI

### 实现一个虚拟DOM
[原理](../../JavaScript\vue\vdom.ts)

# 19.Vue项目中你是如何解决跨域的?
## 什么是跨域
跨域本质是浏览器基于同源策略的一种安全手段

同源策略（Sameoriginpolicy），是一种约定，它是浏览器最核心也最基本的安全功能

所谓同源（即指在同一个域）具有以下三个相同点

* 协议相同（protocol）
* 主机相同（host）
* 端口相同（port）
反之非同源请求，也就是协议、端口、主机其中一项不相同的时候，这时候就会产生跨域

一定要注意跨域是浏览器的限制，你用抓包工具抓取接口数据，是可以看到接口已经把数据返回回来了，只是浏览器的限制，你获取不到数据。用postman请求接口能够请求到数据。这些再次印证了跨域是浏览器的限制。

## 二、如何解决
Proxy
代理（Proxy）也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。一些网关、路由器等网络设备具备网络代理功能。一般认为代理服务有利于保障网络终端的隐私或安全，防止攻击

#### 方案一

如果是通过vue-cli脚手架工具搭建项目，我们可以通过webpack为我们起一个本地服务器作为请求的代理对象

通过该服务器转发请求至目标服务器，得到结果再转发给前端，但是最终发布上线时如果web应用和接口服务器不在一起仍会跨域

在vue.config.js文件，新增以下代码
````JavaScript
amodule.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 8084,
        open: true,// vue项目启动时自动打开浏览器
        proxy: {
            '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
                target: "http://xxx.xxx.xx.xx:8080", //目标地址，一般是指后台服务器地址
                changeOrigin: true, //是否跨域
                pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                    '^/api': "" 
                }
            }
        }
    }
}
````
通过axios发送请求中，配置请求的根路径

axios.defaults.baseURL = '/api'
#### 方案二

此外，还可通过服务端实现代理请求转发

以express框架为例
````JavaScript
var express = require('express');
const proxy = require('http-proxy-middleware')
const app = express()
app.use(express.static(__dirname + '/'))
app.use('/api', proxy({ target: 'http://localhost:4000', changeOrigin: false
                      }));
module.exports = app
````
#### 方案三

通过配置nginx实现代理
````JavaScript
server {
    listen    80;
    # server_name www.josephxia.com;
    location / {
        root  /var/www/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass  http://127.0.0.1:3000;
        proxy_redirect   off;
        proxy_set_header  Host       $host;
        proxy_set_header  X-Real-IP     $remote_addr;
        proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
````
# 20.你了解axios的原理吗？有看过它的源码吗？
[axios源码](https://vue3js.cn/interview/vue/axiosCode.html#%E4%B8%80%E3%80%81axios%E7%9A%84%E4%BD%BF%E7%94%A8)