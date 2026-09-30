from PIL import Image
from pathlib import Path

assets = Path(r"d:\Documents\Elevential\arane.github.io\src\assets")

# Full-res WebP for background (was looking soft/over-cropped at 2560)
src = assets / "la_crochet.png"
out = assets / "la_crochet.webp"
img = Image.open(src)
if img.mode not in ("RGB", "RGBA"):
    img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
# Keep original 4500px — WebP still much smaller than PNG
img.save(out, "WEBP", quality=92, method=6)
print(f"la_crochet.webp: {img.size} {out.stat().st_size/1e6:.2f}MB")
