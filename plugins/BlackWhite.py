import json
import os
from PIL import Image

DEFAULT_THRESHOLD = 127
THRESHOLD_KEY = 'threshold'


# info json contains some meta-data
# options can be used to hint the frontend which parameter can be used by the plugin
def info(options):
    info = {'title': 'Black-White transformation',
            'description': 'Transforms pixel to black or white by comparing the value to a configurable threshold',
            'type': ['transform'],
            'options': [{'key': THRESHOLD_KEY,
                         'type': 'integer',
                         'min': 0,
                         'max': 255,
                         'default': DEFAULT_THRESHOLD}]}
    return json.dumps(info)


# json result contains:
#   the path of the transformed image (relevant for transform plugins)
#   whether the frontend should display the image (relevant for display plugins)
def execute(options):
    image_path = options["imagePath"]
    threshold = options.get("threshold", DEFAULT_THRESHOLD)

    image = Image.open(image_path)
    rgb_im = image.convert('RGB')

    for x in range(rgb_im.size[0]):
        for y in range(rgb_im.size[1]):
            r, g, b = rgb_im.getpixel((x, y))
            avg = (r + g + b) / 3
            transformed_value = 255 if avg >= threshold else 0
            rgb_im.putpixel((x, y), (transformed_value, transformed_value, transformed_value))

    filename, file_extension = os.path.splitext(image_path)
    new_path = filename + "_bw" + file_extension
    rgb_im.save(new_path)
    return json.dumps({'imagePath': new_path,
                       'display': True})
