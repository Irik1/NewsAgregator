// // const User = db.models.User;
// const bcrypt = require('bcryptjs');
const mongo = require('mongodb');

 
exports.register = async (req, res) => {

};

exports.auth = async (req, res) => {
    if (req.session.user_id) {
        User.findById(req.session.user_id, function(user) {
          if (user) {
            req.currentUser = user;
            next();
          } else {
            res.redirect('');
          }
        });
      } else {
        res.redirect('');
      }
};
 
exports.updateUser = async (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    const url = "mongodb://localhost:27017/";
    const mongoClient = new mongo.MongoClient(url, { useUnifiedTopology: true });

};
  
exports.logout = async (req, res) => {
    // Удалить сессию
    if (req.session) {
        req.session.destroy(function() {});
    }
    res.redirect('');
};
 
exports.findNews = async (req, res) => {
    try {
        let theme = req.body.theme;
        let header = req.body.header;
        const url = "mongodb://localhost:27017/";
        const mongoClient = new mongo.MongoClient(url, { useUnifiedTopology: true });
        let data = [];
        let result = res;
        mongoClient.connect(function(err, client){
            const db = client.db("NewsAgregator");
            const collection = db.collection("News");
            if(err) return console.log(err);
            if (header == ''){
                collection.find({theme:theme}).toArray(function(err, res){         
                    data = res;
                    result.json(data);   
                });  
            }
            else {
                collection.find({header: new RegExp(header,"i")}).toArray(function(err, res){         
                    data = res;
                    result.json(data);
                });  
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error -> " + err);
    }

};

exports.showComments = async (req, res) => {
    try {
        let id = req.params.newsId;
        const url = "mongodb://localhost:27017/";
        const mongoClient = new mongo.MongoClient(url, { useUnifiedTopology: true });
        let data = [];
        let result = res;
        mongoClient.connect(function(err, client){
            const db = client.db("NewsAgregator");
            const collection = db.collection("Comments");
            if(err) return console.log(err);
            collection.find({_id: new mongo.ObjectID(newsId)}).toArray(function(err, res){         
                data = res;
                result.json(data);   
            });  
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error -> " + err);
    }
};
 

exports.commentNews = async (req, res) => {
    try {
        let id = req.params.newsId;
        const url = "mongodb://localhost:27017/";
        const mongoClient = new mongo.MongoClient(url, { useUnifiedTopology: true });
        let data = [];
        let result = res;
        mongoClient.connect(function(err, client){
            const db = client.db("NewsAgregator");
            const collection = db.collection("Comments");
            if(err) return console.log(err);
            collection.find({_id: new mongo.ObjectID(newsId)}).toArray(function(err, res){         
                data = res;
                result.json(data);   
            });  
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error -> " + err);
    }
};

exports.changeRate = async (req, res) => {
    const url = "mongodb://localhost:27017/";
    const mongoClient = new mongo.MongoClient(url, { useUnifiedTopology: true });
    let operation = req.body.indicator;
    let newsId = req.body.id;
    let result = res;
    mongoClient.connect(function(err, client){
        const db = client.db("NewsAgregator");
        const collection = db.collection("News");
        let query; let rate;
        collection.findOne({_id: new mongo.ObjectID(newsId)},function(err,res){
            rate = res.rate;
            if (operation == "+")
                rate = rate+1;
            else
                rate = rate-1;
            collection.updateOne({_id: new mon.ObjectID(newsId)},{$set: {rate: rate}},function(err,res){
                if (err) throw err;
                result.json("OK");
            });
        });
    });
};
