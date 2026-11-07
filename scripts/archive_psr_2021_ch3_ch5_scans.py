#!/usr/bin/env python3
"""Archive original 2021-edition page images for the Chapter 3/5 UI.

These are page positions in the 157-page source document, not the file
positions of legacy transcriptions. Page sequence 54/55 is out of rule order
in this scan, so use explicit rule-to-page provenance rather than arithmetic.
"""
from pathlib import Path
import subprocess
import tempfile
import urllib.request

import fitz

SOURCE_URL = "https://nimr.gov.ng/nimr/wp-content/uploads/2023/11/PSR_2021_EDITION.pdf"
PAGES = list(range(51, 56)) + list(range(59, 66))
ROOT = Path("public/psr2021")
req = urllib.request.Request(SOURCE_URL, headers={"User-Agent": "PSR-2021-source-verification/1.0"})
with urllib.request.urlopen(req, timeout=120) as response:
    payload = response.read()
if not payload.startswith(b"%PDF"):
    raise ValueError("Not a valid source PDF")
document = fitz.open(stream=payload, filetype="pdf")
if len(document) != 157:
    raise ValueError(f"Expected Library-master edition with 157 pages, got {len(document)}")
for page_number in PAGES:
    chapter = "chapter3" if page_number <= 55 else "chapter5"
    folder = ROOT / chapter
    folder.mkdir(parents=True, exist_ok=True)
    page = document[page_number - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), alpha=False)
    pix.save(str(folder / f"page-{page_number}.png"))
with tempfile.TemporaryDirectory() as temporary:
    for page_number, expected in [(51,"CHAPTER 3"),(54,"030401"),(55,"030301"),(59,"CHAPTER 5"),(65,"050703")]:
        page = document[page_number - 1]
        png = Path(temporary) / f"p{page_number}.png"
        page.get_pixmap(matrix=fitz.Matrix(3,3),alpha=False).save(str(png))
        result = subprocess.run(["tesseract",str(png),"stdout","--psm","3","-l","eng"],
          capture_output=True,text=True,timeout=90,check=True)
        actual = "".join(result.stdout.upper().split())
        if "".join(expected.upper().split()) not in actual:
            raise ValueError(f"Source edition page {page_number} failed anchor check: {expected}")
print("PASS: Source scans archived: 5 pages Chapter 3, 7 pages Chapter 5; 157-page source & anchor checks")
