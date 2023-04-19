import{_ as a,c as l,o as t,U as r}from"./chunks/framework.900b830a.js";const b=JSON.parse('{"title":"游览器工作原理及 V8 引擎","description":"","frontmatter":{},"headers":[],"relativePath":"我的笔记/JavaScript/01-游览器工作原理及V8引擎.md","lastUpdated":null}'),i={name:"我的笔记/JavaScript/01-游览器工作原理及V8引擎.md"},e=r('<h1 id="游览器工作原理及-v8-引擎" tabindex="-1">游览器工作原理及 V8 引擎 <a class="header-anchor" href="#游览器工作原理及-v8-引擎" aria-label="Permalink to &quot;游览器工作原理及 V8 引擎&quot;">​</a></h1><h2 id="访问-url-的过程" tabindex="-1">访问 URL 的过程 <a class="header-anchor" href="#访问-url-的过程" aria-label="Permalink to &quot;访问 URL 的过程&quot;">​</a></h2><ul><li>域名解析</li><li>DNS 预解析获取对应的服务器 IP 地址</li><li>TCP 三次握手</li><li>HTTP 请求发送</li><li>HTTP 响应请求</li><li>游览器拿到响应资源后通过游览器内核开始渲染</li><li>TCP 四次挥手</li></ul><h2 id="游览器渲染过程" tabindex="-1">游览器渲染过程 <a class="header-anchor" href="#游览器渲染过程" aria-label="Permalink to &quot;游览器渲染过程&quot;">​</a></h2><p><strong>游览器引擎</strong>再拿到资源后会开始进行渲染，步骤如下：</p><ul><li>解析 html 生成 DOMTree （<strong>解析过程中遇到 script 标签怎么办</strong>）</li><li>解析 css 生成 CSSOMTree</li><li>将 DOMTree 和 CSSOMTree 组合产生 renderTree</li><li>renderTree 经过布局引擎计算对应的像素点</li><li>GPU 根据像素点绘制界面</li></ul><h3 id="解析过程中遇到-script-标签怎么办" tabindex="-1"><strong>解析过程中遇到 script 标签怎么办</strong> <a class="header-anchor" href="#解析过程中遇到-script-标签怎么办" aria-label="Permalink to &quot;**解析过程中遇到 script 标签怎么办**&quot;">​</a></h3><p>默认情况下，html 解析遇到 script 标签会被阻塞，只有下载并执行脚本后才能继续解析。</p><p>影响 script 的两个属性</p><ul><li>defer：不会阻塞 html 解析只下载脚本，当 html 解析后再执行脚本</li><li>async：html 解析的过程中下载脚本，下载完会执行可能会影响 html 解析</li></ul><h2 id="javascript-引擎" tabindex="-1">JavaScript 引擎 <a class="header-anchor" href="#javascript-引擎" aria-label="Permalink to &quot;JavaScript 引擎&quot;">​</a></h2><p>JavaScript 是一门高级语言，机器是不能直接识别的，需要通过 JavaScript 引擎转换为机器语言后让 CPU 执行。</p><h3 id="v8-引擎的原理" tabindex="-1">V8 引擎的原理 <a class="header-anchor" href="#v8-引擎的原理" aria-label="Permalink to &quot;V8 引擎的原理&quot;">​</a></h3><ul><li>通过 Parse 解析生成 AST 抽象语法树 <ul><li>游览器内核将源码交给 V8 引擎，Stream 获取到源码后进行编码转换</li><li><strong>词法分析</strong>：Scanner 进行词法分析，将代码分词，最终拆分为 tokens（数组）</li><li><strong>语法分析</strong>：分析每一个 tokens 的语法是否正确，经过两个步骤 <ul><li>Parser：直接将 tokens 转换为 AST 语法树</li><li>PreParser：预解析，在项目开始阶段对所有 JavaScript 代码进行解析会影响网页的运行效率，V8 引擎实现了将不必要的函数进行预解析，只解析暂时需要的内容，等到函数调用时就会对函数进行全量解析</li></ul></li><li>可以通过 <a href="https://astexplorer.net/" target="_blank" rel="noreferrer">AST 在线生成</a> 查看对应代码生成的语法树</li></ul></li><li>通过 Ignition 将 AST 转为字节码（因为操作系统不一致，所以不能直接转为机器码） <ul><li>将字节码转换为汇编指令，再由汇编指令转为机器指令，最终被 CPU 执行</li><li>字节码是多品台兼容的，只需要不同操作系统切换不同指令即可</li></ul></li></ul><blockquote><p>V8 引擎优化 如果每次都需要 字节码 —&gt; 汇编指令 —&gt; 机器指令的过程是很耗性能的，所以 V8 通过 TurboFan 库做出如下优化</p><ul><li>TurboFan 库的原理是通过 Ignition 在执行过程中收集信息（比如类型改变），将多次使用的函数标记为<strong>热点函数</strong>直接编译为机器指令，以后使用该函数时直接执行机器指令</li><li>但是此时函数的参数类型不能随意改变，改变就要重新进行编译指令，通过 Deopimization 转为字节码，再由字节码转为机器指令</li></ul></blockquote><p><a href="https://imgse.com/i/ppqkYSf" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/04/10/ppqkYSf.png" alt="V8引擎原理"></a></p><p><a href="https://imgse.com/i/ppqVWnS" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/04/10/ppqVWnS.png" alt="V8 官方解析过程"></a></p><h2 id="javascript-代码执行过程" tabindex="-1">JavaScript 代码执行过程 <a class="header-anchor" href="#javascript-代码执行过程" aria-label="Permalink to &quot;JavaScript 代码执行过程&quot;">​</a></h2><p>要想了解 JavaScript 的运行机制，首先需要掌握两个概念 <strong>执行上下文</strong> 和 <strong>执行栈</strong>。</p><h4 id="执行上下文-execution-context-简称-ec" tabindex="-1">执行上下文（Execution Context 简称 EC） <a class="header-anchor" href="#执行上下文-execution-context-简称-ec" aria-label="Permalink to &quot;执行上下文（Execution Context 简称 EC）&quot;">​</a></h4><p>JavaScript 是单线程的，代码执行需要一个全局执行环境（上下文），之后每调用一个函数会创建一个新的函数执行上下文。</p><ul><li><strong>全局执行上下文</strong>：有且只有一个，代码执行前创建</li><li><strong>函数执行上下文</strong>：执行一个函数前就会创建一个</li><li>eval：运行在 eval 中的代码</li></ul><blockquote><p>全局执行上下文和函数执行上下文的区别：</p><ol><li>全局执行上下文只有一个，函数执行上下文有多个。</li><li>函数执行上下文一般在函数执行后就会销毁，全局执行上下文只有页面关闭才会销毁。</li></ol></blockquote><h4 id="执行栈-context-stack-简称-cs" tabindex="-1">执行栈（Context Stack 简称 CS） <a class="header-anchor" href="#执行栈-context-stack-简称-cs" aria-label="Permalink to &quot;执行栈（Context Stack 简称 CS）&quot;">​</a></h4><p>用于存储执行上下文，遵循先入后出的原则。</p><h4 id="javascript-运行机制" tabindex="-1">JavaScript 运行机制 <a class="header-anchor" href="#javascript-运行机制" aria-label="Permalink to &quot;JavaScript 运行机制&quot;">​</a></h4><ul><li><strong>编译阶段</strong>，首先会创建一个<strong>全局词法环境 （Global Object 简称 GO）</strong><ul><li>此时全局作用域创建，可以全局访问</li><li>该环境包括 Date、Array 等内置类</li></ul></li><li><strong>执行代码</strong>，为了代码正常执行创建了一个全局执行上下文放入到执行栈中 <ul><li>执行上下文的创建： <ul><li>创建了<strong>词法环境</strong>： <ul><li>创建了环境记录器：存储 let 、const、函数声明等</li><li>创建了外部环境引用：全局执行上下文为 null 、函数执行上下文为词法作用域</li></ul></li><li>创建了<strong>变量环境</strong>： <ul><li>创建了环境记录器：存储 var 声明的变量及函数声明，函数执行上下文内会存在一个 arguments 对象存在（<strong>变量提升</strong>）</li><li>创建了外部环境引用：同上</li></ul></li><li>确认了 this 指向</li></ul></li><li>执行上下文的执行： <ul><li>对变量赋值/执行函数</li></ul></li></ul></li></ul><p><a href="https://imgse.com/i/ppva69H" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/04/13/ppva69H.png" alt="JavaScript 运行机制"></a></p><p><a href="https://imgse.com/i/ppvtl7D" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/04/13/ppvtl7D.png" alt="JavaScript执行详细过程"></a></p><h4 id="作用域" tabindex="-1">作用域 <a class="header-anchor" href="#作用域" aria-label="Permalink to &quot;作用域&quot;">​</a></h4><p>JavaScript 引擎负责整个程序的编译和运行，其中编译器负责语法分析和代码生成，作用域负责收集并维护声明的标识符号/变量组成的一系列查询，并拥有一套严格的规则确定当前执行代码所查询的条件。</p><h5 id="引擎进行变量查询时的类型" tabindex="-1">引擎进行变量查询时的类型 <a class="header-anchor" href="#引擎进行变量查询时的类型" aria-label="Permalink to &quot;引擎进行变量查询时的类型&quot;">​</a></h5><ul><li><strong>LHS查询</strong>：赋值操作的目的是谁</li><li><strong>RHS查询</strong>：谁是赋值操作的源头</li></ul><blockquote><p>变量赋值的操作可以分为两个动作</p><ol><li>执行前，编译器会在当前作用域中声明一个变量（如果之前没有声明过）默认 undefined</li><li>执行时，引擎会在作用域中查找，如果找到进行赋值否则抛出异常</li></ol></blockquote><h5 id="作用域嵌套及查找规则" tabindex="-1">作用域嵌套及查找规则 <a class="header-anchor" href="#作用域嵌套及查找规则" aria-label="Permalink to &quot;作用域嵌套及查找规则&quot;">​</a></h5><p>当一个块/函数在另一个块/函数中，就产生了作用域的嵌套。</p><p><strong>查找规则</strong></p><p>引擎从当前的作用域中开始查找变量，如果找不到就向上查找，直到全局作用域，找到即返回否则抛出异常。</p><h5 id="常见异常" tabindex="-1">常见异常 <a class="header-anchor" href="#常见异常" aria-label="Permalink to &quot;常见异常&quot;">​</a></h5><ol><li>如果 RHS 查询所属作用域找不到结果，引擎抛出 ReferenceError</li><li>非严格模式下使用 LHS 查询，如果全局作用域下也没有找到该变量那会在全局作用下新建一个该变量并返回给引擎，严格模式下会抛出 ReferenceError</li><li>ReferenceError 跟作用域查找有关，TypeError 代表了作用域中存在该变量，只是对结果的操作是不合理的</li></ol><h5 id="词法作用域和动态作用域" tabindex="-1">词法作用域和动态作用域 <a class="header-anchor" href="#词法作用域和动态作用域" aria-label="Permalink to &quot;词法作用域和动态作用域&quot;">​</a></h5><p><strong>词法作用域</strong></p><p>词法作用域是一套关于引擎如何查找变量的规则，它的创建过程在代码书写阶段</p><p><strong>词法作用域的过程</strong></p><ol><li>进行词法化，对源代码的字符进行检查，如果是有状态的会赋予单词语义</li><li>词法作用域是定义在词法阶段的作用域，即写代码时写在哪里就确定在哪里</li><li>作用域查找会在第一个匹配的标识符时停止</li><li>全局变量会自动变为全局对象的属性</li><li>无论函数在哪里调用如何调用，它的词法作用域由它声明时所在位置决定</li><li>词法作用域只查找一级标识符</li><li>编译的词法分析阶段基本能知道全部标识符在哪里以及如何声明，从而预判执行过程中如何进行查找</li></ol><p><strong>动态作用域</strong></p><p>动态作用域不关心函数是如何声明的，它只在乎从何处调用，它是在代码运行时确定的</p><h5 id="块级作用域" tabindex="-1">块级作用域 <a class="header-anchor" href="#块级作用域" aria-label="Permalink to &quot;块级作用域&quot;">​</a></h5><p>let / const / try…catch / with 产生的</p><h5 id="函数作用域" tabindex="-1">函数作用域 <a class="header-anchor" href="#函数作用域" aria-label="Permalink to &quot;函数作用域&quot;">​</a></h5><p>函数的全部变量及参数可以在这个函数范围内复用，函数创建时产生</p><h5 id="eval-和-with" tabindex="-1">eval 和 with <a class="header-anchor" href="#eval-和-with" aria-label="Permalink to &quot;eval 和 with&quot;">​</a></h5><ul><li><strong>eval</strong>： 可以对一段代码字符串进行演算，在此时可以修改已经存在的词法作用域</li><li><strong>with</strong>： 本质上是通过一个对象的引用作为作用域处理，将对象的属性作为作用域中的标识符，创建了一个新的词法作用域</li></ul><blockquote><p>这两个机制的副作用是引擎无法在编译时对作用域进行优化，使用其中任何方式都会导致代码运行速度变慢！！！</p></blockquote><h5 id="变量-函数提升" tabindex="-1">变量/函数提升 <a class="header-anchor" href="#变量-函数提升" aria-label="Permalink to &quot;变量/函数提升&quot;">​</a></h5><p>代码执行中，引擎会将变量的声明/函数的声明部分提升到代码开头，变量默认为 undefined ，函数声明的优先级高于变量声明，同一个变量只能被声明一次其余会被覆盖。</p><h5 id="作用域和执行上下文的区别" tabindex="-1">作用域和执行上下文的区别 <a class="header-anchor" href="#作用域和执行上下文的区别" aria-label="Permalink to &quot;作用域和执行上下文的区别&quot;">​</a></h5><ul><li>作用域是静态的一经创建就不会更改，执行上下文是动态的，函数执行上下文执行会就会销毁</li><li>作用域在代码编写阶段就创建了，比执行上下文要早</li></ul>',58),o=[e];function n(s,c,h,p,u,d){return t(),l("div",null,o)}const m=a(i,[["render",n]]);export{b as __pageData,m as default};
