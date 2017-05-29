import json
import sys

options = json.loads(sys.argv[1])
action = options["action"]
if action != "info" and action != "execute":
  sys.stderr.write("Invalid action")
  sys.exit(1)

with open("plugins/" + options["pluginName"] + ".py", "rb") as source_file:
  source = source_file.read()
  exec (source, globals(), locals())
  globals()[action](options)
