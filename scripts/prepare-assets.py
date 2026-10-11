from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Path(r"C:\Users\Abdulhai\.codex\generated_images\01a1254e-fbc9-7ee0-a7d4-3d93fe4e4275")
assets = {
    "tooth": "exec-6ad4143d-0737-4696-a8be-85f4143fe274.png",
    "implant": "exec-858cf358-fc96-4834-84f9-f7548446e824.png",
    "aligner": "exec-8e8dfe8c-5c85-4a89-a5f5-7799aa80091b.png",
    "veneers": "exec-fa81d4b9-cf79-407d-8088-6381bb37154a.png",
    "root-canal": "exec-ce17f28c-f84d-4fb6-88e8-f40e9a3fb501.png",
    "clinic": "exec-59b77b2e-6107-4bd1-866c-24692436498f.png",
}
destination = root / "public" / "images"
destination.mkdir(parents=True, exist_ok=True)
for name, file in assets.items():
    with Image.open(source / file) as picture:
        picture.thumbnail((1536, 1536))
        output = destination / (name + ".webp")
        picture.save(output, "WEBP", quality=88, method=6)
        print(name, picture.mode, picture.size, output.stat().st_size)
