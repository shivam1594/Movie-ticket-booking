'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mappingCtrlStub = {
  index: 'mappingCtrl.index',
  show: 'mappingCtrl.show',
  create: 'mappingCtrl.create',
  update: 'mappingCtrl.update',
  destroy: 'mappingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mappingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mapping.controller': mappingCtrlStub
});

describe('Mapping API Router:', function() {

  it('should return an express router instance', function() {
    expect(mappingIndex).to.equal(routerStub);
  });

  describe('GET /api/mapping', function() {

    it('should route to mapping.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'mappingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/mapping/:id', function() {

    it('should route to mapping.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'mappingCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/mapping', function() {

    it('should route to mapping.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'mappingCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/mapping/:id', function() {

    it('should route to mapping.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'mappingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mapping/:id', function() {

    it('should route to mapping.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'mappingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mapping/:id', function() {

    it('should route to mapping.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'mappingCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
