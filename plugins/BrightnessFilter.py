import json
import os
from PIL import Image

DEFAULT_THRESHOLD = 127
THRESHOLD_KEY = 'threshold'


# info json contains some meta-data
# options can be used to hint the frontend which parameter can be used by the plugin
def info(options):
    info = {'title': 'Brightness Filter',
            'description': 'Filters images which have an higher average brightness than the given threshold',
            'pluginType': ['display'],
            'supportSingleImage': True,
            'supportBatch': False,
            'options': [{'title': 'Threshold',
                         'description': 'The threshold level used for decision if an image should be filtered or not.',
                         'key': THRESHOLD_KEY,
                         'inputType': 'number',
                         'min': 0,
                         'max': 255,
                         'defaultValue': DEFAULT_THRESHOLD}]}
    return json.dumps(info)


# json result conaints:
#   the path of the transformed image (relevant for transform plugins)
#   whether the frontend should display the image (relevant for display plugins)
def execute(options):
    image_path = options["imagePath"]
    threshold = options.get("threshold", DEFAULT_THRESHOLD)

    image = Image.open(image_path)
    rgb_im = image.convert('RGB')
    sum = 0

    for x in range(rgb_im.size[0]):
        for y in range(rgb_im.size[1]):
            r, g, b = rgb_im.getpixel((x, y))
            avg = (r + g + b) / 3
            sum += avg

    global_avg = sum / (rgb_im.size[0] * rgb_im.size[1])
    display = global_avg >= threshold

    filename, file_extension = os.path.splitext(image_path)
    new_path = filename + "_bw" + file_extension
    rgb_im.save(new_path)
    return json.dumps({'display': display})
