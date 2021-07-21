const assert =require('assert');

describe('webpack.base.js test case', ()=>{
    const baseConfig =require('../../lib/webpack.base')
    console.log(baseConfig)
    it('entry',()=>{
      assert.equal(baseConfig.entry.index,'E:/webpackStudy/webpack02/build-webpack/test/smoke/template/src/index/index.js')
      assert.equal(baseConfig.entry.search,'E:/webpackStudy/webpack02/build-webpack/test/smoke/template/src/search/index.js')
    })
})