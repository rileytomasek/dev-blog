---
title: ZSH History Improvements
publish_date: 2022-10-03
description: Improve autocompletion and save more commands
og:image: https://assets.rile.yt/api/post?date=2022-10-03&title=ZSH%20History%20Improvements
---

These `~/.zshrc` updates are helpful if you use history for autocompletion or to reference old commands.

```bash
# Where to save history
export HISTFILE=~/.zsh_history

# Make history file max size huge
export HISTFILESIZE=1000000000

# Store a ton of history in memory
export HISTSIZE=1000000000

# Save commands to history immediately
setopt INC_APPEND_HISTORY

# Add a timestamp to history entries
export HISTTIMEFORMAT="[%F %T] "
setopt EXTENDED_HISTORY

# Share zsh history between tmux sessions
setopt share_history

# Remove older entries when adding a duplicate entry
setopt hist_ignore_all_dups
```

You'll have to `source ~/.zshrc` for the changes to take effect.
