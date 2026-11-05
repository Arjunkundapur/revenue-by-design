import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('../frontend/models.js', import.meta.url),'utf8');
const m=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const accounts=m.makeAccounts();assert.equal(accounts.length,200);assert.equal(new Set(accounts.map(a=>a.id)).size,200);
for(const mode of ['geography','industry','hybrid'])for(const ramp of [10,50,100]){
 const d=m.allocate(accounts,mode,ramp);
 assert.equal(d.assignments.length+d.unassigned.length,200);
 assert.equal(new Set(d.assignments.map(a=>a.id)).size,d.assignments.length);
 for(const rep of d.reps){assert.ok(rep.existing+rep.effort<=rep.capacity+1e-8);const rows=d.assignments.filter(a=>a.owner===rep.name);assert.ok(rows.every(a=>a.region===rep.region));if(mode==='industry')assert.ok(rows.every(a=>a.industry===rep.specialty));assert.equal(rows.reduce((n,a)=>n+a.potential,0),rep.potential);}
 console.log(mode,ramp,'assigned',d.assignments.length,'imbalance',d.cv.toFixed(3));
}
for(const clean of [false,true])for(const threshold of [20,65,95]){
 const d=m.evaluateLeads(m.makeLeads(),{clean,threshold,mature:true,weight:65});assert.ok(d.sample.every(a=>a.age>=60));if(clean)assert.equal(new Set(d.sample.map(a=>a.accountId)).size,d.sample.length);assert.ok(d.q<=d.totalQ);assert.ok(d.coverage>=0&&d.coverage<=1);assert.ok(d.precision>=0&&d.precision<=1);
}
const p=m.pipelineView(m.makeOpportunities());assert.equal(p.screened+p.exposure,p.total);assert.equal(p.clean.length+p.issues.length,48);
assert.ok(m.simulateSync('failure').some(e=>e.status==='bad'));assert.ok(!m.simulateSync('failure',true).some(e=>e.status==='bad'));assert.equal(m.simulateSync('duplicate').at(-1).name,'Deduplicate event');assert.equal(m.simulateSync('outoforder').at(-1).name,'Compare source version');
console.log('PASS: allocation constraints, coverage, reconciliation, and recovery invariants.');
