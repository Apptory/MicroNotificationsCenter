var NotificationsCenter = (function () {

    var callbacks = {};

    /**
     * Attaching Callback to Specific Notification
     * @param {string} name
     * @param {function} callback
     */
    function listen(name, callback) {
        if (!callbacks[name]) callbacks[name] = [];
        callbacks[name].push(callback);
    };

    /**
     * Firing Event Based on Supplied name
     * @parmas {mixed} 
     */
    function fire(/* <name>, <param1>, <param2>.. */) {
        /* Validate Paramters */
        if (arguments.length == 0) throw new Error("NotificationsCenter: Syntax Error. Usage: NotificationsCenter.fire(<notification_name>, <[params]>);");

        var params = [];
        var name = arguments[0];
        /* Pushing arrguments */
        for (var index = 1; index < arguments.length; index++) params.push(arguments[index]);        

        var callbacks = _getCallbacks(name);
        if (typeof (callbacks) == 'undefined') return;
        /* Loging Loging Loging */
        console.log('Firing Event: ' + name + ', With Params: '); console.log(params);

        for (var index = 0; index < callbacks.length; index++) callbacks[index].apply(this, params);
    };

    function _getCallbacks(name) {
        return (callbacks[name] ? callbacks[name] : []);
    }

    return {
        /* Methods */
        listen: listen,
        fire: fire
    };
})();