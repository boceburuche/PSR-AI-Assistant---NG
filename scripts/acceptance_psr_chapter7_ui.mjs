import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const root=process.env.PSR_TEST_URL||'http://127.0.0.1:4173/PSR-AI-Assistant---NG/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1366,height:900}});
try {
  await page.goto(root,{waitUntil:'networkidle',timeout:45000});
  await page.getByRole('button',{name:/PSR Rulebook/}).first().click();
  await page.getByRole('button',{name:/Table of Contents \(16 Chapters\)/}).click();
  await page.getByText('Chapter 7',{exact:true}).first().click();
  await page.getByText('Training and Staff Development Within and Outside Nigeria',{exact:true}).first().waitFor();
  await page.getByText('3 Sections',{exact:true}).first().waitFor();
  for(const label of ['General','Courses of Instruction Outside Nigeria','Externally Assisted Courses']){
    await page.getByText(new RegExp(label,'i')).first().waitFor();
  }
  await page.getByRole('button',{name:/Statutory Rules \(/}).click();
  await page.getByRole('button',{name:'Ch. 7: Training and Staff Development Within and Outside Nigeria',exact:true}).click();
  await page.getByText('Showing 19 statutory rule records').waitFor();
  await page.getByText('Rule 070105',{exact:true}).first().waitFor();
  const card=page.getByText('Rule 070105',{exact:true}).first().locator('xpath=ancestor::div[contains(@class,"group")][1]');
  await card.getByRole('button',{name:'View Rule Source Transcription'}).click();
  await page.getByText('PSR 2021 Source-Reviewed Transcription').first().waitFor();
  await page.getByRole('link',{name:/Open authentic 2021 source page/}).waitFor();
  console.log('PASS Chapter 7 Rulebook: 3 sections, 19 indexed rules, original scan link, OCR label');
  // Close the rule-detail overlay; it intentionally blocks navigation behind it.
  await page.getByRole('button',{name:'✕'}).last().click();
  await page.getByRole('button',{name:'AI Assistant'}).first().click();
  const input=page.getByPlaceholder(/Ask anything on Nigeria Public Service Rules/);
  const test=[
    {q:'What does Chapter 7 cover?',required:['Training and Staff Development','3 sections']},
    {q:'What does Rule 070105 say?',required:['070105','Category F','page 68','page 69']},
    {q:'Give the full text of Rule 070205',required:['070205','Bond']},
    {q:'Explain Rule 070304',required:['070304','four years']},
    {q:'Chapter 7 PDF page 70',required:['070304']},
    {q:'What does Rule 070999 say?',required:['not present']}
  ];
  for(const t of test) {
    const old=await page.locator('div.whitespace-pre-wrap').count();
    await input.fill(t.q);
    await page.getByRole('button',{name:'Ask PSR RAG'}).click();
    await page.waitForFunction(count=>document.querySelectorAll('div.whitespace-pre-wrap').length>=count+2,old,{timeout:20000});
    const answer=await page.locator('div.whitespace-pre-wrap').last().innerText();
    for(const needle of t.required){
      assert.ok(answer.toLowerCase().includes(needle.toLowerCase()),t.q+' must include '+needle+'\n'+answer.slice(0,500));
    }
    console.log('PASS '+t.q);
  }
} finally {await browser.close();}
