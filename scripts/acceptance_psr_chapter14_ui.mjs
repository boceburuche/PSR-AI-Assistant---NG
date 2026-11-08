import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url=process.env.PSR_TEST_URL||'http://127.0.0.1:4173/PSR-AI-Assistant---NG/';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
try {
  await page.goto(url,{waitUntil:'networkidle',timeout:45000});
  await page.getByRole('button',{name:/PSR Rulebook/}).first().click();
  await page.getByRole('button',{name:/Table of Contents \(16 Chapters\)/}).click();
  await page.getByText('Chapter 14',{exact:true}).first().click();
  await page.getByText('Allowances',{exact:true}).first().waitFor();
  await page.getByText('0 Sections',{exact:true}).first().waitFor();
  console.log('PASS Chapter 14 TOC: Allowances, no invented numbered sections');
  await page.getByRole('button',{name:/Statutory Rules \(/}).click();
  await page.getByRole('button',{name:'Ch. 14: Allowances',exact:true}).click();
  await page.getByText('Showing 44 statutory rule records').waitFor();
  for(const number of ['140101','140102','140115','140125','140144'])
    await page.getByText('Rule '+number,{exact:true}).first().waitFor();
  console.log('PASS Chapter 14 Rulebook: 44 rules including 140144');
  const card=page.getByText('Rule 140144',{exact:true}).first().locator('xpath=ancestor::div[contains(@class,"group")][1]');
  await card.getByRole('button',{name:'View Rule Source Transcription'}).click();
  await page.getByText('PSR 2021 Source-Reviewed Transcription').first().waitFor();
  await page.getByRole('link',{name:/Open authentic 2021 source page/}).waitFor();
  await page.getByRole('button',{name:'✕'}).last().click();
  console.log('PASS Chapter 14 original scan source link');
  await page.getByRole('button',{name:'AI Assistant'}).first().click();
  const input=page.getByPlaceholder(/Ask anything on Nigeria Public Service Rules/);
  const cases=[
    {q:'What does Chapter 14 cover?',contains:['Allowances','44']},
    {q:'What does Rule 140102 say?',contains:['140102','Acting Allowance','page 116']},
    {q:'Explain Rule 140115',contains:['140115','page 119','page 120']},
    {q:'What does Rule 140125 provide?',contains:['140125','0.7 per cent']},
    {q:'What does Rule 140144 say?',contains:['140144','N50,000']},
    {q:'Chapter 14 PDF page 123',contains:['140144']},
    {q:'What does Rule 140199 say?',contains:['not found']}
  ];
  for(const test of cases){
    const count=await page.locator('div.whitespace-pre-wrap').count();
    await input.fill(test.q);
    await page.getByRole('button',{name:'Ask PSR RAG'}).click();
    await page.waitForFunction(x=>document.querySelectorAll('div.whitespace-pre-wrap').length>=x+2,count,{timeout:20000});
    const answer=await page.locator('div.whitespace-pre-wrap').last().innerText();
    for(const fragment of test.contains)
      assert.ok(answer.toLowerCase().includes(fragment.toLowerCase()),
        test.q+' missing '+fragment+'\n'+answer.slice(0,650));
    console.log('PASS '+test.q);
  }
} finally {await browser.close();}
