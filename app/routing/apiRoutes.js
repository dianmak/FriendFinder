// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        friends.push(req.body);
        res.json(findMatch(req.body, friends));
    });

    function findMatch(newFriend, friends) {
        let bestFriend;
        let lowestDifference = 50;
        friends.forEach(friend => {
            let currDifference = findScoreDifference(friend, newFriend);
            if (currDifference < lowestDifference) {
                bestFriend = friend;
                lowestDifference = currDifference;
            }
        });
        return bestFriend;
    }

    function findScoreDifference(friend1, friend2) {
        let totalDiff = 0;
        for (let i = 0; i < 10; i++) {
            totalDiff += Math.abs(friend1.scores[i] - friend2.scores[i]);
        };
        return totalDiff;
    }

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    // app.post("/api/tables", function (req, res) {
    //     // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    //     // It will do this by sending out the value "true" have a table
    //     // req.body is available since we're using the body parsing middleware
    //     if (tableData.length < 5) {
    //         tableData.push(req.body);
    //         res.json(true);
    //     }
    //     else {
    //         waitListData.push(req.body);
    //         res.json(false);
    //     }
    // });

};
