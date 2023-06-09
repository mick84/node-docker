"# node-docker" 
##Redis issue:
###When logging in, command "req.session.user=user" in authCtrl.login throws error "invalid argument", nothing is written in redis session, writing "KEYS \*" in redis-cli after login attempt does not find any record
