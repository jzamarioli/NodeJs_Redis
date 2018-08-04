# NodeJs_Redis
Testing Node.js with Redis
<br />
<br />
WebApi to test some Redis commands (set/get/del) with Node.Js.
<br />
The Api also triggers the 'expired' event when a Redis key expires on server.
<br />

There is routing for 3 HTTP verbs: GET, POST and DELETE.
<br />
The routes are protected and each one needs a token.
<br />
<br />
To get the token, call the route:
<br />
http://localhost:3000/authenticate
<br />
using POST method, passing in Body this fixed content:
<br />
	{<br />
	"username": "user",<br />
	"password": "pwd"<br />
	}<br />
<br />


<hr>
<strong>Calling the API methods</strong>
<hr>

<strong>1)</strong> method type: <strong>POST</strong>
<br />
<br />
1.1) Route:
http://localhost:3000/item/
<br />

1.2) Header:
<br />
key: x-access-token 
<br />
value: the token generated previously
<br />

1.3) Body: Pass any Json object.
<br />
It will be stored in Redis using a random Guid key.

<br />

<strong>2)</strong> method type: <strong>GET</strong>
<br />
<br />
2.1) Route:
<br />
http://localhost:3000/item/REDISKEY
<br />
where REDISKEY is a key (Guid) generated previously using POST.
<br />

2.2) Header:
<br />
key: x-access-token 
<br />
value: the token generated previously
<br />

2.3) Body: not needed

<br />

<strong>3)</strong> method type: <strong>DELETE</strong>
<br />
<br />
3.1) Route:
<br />
http://localhost:3000/item/REDISKEY
<br />
where REDISKEY is a key (Guid) generated previously using POST.
<br />

3.2) Header:
<br />
key: x-access-token 
<br />
value: the token generated previously
<br />

3.3) Body: not needed


<br />
<hr>
<strong>Setup</strong>
<hr>
Use 'npm install' to resolve the dependencies.
<br />
Use 'npm start' to launch.
