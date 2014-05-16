/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
define([
  'angular',
  './config',
  './modules/attributes/index',
  './modules/conditions/index',
  './modules/divisions/index',
  './modules/instances/index',
  './modules/interface/index',
  './modules/organizations/index',
  './modules/procedures/index',
 */
define([
  'angular',
  './config',
  './modules/attributes/index',
  './modules/conditions/index',
  './modules/divisions/index',
  './modules/instances/index',
  './modules/interface/index',
  './modules/organizations/index',
  './modules/procedures/index',
  './modules/system/index',
  './modules/patient/index',
  './modules/users/index'
], function (ng) {
  'use strict';

  return ng.module('app', [
    'app.constants',
    'app.attributes',
    'app.conditions',
    'app.divisions',
    'app.instances',
    'app.interface',
    'app.organizations',
    'app.procedures',
    'app.system',
    'app.patient',
    'app.users'
  ]);
});
