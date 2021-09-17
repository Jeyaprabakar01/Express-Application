const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');


const Dishes = require ('../models/dishes');


const dishRouter = express.Router();

dishRouter.use(bodyparser.json());


dishRouter.route('/')

.get((req,res,next)=>{

    Dishes.find({})
    .then((dishes) =>{

        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    }, (err)=> next(err))
    .catch((err)=>next(err));

})



.post((req,res,next)=>{

    Dishes.create(req.body)
    .then((dish) =>{

        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    }, (err)=> next(err))
    .catch((err)=>next(err));

})



.put((req,res,next)=>{

    res.statusCode = 403;
    res.end('PUT Operation not supported on dishes');
})



.delete((req,res,next)=>{

    Dishes.remove({})
    .then((resp)=>{

        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);

    },(err)=> next(err))
    .catch((err)=>next(err));

});




dishRouter.route('/:dishesId')

.get((req,res,next)=>{

    Dishes.findById(req.params.dishesId)
    .then((dish)=>{  
        res.statusCode= 200;
        res.json(dish);
    },(err)=> next(err))
    .catch((err)=>next(err));

    
})



.post((req,res,next)=>{
    res.statusCode =403;
    res.end('Post Operation not supported on dishes' + req.params.dishesId);
})


.put((req,res,next)=>{

        Dishes.findByIdAndUpdate(req.params.dishesId, {
            $set: req.body
        }, {new: true})
        .then((dish)=>{  
            res.statusCode= 200;
            res.json(dish);
        },(err)=> next(err))
        .catch((err)=>next(err));


})

.delete((req,res,next)=>{

    Dishes.findByIdAndRemove(req.params.dishesId)
    .then((resp)=>{

        res.status = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);

    },(err)=> next(err))
    .catch((err)=>next(err));

});


module.exports = dishRouter;
