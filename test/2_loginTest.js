var chai = require('chai'),
    should = chai.should(),
    chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../app.js');

var studentId='apps24';

describe('登入測試', function () {
    var account,
        user = {
            username: 'alice',
            password: 'a1234'
        };

    before(function(done){
        chai.request(app)
            .post(`/${studentId}/istore/account`)
            .send(user)
            .end(function () {
                done();
            });
    });

    after(function (done) {
        chai.request(app)
            .delete(`/${studentId}/istore/account/` + account._id)
            .end(function () {
                done();
            });
    });

    it('登入成功', function (done) {
        chai.request(app)
            .post(`/${studentId}/istore/user/login`)
            .send(user)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.account.should.have.property('name').eql('Alice');
                res.body.account.should.have.property('balance').eql(0);
                account = res.body.account;
                done();
            });
    });

    it('密碼錯誤', function (done) {
        user.password = 'b1234';
        chai.request(app)
            .post(`/${studentId}/istore/user/login`)
            .send(user)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.error.should.have.eql('密碼錯誤');
                done();
            });
    });

    it('帳號不存在', function (done) {
        user.username = 'bob';
        chai.request(app)
            .post(`/${studentId}/istore/user/login`)
            .send(user)
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.error.should.have.eql('帳號不存在');
                done();
            });
    });
})