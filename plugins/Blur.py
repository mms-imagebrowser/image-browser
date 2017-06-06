import json
import os
from PIL import Image
from PIL import ImageFilter

DEFAULT_RADIUS = 2
RADIUS_KEY = 'radius'

# info json contains some meta-data
# options can be used to hint the frontend which parameter can be used by the plugin
def info(options):
    info = {'title': 'Gaussian blur transformation',
            'description': 'Gaussian blur filter.',
            'pluginType': ['transform'],
            'supportSingleImage': True,
            'supportBatch': False,
            'options': [{'title': 'Blur radius',
                         'description': 'The radius used for Gaussian blur',
                         'key': RADIUS_KEY,
                         'inputType': 'number',
                         'min': 0,
                         'max': 50,
                         'defaultValue': DEFAULT_RADIUS}]}
    return json.dumps(info)


# json result contains:
#   the path of the transformed image (relevant for transform plugins)
#   whether the frontend should display the image (relevant for display plugins)
def execute(options):
    image_path = options["imagePath"]
    radius = options.get("radius", DEFAULT_RADIUS)
    image = Image.open(image_path)
    im_blur = image.filter(ImageFilter.GaussianBlur(radius=radius))
    filename, file_extension = os.path.splitext(image_path)
    new_path = filename + "_blur" + file_extension
    im_blur.save(new_path)
    return json.dumps({'imagePath': new_path,
                       'display': True})
