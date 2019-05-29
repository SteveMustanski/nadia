/* eslint-disable no-undef */
const chai = require('chai');
const should = chai.should();
const Reservation = require('../../../../lib/schema/reservation');

describe('Reservation Schema', function () {
  context('Data and TimeCombination', function () {
    it('should return an ISO 8601 data and time with valid input', function () {
      const date = '2017/06/10';
      const time = '06:02 AM';

      Reservation.combineDateTime(date, time)
        .should.equal('2017-06-10T06:02:00.000Z');
    });
    it('should return null given invalid input', function () {
      const date = '(W@#$@)';
      const time = 'uhoh';

      should.not.exist(Reservation.combineDateTime(date, time));
    });
  });
});
