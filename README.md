# bing-rewards

A simple Bing rewards spammer.  
This tool allows you to make multiple bing requests using random words retrieved from [Random word API](https://random-word-api.herokuapp.com/).  

Url: [https://sonicryptic.github.io/bing-rewards](https://sonicryptic.github.io/bing-rewards).  
Alternative url: [https://microsoft-rewards.surge.sh](https://microsoft-rewards.surge.sh).  

# Prerequisites

- Make sure to login to your bing account on the browser that you will be using this.

# Usage

- Go to [https://sonicryptic.github.io/bing-rewards](https://sonicryptic.github.io/bing-rewards) or [https://microsoft-rewards.surge.sh](https://microsoft-rewards.surge).
- Use the `search` command to search:

```
search <count> <waitTime>
<count>:
  - the number of searches.
  - default value is 10.
<waitTime>:
  - the buffer interval time in seconds.
  - default value is 5 seconds.

Example:
  - search 20 2 (This will do 20 searches with buffer interval time of 2 seconds)
  - search (This will do 10 searches with buffer interval time of is 5 seconds)
```
