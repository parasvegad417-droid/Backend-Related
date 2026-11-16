const fs = require('fs');

fs.rename('paras.text','vegad.text',(err)=>{
    if(err)console.log(err);
    console.log("done")
})
