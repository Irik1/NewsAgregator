// // const User = db.models.User;
// const bcrypt = require('bcryptjs');
const mongo = require('mongodb').MongoClient;

 
exports.register = async (req, res) => {

};

exports.auth = async (req, res) => {

};

exports.changepassword = async (req, res) => {

};
 
exports.updateUser = async (req, res) => {

};
  
// exports.exit = async (req, res) => {

// };
 
exports.findNews = async (req, res) => {
    try {
        const url = "mongodb://localhost:27017/";
        const mongoClient = new mongo(url, { useUnifiedTopology: true });
        let data = [];
        let result = res;
        mongoClient.connect(function(err, client){
            const db = client.db("NewsAgregator");
            const collection = db.collection("News");
            if(err) return console.log(err);
            collection.find({theme:"Игры"}).toArray(function(err, res){         
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

};

exports.changeRate = async (req, res) => {

};
 
// exports.publicNews = async (req, res) => {

// };
 


// // FETCH all Users
// exports.findAll = async (req, res) => {

//  // Save to PostgreSQL database
//  try {

//     let allUsers = await User.findAll();

//     // Send created all users to client
// 		res.send(allUsers);

//   } catch(err) {

//     res.status(500).send("Error -> " + err);

//   }
  
// };
 
// // Find a User by Id
// exports.findById = async (req, res) => {

// 	 // Save to PostgreSQL database
//      try {

//         let findedUser = await User.findById(req.params.userId)
    
//         // Send finded user to client
//             res.send(findedUser);
    
//       } catch(err) {
        
//         res.status(500).send("Error -> " + err);
    
//       }
// };
 
// // Update a User
// exports.update = async (req, res) => {

//     try {

//     let updateUser = await User.update( { name: req.body.name, age: req.body.age, active: req.body.active },
//       { where: {id: req.params.userid } });

//       res.status(200).send(updateUser);
//     } catch(err) {

//       res.status(500).send("Error -> " + err);
//     }
				  
// };
 
// // Delete a User by Id
// exports.delete = async (req, res) => {
    
// 	 // Save to PostgreSQL database
//      try {

//         let userId = req.params.userId;

//         await User.destroy({
//             where: { id: userId }
//           });
    
//         // Send response to client
//         res.status(200).send('User has been deleted!');
    
//       } catch(err) {
    
//         res.status(500).send("Error -> " + err);
    
//       }

// };

// // Get all Users
// exports.getAllUsers = async (req, res) => {

//   try {

//     const allUsers = await db.query(`
//       SELECT
//       "Users"."Id" as "id",
//       "UserName" as "fio",
//       "Roles"."Role" as "role",
//       "UserLogin" as "login",
//       "AccountStatuses"."Name" as "statuses",
//       "StatusId" as "statusid"

//       FROM "Users"

//       LEFT JOIN "Roles" on "Users"."RoleId" = "Roles"."Id"
//       LEFT JOIN "AccountStatuses" on "Users"."StatusId" = "AccountStatuses"."Id"

//       ORDER BY "id"
//     `)

//     res.status(200).send(allUsers[0]);

//   } catch(err) {

//     res.status(500).send("Error -> " + err);
//   }
// };

// // update user stutus id
// exports.updateAdminStatus = async (req, res) => {

//   try {

//     await db.query(`
//       UPDATE "Users" 
//       SET 
//       "StatusId" = ${req.body.newstatus} 
      
//       WHERE "Id" = ${req.body.id}
//     `);

//     res.status(200).send("connect");

//   } catch(err) {

//     res.status(500).send("Error -> " + err);
//   }
// };

// // admin add user
// exports.addNewUser = async (req, res) => {

//   try {

//     let salt = bcrypt.genSaltSync(10);

//     let hashpassword = bcrypt.hashSync(req.body.newuser.password, salt);

//     await db.query(`
//       INSERT
//       INTO "Users"
//       ("UserName", "UserLogin", "UserPW", "RoleId", "StatusId")
//       VALUES ('${req.body.newuser.username}', '${req.body.newuser.login}', '${hashpassword}', '${req.body.newuser.role}', 1)
//     `)

//     res.status(200).send('connect');

//   } catch(err) {

//     res.status(500).send("Error -> " + err);
//   }
// };


// // admin redaxUser user
// exports.redaxUser = async (req, res) => {

//   try {

//     let salt = bcrypt.genSaltSync(10);

//     let hashpassword = bcrypt.hashSync(req.body.newuser.password, salt);

//     await db.query(`
//       UPDATE "Users" 
//       SET
//       "UserName" = '${req.body.newuser.username}', "UserLogin" = '${req.body.newuser.login}', "UserPW" = '${hashpassword}', "RoleId" = ${req.body.newuser.role} 
//       WHERE "Id" = ${req.body.newuser.id}
//     `)

//     res.status(200).send('connect');

//   } catch(err) {

//     res.status(500).send("Error -> " + err);
//   }
// };

// exports.getAllRoles = async (req, res) => {

//   try {

//     const allRoles = await db.query(`
//       SELECT "Role"
//       FROM "Roles"
//       ORDER BY "Id"
//     `)

//     res.status(200).send(allRoles[0]);

//   } catch(err) {

//     res.status(500).send("Error -> " + err);
//   }
// };

// exports.redaxUserPassword = async (req, res) => {

//   try {

//     let findedUser = await db.models.User.findOne({
//       where: {
//         UserName: req.body.UserName,
//       },
//       raw: true
//     });

//     bcrypt.compare(req.body.pwuser, findedUser.UserPW, (err, isMatch) => {
//       if(err) throw err;

//       if(isMatch) {

//         bcrypt.genSalt(10, async (err, salt) => {
//             bcrypt.hash(req.body.newpwuser, salt, async (err, hash) => {

//               await db.query(`
//               UPDATE "Users" 
//               SET
//               "UserPW" = '${hash}'
//               WHERE "Id" = ${findedUser.Id}
//               `)

//               res.status(200).json({ispassword: true});

//             });
//         });
//       }
//         else {
//         res.status(200).json({ispassword: false});
//       }
//     });

//   } catch(err) {

//     res.status(500).send("Error -> " + err);
//   }
// };