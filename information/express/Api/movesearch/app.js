var request = require("request");

request('', function(error, respond, body){
    if(!error && respond.statusCode == 200){
        var parsedDate = JSON.parse(body);
        console.log(parsedDate[""])
    }
})