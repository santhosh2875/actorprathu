"""Makes og.jpg, the link preview shown on WhatsApp / Instagram DMs (1200 x 630).
Run from the prathu-2 folder:  python -I tools/make_og.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
BG, IVORY, MUTED, TEAL, RED = '#f4efe6', '#1c1a17', '#6c655c', '#8a5a3c', '#8c2a22'


def font(names, size):
    for n in names:
        try:
            return ImageFont.truetype(f'C:/Windows/Fonts/{n}', size)
        except OSError:
            pass
    return ImageFont.load_default()


def main():
    W, H = 1200, 630
    og = Image.new('RGB', (W, H), BG)
    photo = Image.open(ROOT / 'img' / 'p31.webp').convert('RGB')
    pw = 470
    s = max(pw / photo.width, (H - 80) / photo.height)
    photo = photo.resize((round(photo.width * s), round(photo.height * s)), Image.LANCZOS)
    photo = photo.crop((0, 0, pw, H - 80))
    og.paste(photo, (W - pw - 50, 40))
    d = ImageDraw.Draw(og)
    d.rectangle((W - 50 - 70, 40 - 12, W - 50 - 36, 40 + 30), fill=RED)
    serif = font(['georgiab.ttf', 'timesbd.ttf'], 96)
    small = font(['segoeuib.ttf', 'arialbd.ttf'], 24)
    body = font(['segoeui.ttf', 'arial.ttf'], 30)
    d.text((64, 92), 'PORTFOLIO', font=small, fill=TEAL)
    d.text((60, 130), 'PRATHOSH', font=serif, fill=IVORY)
    d.text((64, 250), 'Known as Prathu  ·  Actor & Anchor', font=body, fill=MUTED)
    y = 330
    for line in ['Films  ·  Web series  ·  Ad films  ·  TV', '5 languages  ·  4 dance styles', 'Chennai  ·  Casting contact inside']:
        d.polygon([(66, y + 10), (66, y + 24), (78, y + 17)], fill=TEAL)
        d.text((92, y), line, font=small, fill=IVORY)
        y += 52
    og.save(ROOT / 'og.jpg', quality=88)
    print('og.jpg', og.size)


if __name__ == '__main__':
    main()
