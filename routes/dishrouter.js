const express = require('express');
const bodyparser = require('body-parser');


const dishRouter = express.Router();

dishRouter.use(bodyparser.json());


dishRouter.route('/')


.all( (req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();

})


.get((req,res,next)=>{

        res.end('Will Send all the dishes to you');

})



.post((req,res,next)=>{

    res.end('Will add the dish: ' + req.body.name + 'With details: '
    + req.body.description);
})



.put((req,res,next)=>{

    res.statusCode = 403;
    res.end('PUT Operation not supported on dishes');
})



.delete((req,res,next)=>{

    res.end('Deleting all the dishes:');
});




dishRouter.route('/:dishesId')

.all((req,res,next) =>{

        res.statusCode = 200;
        res.setHeader('Content-Type','text/plain');
        next();
})


.get((req,res,next)=>{


    res.end("Will send the details of the dish : " + req.params.dishesId + 'to you!');
})



.post((req,res,next)=>{


    res.statusCode =403;
    res.end('Post Operation not supported on dishes' + req.params.dishesId);
})


.put((req,res,next)=>{

res.write('Updating the dish: ' + req.params.dishesId + '\n');
res.end('Will Update the dish: ' + req.body.name + 'with details:' + req.body.description );

})

.delete((req,res,next)=>{

    res.end('Deleting dish:' + req.params.dishesId);

});


module.exports = dishRouter;
