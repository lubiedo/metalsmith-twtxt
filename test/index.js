'use strict';

var assert = require('assert')
var Metalsmith  = require('metalsmith'),
    collections = require('metalsmith-collections'),
    twtxt       = require('..')

describe('metalsmith-twtxt', function(){
  it('should create twtxt.txt file', function(done){
    Metalsmith('test/fixtures')
      .use(collections({
        articles: '*.md'
      }))
      .use(twtxt())
      .build(function(e,f){
        if (e) return done(e)
        assert(f['twtxt.txt'])
        done()
      })
  })
  it('should have content', function(done){
    Metalsmith('test/fixtures')
      .use(collections({
        articles: '*.md'
      }))
      .use(twtxt())
      .build(function(e,f){
        if (e) return done(e)
        assert(f['twtxt.txt'].contents.toString() ===
          "2020-12-01T00:00:00.000Z\tTest post <post.md>\n")
        done()
      })
  })
})
