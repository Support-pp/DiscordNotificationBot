"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const jwt = require('jsonwebtoken');
const fs = require('fs');
var publicKEY = fs.readFileSync('./public.pem', 'utf8');
class WebApi {
    start() {
        const app = express();
        app.get('/', function (req, res) {
            res.send('Hello World!');
        });
        app.post("/api/discord/notification", function (req, res) {
            if (!req.headers.authorization) {
                res.status(401).json({
                    status: 401,
                    message: "Please use Bearer Token. You get the token by typing !id to your discord channel."
                });
                return;
            }
            var authHeader = req.headers.authorization.replace("Bearer ", "");
            try {
                var decoded = jwt.verify(authHeader, publicKEY);
            }
            catch (err) {
                res.status(401).json({
                    status: 401,
                    message: "The token is not correct. Please update your code. !id"
                });
                return;
            }
            res.status(200).json({
                status: 200,
                id: ""
            });
        });
        app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
    }
}
exports.WebApi = WebApi;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93ZWJhcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBb0M7QUFDcEMsTUFBTSxHQUFHLEdBQUksT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUV4RCxNQUFhLE1BQU07SUFFUixLQUFLO1FBRVIsTUFBTSxHQUFHLEdBQXdCLE9BQU8sRUFBRSxDQUFDO1FBRTNDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBUSxFQUFFLEdBQVE7WUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsVUFBUyxHQUFRLEVBQUUsR0FBUTtZQUM3RCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUM7Z0JBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixNQUFNLEVBQUUsR0FBRztvQkFDWCxPQUFPLEVBQUUsbUZBQW1GO2lCQUMvRixDQUFDLENBQUM7Z0JBQ0gsT0FBTzthQUNWO1lBQ0QsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxFQUFFLENBQUMsQ0FBQztZQUNqRSxJQUFJO2dCQUNBLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ25EO1lBQUMsT0FBTSxHQUFHLEVBQUU7Z0JBQ1QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2pCLE1BQU0sRUFBRSxHQUFHO29CQUNYLE9BQU8sRUFBRSx3REFBd0Q7aUJBQ3BFLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1Y7WUFFRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakIsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsRUFBRSxFQUFFLEVBQUU7YUFDVCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQTtRQUVGLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSjtBQXhDRCx3QkF3Q0MiLCJmaWxlIjoid2ViYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5jb25zdCBqd3QgID0gcmVxdWlyZSgnanNvbndlYnRva2VuJyk7XG5jb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG52YXIgcHVibGljS0VZID0gZnMucmVhZEZpbGVTeW5jKCcuL3B1YmxpYy5wZW0nLCAndXRmOCcpO1xuXG5leHBvcnQgY2xhc3MgV2ViQXBpIHtcblxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24gPSBleHByZXNzKCk7XG5cbiAgICAgICAgYXBwLmdldCgnLycsIGZ1bmN0aW9uIChyZXE6IGFueSwgcmVzOiBhbnkpIHtcbiAgICAgICAgICAgIHJlcy5zZW5kKCdIZWxsbyBXb3JsZCEnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXBwLnBvc3QoXCIvYXBpL2Rpc2NvcmQvbm90aWZpY2F0aW9uXCIsIGZ1bmN0aW9uKHJlcTogYW55LCByZXM6IGFueSl7XG4gICAgICAgICAgICBpZiAoIXJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24pe1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUGxlYXNlIHVzZSBCZWFyZXIgVG9rZW4uIFlvdSBnZXQgdGhlIHRva2VuIGJ5IHR5cGluZyAhaWQgdG8geW91ciBkaXNjb3JkIGNoYW5uZWwuXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYXV0aEhlYWRlciA9IHJlcS5oZWFkZXJzLmF1dGhvcml6YXRpb24ucmVwbGFjZShcIkJlYXJlciBcIixcIlwiKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlY29kZWQgPSBqd3QudmVyaWZ5KGF1dGhIZWFkZXIsIHB1YmxpY0tFWSk7XG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiA0MDEsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVGhlIHRva2VuIGlzIG5vdCBjb3JyZWN0LiBQbGVhc2UgdXBkYXRlIHlvdXIgY29kZS4gIWlkXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgICBpZDogXCJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgYXBwLmxpc3RlbigzMDAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFeGFtcGxlIGFwcCBsaXN0ZW5pbmcgb24gcG9ydCAzMDAwIScpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL2J1aWxkIn0=
