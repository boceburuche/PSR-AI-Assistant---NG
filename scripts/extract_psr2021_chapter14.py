#!/usr/bin/env python3
"""Extract PSR 2021 Ch14 per-page source scans and provisional text.
The 157-page edition is the same edition as the Library master; source images
are authoritative. OCR text must never be presented as verified verbatim.
"""
import re, tempfile, subprocess, urllib.request
from pathlib import Path
import fitz

URL="https://nimr.gov.ng/nimr/wp-content/uploads/2023/11/PSR_2021_EDITION.pdf"
OUT=Path("docs/psr2021-chapter14")
IMG=Path("public/psr2021/chapter14")
OUT.mkdir(parents=True,exist_ok=True);IMG.mkdir(parents=True,exist_ok=True)
req=urllib.request.Request(URL,headers={"User-Agent":"PSR-2021-Ch14-Source-Audit/1.0"})
with urllib.request.urlopen(req,timeout=120) as response: raw=response.read()
if not raw.startswith(b"%PDF"):raise RuntimeError("Not a source PDF")
pdf=fitz.open(stream=raw,filetype="pdf")
if len(pdf)!=157:raise RuntimeError(f"Expected the 157-page PSR 2021, got {len(pdf)}")
pages={}
for n in range(116,124):
    pix=pdf[n-1].get_pixmap(matrix=fitz.Matrix(3,3),alpha=False)
    with tempfile.TemporaryDirectory() as temp:
        fn=Path(temp)/"page.png";pix.save(str(fn))
        result=subprocess.run(["tesseract",str(fn),"stdout","-l","eng","--psm","3"],capture_output=True,text=True,check=True,timeout=120)
    body=result.stdout.strip()
    if len(body)<150:raise RuntimeError(f"Page {n}: low OCR content {len(body)}")
    pages[n]=body
    dst=OUT/f"page-{n}.md"
    if not dst.exists():
        dst.write_text(
            f"# Revised PSR 2021 — Chapter 14 — original PDF page {n}\n\n"
            "SOURCE: PSR_2021_EDITION.pdf (157-page Library master edition).\n"
            "STATUS: OCR REVIEW DRAFT; not verified verbatim. Original scan takes precedence.\n\n"
            +body+"\n",encoding="utf8")
    pdf[n-1].get_pixmap(matrix=fitz.Matrix(1.8,1.8),alpha=False).save(str(IMG/f"page-{n}.png"))
all_text="\n".join(pages.values())
for rule in ("140101","140102","140144"):
    if not re.search(r"(?<!\d)"+rule+r"(?!\d)",all_text):
        raise RuntimeError("Missing Chapter 14 boundary/list anchor: "+rule)
for n in range(116,124):
    if n!=116 and "CHAPTER 15" in pages[n].upper():
        raise RuntimeError(f"Chapter 15 contamination on PDF page {n}")
(OUT/"QA_REPORT.md").write_text(
    "# Chapter 14 — source extraction audit\n\n"
    "Edition: Revised Public Service Rules 2021, 157-page Library master\n"
    "Chapter: 14 — Allowances\nOriginal PDF pages: 116–123 (8 pages)\n"
    "Rules expected: 140101–140144 (44 rules)\n"
    "No independently numbered internal sections in original Chapter 14.\n"
    "Status: all eight page images archived and OCR draft pages extracted.\n"
    "Next: compare every provision against page images, including tables/list items, "
    "marginal headings and page continuations before certifying verbatim text.\n"
    "Do not treat OCR text as legal authority without reading its linked source scan.\n",encoding="utf8")
print("CH14 SOURCE EXTRACTED: pages 116–123; 8 images; 8 provisional OCR files. Proofreading pending.")
