---
title: Kill the process listening to a port
publish_date: 2022-10-17
description: Find the processes listening to a port and kill it
og:image: https://assets.rile.yt/api/post?date=2022-20-17&title=Kill%20the%20process%20listening%20to%20a%20port
---

It's inevitable if you work on enough projects, or with flakey enough servers, that when you start a server there is already something running on that port.

Here's an easy way to kill the process listening on port 8000:

```bash
kill $(lsof -t -i:8000)
```

### What's going on here?

`lsof -t -i:8000` returns the process number listening to port 8000 and `kill $()` kills the process.

You can also use [lsof](https://man7.org/linux/man-pages/man8/lsof.8.html) to get more details without killing the process by running:

```bash
lsof -i:8000
```
