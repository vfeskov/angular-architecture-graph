var should = require('should');

describe("angular", function() {

  var angular

  beforeEach(function() {
    angular = require('../src/fake-angular')()
  })

  it("should be defined", function() {
    should.exist(angular)
  })

  it("should be a different instance every time is required", function() {
    var angular1 = require('../src/fake-angular')()
    var angular2 = require('../src/fake-angular')()

    angular1.should.not.be.equal(angular2)

  })

  describe("module", function() {

    it("should define a module if called with an array as 2nd argument", function() {
      var module = angular.module("testModule", [])
      should.exist(module)
    })

    it("should return a defined method if called with a single argument", function() {
      angular.module('testModule', [])
      should.exist(angular.module('testModule'))
    })

    var methods = ['constant',
      'controller',
      'directive',
      'factory',
      'filter',
      'provider',
      'service',
      'value',
      'run',
      'config'
    ];

    var globalApis = ['lowercase',
      'uppercase',
      'forEach',
      'extend',
      'noop',
      'identity',
      'isUndefined',
      'isDefined',
      'isObject',
      'isString',
      'isNumber',
      'isDate',
      'isArray',
      'isFunction',
      'isElement',
      'copy',
      'equals',
      'bind',
      'toJson',
      'fromJson',
      'bootstrap',
      'injector',
      'element',
      'module'
    ];

    describe("should have defined method", function() {
      methods.forEach(function(method) {
        it(method, function() {
          var module = angular.module('testModule', []);
          should.exist(module[method])
        })
      })
    })

    describe("should have defined methods of global api", function(){
      globalApis.forEach(function(method){
        it(method, function(){
          should.exist(angular[method])
          angular[method].should.be.a.Function
        })
      })
    })

    describe("every method should return module to allow chainability", function() {
      methods.forEach(function(method) {
        it('#' + method, function() {
          var module = angular.module('testModule', []);
          module.should.be.equal(module[method]())
        })
      })
    })

    it("should contains reference to modules on which it depenends", function() {
      var module1 = angular.module('testModule1', [])
      var modules = angular.module('testModule2', ['testModule1']).modules

      modules.should.have.a.lengthOf(1)
      modules[0].should.be.equal('testModule1')
    })

    describe('items', function() {
      it('should contains defined items', function() {
        var module = angular.module('testModule')
          .filter('testFilter')
          .controller('testController')

        module.items.should.have.a.lengthOf(2)
        module.items.should.containEql('testFilter')
        module.items.should.containEql('testController')
      })
    })

    describe("requiring module before declaring", function() {
      it("should return module definition even if module is not already defined", function() {
        var module = angular.module('testModule')
        should.exist(module)
      })

      it("should replace afterwise", function () {
        var module1 = angular.module('testModule1')
        var module = angular.module('testModule')
        var sameModule = angular.module('testModule', ['testModule1'])

				module.should.be.equal(sameModule)
        module.modules.should.have.a.lengthOf(1)
      })
    })
  })

  describe("controllers", function() {
    it('property should contain all defined controllers with array definition', function() {
      angular
        .module('testModule1', [])
        .controller('testController1', ['dep1', function (asd) {}])
        .controller('testController2', ['dep2', 'dep3', function (asd) {}]);

      angular.modules.should.have.a.lengthOf(1)
      angular.modules[0].should.have.property('name', 'testModule1')

      var testModule1 = angular.modulesMap['testModule1'];
      testModule1.controllers.should.have.a.lengthOf(2);
      testModule1.controllers[0].should.have.property('name', 'testController1');
      testModule1.controllers[1].should.have.property('name', 'testController2');

      testModule1.controllers[0].deps.should.be.a.Array;
      testModule1.controllers[0].deps.should.have.a.lengthOf(1);
      testModule1.controllers[0].deps[0].should.be.equal('dep1')

      testModule1.controllers[1].deps.should.be.a.Array;
      testModule1.controllers[1].deps.should.have.a.lengthOf(2);
      testModule1.controllers[1].deps[0].should.be.equal('dep2');
      testModule1.controllers[1].deps[1].should.be.equal('dep3');
    })

it('property should contain all defined controllers with function definition', function() {
      angular
        .module('testModule1', [])
        .controller('testController1', function (dep1) {})
        .controller('testController2', function (dep2, dep3) {});

      angular.modules.should.have.a.lengthOf(1)
      angular.modules[0].should.have.property('name', 'testModule1')

      var testModule1 = angular.modulesMap['testModule1'];
      testModule1.controllers.should.have.a.lengthOf(2);
      testModule1.controllers[0].should.have.property('name', 'testController1');
      testModule1.controllers[1].should.have.property('name', 'testController2');

      testModule1.controllers[0].deps.should.be.a.Array;
      testModule1.controllers[0].deps.should.have.a.lengthOf(1);
      testModule1.controllers[0].deps[0].should.be.equal('dep1')

      testModule1.controllers[1].deps.should.be.a.Array;
      testModule1.controllers[1].deps.should.have.a.lengthOf(2);
      testModule1.controllers[1].deps[0].should.be.equal('dep2');
      testModule1.controllers[1].deps[1].should.be.equal('dep3');
    })
  })
})
