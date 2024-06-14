document.addEventListener('deviceready', function() {
    // Get the IP address
    getIpAddress();
    webserver.onRequest(
        function(request) {
            console.log("We got a request: ", request.path);
            
            let requestId,query;
            requestId=request.requestId;
            query=request.query == 'undefined' ? "":request.query;
            document.getElementById('reqId').innerHTML=requestId;
            document.getElementById('query').innerHTML= query;
            // sendResponse(responseId, responseObject, callbackSuccess, callbackError)
            if(request.path == '/video'){
                respObj = {
                    path: '/storage/emulated/0/Download/Video-30.mp4',
                    headers: {'Content-Type': 'video/mp4'}
                }
            }else if(request.path == '/image'){
                respObj = {
                    path: '/storage/emulated/0/Download/landis4.png',
                    headers: {'Content-Type': 'image/png'}
                }
            }else{
                respObj = {
                    status:200,
                    body: "<html><body><img src='https://images.squarespace-cdn.com/content/v1/63699bc8967f8c544c9d142e/9fbb5933-e762-4249-b3a5-a6317fbad1b2/Airbus%2BA380%2BBritish%2BAirways%2B800x449.jpg'></body></html>",
                    // path: '/storage/emulated/0/Download/index.html',
                    headers: {
                        'Content-Type': 'text/html'
                    }
                }
            }
            webserver.sendResponse(
                request.requestId, responseObject(respObj)
                // {
                //     status: 200,
                //     body: '<html><body>Hi</body></html>',
                //     // path: '/storage/emulated/0/Download/',
                //     path: '/storage/emulated/0/Download/catwil.jpeg',
                //     headers: {
                //         'Content-Type': 'image/jpeg'
                //     }
                // }
            );
        }
    );
    
}, false);

function wsstart(){
    webserver.start(startSuccess,startError,8000);
}

function startSuccess(){
    let ip = document.getElementById('ip-address').textContent;
    console.log('Web server started');
    document.getElementById('server-status').innerHTML=`Web server started on ${ip}:8000`;
}

function startError(){
    console.log('Web server failed to start');
    document.getElementById('server-status').innerHTML="Web server failed to start";
}

function wsstop(){
    webserver.stop();
    console.log('Web server stopped');
    document.getElementById('server-status').innerHTML="Web server stopped";
}

function responseObject(respObj){
    return respObj;
}

function getIpAddress() {
    var networkState = navigator.connection.type;
    var states = {
        'unknown': 'Unknown connection',
        'ethernet': 'Ethernet connection',
        'wifi': 'WiFi connection',
        '2g': 'Cell 2G connection',
        '3g': 'Cell 3G connection',
        '4g': 'Cell 4G connection',
        'cellular': 'Cell generic connection',
        'none': 'No network connection'
    };

    if (networkState === 'wifi' || networkState === 'ethernet') {
        // Get local IP address
        window.networkinterface.getIPAddress(function (ip) {
            document.getElementById('ip-address').textContent = 'Your IP address is ' + ip.ip;
            localStorage.setItem('ip', ip.ip);
        }, function (err) {
            console.error('Unable to get IP address:', err);
            document.getElementById('ip-address').textContent = 'Unable to get IP address';
        });
    } else {
        document.getElementById('ip-address').textContent = 'Network connection type: ' + states[networkState];
    }
}

function checkAndRequestPermissions() {
    var permissions = cordova.plugins.permissions;
    permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, function(status) {
        if (!status.hasPermission) {
            permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, function(status) {
                console.log("Requesting permission...");
                if (!status.hasPermission) {
                    document.getElementById('status').textContent = 'Permission denied for READ_EXTERNAL_STORAGE';
                    return;
                }
            }, function() {
                document.getElementById('status').textContent = 'Permission request failed';
            });
        }
    });

    permissions.hasPermission(permissions.WRITE_EXTERNAL_STORAGE, function(status) {
        if (!status.hasPermission) {
            permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, function(status) {
                if (!status.hasPermission) {
                    document.getElementById('status').textContent = 'Permission denied for WRITE_EXTERNAL_STORAGE';
                    return;
                }
            }, function() {
                document.getElementById('status').textContent = 'Permission request failed';
            });
        }
    });

    if (cordova.platformId === 'android' && parseInt(device.version) >= 11) {
        permissions.hasPermission("android.permission.READ_EXTERNAL_STORAGE", function(status) {
            if (!status.hasPermission) {
                permissions.requestPermission("android.permission.READ_EXTERNAL_STORAGE", function(status) {
                    if (!status.hasPermission) {
                        document.getElementById('status').textContent = 'Permission denied for READ_EXTERNAL_STORAGE';
                        return;
                    }
                }, function() {
                    document.getElementById('status').textContent = 'Permission request failed';
                });
            }
        });
    }

    document.getElementById('status').textContent = 'All permissions granted';
}