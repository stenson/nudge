A VSCode extension: https://marketplace.visualstudio.com/items?itemName=robstenson.nudge

Experimental VSCode extension for quickly incrementing numeric values and immediately saving the source-file (in situations where a sourcefile is being monitored for changes).

```
    {
        "key": "alt+down",
        "command": "nudge.incrementSelection",
        "when": "editorTextFocus",
        "args": {
            "increment": -10
        }
    },
    {
        "key": "alt+up",
        "command": "nudge.incrementSelection",
        "when": "editorTextFocus",
        "args": {
            "increment": 10
        }
    },
    {
        "key": "cmd+alt+down",
        "command": "nudge.incrementSelection",
        "when": "editorTextFocus",
        "args": {
            "increment": -1
        }
    },
    {
        "key": "cmd+alt+up",
        "command": "nudge.incrementSelection",
        "when": "editorTextFocus",
        "args": {
            "increment": 1
        }
    },
    {
        "key": "shift+alt+down",
        "command": "nudge.incrementSelection",
        "when": "editorTextFocus",
        "args": {
            "increment": -100
        }
    },
    {
        "key": "shift+alt+up",
        "command": "nudge.incrementSelection",
        "when": "editorTextFocus",
        "args": {
            "increment": 100
        }
    },
```