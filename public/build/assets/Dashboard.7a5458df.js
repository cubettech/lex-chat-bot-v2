import{_ as T}from"./TheNavbar.f6af3bb4.js";import{t as S,j as u,b as E,o as c,d as m,a as i,k as n,e,F,l as N,n as y,g as h,m as R,w as D,f as L,v as q,p as A,u as K,q as P,s as p,h as U,c as Y,x as z,y as k}from"./app.ac899b95.js";import{A as x}from"./API.a18552d3.js";const H="/build/assets/portrait-successful-mid-adult-doctor-with-crossed-arms.532d5a16.jpg",I="/build/assets/young-asian-female-dentist-white-coat-posing-clinic-equipment.8d8593bb.jpg",G="/build/assets/doctor-s-hand-holding-stethoscope-closeup.c71bd5e4.jpg";const J=e("h2",{class:"chatbox-header"},"Chat Bot",-1),O={class:"container container-chatbox"},Q={class:"space-y-2"},W={class:"block"},X=["innerHTML"],Z={style:{flex:"auto"}},ee=["onSubmit"],se=e("label",{for:"chat",class:"sr-only"},"Your message",-1),ae={class:"flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700"},te=["onKeyup"],oe=e("button",{type:"submit",class:"inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"},[e("svg",{"aria-hidden":"true",class:"w-6 h-6 rotate-90",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"})]),e("span",{class:"sr-only"},"Send message")],-1),le={name:"ChatBox",props:{drawerView:Boolean},emits:["close"],setup(g,{emit:o}){const d=g,{drawerView:r}=S(d),f=()=>{o("close")},_=U,v=u([]),l=u(""),C=u(!1);E(()=>{console.log("chat started"),V()});const V=async()=>{try{const t=await x.post("/chat/init");console.group("init message"),console.log(t.data),console.groupEnd(),w(t.data.messages),l.value=""}catch(t){console.error(t)}},B=async t=>{try{const s=await x.post("/chat/send",{message:t});console.log(s.data),s.data.dialogState=="ReadyForFulfillment"&&(C.value=!0,setTimeout(()=>{_.push({name:"dashboard"})},1e3)),w(s.data.messages),l.value=""}catch(s){console.error(s)}},b=()=>{l.value.trim()&&(console.log("new message ref trim"),B(l.value.trim()))},w=t=>{t&&(console.group("fetch messages"),console.log(t),console.groupEnd(),t.forEach(s=>{v.value.push(s)}))};return(t,s)=>{const $=p("el-avatar"),M=p("el-row"),j=p("el-drawer");return c(),m("div",null,[i(j,{modelValue:K(r),"onUpdate:modelValue":s[1]||(s[1]=a=>P(r)?r.value=a:null),"before-close":f,class:"chat-drawer"},{header:n(()=>[i(M,{class:"demo-avatar demo-basic"},{default:n(()=>[i($,{class:"el-icon--left",src:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"}),J]),_:1})]),default:n(()=>[e("div",null,[e("div",O,[e("ul",Q,[(c(!0),m(F,null,N(v.value,a=>(c(),m("li",{key:a.id,class:y(a.sender_name==a.sender_id?"flex justify-start":"flex justify-end")},[e("div",{class:y(["relative w-100 px-4 py-2 text-gray-700 rounded shadow",a.sender_name!=a.sender_id?"bg-gray-100":""])},[e("span",W,[h(R(a.sender_name?a.sender_name:"You")+" : ",1),e("span",{innerHTML:a.message},null,8,X)])],2)],2))),128))])])])]),footer:n(()=>[e("div",Z,[e("form",{onSubmit:D(b,["prevent"])},[se,e("div",ae,[L(e("textarea",{id:"chat",rows:"1",class:"block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Your message...",required:"","onUpdate:modelValue":s[0]||(s[0]=a=>l.value=a),onKeyup:A(b,["enter"])},null,40,te),[[q,l.value]]),oe])],40,ee)])]),_:1},8,["modelValue"])])}}},re={class:"hero",id:"hero"},ne={class:"container"},ce={class:"row"},ie={class:"col-12"},de=k('<div id="myCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel"><div class="carousel-inner"><div class="carousel-item active"><img src="'+H+'" class="img-fluid" alt=""></div><div class="carousel-item"><img src="'+I+'" class="img-fluid" alt=""></div><div class="carousel-item"><img src="'+G+'" class="img-fluid" alt=""></div></div></div>',1),ue={class:"heroText d-flex flex-column justify-content-center"},me=k('<h1 class="mt-auto mb-2"> Better <div class="animated-info"><span class="animated-item">health</span><span class="animated-item">days</span><span class="animated-item">lives</span></div></h1><p class="mb-4">Medic Care is a Bootstrap 5 Template provided by TemplateMo website. Credits go to FreePik and RawPixel for images used in this template.</p>',2),pe={class:"heroLinks d-flex flex-wrap align-items-center"},_e=h("Chat with Us"),he=e("p",{class:"contact-phone mb-0"},[e("i",{class:"bi-phone"}),h(" 010-020-0340")],-1),be={name:"Dashboard",setup(g){const o=u(!1),d=()=>{o.value=!o.value};return(r,f)=>{const _=p("el-button");return c(),m("main",null,[i(T),e("section",re,[e("div",ne,[e("div",ce,[e("div",ie,[de,e("div",ue,[me,e("div",pe,[i(_,{class:"me-4",type:"primary",onClick:d,icon:r.Search},{default:n(()=>[_e]),_:1},8,["icon"]),he])])])])]),o.value?(c(),Y(le,{key:0,drawerView:o.value,onClose:d},null,8,["drawerView"])):z("",!0)])])}}};export{be as default};