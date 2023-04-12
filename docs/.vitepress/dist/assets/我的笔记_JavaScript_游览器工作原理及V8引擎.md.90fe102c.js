import{_ as l,c as t,o as a,N as i}from"./chunks/framework.bbb173ed.js";const _=JSON.parse('{"title":"游览器工作原理及 V8 引擎","description":"","frontmatter":{},"headers":[],"relativePath":"我的笔记/JavaScript/游览器工作原理及V8引擎.md","lastUpdated":1681278164000}'),r={name:"我的笔记/JavaScript/游览器工作原理及V8引擎.md"},e=i('<h1 id="游览器工作原理及-v8-引擎" tabindex="-1">游览器工作原理及 V8 引擎 <a class="header-anchor" href="#游览器工作原理及-v8-引擎" aria-label="Permalink to &quot;游览器工作原理及 V8 引擎&quot;">​</a></h1><h2 id="访问-url-的过程" tabindex="-1">访问 URL 的过程 <a class="header-anchor" href="#访问-url-的过程" aria-label="Permalink to &quot;访问 URL 的过程&quot;">​</a></h2><ul><li>域名解析</li><li>DNS 预解析获取对应的服务器 IP 地址</li><li>TCP 三次握手</li><li>HTTP 请求发送</li><li>HTTP 响应请求</li><li>游览器拿到响应资源后通过游览器内核开始渲染</li><li>TCP 四次挥手</li></ul><h2 id="游览器渲染过程" tabindex="-1">游览器渲染过程 <a class="header-anchor" href="#游览器渲染过程" aria-label="Permalink to &quot;游览器渲染过程&quot;">​</a></h2><p><strong>游览器引擎</strong>再拿到资源后会开始进行渲染，步骤如下：</p><ul><li>解析 html 生成 DOMTree （<strong>解析过程中遇到 script 标签怎么办</strong>）</li><li>解析 css 生成 CSSOMTree</li><li>将 DOMTree 和 CSSOMTree 组合产生 renderTree</li><li>renderTree 经过布局引擎计算对应的像素点</li><li>GPU 根据像素点绘制界面</li></ul><h3 id="解析过程中遇到-script-标签怎么办" tabindex="-1"><strong>解析过程中遇到 script 标签怎么办</strong> <a class="header-anchor" href="#解析过程中遇到-script-标签怎么办" aria-label="Permalink to &quot;**解析过程中遇到 script 标签怎么办**&quot;">​</a></h3><p>默认情况下，html 解析遇到 script 标签会被阻塞，只有下载并执行脚本后才能继续解析。</p><p>影响 script 的两个属性</p><ul><li>defer：不会阻塞 html 解析只下载脚本，当 html 解析后再执行脚本</li><li>async：html 解析的过程中下载脚本，下载完会执行可能会影响 html 解析</li></ul><h2 id="javascript-引擎" tabindex="-1">JavaScript 引擎 <a class="header-anchor" href="#javascript-引擎" aria-label="Permalink to &quot;JavaScript 引擎&quot;">​</a></h2><p>JavaScript 是一门高级语言，机器是不能直接识别的，需要通过 JavaScript 引擎转换为机器语言后让 CPU 执行。</p><h3 id="v8-引擎的原理" tabindex="-1">V8 引擎的原理 <a class="header-anchor" href="#v8-引擎的原理" aria-label="Permalink to &quot;V8 引擎的原理&quot;">​</a></h3><ul><li>通过 Parse 解析生成 AST 抽象语法树 <ul><li>游览器内核将源码交给 V8 引擎，Stream 获取到源码后进行编码转换</li><li><strong>词法分析</strong>：Scanner 进行词法分析，将代码分词，最终拆分为 tokens（数组）</li><li><strong>语法分析</strong>：分析每一个 tokens 的语法是否正确，经过两个步骤 <ul><li>Parser：直接将 tokens 转换为 AST 语法树</li><li>PreParser：预解析，在项目开始阶段对所有 JavaScript 代码进行解析会影响网页的运行效率，V8 引擎实现了将不必要的函数进行预解析，只解析暂时需要的内容，等到函数调用时就会对函数进行全量解析</li></ul></li><li>可以通过 <a href="https://astexplorer.net/" target="_blank" rel="noreferrer">AST 在线生成</a> 查看对应代码生成的语法树</li></ul></li><li>通过 Ignition 将 AST 转为字节码（因为操作系统不一致，所以不能直接转为机器码） <ul><li>将字节码转换为汇编指令，再由汇编指令转为机器指令，最终被 CPU 执行</li><li>字节码是多品台兼容的，只需要不同操作系统切换不同指令即可</li></ul></li></ul><blockquote><p>V8 引擎优化 如果每次都需要 字节码 —&gt; 汇编指令 —&gt; 机器指令的过程是很耗性能的，所以 V8 通过 TurboFan 库做出如下优化</p><ul><li>TurboFan 库的原理是通过 Ignition 在执行过程中收集信息（比如类型改变），将多次使用的函数标记为<strong>热点函数</strong>直接编译为机器指令，以后使用该函数时直接执行机器指令</li><li>但是此时函数的参数类型不能随意改变，改变就要重新进行编译指令，通过 Deopimization 转为字节码，再由字节码转为机器指令</li></ul></blockquote><p><a href="https://imgse.com/i/ppqkYSf" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/04/10/ppqkYSf.png" alt="V8引擎原理"></a></p><p><a href="https://imgse.com/i/ppqVWnS" target="_blank" rel="noreferrer"><img src="https://s1.ax1x.com/2023/04/10/ppqVWnS.png" alt="V8 官方解析过程"></a></p><h2 id="javascript-代码执行过程" tabindex="-1">JavaScript 代码执行过程 <a class="header-anchor" href="#javascript-代码执行过程" aria-label="Permalink to &quot;JavaScript 代码执行过程&quot;">​</a></h2><p>要想了解 JavaScript 的运行机制，首先需要掌握两个概念 <strong>执行上下文</strong> 和 <strong>执行栈</strong>。</p><h4 id="执行上下文-execution-context-简称-ec" tabindex="-1">执行上下文（Execution Context 简称 EC） <a class="header-anchor" href="#执行上下文-execution-context-简称-ec" aria-label="Permalink to &quot;执行上下文（Execution Context 简称 EC）&quot;">​</a></h4><p>JavaScript 是单线程的，代码执行需要一个全局执行环境（上下文），之后每调用一个函数会创建一个新的函数执行上下文。</p><ul><li><strong>全局执行上下文</strong>：有且只有一个，代码执行前创建</li><li><strong>函数执行上下文</strong>：执行一个函数前就会创建一个</li><li>eval：运行在 eval 中的代码</li></ul><blockquote><p>全局执行上下文和函数执行上下文的区别：</p><ol><li>全局执行上下文只有一个，函数执行上下文有多个。</li><li>函数执行上下文一般在函数执行后就会销毁，全局执行上下文只有页面关闭才会销毁。</li></ol></blockquote><h4 id="执行栈-context-stack-简称-cs" tabindex="-1">执行栈（Context Stack 简称 CS） <a class="header-anchor" href="#执行栈-context-stack-简称-cs" aria-label="Permalink to &quot;执行栈（Context Stack 简称 CS）&quot;">​</a></h4><p>用于存储执行上下文，遵循先入后出的原则。</p><h4 id="javascript-运行机制" tabindex="-1">JavaScript 运行机制 <a class="header-anchor" href="#javascript-运行机制" aria-label="Permalink to &quot;JavaScript 运行机制&quot;">​</a></h4><ul><li><strong>编译阶段</strong>，首先会创建一个<strong>全局词法环境 （Global Object 简称 GO）</strong><ul><li>此时全局作用域创建，可以全局访问</li><li>该环境包括 Date、Array 等内置类</li></ul></li><li><strong>执行代码</strong>，为了代码正常执行创建了一个全局执行上下文放入到执行栈中 <ul><li>执行上下文的创建： <ul><li>创建了<strong>词法环境</strong>： <ul><li>创建了环境记录器：存储 let 、const、函数声明等</li><li>创建了外部环境引用：全局执行上下文为 null 、函数执行上下文为词法作用域</li></ul></li><li>创建了<strong>变量环境</strong>： <ul><li>创建了环境记录器：存储 var 声明的变量及函数声明，函数执行上下文内会存在一个 arguments 对象（存在<strong>变量提升</strong>）</li><li>创建了外部环境引用：同上</li></ul></li><li>确认了 this 指向</li></ul></li><li>执行上下文的执行： <ul><li>对变量赋值/执行函数</li></ul></li></ul></li></ul>',27),o=[e];function n(s,c,p,u,h,d){return a(),t("div",null,o)}const S=l(r,[["render",n]]);export{_ as __pageData,S as default};
