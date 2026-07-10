---
share_link: https://share.note.sx/ibca15gy#o/GmtQt5MaRb3xxGxIkXP6exVyrLAFPKK6TnMrV1Wsc
share_updated: 2025-12-07T10:25:19+02:00
---
2025-04-26 17:44
Tags: #web
##### Content

### Cache Eviction Techniques
- Evict all keys, LRU first
- Evict only keys with expire set, LRU first
- Evict all keys in random order (literally chaos)
- Evict only keys with expire set, random order
- Evict only keys with expire set, shorter TTL keys first
- Evict all keys using approximated LFU
- Evict only keys with expire set, using approximated LFU

**Note:**
LRU = Least Recently Used
LFU = Least Frequently Used

## Types of Caching

#### cache-aside (lazy loading)
Applications requests data from cache, if hit return it, if not query db -> set cache -> return data
#### write-through
Application updates both cache and database on data update
#### write-behind (write-back)
Application updates cache, and then cache batches updates and send it once to db directly
#### read-through
Application reads from cache directly, if data not in cache, it fetches data from db
##### References
