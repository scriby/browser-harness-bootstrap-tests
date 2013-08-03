This is an example of how to write browser harness tests. It makes use the Bootstrap documentation from [Bootstrap](http://getbootstrap.com/). This project is not affiliated with or endorsed by Bootstrap.

To run the tests:

```
git clone https://github.com/scriby/browser-harness-bootstrap-tests.git
cd browser-harness-bootstrap-tests

npm install

node server.js

# From another terminal
./node_modules/mocha/bin/mocha ./tests/tests.js -R spec -t 10000
```