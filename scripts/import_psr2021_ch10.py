#!/usr/bin/env python3
"""Generate audit-stage Chapter 10 page transcriptions from the 2021 PSR edition.
The NIMR hosted duplicate is an extraction aid for the 157-page Library master.
Do not classify OCR output as verified or connect it to production until reviewed.
"""
import io
import os
import re
import subprocess
import tempfile
import urllib.request
from pathlib import Path
import fitz

SOURCE_URL = "https://nimr.gov.ng/nimr/wp-content/uploads/2023/11/PSR_2021_EDITION.pdf"
OUT = Path("docs/psr2021-chapter10-ocr-review")
OUT.mkdir(parents=True, exist_ok=True)
PAGE_IMAGES = Path("public/psr2021/chapter10")
PAGE_IMAGES.mkdir(parents=True, exist_ok=True)
req = urllib.request.Request(SOURCE_URL, headers={"User-Agent":"PSR-2021-education-verification/1.0"})
with urllib.request.urlopen(req, timeout=120) as response:
    raw = response.read()
if not raw.startswith(b"%PDF"):
    raise RuntimeError("Source is not a PDF")
doc = fitz.open(stream=raw, filetype="pdf")
if len(doc) != 157:
    raise RuntimeError(f"Source page count mismatch: expected 157, got {len(doc)}")
def ocr_page(page):
    with tempfile.TemporaryDirectory() as temp:
        out = Path(temp)/"render"
        pix = page.get_pixmap(matrix=fitz.Matrix(3.3,3.3), alpha=False)
        png = Path(temp)/"page.png"
        pix.save(str(png))
        p = subprocess.run(["tesseract",str(png),"stdout","--psm","3","-l","eng"], capture_output=True,text=True,timeout=120)
        if p.returncode:
            raise RuntimeError(f"Tesseract failed: {p.stderr[:400]}")
        return p.stdout
texts = {}
for pageno in range(78,95):
    page = doc[pageno - 1]
    embedded = page.get_text("text").strip()
    if len(embedded) >= 350:
        text = embedded
        origin = "PDF selectable text"
    else:
        text = ocr_page(page)
        origin = "unverified OCR"
    if len(text.strip()) < 180:
        raise RuntimeError(f"PDF page {pageno} extraction too short ({len(text)})")
    texts[pageno] = text
    img = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), alpha=False)
    img.save(str(PAGE_IMAGES/f"page-{pageno}.png"))
    target = OUT/f"page-{pageno}.md"
    if not target.exists():
        target.write_text(
        f"# PSR 2021 Chapter 10 — Library PDF page {pageno}\n\n"
        f"Source: 2021 Edition (157-page Library master), compared with NIMR-hosted edition.\n"
        f"Transcription status: {origin}; pending word-for-word review.\n\n"
        + text.strip() + "\n", encoding="utf-8")
combined = "\n".join(texts.values())
def check(page,needle):
    if not re.search(needle,texts[page],flags=re.I):
        raise RuntimeError(f"Page {page} failed required text check: {needle}")
check(78,r"(?<!\\d)100101(?!\\d)")
check(94,r"(?<!\\d)100801(?!\\d)")
if "SERIOUS MISCONDUCT" not in combined.upper():
    raise RuntimeError("Chapter 10 serious misconduct missing")
if not re.search(r"\(a[ed]\)|\(a[ed]\)\s+any other",texts[85],re.I):
    # OCR may render (ae) as '(ae)' poorly; do not assert verification.
    print("WARNING: end of serious misconduct enumeration needs manual correction")
count = len(re.findall(r"(?<!\d)100[1-8]\d{2}(?!\d)",combined))
(OUT/"QA_REPORT.md").write_text(
    "# Chapter 10 extraction QA (NOT YET VERIFIED)\n\n"
    f"Source: {SOURCE_URL}\nPages: 78–94 / 157\n"
    f"Extracted pages: {len(texts)}\nRule marker occurrences (OCR, may include repeats): {count}\n"
    "Checks: chapter starts at 100101, ends at 100801; eight sections.\n"
    "WARNING: OCR is not a verbatim verified source. Do not deploy to PSR chatbot until manual checks correct all transcription errors, numbering and paragraph continuations.\n", encoding="utf-8")
print(f"Prepared {len(texts)} pages, {count} rule number matches; OCR REVIEW REQUIRED")
