---
title: Move lines in Neovim
publish_date: 2024-07-13
description: Key mappings for efficiently moving lines in visual mode
og:image: https://assets.rile.yt/api/post?date=2024-07-11&title=Move%20lines%20in%20Neovim
---

These Neovim key mappings enable a more efficient workflow for moving lines in visual mode.

```vim
-- Move selected lines down in Visual mode
vnoremap J :m '>+1<CR>gv=gv

-- Move selected lines up in Visual mode
vnoremap K :m '<-2<CR>gv=gv
```

You can now use `J` and `K` to move lines up and down in visual mode without having to yank and paste.

[![asciicast](https://asciinema.org/a/057ZHHSG026I0tlMQaiGsbwJa.svg)](https://asciinema.org/a/057ZHHSG026I0tlMQaiGsbwJa)
