const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const Reservation = require('../../../lib/schema/reservation');

describe('Reservations Library', function () {
  // set up stub for reservations
  const debugStub = function () {
    return sinon.stub();
  }
  let reservations;

  before(function () {
    reservations = proxyquire('../../../lib/reservations', {
      debug: debugStub
    })
  })
  context('Validate', function () {
    it('should pass a valid reservation with no optional fields', function () {
      const reservation = new Reservation({
        date: '2017/06/10',
        time: '06:02 AM',
        party: 4,
        name: 'Family',
        email: 'username@example.com'
      });
      return reservations.validate(reservation)
        .then(actual => actual.should.deep.equal(reservation));
    });

    it('should fail an invalid reservation with a bad email', function () {
      const reservation = new Reservation({
        date: '2017/06/10',
        time: '06:02 AM',
        party: 4,
        name: 'Family',
        email: 'username@example.com'
      });
      return reservations.validate(reservation)
        .catch(error => error.should.be.an('error').and.not.be.null);
    })
  })
})
