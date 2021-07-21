const glob = require('glob-all');

describe ('Checking generated html files', () => {
  it('should generate html files', (done) => {
    const file=glob.sync([
      './dist/index.html',
      './dist/search.html',
    ])
    if(file.length){
      done();
    }else{
      throw new Error('no html files generated')
    }
  })
})