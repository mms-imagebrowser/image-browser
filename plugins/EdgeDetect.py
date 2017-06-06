import json
import os
from PIL import Image
from PIL import ImageFilter

# info json contains some meta-data
# options can be used to hint the frontend which parameter can be used by the plugin
def info(options):
    info = {'title': 'Edge detection transformation',
            'description': 'Edge detection filter.',
            'pluginType': ['transform'],
            'supportSingleImage': True,
            'supportBatch': False,
            'options': []}
    return json.dumps(info)

# json result contains:
#   the path of the transformed image (relevant for transform plugins)
#   whether the frontend should display the image (relevant for display plugins)
def execute(options):
    image_path = options["imagePath"]
    image = Image.open(image_path)
    im_blur = image.filter(ImageFilter.FIND_EDGES)
    filename, file_extension = os.path.splitext(image_path)
    new_path = filename + "_edges" + file_extension
    im_blur.save(new_path)
    return json.dumps({'imagePath': new_path,
                       'display': True})
