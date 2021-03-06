module.exports = function (context, req) {
    context.log('Return events');

    var eventid = context.bindingData.eventid;
    if (typeof(eventid) === 'object')
        eventid = parseInt(eventid.string, 10);

    if (eventid !== undefined) {
        var mongoClient = require("mongodb").MongoClient;
        mongoClient.connect("mongodb://hackathon-db:ZioX47Y090fuSWSImTmFgoFfw1vYw9nltSLQneb4Smzw9p1dSvP113o1SFI7N8k0I3VjhBGDyR3p2odNkXKE0A%3D%3D@hackathon-db.documents.azure.com:10255/?ssl=true",async function (err, client) {

            const collcate = client.db('hackathon').collection('Category');
            var event = await collcate.findOne({'value':eventid});
            if (event === undefined || event === null) {

                client.close();
                context.res = {
                    status: 404,
                    body: "No this event id"
                };
                context.done();
            }
            const collevent = client.db(event.group).collection(event.element);
            var allevent = await collevent.find({}).toArray();
            allevent.forEach((elem)=>{
                delete elem['_id'];
            });
            const collicon = client.db('front-end').collection('icons');
            var groupicon = await collicon.findOne({'group':event.group});
            if (groupicon === undefined || groupicon === null)
                groupicon = '';
            else
                groupicon = groupicon.icon;

            context.res = {
                body : JSON.stringify({
                    'events' : allevent,
                    'groupicon' : groupicon,
                })
            }

            client.close();
            context.done();
        });
    }
    else {
        context.res = {
            status: 400,
            body: "Please fill event id"
        };
        context.done();
    }
};