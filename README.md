Experimental VSCode extension for quickly incrementing numeric values and immediately saving the source-file (in situations where a sourcefile is being monitored for changes).

```
npm install -g vsce
vsce package
code --install-extension path-to-vsix.vsix
```

```
    {
        "key": "alt+down",
        "command": "incandsave.incrementSelection",
        "when": "editorTextFocus && editorHasSelection",
        "args": {
            "increment": -10
        }
    },
    {
        "key": "alt+up",
        "command": "incandsave.incrementSelection",
        "when": "editorTextFocus && editorHasSelection",
        "args": {
            "increment": 10
        }
    },
    {
        "key": "cmd+alt+down",
        "command": "incandsave.incrementSelection",
        "when": "editorTextFocus && editorHasSelection",
        "args": {
            "increment": -1
        }
    },
    {
        "key": "cmd+alt+up",
        "command": "incandsave.incrementSelection",
        "when": "editorTextFocus && editorHasSelection",
        "args": {
            "increment": 1
        }
    },
```