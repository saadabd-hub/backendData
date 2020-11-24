const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validation} = require('express-validator');
const User = require('../model/User');
module.exports = class userController {
    static register (req, res){
         const errors = validationResult (req);
         if (!errors.isEmpty ()) {
           return res.status (400).json ({errors: errors.array ()});
        }
        bcrypt.hash (req.body.password, 10, function (err, hash) {
          console.log('reg', req.body);
            const {nik, username, email, namaDepan, namaBelakang} = req.body;
          User.create ({
            NIK : nik,
            Username : username,
            Password : hash,
            Email : email,
            namaDepan : namaDepan,
            namaBelakang : namaBelakang
          })

            .then (result => {
              res.status (201).json ({
                success: true,
                msg: 'Success Create',
                data: result,
              });
            })
            .catch (err => {
              res.status (500).json ({
                success: false,
                msg: 'Failed Register',
                detail: err,
              });
            });
        });
    }

    static async login (req,res) {
        const errors = validationResult (req);
        if (!errors.isEmpty ()) {
          return res.status (400).json ({errors: errors.array()});
        }
        const{ email, password} = req.body
        try{
          const userName = await User.findOne({email})
          if(!userName){
            return res.status(400).json({msg:"User Invalid"})
          }
          const matchPassword = await bcrypt.compare(password, userName.password)
          if(!matchPassword){
            return res.status(400).json({error: [{msg: "Invalid Username/Email"}]})
          }
          const token = {
            user : {
              id : userName.id
            }
          }
          jwt.sign(token, 'CLIENT', { expiresIn: "10h" }, (err, tokens) =>{
            if(err){
              res.json({
                success: false,
                data: err
              })
            }else{
              res.json({
                success: true,
                data: userName,
                tokens
              })
            }
          })

        }catch(err){
          res.status(500).json(err)
        }
    }
}