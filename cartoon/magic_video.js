var bb = document.getElementById('blackboard');
	var timeLine = [];
	var actions = [];
	var components = [];
	var fairy = [];
	BaseSetting = [];
	BaseSetting.UnitTime = 20/*ms*/;
	BaseFunction = [];
	BaseElement = [];
	BaseElement.doNothing = function(){};
	BaseElement.nothing = [];
	BaseFunction.repeat = function(func, dt, times, args, nextFunc,nextArgs){
	//BaseFunction.repeat = function(argList){
		// adapt the two form of calling
		if(arguments.length==1){
			var argList = func;
			var func = argList.func;
			var dt = argList.dt;
			var times = argList.times;
			var args = argList.args;
			var nextFunc = argList.nextFunc;
			var nextArgs = argList.nextArgs;
		}

		return new function(){
			//args should be Array, and it's optional
			//and in the func, must return a value reset the argOut
			//the argIn will be reset by the argOut
			if(times<=0){
				console.log('Repeat Action Exception! Times should be a positive number!');
				return;
			}
			if(typeof nextFunc=='undefined')
			{
				nextFunc=BaseElement.doNothing;
			}
			if(typeof nextArgs=='undefined')
			{
				nextArgs=BaseElement.nothing;
			}

			var clock = times;
			var argIn = args;
			var argOut = BaseElement.nothing;
			function action(){
				argOut = func(argIn);
				argIn = argOut;
				--clock;
				if(clock>0){
					setTimeout(action, dt);
				}
				else{
					nextFunc(nextArgs);
				}
				return argOut;
			};
			action();
			return argOut;
		};		
	};


	// ball type
	components.Ball = function(name, radius, color, x, y, trace, traceColor){	
	//components.Ball = function(argList){
			//convert the argList into the args:
			if(arguments.length==1){
				var argList = name;
				var name = argList.name;
				var radius = argList.radius;
				var color = argList.color;
				var x = argList.x;
				var y = argList.y;
				var trace = argList.trace;
				var traceColor = argList.traceColor;		
			}

			if(typeof trace=="undefined"){trace = false;}			
			if(typeof traceColor=="undefined"){traceColor = '#ff0000';}
			if(typeof name == "undefined"){name="Untitled";}
			if(typeof radius == "undefined"){radius=30;}
			if(typeof color == "undefined"){color='#000000';}
			if(typeof x=="undefined"){x=0;}
			if(typeof y=="undefined"){y=0;}
			var ball = document.createElement('div');
			ball.style.textAlign = 'center';
			ball.style.lineHeight = radius + 'px';
			ball.style.width = radius+'px';
			ball.style.height = radius + 'px';
			ball.style.backgroundColor = color;
			ball.style.borderRadius = radius + 'px';
			ball.style.position = 'absolute';
			ball.innerText = name;
			ball.style.left = x + 'px';
			ball.style.top = y + 'px';
			ball.trace= trace;
			ball.traceColor = traceColor;
			ball.name = name;

			ball.setColor = function(color){
				ball.style.backgroundColor = color;
				return ball;
			};
			ball.getColor = function(){
				return ball.style.backgroundColor;
			};
			ball.setName = function(name){
				ball.innerText = name;
				return ball;
			};
			ball.getName = function(){
				return ball.innerText;
			};
			ball.setRadius = function(radius){
				ball.style.width = radius + "px";
				ball.style.height = radius + "px";
				ball.style.borderRadius = radius + 'px';
				ball.style.lineHeight = radius + 'px';
				return ball;
			};
			ball.getRadius = function(){
				return parseInt(ball.style.width);
			};
			ball.setPosition = function(x, y){
				ball.style.left = x + 'px';
				ball.style.top = y + 'px';
			};
			ball.getPosition = function(){
				return {x:parseInt(ball.style.left),y:parseInt(ball.style.top)};	
			};
			ball.getType = function(){
				return "Ball";
			};
			return ball;
	};

	components.Box = function(name, w, h, color, x, y, trace,traceColor){
	//components.Box = function(argList){
		//convert the arglist to be args
		if(arguments.length==1){
			var argList = name;
			var name = argList.name;
			var w = argList.w;
			var h = argList.h;
			var color = argList.color;
			var x = argList.x;
			var y = argList.y;
			var trace = argList.trace;
			var traceColor = argList.traceColor;
		}

		if(typeof trace=="undefined"){trace =false;}
		if(typeof traceColor=="undefined"){traceColor ='#ff0000';}
		if(typeof name =="undefined") {name ="untitled";}
		if(typeof w =="undefined") {w=30;}
		if(typeof h =="undefined") {h=30;}
		if(typeof color =="undefined") {color='#000';}
		if(typeof x=="undefined"){x=0;}
		if(typeof y=="undefined"){y=0;}

		var box = document.createElement('div');
		box.style.textAlign = 'center';
		box.style.lineHeight = y + 'px';
		box.style.width = w + 'px';
		box.style.height = h + 'px';
		box.style.backgroundColor = color;
		box.style.left = x + 'px';
		box.style.top = y + 'px';
		box.innerText = name;
		box.style.position = 'absolute';
		box.trace = trace;
		box.traceColor = traceColor;
		box.name = name;

		box.setWidth = function(w){
			box.style.width = w + "px";
			return box;
		};
		box.getSize = function(){
			return {x:parseInt(box.style.width),y:parseInt(box.style.height)};	
		};
		box.setHeight = function(h){
			box.style.height = h + 'px';
			box.style.lineHeight = h + 'px';
		};
		box.setColor = function(color){
			box.style.backgroundColor = color;
			return box;
		};
		box.getColor = function(){
			return box.style.backgroundColor;
		};
		box.setName = function(name){
			box.innerText = name;
			return box;
		};
		box.getName = function(){
			return box.innerText;
		};
		box.setPosition = function(x, y){
			box.style.left = x + 'px';
			box.style.top = y + 'px';
		};
		box.getPosition = function(){
			return {x:parseInt(box.style.left), y:parseInt(box.style.top)};
		};
		box.getType = function(){
				return "Box";
		};

		return box;
	};

	// here ars should be a list
	BaseElement.action = function(func, args, nextFunc, nextArgs){
	//BaseElement.action = function(argList){
		// convert args
		if(arguments.length==1){
			var argList = func;
			var func = argList.func;
			var args = argList.args;
			var nextFunc = argList.nextFunc;
			var nextArgs = argList.nextArgs;
		}

		var that = this;
		return new function(){
			func(args,nextFunc,nextArgs);

			return that;
		};
	};

	actions.addObject = function(parent, object, func, args){
	//actions.addObject = function(argList){
		// convert arg
		if(arguments.length==1){
			argList = parent;
			var parent = argList.parent;
			var object = argList.object;
			var func = argList.func;
			var args = argList.args;	
		}		

		var that = this;
		return new function(){
			if(typeof func=='undefined')
			{
				func=BaseElement.doNothing;
			}
			if(typeof args=='undefined')
			{
				arg=BaseElement.nothing;
			}

			parent.appendChild(object);
			// every time push a newly added object to the list of fairy
			fairy[object.name]=object; /**or **/

			func(args);
			return that;
		};
	};


	/****
	** dt should be have unit as second not millisecond
	** dx is the total movement of x, the same with dy
	****/
	actions.moveObject = function(o, dx, dy, dt, func, args){
	//actions.moveObject = function(argList){
		// convert the list into args
		if(arguments.length==1){
			argList = o;
			var o = argList.o;
			var dx = argList.dx;
			var dy = argList.dy;
			var dt = argList.dt;
			var func = argList.func;
			var args = argList.args;	
		}

		var that = this;
		return new function(){
			if(typeof func=='undefined')
			{
				func=BaseElement.doNothing;
			}
			if(typeof args=='undefined')
			{
				arg=BaseElement.nothing;
			}

			var rate=1000/BaseSetting.UnitTime;
			var x0=parseInt(o.style.left);
			var y0=parseInt(o.style.top);
			dt = dt*rate;
			var vx=dx/dt;
			var vy=dy/dt;
			function mvalt(arg){
				o.style.left = (x0+vx*arg)+'px';
				o.style.top = (y0+vy*arg)+'px';
				++arg;
				return arg;
			};
			var output=BaseFunction.repeat(mvalt,BaseSetting.UnitTime,dt,1,func,args);
			return that;
		};
	};
	// move the object according to a function or equation based on time variable t:
	// like equationX: x=3*t equationY: y=2*t*t+3*t+10
	// we set the base point to be (0,0), not the initial position of the object
	actions.moveObjectByEquation = function(o,fx,fy,dt,func,args){
		// convert args
		if(arguments.length==1){
			var argList = o;
			var o = argList.o;
			var fx = argList.fx;
			var fy = argList.fy;
			var dt = argList.dt;
			var func = argList.func;
			var args = argList.args;	
		}

		var that = this;
		return new function(){
			if(typeof func=='undefined')
			{
				func=BaseElement.doNothing;
			}
			if(typeof args=='undefined')
			{
				arg=BaseElement.nothing;
			}

			var rate=1000/BaseSetting.UnitTime;
			dt = dt*rate;

			function mvalt(t){
				o.style.left = fx(t/rate)+'px';
				o.style.top = fy(t/rate)+'px';
				if(o.trace){
					var tracee = document.createElement('div');
					tracee.style.position = 'absolute';
					tracee.style.width = '2px';
					tracee.style.height = '2px';
					tracee.style.backgroundColor = o.traceColor;
					tracee.style.left = o.style.left;
					tracee.style.top = o.style.top;
					o.parentNode.appendChild(tracee);
				}
				++t;
				return t;
			};

			var output=BaseFunction.repeat(mvalt,BaseSetting.UnitTime,dt,1,func,args);

			return that;
		};
	};

	// rotate waiting for implementing
	actions.rotate = function(o, theta, center, dt, func, args){
	//actions.rotate = function(argList){
		//convert the args
		if(arguments.length==1){
			var argList = o;
			var o = argList.o;
			var theta = argList.theta;
			var center = argList.center;
			var dt = argList.dt;
			var func = argList.func;
			var args = argList.args;	
		}

		var that = this;
		return new function(){

			return that;
		};
	};




	actions.grow = function(o, dsx, dsy, dt, func, args){
	//actions.grow = function(argList){
		// argList
		if(arguments.length==1){
			var argList = o;
			var o = argList.o;
			var dsx = argList.dsx;
			var dsy = argList.dsy;
			var dt = argList.dt;
			var func = argList.func;
			var args = argList.args;	
		}

		var that = this;
		return new function(){
			if(typeof func=='undefined')
			{
				func=BaseElement.doNothing;
			}
			if(typeof args=='undefined')
			{
				arg=BaseElement.nothing;
			}

			var rate=1000/BaseSetting.UnitTime;
			var sx0=parseInt(o.style.width);
			var sy0=parseInt(o.style.height);
			dt = dt*rate;
			var vsx=dsx/dt;
			var vsy=dsy/dt;
			function mvalt(arg){
				var tw = sx0+vsx*arg;
				var th = sy0+vsy*arg;
				o.style.width = tw>0?tw:0+'px';
				o.style.height = th>0?th:0+'px';
				o.style.lineHeight = o.style.height;
				if(o.getType()=="Ball"){
					o.style.borderRadius = tw>th?tw:th + 'px';
				}
				++arg;
				return arg;
			};
			var output=BaseFunction.repeat(mvalt,BaseSetting.UnitTime,dt,1,func,args);

			return that;
		};
	};

	// wait function, do nothing
	actions.wait = function(dt, func, args){
	//actions.wait = function(argList){
		//convert the args
		if(arguments.length==1){
			var argList = dt;
			var dt = argList.dt;
			var func = argList.func;
			var args = argList.args;	
		}

		var that = this;
		return new function(){
			if(typeof func=='undefined')
			{
				func=BaseElement.doNothing;
			}
			if(typeof args=='undefined')
			{
				arg=BaseElement.nothing;
			}

			var rate=1000/BaseSetting.UnitTime;
			dt = dt*rate;

			function mvalt(t){
				// do nothing
				++t;
				return t;
			};

			var output=BaseFunction.repeat(mvalt,BaseSetting.UnitTime,dt,1,func,args);
			return that;
		};
	};

	// the whole System is a Object
	System = [];
	// use the time table to drive the system functioning:
	System.drivenByTimeTable = function(timeTable){
		var that = this;
		return new function(){
			while(timeTable.length>0){
				var event = timeTable.pop();
				setTimeout(event.action, event.time*1000);
			}

			return that;
		};
	};

	// use the json data includeing the actionList to drive the System
	// json format data also can be used to drive the system by TimeTable
	System.drivenByActionList = function(actionList){
		var that = this;
		return new function(){
			var len = actionList.length;
			var act = actionList[0].action;
			var set = actionList[0].setting;

			if(len>1){
				for(var i=0;i<len-1;i++){
					actionList[i].setting.func = actionList[i+1].action;
					actionList[i].setting.args = actionList[i+1].setting;	
				}
			}
			// trigger the action list to bomb!
			act(set);

			return that;
		};	
	};


	var box = new components.Box({name:'ruby', w:100, h:100, color:'#00ca00', x:0,y:100,trace:true});
	var box1 = new components.Box({name:'perl', w:10, h:10, color:'#ff00ff', x:100,y:100,trace:true});
	var ball = new components.Ball({name:'Ballon',radius:100, color:'#0000ff', x:250,y:250});
	var ball1 = new components.Ball({name:'Bruce', radius:100, color:'#ff5500', x:350,y:250});

	//synchronized
	actions.addObject({parent:bb, object:box})
			.addObject({parent:bb, object:box1})
			.addObject({parent:bb,object:ball})
			.addObject({parent:bb,object:ball1});
	//unsynchronized way
	//actions.moveObject(box,0,200,1, function(){actions.moveObject(box,200,0,1.2);},null);

	actions.grow(ball,200,200,1.5, function(){
		actions.wait(1,function(){
			actions.grow(ball,-200,-200,1.5, function(){
				actions.wait(1,function(){
					actions.moveObjectByEquation(box1, function(t){
						return 600+100*Math.cos(5*t);
					}, function(t){
						return 200+50*Math.sin(3*t);
					},30);
				});
			}).moveObject(box,0,200,1, function(){
				actions.moveObject(box,200,0,1.2);
			}).moveObject(ball1,0,60,0.5);
		});
	});

	// a test for the time line driven system
	// fill the time table
	timeLine.push({
		time:5,
		action:function(){
			var bruce = new components.Ball('Bruce',20, '#398543', 350,350,true,'#563366');
			actions.addObject(bb, bruce);
			actions.moveObjectByEquation(bruce,function(t){
				return 350+120*Math.cos(10*t);
			},function(t){
				return 150+120*Math.sin(10*t);
			},15);
		} 
	});
	System.drivenByTimeTable(timeLine);

	/********************* local json data ******************
	// test the actionList driven system
	// fill the actionList
	var actionList = [];
	actionList.push({
		// the action to be performed
		action: actions.addObject,
		// the setting of the argument list
		setting: {parent:bb, object:(function(){fairy.shaun = new components.Ball('Shaun',50, '#30f543', 200,300, true,'#5600ff');return fairy.shaun;})()}
	});
	actionList.push({
		action: actions.moveObjectByEquation,
		setting: {o:fairy.shaun,fx:function(t){return 200+38*t;}, fy:function(t){return 300+5*t*t;}, dt:6}
	});
	actionList.push({
		action: actions.moveObjectByEquation,
		setting:{
					o:fairy.shaun,fx:function(t){
							return fairy.shaun.getPosition().x;
						}, fy:function(t){
							return fairy.shaun.getPosition().y-3*t;
						}, dt:1
				}
	});
	actionList.push({
		action: actions.moveObjectByEquation,
		setting:{
					o:fairy.shaun,fx:function(t){
							return fairy.shaun.getPosition().x+3;
						}, fy:function(t){
							return fairy.shaun.getPosition().y+3*t;
						}, dt:1
				}
	});
	actionList.push({
		action: actions.moveObjectByEquation,
		setting:{
					o:fairy.shaun,fx:function(t){
							return fairy.shaun.getPosition().x+3;
						}, fy:function(t){
							return fairy.shaun.getPosition().y-3*t;
						}, dt:1
				}
	});
	actionList.push({
		action: actions.moveObjectByEquation,
		setting:{
					o:fairy.shaun,fx:function(t){
							return fairy.shaun.getPosition().x+3;
						}, fy:function(t){
							return fairy.shaun.getPosition().y+3*t;
						}, dt:1
				}
	});
	
	System.drivenByActionList(actionList);
	********************* local json data ******************/


	// realize the server side response and check if the unstop query with json
	// works in the expected way.
	function nonStopQuery(delay){
		// append a new node to the server side, and check if the script node 
		// can get any response from server, if get, or overtime, just 
		// remove the node and append a new node to the head node start a new query
		var script = document.createElement('script');
		script.src = 'http://127.0.0.1/cartoon/video.json';
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(script);

		var limit_times=50;
		function checkResponse(){
			if(typeof response=="undefined"){
				if(limit_times>0){
					setTimeout(checkResponse, delay);
					limit_times--;
				}
				else{
					console.log("no response from server, trying once again...");
					head.removeChild(script);
					head.appendChild(script);
					return checkResponse();
				}
			}
			else{
				console.log("response from server:"+response);
			}
		}
		checkResponse();
	}
	nonStopQuery(1000);
