const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');


const Leaders = require('../models/leaders');


const leadRouter = express.Router();

leadRouter.use(bodyparser.json());


leadRouter.route('/')

.get((req,res,next)=>{

        Leaders.find({})
        .then((leaders)=>{

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);

        },(err)=> next(err))
        .catch((err)=>next(err));

})

.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

        Leaders.create(req.body)
        .then((leader)=>{
            console.log('Leader Created',leader);
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);


        }, (err)=> next(err))
        .catch((err)=>next(err));
})


.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{


    res.statusCode = 403;
    res.end("PUT Operation not supported with leaders");
})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

    Leaders.remove({})
    .then((resp)=>{

        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);

    },(err)=> next(err))
    .catch((err)=>next(err));
});



leadRouter.route('/:leaderId')

.get((req,res,next)=>{

    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200;
        res.json(leader);

    },(err)=> next(err))
    .catch((err)=>next(err));
})



.post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

res.statusCode =403;
res.end('Post Operation not supported on leader' + req.params.leaderId);
})


.put(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

        Leaders.findByIdAndUpdate(req.params.leaderId,{
            $set: req.body
        }, {new: true})
        .then((leader)=>{
            res.statusCode= 200;
            res.json(leader);
        },(err)=> next(err))
        .catch((err)=>next(err));
})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{

    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{

        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);

    },(err)=> next(err))
    .catch((err)=>next(err));

});



module.exports = leadRouter;