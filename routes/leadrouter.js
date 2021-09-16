const express = require('express');
const bodyparser = require('body-parser');


const leadRouter = express.Router();

leadRouter.use(bodyparser.json());


leadRouter.route('/')


.all((req,res,next)=>{

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})


.get((req,res,next)=>{

    res.end("Will send all leaders for you!");
})

.post((req,res,next)=>{

    res.end('Will add the leader : ' + req.body.name + 'With details'  + req.body.description);
})


.put((req,res,next)=>{


    res.statusCode = 403;
    res.end("PUT Operation not supported with leaders");
})

.delete((req,res,next)=>{

        res.end("Delete All the leaders");
});



leadRouter.route('/:leaderId')


.all((req,res,next) =>{

    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})


.get((req,res,next)=>{


res.end("Will send the details of the leader : " + req.params.leaderId + 'to you!');
})



.post((req,res,next)=>{


res.statusCode =403;
res.end('Post Operation not supported on leader' + req.params.leaderId);
})


.put((req,res,next)=>{

res.write('Updating the leader: ' + req.params.leaderId + '\n');
res.end('Will Update the leader: ' + req.body.name + 'with details:' + req.body.description );

})

.delete((req,res,next)=>{

res.end('Deleting leader:' + req.params.leaderId);

});



module.exports = leadRouter;