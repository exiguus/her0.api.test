function runJsonTest(name,data,options) {

  QUnit.module('API JSON testcases (' + name + ')', function( hooks ) {
    // {
    //   "moreItems":true,
    //   "search":false,
    //   "startDate":20160216,
    //   "endDate":20160921,
    //   "itemDate":20160921,
    //   "itemCount":12,
    //   "itemSort":"asc|desc",
    //   "itemOption":"min|talk|all",
    //   "firstItemId":3751,
    //   "lastItemId":3765,
    //   "items":[
    //     {
    //       "content":"[20:41:48] *** Joins: murphy",
    //       "timestamp":"20160921204148",
    //       "datetime":"2016-09-21T20:41:48",
    //       "action":"Joins",
    //       "nickname":"murphy",
    //       "id":3751
    //     },
    //     {
    //       "content":"[20:43:13] *** Joins: biberu",
    //       "timestamp":"20160921204313",
    //       "datetime":"2016-09-21T20:43:13",
    //       "action":"Joins",
    //       "nickname":"biberu",
    //       "id":3753
    //     },
    //     {
    //       "content":"[20:43:25] *** Joins: buffal0",
    //       "timestamp":"20160921204325",
    //       "datetime":"2016-09-21T20:43:25",
    //       "action":"Joins",
    //       "nickname":"buffal0",
    //       "id":3754
    //     },
    //     {
    //       "content":"[20:43:27] *** Quits: cafuego",
    //       "timestamp":"20160921204327",
    //       "datetime":"2016-09-21T20:43:27",
    //       "action":"Quits",
    //       "nickname":"cafuego",
    //       "id":3755
    //     },
    //     {
    //       "content":"[20:43:33] *** Joins: BlueByte_",
    //       "timestamp":"20160921204333",
    //       "datetime":"2016-09-21T20:43:33",
    //       "action":"Joins",
    //       "nickname":"BlueByte_",
    //       "id":3756
    //     },
    //     {
    //       "content":"[20:44:01] *** Joins: GeorgeJipa",
    //       "timestamp":"20160921204401",
    //       "datetime":"2016-09-21T20:44:01",
    //       "action":"Joins",
    //       "nickname":"GeorgeJipa",
    //       "id":3757
    //     },
    //     {
    //       "content":"[20:44:01] *** Quits: GeorgeJipa",
    //       "timestamp":"20160921204401",
    //       "datetime":"2016-09-21T20:44:01",
    //       "action":"Quits",
    //       "nickname":"GeorgeJipa",
    //       "id":3758
    //     },
    //     {
    //       "content":"[20:44:01] *** Joins: GeorgeJipa",
    //       "timestamp":"20160921204401",
    //       "datetime":"2016-09-21T20:44:01",
    //       "action":"Joins",
    //       "nickname":"GeorgeJipa",
    //       "id":3759
    //     },
    //     {
    //       "content":"[20:45:24] *** Quits: BlueByte",
    //       "timestamp":"20160921204524",
    //       "datetime":"2016-09-21T20:45:24",
    //       "action":"Quits",
    //       "nickname":"BlueByte",
    //       "id":3760
    //     },
    //     {
    //       "content":"[20:45:27] *** Joins: hanfm",
    //       "timestamp":"20160921204527",
    //       "datetime":"2016-09-21T20:45:27",
    //       "action":"Joins",
    //       "nickname":"hanfm",
    //       "id":3761
    //     },
    //     {
    //       "content":"[20:45:34] *** Quits: lstieb",
    //       "timestamp":"20160921204534",
    //       "datetime":"2016-09-21T20:45:34",
    //       "action":"Quits",
    //       "nickname":"lstieb",
    //       "id":3764
    //     },
    //     {
    //       "content":"[20:47:31] *** Joins: sandeepkr",
    //       "timestamp":"20160921204731",
    //       "datetime":"2016-09-21T20:47:31",
    //       "action":"Joins",
    //       "nickname":"sandeepkr",
    //       "id":3765
    //     }
    //   ]
    // }
    hooks.before( function( assert ) {
      this.data = data;
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
        if (this.data.itemSort == "asc") assert.equal(this.data.lastItemId >= this.data.firstItemId, true, "Test lastItemId is larger or equal firstItemId on asc");
        if (this.data.itemSort == "desc") assert.equal(this.data.lastItemId <= this.data.firstItemId, true, "Test lastItemId is smaller or equal firstItemId on desc");
      }else{
        assert.equal(this.data.items.length, 0, "Test items count is 0");
        assert.equal((typeof this.data.error === 'string'), true, "Test error is a string");
        assert.equal(this.data.error, "no results found", "Test error is 'no results found'");
        assert.equal(this.data.moreItems, false, "Test moreItems is false");
        assert.equal(this.data.firstItemId, 0, "Test firstItemId is 0");
        assert.equal(this.data.lastItemId, 0, "Test lastItemId is 0");
      }
    });
    QUnit.test("items", function (assert) {
      assert.equal((typeof this.data.items === 'object'), true, "Test item is a object");
      if (this.data.items.length !== 0) {
        assert.equal(this.data.items.length !== 0, true, "Test items count is more then 0");
        assert.equal((typeof this.data.items[0].content === 'string'), true, "Test items[0].content is string");
        assert.equal((typeof this.data.items[0].timestamp === 'string'), true, "Test items[0].timestamp is string");
        assert.equal((typeof this.data.items[0].datetime === 'string'), true, "Test items[0].datetime is string");
        assert.equal((typeof this.data.items[0].action === 'string'), true, "Test items[0].action is string");
        assert.equal((typeof this.data.items[0].nickname === 'string'), true, "Test items[0].nickname is string");
        assert.equal((typeof this.data.items[0].id === 'number'), true, "Test items[0].id is string");
        if (this.data.itemOption == "min") {
          assert.equal(this.data.itemOption == "min" && (this.data.items[0].action == 'Joins' || this.data.items[0].action == 'Parts' || this.data.items[0].action == 'Quits'), true, "Test data.option is 'min' and items[0].action is 'Joins', 'Parts' or 'Quits'");
        }
        if (this.data.itemOption == "talk") {
          assert.equal(this.data.itemOption == "talk" && this.data.items[0].action == 'Talks', true, "Test data.option is 'talk' and items[0].action is 'Talks'");
        }
        if (this.data.itemOption == "all") {
          assert.equal(this.data.itemOption == "all" &&  (this.data.items[0].action == 'Joins' || this.data.items[0].action == 'Parts' || this.data.items[0].action == 'Quits' || this.data.items[0].action == 'Modes' || this.data.items[0].action == 'Talks'), true, "Test data.option is 'all' and items[0].action is 'Joins', 'Parts', 'Quits', 'Modes' or 'Talks'");
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
      assert.equal(((typeof this.data.search === 'string') || this.data.search === false), true, "Test search is false or a sting");
    });
    QUnit.test("itemCount", function (assert) {
      assert.equal((typeof this.data.itemCount === 'number'), true, "Test itemCount is a number");
      assert.equal((this.data.itemCount === this.data.items.length), true, "Test itemCount is equal count(items)");
    });
    QUnit.test("moreItems", function (assert) {
      assert.equal((typeof this.data.moreItems === 'boolean'), true, "Test moreItems is boolean");
    });
    QUnit.test("startDate", function (assert) {
      assert.equal((typeof this.data.startDate === 'number'), true, "Test startDate is a number");
      assert.equal((this.data.startDate.toString().length === 8), true, "Test startDate has a length of 8");
    });
    QUnit.test("endDate", function (assert) {
      assert.equal((typeof this.data.endDate === 'number'), true, "Test endDate is a number");
      assert.equal((this.data.endDate.toString().length === 8), true, "Test endDate has a length of 8");
    });
    QUnit.test("itemDate", function (assert) {
      assert.equal((typeof this.data.itemDate === 'number'), true, "Test itemDate is a number");
      assert.equal((this.data.itemDate.toString().length === 8), true, "Test itemDate has a length of 8");
    });
    QUnit.test("firstItemId", function (assert) {
      assert.equal((typeof this.data.firstItemId === 'number'), true, "Test firstItemId is a number");
      if (this.data.items.length === 0) {
        assert.equal((this.data.firstItemId === 0), true, "Test firstItemId is equal item id first item");
      }else{
        assert.equal((this.data.firstItemId == this.data.items[0].id), true, "Test firstItemId is equal item id first item");
      }
    });
    QUnit.test("lastItemId", function (assert) {
      assert.equal((typeof this.data.lastItemId === 'number'), true, "Test lastItemId is a number");
      if (this.data.items.length === 0) {
        assert.equal((this.data.lastItemId === 0), true, "Test lastItemId is equal item id last item");
      }else{
        assert.equal((this.data.lastItemId == this.data.items[this.data.items.length-1].id), true, "Test lastItemId is equal item id last item");
      }
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
        if (this.options.type) assert.equal('json' == this.options.type, true, "Test type is equal 'json'");
      }else{
        assert.equal($.isEmptyObject(this.options), true, "Test this.options is empty");
      }
    });
    QUnit.moduleDone(function( details ) {
      if (CONSOLE_MSG) console.info( "Finished running: ", details.name, "Failed/total: ", details.failed, details.total );
    });
  });
}
function initJsonTest(name,json,options) {
  if (typeof json !== 'object') json = {};
  if (typeof options !== 'object') options = {};
  if (json.url == 'undefined' || options.type == 'undefined') return false;
  if (json.dataType == 'undefined' || json.dataType != 'json' || json.dataType != 'jsonp') json.dataType = 'json';
  if (json.queryType && json.queryType == 'json' && json.type == 'post') {
    json.contentType = 'application/json; charset=utf-8';
    json.data = JSON.stringify(options);
  }else{
    json.data = options;
  }
  setTimeout(function() {
    $.ajax(json).done(function(data) {
      logRequestSuccess('JSON',name,json.url);
      runJsonTest(name,data,options);
    }).fail(function(data) {
      logRequestError('JSON',name,json.url,data.status,data.statusText);
    });
  },getRandomMS());
}
// get default
initJsonTest("get",{"type": "get", "url": API_URL},{"type": "json"});
// get date
initJsonTest("get date",{"type": "get", "url": API_URL},{"type": "json", "date": "20161116", "count": 0});
// get count sort
initJsonTest("get count.sort",{"type": "get", "dataType": "json", "url": API_URL},{"type": "json", "count": 2, "sort": "desc"});
// get count option jsonp
initJsonTest("get count.option",{"type": "get", "dataType": "jsonp", "url": API_URL},{"type": "json", "count": 4, "option": "min"});
// post json option sort
initJsonTest("post option.sort",{"type": "post", "queryType": "json", "url": API_URL},{"type": "json", "option": "all", "sort": "desc"});
// post count search
initJsonTest("post count.search",{"type": "post", "url": API_URL},{"type": "json", "search": "apt"});
// post date
initJsonTest("post date",{"type": "post", "url": API_URL},{"type": "json", "date": "20161117", "count": 0});
// post default
initJsonTest("post",{"type": "post", "url": API_URL});
// post item option json
initJsonTest("post item.option",{"type": "post", "queryType": "json", "url": API_URL},{"type": "json", "item": 6, "option": "talk"});
