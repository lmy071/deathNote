# 1.nextTick运行原理
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
