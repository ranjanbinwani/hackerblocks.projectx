import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | contests/hiring/contest/attempt', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:contests/hiring/contest/attempt');
    assert.ok(route);
  });
});
