#!/usr/bin/env python3
"""Create a page-level OCR review set from the authentic 157-page PSR 2021.
Source images remain authoritative; OCR review is not word-for-word verification.
"""
from pathlib import Path
import re
import subprocess
import tempfile
import urllib.request
import fitz

URL = "https://nimr.gov.ng/nimr/wp-content/uploads/2023/11/PSR_2021_EDITION.pdf"
PAGES = [68,69,70]
OUT = Path("docs/psr2021-chapter7")
IMG = Path("public/psr2021/chapter7")
OUT.mkdir(parents=True, exist_ok=True)
IMG.mkdir(parents=True, exist_ok=True)
req = urllib.request.Request(URL,headers={"User-Agent":"PSR-2021-chapter7-verification/1.0"})
with urllib.request.urlopen(req, timeout=120) as resp:
    data = resp.read()
if not data.startswith(b"%PDF"): raise RuntimeError("Download is not PDF")
doc=fitz.open(stream=data,filetype="pdf")
if len(doc)!=157: raise RuntimeError(f"Expected 157 PDF pages; found {len(doc)}")
for n in PAGES:
    page=doc[n-1]
    pix=page.get_pixmap(matrix=fitz.Matrix(2.8,2.8),alpha=False)
    with tempfile.TemporaryDirectory() as tmp:
        png=Path(tmp)/"p.png"
        pix.save(str(png))
        result=subprocess.run(["tesseract",str(png),"stdout","-l","eng","--psm","3"],capture_output=True,text=True,timeout=120,check=True)
        text=result.stdout.strip()
    if len(text)<250:raise RuntimeError(f"Page {n} has insufficient text: {len(text)}")
    p=OUT/f"page-{n}.md"
    if not p.exists():
        p.write_text(f"# Revised PSR 2021 — Chapter 7 — PDF page {n}\n\n"
            "SOURCE: PSR_2021_EDITION.pdf, 157-page Library reference edition.\n"
            "STATUS: PROVISIONAL OCR — source scan authoritative; manual verbatim verification outstanding.\n\n"
            +text+"\n",encoding="utf-8")
    page.get_pixmap(matrix=fitz.Matrix(1.8,1.8),alpha=False).save(str(IMG/f"page-{n}.png"))
joined="\n\n".join((OUT/f"page-{n}.md").read_text(encoding="utf-8") for n in PAGES)
for needle in ["070101","070201","070301","070304"]:
    if needle not in re.sub(r"(?<=\d)\s+(?=\d)","",joined):
        raise RuntimeError(f"Missing critical Chapter 7 rule: {needle}")
if "CHAPTER 8" in joined.upper():raise RuntimeError("Chapter 8 contamination")
(OUT/"QA_REPORT.md").write_text(
    "# Chapter 7 OCR QA — not a verbatim certification\n\n"
    "Edition: Public Service Rules 2021 (157-page source)\n"
    "Chapter: 7 — Training and Staff Development Within and Outside Nigeria\n"
    "Source PDF pages: 68, 69, 70\n"
    "Sections: 1 General; 2 Courses of Instruction Outside Nigeria; 3 Externally Assisted Courses\n"
    "Rule range: 070101–070304.\n"
    "Status: three original page scans archived, initial OCR extracted, page boundaries retained.\n"
    "Next: proofread all OCR against each page scan and verify cross-page paragraphs before declaring verbatim or publishing as verified statutory source.\n"
,encoding="utf-8")
print("PASS initial Chapter 7 extraction: 3 source scans + OCR review pages, PDF anchors checked")
