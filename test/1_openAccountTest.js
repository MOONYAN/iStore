var chai = require('chai'),
    should = chai.should(),
    chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../app.js');

var studentId = 'apps24';

describe('開戶測試', function() {
    var account,
        user = {
            username: 'alice',
            password: 'a1234'
        };

    after(function(done) {
        chai.request(app)
            .delete(`/${studentId}/istore/account/` + account._id)
            .end(function() {
                done();
            });
    });

    it('開戶成功', function(done) {
        chai.request(app)
            .post(`/${studentId}/istore/account/`)
            .send(user)
            .end(function(err, res) {
                console.log(res.body.account);
                res.body.account.should.have.property('name').eql('Alice');
                res.body.account.should.have.property('balance').eql(0);
                account = res.body.account;
                done();
            });
    });

    it('帳戶已存在', function(done) {
        chai.request(app)
            .post(`/${studentId}/istore/account/`)
            .send(user)
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.error.should.have.eql('新增帳號錯誤');
                done();
            });
    });
})
