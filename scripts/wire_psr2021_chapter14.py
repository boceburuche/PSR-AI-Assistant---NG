#!/usr/bin/env python3
"""Targeted 2021 Chapter 14 wiring. Preserve unrelated chapters and sources."""
from pathlib import Path
import re

def modify(path,fn):
  p=Path(path); old=p.read_text(encoding="utf8"); new=fn(old)
  if new==old:raise RuntimeError(f"No changes made to {path}; expected source anchor missing")
  p.write_text(new,encoding="utf8")
  print("Updated",path)

def corpus(s):
  old="import { PSR2021_RULEBOOK_CH7 } from './psr2021RulebookChapter7';"
  assert old in s
  s=s.replace(old,old+"\nimport { PSR2021_RULEBOOK_CH14 } from './psr2021RulebookChapter14';")
  pat=r"(?ms)^  \{\n    number: 14,\n.*?\n  \}(?=\n\];)"
  repl="""  {
    number: 14,
    title: 'Allowances',
    description: '2021 PSR Chapter 14: 44 allowance rules, 140101–140144, on original PDF pages 116–123. Extant circulars specify applicable rates.',
    sectionsCount: 0,
    rulesCount: 44,
    keyTopics: ['Types of Allowances', 'Acting Allowance', 'Duty Tour Allowance', 'Estacode', 'Overtime', 'Resettlement', 'Training Allowance', 'Non-Accident Bonus']
  }"""
  s,n=re.subn(pat,repl,s)
  assert n==1, f"Expected one Chapter 14 metadata record, got {n}"
  old_filter="...LEGACY_PSR_RULES_DATABASE.filter(rule=>rule.chapter !== 5 && rule.chapter !== 7 && rule.chapter !== 10),"
  assert old_filter in s
  return s.replace(old_filter,"...LEGACY_PSR_RULES_DATABASE.filter(rule=>rule.chapter !== 5 && rule.chapter !== 7 && rule.chapter !== 10 && rule.chapter !== 14),\n  ...PSR2021_RULEBOOK_CH14,")

def index(s):
  old="import { PSR2021_RULEBOOK_CH7 } from './psr2021RulebookChapter7';"
  assert old in s
  s=s.replace(old,old+"\nimport { PSR2021_RULEBOOK_CH14 } from './psr2021RulebookChapter14';")
  pat=r"(?ms)^  \{\n    chapter: 14,\n.*?\n  \}(?=,\n  \{\n    chapter: 15,)"
  repl="""  {
    chapter: 14,
    subject: 'Allowances',
    subSections: [],
    keyTopics: ['Types of Allowances', 'Duty Tour Allowance', 'Estacode', 'Acting Allowance', 'Overtime', 'Resettlement', 'Teaching Allowances', 'Non-Accident Bonus']
  }"""
  s,n=re.subn(pat,repl,s)
  assert n==1, f"Expected one Chapter 14 table-of-contents entry, got {n}"
  old_filter="!entry.ruleNumber.startsWith('05') && !entry.ruleNumber.startsWith('07') && !entry.ruleNumber.startsWith('10')"
  assert old_filter in s
  s=s.replace(old_filter,old_filter+" && !entry.ruleNumber.startsWith('14')")
  old_array="...[...PSR2021_RULEBOOK_CH5,...PSR2021_RULEBOOK_CH7,...PSR2021_RULEBOOK_CH10].map"
  assert old_array in s
  return s.replace(old_array,"...[...PSR2021_RULEBOOK_CH5,...PSR2021_RULEBOOK_CH7,...PSR2021_RULEBOOK_CH10,...PSR2021_RULEBOOK_CH14].map")

def chatbot(s):
  old="import { retrievePSR2021Chapter7 } from '../data/psr2021Chapter7';"
  assert old in s
  s=s.replace(old,old+"\nimport { retrievePSR2021Chapter14 } from '../data/psr2021Chapter14';")
  old="function getLocalPSRAnswer(query: string): string | null {\n"
  assert old in s
  s=s.replace(old,old+"  const chapter14 = retrievePSR2021Chapter14(query);\n  if (chapter14) return chapter14;\n")
  return s.replace("Chapters 3, 5, 7 and 10 are available", "Chapters 3, 5, 7, 10 and 14 are available")

def rulebook(s):
  old="[7,10].includes(activeModalRule.chapter)"
  assert old in s
  s=s.replace(old,"[7,10,14].includes(activeModalRule.chapter)")
  s=s.replace("[5,7,10].includes(activeModalRule.chapter)","[5,7,10,14].includes(activeModalRule.chapter)")
  s=s.replace("[7,10].includes(rule.chapter)","[7,10,14].includes(rule.chapter)")
  return s

modify("src/data/psrCorpus.ts",corpus)
modify("src/data/psrMasterIndex.ts",index)
modify("src/components/ChatView.tsx",chatbot)
modify("src/components/RulebookView.tsx",rulebook)
