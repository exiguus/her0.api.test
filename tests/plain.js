function runplainTest(name,data,options) {

  QUnit.module('API PLAIN testcases (' + name + ')', function( hooks ) {
    // 23:59:26 Shkrid Quits
    // 23:59:27 surfist Quits
    // 23:59:37 yeats Quits
    // 23:59:37 meLon Quits
    // 23:59:37 phogg Quits
    // 23:59:37 digilink Quits
    // 23:59:40 ArchDuke Joins
    // 23:59:50 surfist Joins
    // 23:59:52 p_quarles Joins
    // 23:59:59 pingfloyd Quits
    // 23:59:59 supersoju Quits
    // 23:59:59 bysin Quits
    // 4149 4163 12 20160921 asc min none 1
    // firstItemId lastItemId itemCount itemDate itemSort option itemSearch moreItems
    // 0 0 0 yyyymmdd (asc|desc) (all|min|talk) (none|string) (1|0)
    hooks.before( function( assert ) {
      this.data = [];
      this.data.items = data.split("\n");
      this.data.items.pop();
      // build printed out param from last line
      param = this.data.items.splice(-1)[0].split(" ");
      this.data.firstItemId = parseInt(param[0]);
      this.data.lastItemId = parseInt(param[1]);
      this.data.itemCount = parseInt(param[2]);
      this.data.itemDate = parseInt(param[3]);
      this.data.itemSort = param[4];
      this.data.option = param[5];
      this.data.search = param[6];
      this.data.moreItems = parseInt(param[7]);
      this.options = options;
      assert.ok( true, "before called" );
    });
    QUnit.test( "call hooks", function( assert ) {
      assert.expect(1);
    } );
    QUnit.moduleStart(function( details ) {
      if (CONSOLE_MSG) console.info( "Now running: ", details.name );
    });
    QUnit.test("{}", function (assert) {
      assert.equal((typeof this.data === 'object'), true, "Test data is a object");
      if (this.data.items.length !== 0) {
        assert.equal(this.data.items.length !== 0, true, "Test items count is more then 0");
      }else{
        assert.equal(this.data.length, 0, "Test items count is 0");
        assert.equal(this.data.moreItems, 0, "Test moreItems is false");
        assert.equal(this.data.firstItemId, 0, "Test firstItemId is 0");
        assert.equal(this.data.lastItemId, 0, "Test lastItemId is 0");
      }
    });
    QUnit.test("items", function (assert) {
      assert.equal((typeof this.data.items === 'object'), true, "Test item is a object");
      if (this.data.items.length !== 0) {
        assert.equal(this.data.items.length !== 0, true, "Test items count is more then 0");
        assert.equal((typeof this.data.items[0] === 'string'), true, "Test items[0] is string");
        if (this.data.option == "min") {
          assert.equal(/Joins|Parts|Quits/.test(this.data.items[0]), true, "Test data.option is 'min' and items[0] is 'Joins', 'Parts' or 'Quits'");
        }
        if (this.data.option == "talk") {
          assert.equal(/<.*>/.test(this.data.items[0]), true, "Test data.option is 'talk' and items[0] is 'Talks'");
        }
        if (this.data.option == "all") {
          assert.equal(/Joins|Parts|Quits|mode:|<.*>/.test(this.data.items[0]), true, "Test data.option is 'all' and items[0] is 'Joins', 'Parts', 'Quits', 'Modes' or 'Talks'");
        }
      }else{
        assert.equal(this.data.items.length, 0, "Test items count is 0");
      }
    });
    QUnit.test("itemSort", function (assert) {
      assert.equal((typeof this.data.itemSort === 'string'), true, "Test item is a string");
      assert.equal((this.data.itemSort === 'asc' || this.data.itemSort === 'desc'), true, "Test item is asc or desc");
    });
    QUnit.test("search", function (assert) {
      assert.equal((typeof this.data.search === 'string'), true, "Test search is a string");
    });
    QUnit.test("itemCount", function (assert) {
      assert.equal((typeof this.data.itemCount === 'number'), true, "Test itemCount is a number");
      assert.equal((this.data.itemCount === this.data.items.length), true, "Test itemCount is equal count(items)");
    });
    QUnit.test("moreItems", function (assert) {
      assert.equal((typeof this.data.moreItems === 'number'), true, "Test moreItems is boolean");
    });
    QUnit.test("itemDate", function (assert) {
      assert.equal((typeof this.data.itemDate === 'number'), true, "Test itemDate is a number");
      assert.equal((this.data.itemDate.toString().length === 8), true, "Test itemDate has a length of 8");
    });
    QUnit.test("firstItemId", function (assert) {
      assert.equal((typeof this.data.firstItemId === 'number'), true, "Test firstItemId is a number");
    });
    QUnit.test("lastItemId", function (assert) {
      assert.equal((typeof this.data.lastItemId === 'number'), true, "Test lastItemId is a number");
    });
    QUnit.test("options set", function (assert) {
      if (typeof this.options === 'object' && !$.isEmptyObject(this.options)) {
        if (this.options.count)  assert.equal(this.data.itemCount <= this.options.count, true, "Test items count is options.count");
        if (this.options.search) assert.equal(this.data.search == this.options.search, true, "Test search is equal options.search");
        if (this.options.sort) assert.equal(this.data.itemSort == this.options.sort, true, "Test sort is equal options.sort");
        if (this.options.callback) assert.equal(this.data.callback == this.options.callback, true, "Test callback is equal options.callback");
        if (this.options.item) assert.equal(this.data.firstItemId >= this.options.item, true, "Test firstItemId is equal options.item");
        //if (this.options.option) assert.equal(this.data.option === this.options.option, true, "Test option is equal options.option");
        if (this.options.date) assert.equal(this.data.itemDate == this.options.date, true, "Test itemDate is equal options.date");
        if (this.options.type) assert.equal('plain' == this.options.type, true, "Test type is equal 'plain'");
      }else{
        assert.equal($.isEmptyObject(this.options), true, "Test this.options is empty");
      }
    });
    QUnit.moduleDone(function( details ) {
      if (CONSOLE_MSG) console.info( "Finished running: ", details.name, "Failed/total: ", details.failed, details.total );
    });
  });
}
function initPlainTest(name,plain,options) {
  if (typeof plain !== 'object') plain = {};
  if (typeof options !== 'object') options = {};
  if (plain.url == 'undefined' || options.type == 'undefined') return false;
  plain.data = options;
  setTimeout(function() {
    $.ajax(plain).done(function(data) {
      logRequestSuccess('PLAIN',name,plain.url);
      runplainTest(name,data,options);
    }).fail(function(data) {
      logRequestError('PLAIN',name,plain.url,data.status,data.statusText);
    });
  },getRandomMS());
}
// get default
initPlainTest("get",{"type": "get", "url": API_URL},{"type": "plain"});
// get date
initPlainTest("get date",{"type": "get", "url": API_URL},{"type": "plain", "date": "20161116", "count": 0});
// get count sort
initPlainTest("get count.sort",{"type": "get", "url": API_URL},{"type": "plain", "count": 2, "sort": "desc"});
// get count option
initPlainTest("get count.option",{"type": "get", "url": API_URL},{"type": "plain", "count": 4, "option": "min"});
// post plain option sort
initPlainTest("post option.sort",{"type": "post", "url": API_URL},{"type": "plain", "option": "all", "sort": "desc"});
// post count search
initPlainTest("post count.search",{"type": "post", "url": API_URL},{"type": "plain", "search": "apt"});
// post date
initPlainTest("post date",{"type": "post", "url": API_URL},{"type": "plain", "date": "20161117", "count": 0});
// post default
initPlainTest("post",{"type": "post", "url": API_URL},{"type": "plain"});
// post item option
initPlainTest("post item.option",{"type": "post", "url": API_URL},{"type": "plain", "item": 6, "option": "talk"});
