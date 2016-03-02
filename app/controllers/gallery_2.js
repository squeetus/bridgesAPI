var mongoose = require('mongoose'),
<<<<<<< HEAD
    User = mongoose.model('User'),
    Account = mongoose.model('Account'),
    Assignment = mongoose.model('Assignment')

exports.view = function(req, res, next) {

    var getAssignments = function(assig, assignmentsRes, cb) {
        //console.log(assig, assignmentsRes);
        if (assig.length == 0)  {
          return cb(assignmentsRes)
        }
            var assID = assig.pop()

            Assignment
                .findOne({
//                         "assignmentID": assID
                            "assignmentNumber": assID,
                            "subAssignment": "00"
                         })
                .exec(function(err, assID) {
                      if (err) return null;
//                        console.log(assID);
                      if (assID) assignmentsRes.push(assID)
                      getAssignments(assig, assignmentsRes, cb)
                  })
            }


    if (!req.params.userNameRes)
        return next("no user name provided")

        //Look up user to get email; assignments are associated with email
        User
            .findOne({
                username: req.params.userNameRes,
            })
            .exec(function(err, userResult){
                if(err) return next(err)

                if(!userResult) return next("could not find user")

                Assignment
                    .find({
                        //email: req.params.userNameRes,
                        email: userResult.email,
                        subAssignment: "00"
                        //$or: [{assignmentID: /.00$/}, {assignmentID: /.0$/}] //Search for assignments with whole numbers
                    })
        //            .limit( 5 )   //Do we want to load every single whole number assignment, or just some? Query might be time intensive.
                    .sort({
                        assignmentID: -1
                    })
                    .exec(function(err, assignmentResult) {
                        if (err) return next(err)

                        if (!assignmentResult) return next("could not find " +
                                                             "assignment " + req.params.userNameRes)

                        var assig = []
                        //console.log(assignmentResult);
                        for (i = 0; i < assignmentResult.length; i++) {
                            //if(assignmentResult[i].data)
                               // assig.push(assignmentResult[i].assignmentID)
                            assig.push(assignmentResult[i].assignmentNumber)

                        }

        //                        console.log(assignmentResult, assignmentResult.length);

        //                        if(assignmentResult[i].assignmentNumber != "")
        //                        assig.push(assignmentResult[i].assignmentNumber)
        //                    else

                        getAssignments(assig, [], function(assignmentsRes) {

                                  return res.render('assignments/gallery_2', {
                                                    "title": "Assignment gallery",
                                                    "user":req.user,
                                                    "usernames": req.params.userNameRes,
                                                    "assignments":assignmentsRes
                                                  })
                        })
                    })
              })
}
=======
    Assignment = mongoose.model('Assignment');

exports.view = function(req, res, next) {
  Assignment
      .find({
          email: req.user.email,
          subAssignment: "00"
      }, {
          assignmentID: 1,
          assignmentNumber: 1,
          "data.visual": 1,
          shared: 1
      })
      .limit( 25 )   //Do we want to load every single whole number assignment, or just some? Query might be time intensive.
      .sort({
          assignmentID: 1
      })
      .exec(function(err, assignmentResult) {
          if (err) return next(err);
          if (!assignmentResult) return next("could not find " + "assignment " + req.params.userNameRes);

          return res.render('assignments/gallery_2', {
            "title": "Assignment gallery",
            "user":req.user,
            "usernames": req.params.userNameRes,
            "assignments":assignmentResult
          });


      });
};
>>>>>>> 3a5337d6ec8aec65da6daadb1a7e85aefe66fbf0
