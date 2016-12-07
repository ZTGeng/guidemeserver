var login = require('lib/login');
var room = require('lib/room');
var friend = require('lib/friend');
var gcm = require('lib/gcm');
var rate = require('lib/rate');

var request = require('request');

module.exports = function(app) {


    app.get('/', function(req, res) {

        res.end("Node-Android-Project");
    });

    app.post('/login', function(req, res) {
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;

        login.login(email, password, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/register', function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var username = req.body.username;
        var role = req.body.role;

        login.register(email, password, username, role, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/checkemail', function(req, res) {
        var email = req.body.email;
        
        login.isEmailFree(email, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/chgpass', function(req, res) {
        var token = req.body.token;
        var opass = req.body.oldpass;
        var npass = req.body.newpass;

        login.changePassword(token, opass, npass, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/resetpass', function(req, res) {
        var email = req.body.email;

        login.sendResetPasswordEmail(email, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/resetpass/chg', function(req, res) {
        var email = req.body.email;
        var code = req.body.code;
        var npass = req.body.newpass;

        login.resetPassword(email, code, npass, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/createpublicroom', function(req, res) {
        var token = req.body.token;
        var des = req.body.des;

        room.createRoom(token, des, "public", function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/createprivateroom', function(req, res) {
        var token = req.body.token;
        var des = req.body.des;

        room.createRoom(token, des, "private", function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.get('/api/blindkeepalive/:token', function(req, res) {
        var token = req.params.token;

        room.blind_keep_alive(token, res);
    });
    
    app.post('/api/helperjoinroom', function(req, res) {
        var token = req.body.token;
        var roomId = req.body.room_id;

        room.helperJoinRoom(token, roomId, res, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.get('/api/helperkeepalive/:token/:room_id', function(req, res) {
        var token = req.params.token;
        var roomId = req.params.room_id;

        room.helper_keep_alive(token, roomId, res);
    });
    
    app.post('/api/helperleaveroom', function(req, res) {
        var token = req.body.token;
        var roomId = req.body.room_id;
        
        room.leaveRoom(token, roomId, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/select', function(req, res) {
        var blind_id = req.body.blind_id;
        var helper_id = req.body.helper_id;
        
        room.select(blind_id, helper_id, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/deleteroom', function(req, res) {
        var token = req.body.token;

        room.deleteRoom(token, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/getroomlist', function(req, res) {
        var token = req.body.token;

        room.getRooms(token, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/addfriend', function(req, res) {
        var m_id = req.body.m_id;
        var f_id = req.body.f_id;

        friend.add_friend(m_id, f_id, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/getfriendlist', function(req, res) {
        var token = req.body.token;

        friend.getFriends(token, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/updategcmtoken', function(req, res) {
        var token = req.body.token;
        var gcm_token = req.body.gcm_token;
        
        gcm.update_token(token, gcm_token, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    // app.post('/api/callfriends', function(req, res) {
    //     var id = req.body.id;
    //     var roomId = req.body.roomId;
    //     var isNavigation = req.body.isNavigation;
        
    //     gcm.call_friends(id, roomId, isNavigation, function(found) {
    //         console.log(found);
    //         res.json(found);
    //     });
    // });
    
    app.post('/api/callfriendsbyid', function(req, res) {
        var token = req.body.token;
        var friends = req.body.friends.split(',');
        var des = req.body.des;
        
        gcm.callFriendsById(token, friends, des, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/rate', function(req, res) {
        var rater_id = req.body.token;
        var ratee_id = req.body.ratee_id;
        var rateStr = req.body.rate;
        
        rate.rate(rater_id, ratee_id, rateStr, function(found) {
            console.log(found);
            res.json(found);
        }); 
    });
    
    app.post('/api/getrate', function(req, res) {
        var token = req.body.token;
        
        rate.getRateFloat(token, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
};

