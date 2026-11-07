import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const url = process.env.PSR_TEST_URL || 'http://127.0.0.1:4173/PSR-AI-Assistant---NG/';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1440,height:900}});
const checks=[];
try {
  await page.goto(url,{waitUntil:'networkidle',timeout:45000});
  await page.getByRole('button',{name:/PSR Rulebook/}).first().click();
  await page.getByRole('button',{name:/Table of Contents \(16 Chapters\)/}).click();

  for(const test of [
    {num:5,title:'Performance Management System',count:'7 Sections',sections:['Progress Reports on Officers on Probation','Monitoring and Evaluation']},
    {num:10,title:'Discipline',count:'8 Sections',sections:['General Inefficiency','Serious Misconduct','Disciplinary Measures']}
  ]) {
    const name=page.getByText('Chapter '+test.num,{exact:true}).first();
    await name.click();
    const header=page.getByText(test.title,{exact:true}).first();
    await header.waitFor({timeout:15000});
    await page.getByText(test.count,{exact:true}).first().waitFor({timeout:15000});
    for(const item of test.sections) {
      await page.getByText(new RegExp(item,'i')).first().waitFor({timeout:15000});
    }
    checks.push('TOC Chapter '+test.num+': '+test.count);
  }

  await page.getByRole('button',{name:/Statutory Rules \(/}).click();
  for(const item of [
    {button:'Ch. 5: Performance Management System',total:23,rule:'050703',title:'Performance Management System'},
    {button:'Ch. 10: Discipline',total:66,rule:'100402',title:'Discipline'}
  ]) {
    await page.getByRole('button',{name:item.button,exact:true}).click();
    await page.getByText('Showing '+item.total+' statutory rule records').waitFor({timeout:15000});
    await page.getByText('Rule '+item.rule,{exact:true}).first().waitFor({timeout:15000});
    checks.push('Rulebook Chapter '+item.button+': '+item.total+' rules');
  }
  await page.getByRole('button',{name:'Ch. 10: Discipline',exact:true}).click();
  await page.getByText('Rule 100402',{exact:true}).first().waitFor();
  const card=page.getByText('Rule 100402',{exact:true}).first().locator('xpath=ancestor::div[contains(@class, "group")][1]');
  await card.getByRole('button',{name:/View Rule Source Transcription/}).click();
  await page.getByRole('heading',{name:/PSR 2021 Source Transcription \(OCR Review Pending\)/}).waitFor({timeout:10000}).catch(async()=>{
     await page.getByText('PSR 2021 Source Transcription (OCR Review Pending)').first().waitFor();
  });
  await page.getByRole('link',{name:/Open authentic 2021 source page/}).waitFor();
  checks.push('Chapter 10 rule modal: correct OCR labeling and original source-page link');

  console.log('PASS: '+checks.join('; '));
} finally { await browser.close(); }
