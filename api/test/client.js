process.env.NODE_ENV = 'test';


const conn = require('D:/aurafoodstage/api/models/db.js')
let mongoose = require("mongoose");
let Client = require('D:/aurafoodstage/api/models/Client.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('D:/aurafoodstage/api/app.js');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Client', () => {
    beforeEach((done) => { //Before each test we empty the database
        Client.remove({}, (err) => { 
           done();           
        });        
    });
    describe('/POST create', () => {
        it('it should not POST a book without pages field', (done) => {
            let client = {
                fname:"bassem",
                lname:"benahmed",
                
                website:"sskkr",
                address:"2 rue baa",
            }
          chai.request(app)
              .post('/create')
              .send(client)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                done();
              });
        });
  
    });
  });
  