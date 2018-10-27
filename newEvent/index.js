module.exports = function (context, req) {
    
    var mongoClient = require("mongodb").MongoClient;
    mongoClient.connect("mongodb://hackathon-db:ZioX47Y090fuSWSImTmFgoFfw1vYw9nltSLQneb4Smzw9p1dSvP113o1SFI7N8k0I3VjhBGDyR3p2odNkXKE0A%3D%3D@hackathon-db.documents.azure.com:10255/?ssl=true",async function (err, client) {

        var data = req.body

        context.log(data);


        if (! ('name' in data) || ! ('address' in data) || ! ('date' in data)) {
            context.res = {
                status : 400,
                body : 'no enough data',
            }
            client.close();
            context.done();
            return;
        }
        
        
        if(! ('group' in data))
            eventGroup = 'Other';
        else
            eventGroup = data['group'];
        
        if (! ('element' in data))
            eventElement = 'Other';
        else
            eventElement = data['element'];
        
        if (! ('infoLink' in data)) {
            data['infoLink'] = '';
        }

        var keys = ['name', 'infoLink', 'address', 'date']
        inputdata = {}

        keys.forEach((k)=>{
            inputdata[k] = data[k];
        });

        const coll = client.db(eventGroup).collection(eventElement);
        const insert_output = await coll.insertOne(inputdata);

        if (insert_output.insertedCount == 0) {
            context.res = {
                status : 503,
                body:'new Event fail'
            }

            client.close();
            context.done();
            return;
        }

        context.res = {
            body:"ok"
        }
        client.close();
        context.done();
    })
};