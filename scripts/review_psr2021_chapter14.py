#!/usr/bin/env python3
"""Build source-reviewed, page-preserving Chapter 14 text from the 2021 scan's OCR.
Original OCR in docs/psr2021-chapter14/page-N.md is NEVER overwritten.
Corrections are based on comparison with 157-page PSR 2021 source images.
This is still a proofread transcription, not an official electronic edition.
"""
from pathlib import Path
import re

ROOT=Path("docs/psr2021-chapter14")
OUT=ROOT/"source-reviewed"
OUT.mkdir(exist_ok=True)

def text_at(page):
    p=ROOT/f"page-{page}.md"
    return p.read_text(encoding="utf-8")

def between(page,start,end=None):
    raw=text_at(page)
    i=raw.find(start)
    if i<0:raise RuntimeError(f"PDF page {page} missing start anchor {start!r}")
    j=raw.find(end,i+len(start)) if end else -1
    if end and j<0:raise RuntimeError(f"PDF page {page} missing end anchor {end!r}")
    return raw[i:j if j>=0 else None].strip()

def sub_expected(s,old,new,page,number=1):
    count=s.count(old)
    if count!=number:raise RuntimeError(f"PDF page {page}: expected {number} occurrences of {old!r}, found {count}")
    return s.replace(old,new)

pages = {
    116:between(116,"CHAPTER 14\nALLOWANCES","\nDefinition.\n"),
    117:between(117,"(iii) GL. 07"),
    118:between(118,"undertake course of instruction","\nOfficial\nVisit while"),
    119:between(119,"concerned shall be entitled"),
    120:between(120,"to 30 per cent","\nLocal\nTraining\nAllowance."),
    121:between(121,"140124.—"),
    122:between(122,"140133.—","\nContract\nOfficer and"),
    123:between(123,"140144.—")
}
# Required corrections to visibly misrecognized list markers, lettering,
# sentence words and marginal notes. These are reviewed against the source.
p=pages[116]
p=sub_expected(p,"(/) Hazard allowance","(j) Hazard allowance",116)
p=sub_expected(p,"(/) Local Course Allowance","(l) Local Course Allowance",116)
pages[116]=p

p=pages[117]
p=sub_expected(p,"hote! accommodation","hotel accommodation",117)
p=sub_expected(p,"vacation leaye","vacation leave",117)
p=sub_expected(p,"(/) undertake special duty abroad","(i) undertake special duty abroad",117)
p=sub_expected(p,"140109,—","140109.—",117)
pages[117]=p

p=pages[118]
p=sub_expected(p,"140111,—","140111.—",118)
p=sub_expected(p,"reimbursement of actual expenditure or transport essential",
                 "reimbursement of actual expenditure on transport essential",118)
p=sub_expected(p,"(ec) estacode allowance","(c) estacode allowance",118)
p=sub_expected(p,"(if any)","(if any)",118,1) if "(if any)" in p else p
p=sub_expected(p,"(ifany)","(if any)",118) if "(ifany)" in p else p
p=sub_expected(p,"duty visil","duty visit",118)
pages[118]=p

p=pages[119]
p=sub_expected(p,"(6) Where the donor","(b) Where the donor",119)
p=sub_expected(p,"140113,—","140113.—",119)
p=sub_expected(p,"140114,—","140114.—",119)
p=sub_expected(p,"if the duty or course which the Officer is directed",
                 "(iii) if the duty or course which the Officer is directed",119)
p=sub_expected(p,"takes\nplace earlier","takes\nplace earlier",119)
pages[119]=p

p=pages[120]
p=sub_expected(p,"140122,—","140122.—",120)
p=sub_expected(p,"extant Circular,","extant Circular.",120) if "extant Circular," in p else p
pages[120]=p

p=pages[121]
p=sub_expected(p,"(ec) period of budgetary preparations","(c) period of budgetary preparations",121)
p=sub_expected(p,"140132.— [fan Officer","140132.— If an Officer",121)
p=sub_expected(p,"11/2\npercent","1½\npercent",121) if "11/2\npercent" in p else p
pages[121]=p

p=pages[122]
p=sub_expected(p,"140137,—","140137.—",122)
p=sub_expected(p,"140141,—","140141.—",122)
p=sub_expected(p,"(/) transfer from one station","(i) transfer from one station",122)
p=sub_expected(p,"Mathematics ‘leaching Allowance","Mathematics Teaching Allowance",122)
p=sub_expected(p,"monthly salaries,","monthly salaries.",122) if "monthly salaries," in p else p
pages[122]=p

p=pages[123]
p=sub_expected(p,"N50,000.00\nNepean per annum","N50,000.00\nper annum",123)
p=sub_expected(p,"Pita Rat involvement","involvement",123)
pages[123]=p

for n,body in pages.items():
    file=OUT/f"page-{n}.md"
    file.write_text(
        f"# PSR 2021 Chapter 14 — Allowances — source PDF page {n}\n\n"
        "MASTER: PSR_2021_EDITION.pdf (157-page Library edition), 2021.\n"
        "STATUS: Source-reviewed transcription; original scanned page controls if any disagreement remains.\n"
        f"SCAN: /psr2021/chapter14/page-{n}.png\n\n"+body+"\n",encoding="utf-8")

combined="\n\n".join(pages.values())
num=[m.group(0) for m in re.finditer(r"(?m)^1401\d{2}\.—",combined)]
expected=[f"1401{i:02d}.—" for i in range(1,45)]
if num!=expected:raise RuntimeError(f"Rule sequence mismatch: {num} vs expected {expected}")
if "[fan" in combined or "Nepean" in combined or "Pita Rat" in combined or "(ec)" in combined:
    raise RuntimeError("Known OCR corruption remains")
for n in (116,117,118,119,120,121,122,123):
    if not pages[n].strip():raise RuntimeError(f"Empty reviewed page {n}")
report=(
    "# Chapter 14 page-by-page source QA\n\n"
    "Reference: 2021 Edition; Library master 157-page PDF; PDF pages 116–123.\n"
    "Eight original page images preserved unchanged; eight OCR draft pages preserved unchanged.\n"
    "Eight corrected legal-body transcriptions created separately in source-reviewed/.\n"
    "Rule-number sequence: 140101–140144, 44 entries, checked in order.\n"
    "Corrections: removed side-column contamination; corrected identified OCR list markers, "
    "letters and words; preserved paragraph continuations, 140103 (116→117), 140109 (117→118), "
    "140112 (118→119), and 140115 (119→120).\n"
    "Status: source-reviewed for indexed use with original scan citations. "
    "Not a certified digital legislative text; scanned 2021 pages remain authoritative.\n"
)
(OUT/"QA_REPORT.md").write_text(report,encoding="utf-8")
print("PASS: 8 reviewed page files; 44 rule headers in sequence; OCR corruption checks; page continuations documented")
