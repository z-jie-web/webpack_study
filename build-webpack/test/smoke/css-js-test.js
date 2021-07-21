const glob = require('glob-all');

describe ('Checking generated css js files', () => {
  it('should generate css js files', (done) => {
    const file=glob.sync([
      './dist/index_*.js',
      './dist/index_*.css',
      './dist/search*.js',
      './dist/search*.css',
    ])
    if(file.length){
      done();
    }else{
      throw new Error('no css js files generated')
    }
  })
})