module.exports = async function (context, req) {
    context.log('Return events');

    var eventid = context.bindingData.eventid;
    if (typeof(eventid) === 'object')
        eventid = parseInt(eventid.string, 10);

    if (eventid !== undefined) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hi i will return id : " + eventid + " all events for you"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please fill event id"
        };
    }
};