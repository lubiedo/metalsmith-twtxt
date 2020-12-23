# metalsmith-twtxt
[![Travis-CI](https://travis-ci.com/lubiedo/metalsmith-twtxt.svg?branch=main)](https://travis-ci.com/github/lubiedo/metalsmith-twtxt)

twtxt feed generator plugin for Metalsmith

## Example
```js
var Metalsmith  = require('metalsmith'),
    collections = require('metalsmith-collections'),
    twtxt       = require('./metalsmith-twtxt')

Metalsmith(__dirname)
  .use(collections({
    articles: '*.md'
  }))
  .use(twtxt())
  .build()
```

By default, it should geneate a `twtxt.txt` file containing your collections feed.
Use `site_url` and `extension` options to generate specific URLs for each item:
```js
...
  .use(twtxt({
    site_url: 'https://my.website/',
    extension: '.php'
  }))
...
```

This should generate a TWTXT file similar to:
```c
2020-12-01T00:00:00.000Z   Test post <https://my.website/post.php>
```

### [License](LICENSE)
