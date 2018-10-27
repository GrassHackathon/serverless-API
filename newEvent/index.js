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

        const catecoll = client.db('hackathon').collection('Category')
        const find_output = await catecoll.findOne({'element' : eventElement});

        if (find_output === undefined || find_output === null) {
            const value_output = await catecoll.find().sort({'value' : -1}).limit(1).toArray();
            await catecoll.insertOne({'group':eventGroup, 'element':eventElement, 'value' :  value_output[0]['value']+1})
        }

        context.res = {
            body:"ok"
        }
        client.close();
        context.done();
    })
};