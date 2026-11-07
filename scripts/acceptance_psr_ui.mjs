import assert from 'node:assert/strict';
import { chromium } from 'playwright';

/** Browser-level acceptance on the built Vite application (no remote AI needed).
 * Tests the real ChatView input/output and clickable original-source citations.
 */
const root = process.env.PSR_TEST_URL || 'http://127.0.0.1:4173/PSR-AI-Assistant---NG/';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1366,height:900}});
const cases = [
  {question:'What does Chapter 3 of the PSR 2021 cover?', include:['Prescribed Examination for Confirmation']},
  {question:'What is PSR 2021 Rule 030104?', include:['030104'], links:['page-52.png']},
  {question:'Explain Rule 030109 exemption', include:['030109'], links:['page-52.png']},
  {question:'What does Rule 030601 say about examiner fees?', include:['030601'], links:['page-54.png']},
  {question:'Chapter 3 PDF page 54', include:['030401'], links:['page-54.png']},
  {question:'What does Rule 030999 say in Chapter 3?', include:['not found']},
  {question:'What is Chapter 5 about?', include:['Performance Management System']},
  {question:'Under Rule 050101, what are probation reports?', include:['050101'], links:['page-59.png']},
  {question:'Explain PSR Rule 050703 on records', include:['050703'], links:['page-65.png']},
  {question:'Chapter 5 PDF page 65', include:['050703'], links:['page-65.png']},
  {question:'What does Rule 050999 say?', include:['not located']},
  {question:'What does Chapter 10 contain?', include:['Discipline','eight sections']},
  {question:'List all serious misconduct under Rule 100402', include:['(aa)','(ab)','(ac)','(ad)','(ae)'], links:['page-84.png','page-85.png']},
  {question:'What does Rule 100404 say about interdiction?', include:['100404'],links:['page-85.png']},
  {question:'What does Rule 100406 say about suspension?', include:['100406'],links:['page-86.png']},
  {question:'What disciplinary measures are listed in Rule 100801?',include:['100801','Verbal warning'],links:['page-94.png']},
  {question:'Chapter 10 PDF page 94',include:['100801'],links:['page-94.png']},
  {question:'What does Rule 100899 say?',include:['not found']},
];
const failures = [];
try {
  await page.goto(root,{waitUntil:'networkidle',timeout:30000});
  await page.getByRole('button',{name:'AI Assistant'}).first().click();
  const input = page.getByPlaceholder(/Ask anything on Nigeria Public Service Rules/);
  await input.waitFor({state:'visible',timeout:15000});
  for(const item of cases) {
    const before = await page.locator('div.whitespace-pre-wrap').count();
    await input.fill(item.question);
    await page.getByRole('button',{name:'Ask PSR RAG'}).click();
    await page.waitForFunction(previous=>document.querySelectorAll('div.whitespace-pre-wrap').length>=previous+2,before,{timeout:20000});
    const last = page.locator('div.whitespace-pre-wrap').last();
    const answer = await last.innerText();
    const lower = answer.toLowerCase();
    const missing = item.include.filter(expected=>!lower.includes(expected.toLowerCase()));
    const hrefs = await last.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
    const missingLinks = (item.links || []).filter(expected=>!hrefs.some(h=>h?.includes(expected)));
    if(missing.length || missingLinks.length) {
      failures.push({question:item.question,missing,missingLinks,answer:answer.slice(0,500),hrefs});
      process.stdout.write('FAIL '+item.question+'\n');
    } else process.stdout.write('PASS '+item.question+'\n');
  }
  assert.equal(failures.length,0,JSON.stringify(failures,null,2));
  console.log('PASS: 18 Chapter 3, 5 and 10 real-UI acceptance questions');
} finally {
  await browser.close();
}
