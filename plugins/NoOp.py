import json

#info json contains some meta-data
#options can be used to hint the frontend which parameter can be used by the plugin
def info(options):
  info = {'title': 'Demo plugin',
          'pluginType': ['transform', 'display'],
          'supportSingleImage': True,
          'supportBatch': True,
          'options':  [{'title': 'Dummy Number',
                        'description': 'A dummy number for testing number input.',
                        'key': 'dummy_number',
                        'inputType': 'number',
                        'min': 0,
                        'max': 255,
                        'defaultValue': 128},
                       {'title': 'Dummy String',
                        'description': 'A dummy string for testing string input.',
                        'key': 'dummy_string',
                        'inputType': 'string',
                        'defaultValue': "hello world"},
                       {'title': 'Dummy Dropdown',
                        'description': 'A dummy dropdown for testing dropdown input.',
                        'key': 'dummy_dropdown',
                        'inputType': 'dropdown',
                        'dropdownOptions': ['hello', 'world', 'foo', 'bar'],
                        'defaultValue': 'world'}]}
  return json.dumps(info)

#json result conaints:
#   the path of the transformed image (relevant for transform plugins)
#   whether the frontend should display the image (relevant for display plugins)
def execute(options):
  return json.dumps({'imagePath': options["imagePath"],
                     'display': True})
