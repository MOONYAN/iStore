var chai = require('chai'),
    should = chai.should(),
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

var app = require('../app.js');

var studentId = 'apps24';

describe('整合測試', function() {
    var account,
        user = {
            username: "alice",
            password: "a1234"
        };

    it('開戶成功', function(done) {
        chai.request(app)
            .post(`/${studentId}/istore/account`)
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.account.should.have.property('name').eql('Alice');
                res.body.account.should.have.property('balance').eql(0);
                done();
            });
    });

    it('登入成功', function(done) {
        chai.request(app)
            .post(`/${studentId}/istore/user/login`)
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.account.should.have.property('name').eql('Alice');
                res.body.account.should.have.property('balance').eql(0);
                account = res.body.account;
                done();
            });
    });

    it('儲值成功', function(done) {
        chai.request(app)
            .put(`/${studentId}/istore/account`)
            .send({ _id: account._id, amount: 1000 })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.account.should.have.property('name').eql(account.name);
                res.body.account.should.have.property('balance').eql(account.balance + 1000);
                account = res.body.account;
                done();
            });
    });

    it('消費成功', function(done) {
        chai.request(app)
            .put(`/${studentId}/istore/account`)
            .send({ _id: account._id, amount: -1000 })
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.account.should.have.property('name').eql(account.name);
                res.body.account.should.have.property('balance').eql(account.balance - 1000);
                done();
            });
    });

    it('帳戶列表', function(done) {
        chai.request(app)
            .get(`/${studentId}/istore/account`)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.accounts.should.be.a('array');
                res.body.accounts.length.should.be.eql(1);
                done();
            });
    });

    it('交易明細', function(done) {
        chai.request(app)
            .get(`/${studentId}/istore/account/transaction/` + account._id)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.transactions.should.be.a('array');
                res.body.transactions.length.should.be.eql(2);
                done();
            });
    });

    it('結清成功', function(done) {
        chai.request(app)
            .delete(`/${studentId}/istore/account/` + account._id)
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });
});
