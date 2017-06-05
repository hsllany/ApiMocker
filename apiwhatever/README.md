ApiWhatever
========

[![Build Status](https://travis-ci.org/hsllany/apiwhatever.svg?branch=master)](https://travis-ci.org/hsllany/apiwhatever)

# Brief

Try to mock Json API as easy & flexible as possible according to a JSON template. 

The Andoid\iOS\H5 APP who relys the API, can easily test its API robustness, since the API data is generated randomly by program, which may contain many corner cases that can be hardly covered during manual test.
APIWhatever will render random JSON files through a JSON Template.

## Install

```shell
npm install apiwhatever
```

# Example

Let define a simple API representing a class in school.

In real life, a class usually contains many small groups, and each group contains many students:

```
++ class
	++ group
		++ students 
```

```json
{
  "modules": [
    {
      "name": "student",
      "filter": "->removeField(constant)",
      "data": {
        "age": "->randomInt(18, 20)",
        "name": "-> randomEnum(Mike, Peter, John, Jenny, Sheldon, Kobe)",
        "sex": "->randomEnum(boy, girl)",
        "height": "->randomNumber(12.3, 55.8)",
        "isTransfer": "->randomBoolean()",
        "constant": null
      }
    },
    {
      "name": "group",
      "data": {
        "name": "->groupName()",
        "students": "->randomArrayOf(student)"
      }
    }
  ],
  "main": {
    "name": "class",
    "data": {
      "class_name": "->randomString()",
      "status": 200,
      "groups": "->randomArrayOf(group)"
    }
  }
}
```
Just run the ApiWhatever, and it will generate following json. Every time it's different:

```json

{
  "class_name": "b#QPGlXI8tMV@Izx4CqtdQR",
  "status": 200,
  "groups": [
    {
      "name": "group1496503156254",
      "students": [
        {
          "age": 20,
          "name": "Mike",
          "sex": "boy",
          "height": 46.132257722202496,
          "isTransfer": false
        },
        {
          "age": 18,
          "name": "Jenny",
          "sex": "boy",
          "height": 29.050844798057252,
          "isTransfer": true
        },
        {
          "age": 18,
          "name": "Mike",
          "sex": "girl",
          "height": 36.60548299471017,
          "isTransfer": true
        },
        {
          "age": 18,
          "name": "Sheldon",
          "sex": "girl",
          "height": 32.526539956043884,
          "isTransfer": false
        }
      ]
    },
    {
      "name": "group1496503156254",
      "students": [
        
      ]
    },
    {
      "name": "group1496503156254",
      "students": [
        {
          "age": 19,
          "name": "Peter",
          "sex": "boy",
          "height": 45.22569367859579,
          "isTransfer": false
        }
      ]
    },
    {
      "name": "group1496503156254",
      "students": [
        {
          "age": 19,
          "name": "John",
          "sex": "girl",
          "height": 38.16047411142952,
          "isTransfer": true
        },
        {
          "age": 20,
          "name": "Peter",
          "sex": "girl",
          "height": 54.91704245019818,
          "isTransfer": false
        },
        {
          "age": 19,
          "name": "Sheldon",
          "sex": "boy",
          "height": 12.668101690939384,
          "isTransfer": true
        }
      ]
    }
  ]
}
```

# Usage

All you have to do is to run:

```javascript
const apiwhatever = require('./../apiwhatever');
//get template somewhere
let templateJson = ...;

//just mock it.
console.log(apiwhatever.mock(templateJson));
```

## The API Template

The ApiWhatever's API Template is a json file:


```json
{
  "context": {
    "hello": "world"
  },
  "modules": [
    {
      "name": "student",
      "filter": "->removeField(constant)",
      "data": {
        "age": "->randomInt(18, 20)",
        "name": "-> randomEnum(Mike, Peter, John, Jenny, Sheldon, Kobe)",
        "sex": "->randomEnum(boy, girl)",
        "height": "->randomNumber(12.3, 55.8)",
        "isTransfer": "->Date.now()",
        "constant": null
      }
    },
    {
      "name": "group",
      "data": {
        "name": "->groupName()",
        "students": "->randomArrayOf(student)"
      }
    }
  ],
  "main": {
    "name": "class",
    "data": {
      "class_name": "->randomString()",
      "status": 200,
      "singleStudent": "->objectOf(student)",
      "groups": "->randomArrayOf(group)"
    }
  }
}
```

It consists of 3 parts:

### main

Main plays the root role in the final generating json. The following piece:

```
  "main": {
    "name": "class",
    "data": {
      "class_name": "->randomString()",
      "status": 200,
      "singleStudent": "->objectOf(student)",
      "groups": "->randomArrayOf(group)"
    }
  }
```

will generate something like:

```
{
    "class_name": "abc",
    "status": 200,
    "singleStudent": {...},
    "groups": [...]
}
```		

### module

Similar with main, it defines the basic block of json object.

**But be aware, the order modules should reflect the  dependency relations of modules, otherwise, there will be problems**.

### context

Context can hold any information you want, you can retrive them by invoking this.getTemplateContext() in the mock functions.

### Mock Functions

EveryThing you define in the data block of main or module, if it's starts with ```->```, then this data's value is generated by **Mock Functions**.

For example, ```"data":"->randomString()"``` will finally generated a random string of random length for the ```data```key.

There are a few build-in **Mock Functions** in *mockfactory.js*. You can also call JavaScript build-in functions like ```Date.now()``` in it, just to remember, **Mock Functions** should return an primary type, or any of JsonItem, JsonArray and JsonObject, which are defined at json.js.

An example of Mock Function ```randomArrayOf(moduleA)```, which will generate a random array containing moduleA.

```javascript

randomArrayOf: function (moduleName, min = 0, max = 10) {
	min = parseInt(min);
	max = parseInt(max);
	if (typeof min !== 'number' || typeof max !== 'number' || min * max < 0 || min > max) {
		throw 'Min and max must be positive, number and max > min when randomArrayOf().';
	}

    let template = this.template;
    
	//check whether template contains the module
    if (!template.modules.hasOwnProperty(moduleName)) {
    	throw "Can not find ' " + moduleName + " ' in modules";
    }
    
    // Set a new JsonArray, should pass the template in.
    let jsonArray = new json.JsonArray(template);
    
    // calculate the length randomly
    let length = random.randomInt(min, max);

	// generate the child and add to array.
    for (let i = 0; i < length; i++) {
    	jsonArray.add(template.modules[moduleName]);
    }

    return jsonArray;
}

```            

Besides, you can define your own mock functions, just to register them like this:

```javascript
apiwhatever.registerMocker('groupName', function () {
    let date = new Date();
    return 'group' + date.getTime();
});
```

	  

