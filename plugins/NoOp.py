import json

#info json contains some meta-data
#options can be used to hint the frontend which parameter can be used by the plugin
def info(options):
  info = {'title': 'Demo plugin',
          'type': ['transform', 'display'],
          'options': []}
  return json.dumps(info)

#json result conaints:
#   the path of the transformed image (relevant for transform plugins)
#   whether the frontend should display the image (relevant for display plugins)
def execute(options):
  return json.dumps({'imagePath': options["imagePath"],
                     'display': True})
