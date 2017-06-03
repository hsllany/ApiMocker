ApiWhatever
========

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

All the functions that you define in template after "->" is is stored in ```mockerfactory.js```. Of cause you can manually register new functions by:

```javascript
apiwhatever.registerMocker('groupName', function () {
    let date = new Date();
    return 'group' + date.getTime();
});
```


