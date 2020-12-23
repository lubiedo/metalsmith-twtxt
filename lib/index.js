/**
 * Format for each entry: {date}\t{title}<{path}>\n
 *
 * For more information about the TWTXT format please refer to:
 * https://twtxt.readthedocs.io/en/stable/
 */
module.exports = (opts = {}) => {
  const options = {
    encode:       'utf8',       /* TWTXT uses UTF-8 by default */
    output:       'twtxt.txt',  /* output file in root (build) directory */
    collections:  'articles',   /* collections to use */
    extension:    '.html',
    ...opts
    }

  /* these fields are checked to get the actual creation or publication date */
  const date_fields = ['date', 'pubDate', 'created', 'published']

  /**
   * Convert from article object to feed object
   * @param {Object} item
   * @return {Object}
   */
  feed_item = (item) => {
    let date

    if (options.date_field)
      date = new Date(item[options.date_field])
    else {
      date = new Date() // make sure date always contains something

      for (let field of date_fields) {
        if (Object.keys(item).includes(field)) {
          date = new Date(item[field])
          break
        }
      }
    }

    return {
      date: date,
      title: item.title,
      path: item.path.replace(/\.[\w\d]+$/i, options.extension),
    }
  }

  /**
   * Return content for the twtxt file
   * @param {Object} items
   * @return {String}
   */
  feed_build = (items) => {
    let content = ''
    items.forEach((item) => {
      content +=  `${item.date.toISOString()}\t${item.title}` +
                  ' <' + ( options.site_url ? `${options.site_url}/` : '' ) +
                  `${item.path}>\n`
    })
    return content
  }

  return (files, metalsmith, done) => {
    setImmediate(done)

    /* get articles collection */
    const collections = metalsmith.metadata().collections
    if (!collections || !collections[options.collections].length)
      return done(
        new Error('no items in collection to generate twtxt file')
      )

    let feed = []
    collections[options.collections].forEach((item) => {
      feed.push(feed_item(item))
    })
    feed.reverse()

    /* add new output file to files array */
    files[options.output] = {
      contents: new Buffer.from(feed_build(feed), options.encode)
    }
  }
}
