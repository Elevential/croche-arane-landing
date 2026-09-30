from PIL import Image
from pathlib import Path

assets = Path(r"d:\Documents\Elevential\arane.github.io\src\assets")
files = [
    ("arane_landing_page.png", 2560, 95),
    ("la_crochet.png", 2560, 95),
    ("app_examples.png", 2400, 95),
]

for name, max_w, q in files:
    src = assets / name
    out = assets / (src.stem + ".webp")
    preview = assets / (src.stem + "_preview_check.jpg")
    img = Image.open(src)

    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")

    w, h = img.size
    if w > max_w:
        nh = int(h * (max_w / w))
        img = img.resize((max_w, nh), Image.Resampling.LANCZOS)

    img.save(out, "WEBP", quality=q, method=6)

    # small JPEG preview for visual QA in tools that can't read webp
    rgb = img.convert("RGB")
    rgb.thumbnail((900, 600), Image.Resampling.LANCZOS)
    rgb.save(preview, "JPEG", quality=85)

    print(f"{out.name}: {img.size} {out.stat().st_size/1e6:.2f}MB (q={q})")
