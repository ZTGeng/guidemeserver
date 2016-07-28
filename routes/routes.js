var chgpass = require('lib/chgpass');
var register = require('lib/register');
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

        register.register(email, password, username, role, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/checkemail', function(req, res) {
        var email = req.body.email;
        
        register.isEmailValid(email, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/checkusername', function(req, res) {
        var username = req.body.username;
        
        register.isUsernameValid(username, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/chgpass', function(req, res) {
        var id = req.body.id;
        var opass = req.body.oldpass;
        var npass = req.body.newpass;

        chgpass.cpass(id, opass, npass, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/resetpass', function(req, res) {
        var email = req.body.email;

        chgpass.respass_init(email, function(found) {
            console.log(found);
            res.json(found);
        });
    });

    app.post('/api/resetpass/chg', function(req, res) {
        var email = req.body.email;
        var code = req.body.code;
        var npass = req.body.newpass;

        chgpass.respass_chg(email, code, npass, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/createpublicroom', function(req, res) {
        var id = req.body.id;
        var des = req.body.des;

        room.create_room(id, des, "public", function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/createprivateroom', function(req, res) {
        var id = req.body.id;
        var des = req.body.des;

        room.create_room(id, des, "private", function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.get('/api/blindkeepalive/:id', function(req, res) {
        var id = req.params.id;

        room.blind_keep_alive(id, res);
    });
    
    app.post('/api/helperjoinroom', function(req, res) {
        var id = req.body.id;
        var room_id = req.body.room_id;

        room.helper_join_room(id, room_id, res, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.get('/api/helperkeepalive/:id/:room_id', function(req, res) {
        var id = req.params.id;
        var room_id = req.params.room_id;

        room.helper_keep_alive(id, room_id, res);
    });
    
    app.post('/api/helperleaveroom', function(req, res) {
        var id = req.body.id;
        var room_id = req.body.room_id;
        
        room.leave_room(id, room_id, function(found) {
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
        var id = req.body.id;

        room.delete_room(id, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/getroomlist', function(req, res) {
        var id = req.body.id;

        room.get_rooms(id, function(found) {
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
        var id = req.body.id;

        friend.get_friends(id, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/updategcmtoken', function(req, res) {
        var id = req.body.id;
        var gcm_token = req.body.gcm_token;
        
        gcm.update_token(id, gcm_token, function(found) {
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
        var id = req.body.id;
        var friends = req.body.friends.split(',');
        var des = req.body.des;
        
        gcm.call_friends_by_id(id, friends, des, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
    app.post('/api/rate', function(req, res) {
        var rater_id = req.body.id;
        var ratee_id = req.body.ratee_id;
        var rateStr = req.body.rate;
        
        rate.rate(rater_id, ratee_id, rateStr, function(found) {
            console.log(found);
            res.json(found);
        }); 
    });
    
    app.post('/api/getrate', function(req, res) {
        var id = req.body.id;
        
        rate.getRateFloat(id, function(found) {
            console.log(found);
            res.json(found);
        });
    });
    
};

