"use client";
import { useEffect } from "react";

const EVENTS = [
  ["Day 1", "Opening ceremony", "The festival begins. Placeholder text: add what happens and where."],
  ["Day 1", "Hackathon", "Placeholder: a build-and-ship contest. Add the theme, team size and prizes."],
  ["Day 2", "Robotics showdown", "Placeholder: add the rules, arena details and registration deadline."],
  ["Day 2", "Workshops", "Placeholder: add the topics, speakers and seat limits."],
  ["Day 3", "Cultural night", "Placeholder: add the performances, venue and start time."],
  ["Day 3", "Closing and awards", "Placeholder: add the results announcement and prize details."],
];

export default function Home() {
  useEffect(() => {
    let alive=true;const _l=[];
    const addL=(a,b,c)=>{window.addEventListener(a,b,c);_l.push([a,b,c])};
    const RAF=f=>{if(alive)requestAnimationFrame(f)};
    const LOGOS={aarohan:(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/logo.png'};
    const cv=document.getElementById('stage'),cx=cv.getContext('2d');
    const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W,H,dpr,S,CX,CY,mouse={x:-999,y:-999};
    const N=2800,P=[],T={};
    function size(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);
     const m=W<700;S=m?Math.min(W*.8,H*.4):Math.min(W*.46,H*.66);CX=m?W/2:W*.64;CY=m?H*.34:H*.46}
    function sample(img){const w=img.width,h=img.height,k=320/Math.max(w,h),cw=Math.round(w*k),ch=Math.round(h*k);
     const o=document.createElement('canvas');o.width=cw;o.height=ch;const c=o.getContext('2d');c.drawImage(img,0,0,cw,ch);
     const d=c.getImageData(0,0,cw,ch).data,pts=[];
     for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=(y*cw+x)*4;
      if(d[i+3]>80&&d[i]+d[i+1]+d[i+2]>110)pts.push([(x-cw/2)/320,(y-ch/2)/320,d[i],d[i+1],d[i+2]])}
     for(let i=pts.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[pts[i],pts[j]]=[pts[j],pts[i]]}
     return pts}
    let curKey='aarohan';
    function retarget(k){curKey=k;const pts=T[k];if(!pts||!pts.length)return;
     for(let i=0;i<N;i++){const p=P[i],t=pts[i%pts.length];p.t=t}}
    function frame(){cx.clearRect(0,0,W,H);
     const sp=reduce?.3:.07,fr=reduce?.6:.86;
     for(const p of P){const t=p.t;if(!t)continue;
      const tx=CX+t[0]*S*1.0+p.jx,ty=CY+t[1]*S*1.0+p.jy;
      let ax=(tx-p.x)*sp,ay=(ty-p.y)*sp;
      if(!reduce){const dx=p.x-mouse.x,dy=p.y-mouse.y,d2=dx*dx+dy*dy;
       if(d2<14000){const f=(1-d2/14000)*3;const d=Math.sqrt(d2)||1;ax+=dx/d*f;ay+=dy/d*f}}
      p.vx=(p.vx+ax)*fr;p.vy=(p.vy+ay)*fr;p.x+=p.vx;p.y+=p.vy;
      p.r+=(t[2]-p.r)*.08;p.g+=(t[3]-p.g)*.08;p.b+=(t[4]-p.b)*.08;
      cx.fillStyle='rgb('+(p.r|0)+','+(p.g|0)+','+(p.b|0)+')';cx.fillRect(p.x,p.y,1.8,1.8)}
     RAF(frame)}
    function load(k){return new Promise(r=>{const i=new Image();i.onload=()=>{T[k]=sample(i);r()};i.src=LOGOS[k]})}
    size();addL('resize',size);
    for(let i=0;i<N;i++){const a=Math.random()*6.283,r=Math.random()*Math.max(innerWidth,innerHeight);
     P.push({x:innerWidth/2+Math.cos(a)*r,y:innerHeight/2+Math.sin(a)*r,vx:0,vy:0,r:60,g:60,b:70,jx:(Math.random()-.5)*2,jy:(Math.random()-.5)*2,t:null})}
    addL('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});
    addL('pointerleave',()=>{mouse.x=mouse.y=-999});
    Promise.all(Object.keys(LOGOS).map(load)).then(()=>{retarget('aarohan');frame()});
    
    
    const sec=document.getElementById('events'),sc=document.getElementById('sc'),ring=document.getElementById('ring'),
    cards=[...ring.querySelectorAll('.card')],n=cards.length,step=360/n,hc=document.getElementById('helix'),hx=hc.getContext('2d'),ct=document.getElementById('ct');
    let R=500,cur=0,tgt=0;
    function layout(){const m=innerWidth<760,cw=m?Math.min(innerWidth*.74,320):Math.min(460,innerWidth*.36),ch=m?Math.min(innerHeight*.5,400):Math.min(innerHeight*.62,540);
     sc.style.setProperty('--cw',cw+'px');sc.style.setProperty('--ch',ch+'px');
     R=Math.round(cw/2/Math.tan(Math.PI/n)*1.3);
     cards.forEach((c,i)=>c.style.transform='rotateY('+i*step+'deg) translateZ('+R+'px)');
     hc.width=240*dpr;hc.height=sc.clientHeight*dpr;hc.style.width='240px';hc.style.height=sc.clientHeight+'px'}
    function prog(){const r=sec.getBoundingClientRect(),t=-r.top/(r.height-innerHeight);return Math.min(Math.max(t,0),1)*(n-1)}
    function goTo(i){i=Math.min(Math.max(i,0),n-1);const top=sec.getBoundingClientRect().top+scrollY;scrollTo({top:top+i/(n-1)*(sec.offsetHeight-innerHeight),behavior:reduce?'auto':'smooth'})}
    cards.forEach((c,i)=>c.addEventListener('click',()=>goTo(i)));
    document.getElementById('pv').onclick=()=>goTo(Math.round(tgt)-1);
    document.getElementById('nx').onclick=()=>goTo(Math.round(tgt)+1);
    function helix(t){const w=240,h=sc.clientHeight,R2=innerWidth<760?20:34;hx.setTransform(dpr,0,0,dpr,0,0);hx.clearRect(0,0,w,h);
     const spin=cur*step*Math.PI/180*1.5+(reduce?0:t*.0004);
     for(let y=0;y<=h;y+=2){const ph=y*.04-spin;
      for(let s=0;s<2;s++){const a=ph+s*Math.PI,x=w/2+R2*Math.sin(a),z=(Math.cos(a)+1)/2;
       hx.globalAlpha=.3+z*.7;hx.fillStyle=z>.55?'#e6e3e6':(z>.3?'#c4323a':'#6b2229');const sz=1.6+z*3;hx.fillRect(x-sz/2,y-sz/2,sz,sz)}
      if(y%24===0){hx.globalAlpha=.55;hx.strokeStyle='#8d2a31';hx.lineWidth=1.2;hx.beginPath();hx.moveTo(w/2+R2*Math.sin(ph),y);hx.lineTo(w/2-R2*Math.sin(ph),y);hx.stroke()}}
     hx.globalAlpha=1}
    function tick(t){const idx=prog(),sn=Math.round(idx);tgt=sn+(idx-sn)*.55;
     cur=reduce?tgt:cur+(tgt-cur)*.08;
     ring.style.transform='translateZ('+(-R)+'px) rotateY('+(-cur*step)+'deg)';
     hc.style.transform='translate(-50%,-50%) rotateY('+(cur*step)+'deg)';
     const a=Math.round(cur);cards.forEach((c,i)=>{const d=Math.abs(i-cur);c.style.opacity=Math.max(.3,1-d*.45);c.classList.toggle('on',i===a)});
     ct.textContent=(a+1)+' / '+n;helix(t);RAF(tick)}
    layout();addL('resize',layout);
    function fade(){cv.style.opacity=Math.max(0,1-scrollY/(innerHeight*.8))}
    addL('scroll',fade,{passive:true});fade();RAF(tick);
    return()=>{alive=false;_l.forEach(([a,b,c])=>window.removeEventListener(a,b,c))};
  }, []);

  return (
    <>
      <canvas id="stage" aria-hidden="true" />
      <main>
        <section className="hero">
          <h1>Aarohan</h1>
          <p>NIT Durgapur. Scroll to turn through the events.</p>
        </section>
        <section className="events" id="events">
          <div className="stage" id="sc">
            <div className="top">
              <h2>Events</h2>
              <div className="nav">
                <button id="pv" aria-label="Previous event">&lt;&lt;</button>
                <span id="ct">1 / 6</span>
                <button id="nx" aria-label="Next event">&gt;&gt;</button>
              </div>
            </div>
            <div className="ring" id="ring">
              <canvas id="helix" aria-hidden="true" />
              {EVENTS.map(([day, name, text]) => (
                <article className="card" key={name}>
                  <div>
                    <small>{day}</small>
                    <h3>{name}</h3>
                    <p>{text}</p>
                  </div>
                  <a href="#">Event details</a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <footer>Aarohan, NIT Durgapur</footer>
      </main>
    </>
  );
}
