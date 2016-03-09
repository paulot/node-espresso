# node-espresso
> An espresso db client for node

Espresso is LinkedIn's hot new distributed document store. This is a very barebones node client for Espresso.

```js
var espresso = require('node-espresso');
var espressoClient = espresso.EspressoClient('localhost', 11936);

var record =  { name: 'LinkedIn', ticker: 'LNKD' };

// Puts a new record
espressoClient.putRecord('MyDB', 'Company', '1337', record).then(function() {
  // Gets a record from the database
  espressoClient.getRecord('MyDB', 'Company', '1337').then(function(data) {
    console.log(data); // { name: 'LinkedIn', ticker: 'LNKD' }
  });
});
```


# API
To be completed
``` js

```
