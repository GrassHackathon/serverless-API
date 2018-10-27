module.exports = function (context, req) {
    context.log('Return Category');

    var category = context.bindingData.category;

    var mongoClient = require("mongodb").MongoClient;
    mongoClient.connect("mongodb://hackathon-db:ZioX47Y090fuSWSImTmFgoFfw1vYw9nltSLQneb4Smzw9p1dSvP113o1SFI7N8k0I3VjhBGDyR3p2odNkXKE0A%3D%3D@hackathon-db.documents.azure.com:10255/?ssl=true",async function (err, client) {
        
        const coll = client.db('hackathon').collection('Category'); 

        // get all category
        if (category === undefined) {
            var allcategory = await coll.find({}).toArray();
        }
        // get specific category 
        else {
            var allcategory = await coll.find({'group':category}).toArray();
        }

        allcategory.forEach((elem)=>{
            delete elem['_id'];
        });

        context.res = {
            body : JSON.stringify(allcategory)
        }

        client.close();
        context.done();
    });

    
    //context.res = {
        // status: 200, /* Defaults to 200 */
        //body: "Hello "// + (req.query.name || req.body.name)
//};
    
};