import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { restartableTask } from 'ember-concurrency-decorators';
import { inject as service } from '@ember/service';

export default class CompetitionContestComponent extends Component {
  @service store
  @service currentUser

  showStartDialog = false

  @alias('contest.currentAttempt')
  contest_attempt

  @computed('contest')
  get problemCount() {
    if (this.contest) {
      return this.contest.hasMany('problems').ids().length
    }
  }

  @restartableTask createAttemptTask = function *() {
    const contest_attempt = this.store.createRecord('contest-attempt', {
      contest: this.contest
    })
    try {
      yield contest_attempt.save()
    } catch (e) {
      contest_attempt.rollbackAttributes()
    }
    
    this.set('showStartDialog', false)
    if (this.onAfterCreate){
      this.onAfterCreate()
    }
  }
}
