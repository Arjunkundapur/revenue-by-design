// Deterministic, illustrative data. No model is trained and no live CRM is accessed.
export function rng(seed=42) { let n=seed>>>0; return () => { n=(1664525*n+1013904223)>>>0; return n/4294967296; }; }
export const regions=['North America','EMEA','APAC'];
export const industries=['Software','Services','Fintech'];
export function makeAccounts() {
 const r=rng(71), first=['Aster','Northstar','Cedar','Orbit','Meridian','Harbor','Atlas','Lumen','Cobalt','Juniper'], last=['Works','Labs','Systems','Partners','Cloud','Group','Digital','Solutions','Collective','Technologies'];
 return Array.from({length:200},(_,i)=> { const fit=35+Math.floor(r()*66), intent=Math.floor(r()*101), region=regions[Math.floor(r()*3)], industry=industries[Math.floor(r()*3)];return {id:`ACC-${String(i+1).padStart(3,'0')}`,name:`${first[i%10]} ${last[Math.floor(i/10)%10]} ${i>=100?'II':''}`.trim(),fit,intent,region,industry,potential:Math.round(.65*fit+.35*intent),effort:1+Math.floor(r()*4),confidence:r()>.17?'Standard':'Review'}; });
}
export function allocate(accounts,strategy='hybrid',ramp=50) {
 const names=['Alex','Jordan','Morgan','Casey','Taylor','Sam','New hire · NA','New hire · EMEA','New hire · APAC'];
 const reps=names.map((name,i)=>({name,region:regions[i<6?Math.floor(i/2):i-6],specialty:industries[i%3],capacity:i<6?75:75*ramp/100,existing:i<6?20+(i%3)*5:0,effort:0,potential:0,accounts:[],incoming:i>=6}));
 const assignments=[], unassigned=[];
 [...accounts].sort((a,b)=>b.potential-a.potential||a.id.localeCompare(b.id)).forEach(a=>{
 let eligible=reps.filter(rep=>rep.region===a.region && rep.existing+rep.effort+a.effort<=rep.capacity);
 if(strategy==='industry')eligible=eligible.filter(rep=>rep.specialty===a.industry);
 const cost=rep=>{ const load=(rep.existing+rep.effort)/Math.max(rep.capacity,1); return strategy==='geography'?load:strategy==='industry'?rep.potential/Math.max(rep.capacity-rep.existing,1):load+(rep.specialty===a.industry?-.12:0); };
 eligible.sort((a,b)=>cost(a)-cost(b)||a.name.localeCompare(b.name));
 if(!eligible.length){unassigned.push(a);return;}
 const rep=eligible[0];rep.effort+=a.effort;rep.potential+=a.potential;rep.accounts.push(a.id);
 assignments.push({...a,owner:rep.name,specialist:rep.specialty===a.industry,reason:`${a.region} coverage; ${rep.specialty===a.industry?'industry match; ':''}${a.effort} workload units fit available capacity. ${strategy==='hybrid'?'Hybrid weighs utilisation with a small specialty preference.':strategy==='industry'?'Strict industry eligibility; lowest potential per available capacity wins.':'Lowest current utilisation among eligible regional reps.'}`});
 });
 const ratios=reps.filter(x=>x.capacity>x.existing).map(x=>x.potential/(x.capacity-x.existing)), mean=ratios.reduce((a,b)=>a+b,0)/ratios.length;
 const cv=mean?Math.sqrt(ratios.reduce((a,b)=>a+(b-mean)**2,0)/ratios.length)/mean:0;
 return {reps,assignments,unassigned,cv,specialist:assignments.filter(a=>a.specialist).length};
}
export function makeLeads() {
 const r=rng(908), sources=['Paid search','Organic','Partner','Event'];
 const base=Array.from({length:360},(_,i)=> {const fit=20+Math.floor(r()*81), engagement=Math.floor(r()*101), age=15+Math.floor(r()*166), source=sources[Math.floor(r()*4)], prob=.04+.36*(fit/100)+.2*(engagement/100); const converted=r()<prob && age>=60;return {id:`LEAD-${String(i+1).padStart(3,'0')}`,accountId:`HIST-${String(i+1).padStart(3,'0')}`,name:`Historical account ${String(i+1).padStart(3,'0')}`,fit,engagement,age,source,rawSource:source==='Paid search'?(i%2?'Paid search':'paid_search'):source==='Organic'?(i%3?'Organic':'SEO'):source,converted,oldScore:Math.round(.3*fit+.7*engagement),missing:i%17===0,duplicate:false};});
 return [...base,...base.filter((_,i)=>i%20===0).map(x=>({...x,id:`${x.id}-DUP`,duplicate:true}))];
}
export function evaluateLeads(leads,{threshold=65,weight=65,source='All sources',clean=true,mature=true}={}) {
 let sample=leads.filter(x=>(source==='All sources'||(clean?x.source:x.rawSource)===source)&&(!mature||x.age>=60));
 if(clean){const seen=new Set();sample=sample.filter(x=>{if(seen.has(x.accountId))return false;seen.add(x.accountId);return true;});}
 const eligible=sample.filter(x=>!x.missing), selected=eligible.filter(x=>(x.fit*weight+x.engagement*(100-weight))/100>=threshold), totalQ=eligible.filter(x=>x.converted).length, q=selected.filter(x=>x.converted).length;
 const oldSelected=eligible.filter(x=>x.oldScore>=65);
 return {sample,eligible,selected,q,totalQ,oldSelected,review:sample.filter(x=>x.missing),precision:selected.length?q/selected.length:0,coverage:totalQ?q/totalQ:0};
}
export function makeOpportunities(){const r=rng(31);return Array.from({length:48},(_,i)=>({id:`OPP-${String(i+1).padStart(3,'0')}`,name:`Portfolio opportunity ${String(i+1).padStart(2,'0')}`,amount:(15+Math.floor(r()*130))*1000,stageMissing:i%11===0,dateSuspect:i%7===0,qualificationMissing:i%9===0,owner:['Alex','Jordan','Morgan','Casey','Taylor','Sam'][i%6]}));}
export function pipelineView(opps){const issues=opps.filter(x=>x.stageMissing||x.dateSuspect||x.qualificationMissing), clean=opps.filter(x=>!issues.includes(x)),sum=xs=>xs.reduce((a,b)=>a+b.amount,0);return {total:sum(opps),screened:sum(clean),exposure:sum(issues),issues,clean};}
export function simulateSync(mode='healthy',recover=false){
 const events=[{step:'01','name':'HubSpot score published',status:'ok',detail:'Person P-104 · score 78 · version 12 · event EVT-104-12.'}];
 if(mode==='identity')return [...events,{step:'02',name:'Resolve canonical identity',status:'bad',detail:'Two candidate CRM records. Quarantine for identity review; no CRM overwrite or automatic assignment.'},{step:'03',name:'Review queue',status:'warn',detail:'Marketing Ops owns resolution. High-intent requests receive the documented manual fallback.'}];
 events.push({step:'02',name:'Resolve canonical identity',status:'ok',detail:'P-104 → Salesforce contact C-104 → account A-024. Owner authority remains in Salesforce.'});
 if(mode==='outoforder')return [...events,{step:'03',name:'Compare source version',status:'warn',detail:'Destination already has version 13. Ignore version 12; retain newer score and existing assignment.'}];
 if(mode==='stale')return [...events,{step:'03',name:'Check score freshness',status:'warn',detail:'Source score is 72 hours old; demo freshness rule is 24 hours. Request refresh and use a time-bounded review queue.'},{step:'04',name:'Routing held for review',status:'warn',detail:'No stale-score automatic route. Sales Ops handles high-intent fallback; agree an SLA in production.'}];
 if(mode==='duplicate')return [...events,{step:'03',name:'Deduplicate event',status:'ok',detail:'EVT-104-12 was already applied. Acknowledge replay; write count 0, new assignment count 0.'}];
 if(mode==='failure'){
 events.push({step:'03',name:'Write score to Salesforce',status:recover?'ok':'bad',detail:recover?'Replay after recovery succeeds. Same event ID and version; score written once.':'CRM service unavailable. Retry with bounded backoff; preserve the original event ID.'});
 if(!recover)return [...events,{step:'04',name:'Failed-event queue',status:'warn',detail:'After the retry limit, alert the integration owner. Routing remains on hold; no partial assignment.'}];
 }
 else events.push({step:'03',name:'Write score to Salesforce',status:'ok',detail:'Write score + version + source timestamp atomically where supported. Read back and reconcile.'});
 return [...events,{step:'04',name:'Evaluate routing eligibility',status:'ok',detail:'Fresh score, valid identity, regional coverage, and one eligible owner. Apply one assignment.'},{step:'05',name:'Reconcile & acknowledge',status:'ok',detail:'Source and destination versions match. Event ledger records completion; repeat delivery is safe.'}];
}
