function runHtmlTest(name,data,options) {

  QUnit.module('API HTML testcases (' + name + ')', function( hooks ) {
    //<!-- START: new items 1475495073 -->
    // <li id="item3751">
    //   <time datetime="2016-09-21T20:41:48">
    //     [20:41:48]  </time>
    //     <strong>
    //     murphy  </strong>
    //   <em>
    //     Joins  </em>
    //   </li>
    // <li id="item3753">
    //   <time datetime="2016-09-21T20:43:13">
    //     [20:43:13]  </time>
    //     <strong>
    //     biberu  </strong>
    //   <em>
    //     Joins  </em>
    //   </li>
    // <li id="item3754">
    //   <time datetime="2016-09-21T20:43:25">
    //     [20:43:25]  </time>
    //     <strong>
    //     buffal0  </strong>
    //   <em>
    //     Joins  </em>
    //   </li>
    // <li id="item3755">
    //   <time datetime="2016-09-21T20:43:27">
    //     [20:43:27]  </time>
    //     <strong>
    //     cafuego  </strong>
    //   <em>
    //     Quits  </em>
    //   </li>
    // <li id="item3756">
    //   <time datetime="2016-09-21T20:43:33">
    //     [20:43:33]  </time>
    //     <strong>
    //     BlueByte_  </strong>
    //   <em>
    //     Joins  </em>
    //   </li>
    // <li id="item3757">
    //   <time datetime="2016-09-21T20:44:01">
    //     [20:44:01]  </time>
    //     <strong>
    //     GeorgeJipa  </strong>
    //   <em>
    //     Joins  </em>
    //   </li>
    // <li id="item3758">
    //   <time datetime="2016-09-21T20:44:01">
    //     [20:44:01]  </time>
    //     <strong>
    //     GeorgeJipa  </strong>
    //   <em>
    //     Quits  </em>
    //   </li>
    // <li id="item3759">
    //   <time datetime="2016-09-21T20:44:01">
    //     [20:44:01]  </time>
    //     <strong>
    //     GeorgeJipa  </strong>
    //   <em>
    //     Joins  </em>
    //   </li>
    // <li id="item3760">
    //   <time datetime="2016-09-21T20:45:24">
    //     [20:45:24]  </time>
    //     <strong>
    //     BlueByte  </strong>
    //   <em>
    //     Quits  </em>
    //   </li>
    // <li id="item3761">
    //   <time datetime="2016-09-21T20:45:27">
    //     [20:45:27]  </time>
    //     <strong>
    //     hanfm  </strong>
    //   <em>
    //     Joins  </em>
    //   </li>
    // <li id="item3764">
    //   <time datetime="2016-09-21T20:45:34">
    //     [20:45:34]  </time>
    //     <strong>
    //     lstieb  </strong>
    //   <em>
    //     Quits  </em>
    //   </li>
    // <li id="item3765">
    //   <time datetime="2016-09-21T20:47:31">
    //     [20:47:31]  </time>
    //     <strong>
    //     sandeepkr  </strong>
    //   <em>
    //     Joins  </em>
    //   </li>
    // <script type="text/javascript">
    //   var firstItemId = number;
    //   var lastItemId = number;
    //   var itemCount =  number;
    //   var itemDate = number;
    //   var itemSort = "asc|desc";
    //   var option = "min|talk|all"
    //   var search = "|string";
    //   var moreItems = 0|1;
    // </script>
    // <!-- END: new items 1475495073 -->

    hooks.before( function( assert ) {
      this.script = $($(data)[$(data).length-3]).text().split(";\n");
      // build printed out param from script tag
      var param = [];
      for (var i=0;i < this.script.length;i = i + 1) {
          if (this.script[i].length) {
            var tmp = this.script[i].split("var");
            tmp = tmp[1].trim().split("=");
            param[tmp[0].trim()] = tmp[1].trim().replace(/^\"|\"$/g,'');
          }
      }
      this.data = param;
      this.data.items = $($.parseHTML('<ul>'+data+'</ul>'));
      this.options = options;
      assert.ok( true, "before called" );
    });
    QUnit.test( "call hooks", function( assert ) {
      assert.expect(1);
    } );
    QUnit.moduleStart(function( details ) {
      if (CONSOLE_MSG) console.info( "Now running: ", details.name );
    });
    QUnit.test("html", function (assert) {
      assert.equal((typeof this.data.items.find("ul") === 'object'), true, "Test data is a object");
      if (this.data.items.find("li").length !== 0) {
        assert.equal(this.data.items.find("li").length !== 0, true, "Test items count is more then 0");
        if (this.data.itemSort == "asc") assert.equal((parseInt(this.data.items.find("li:last-child").attr("id").split("item")[1]) >= parseInt(this.data.items.find("li:first-child").attr("id").split("item")[1])), true, "Test lastItemId is larger or equal firstItemId on asc");
        if (this.data.itemSort == "desc") assert.equal((parseInt(this.data.items.find("li:last-child").attr("id").split("item")[1]) <= parseInt(this.data.items.find("li:first-child").attr("id").split("item")[1])), true, "Test lastItemId is smaller or equal firstItemId on desc");
      }else{
        assert.equal(this.data.items.find("li").length, 0, "Test items count is 0");
        assert.equal(parseInt(this.data.moreItems), 0, "Test moreItems is 0");
        assert.equal(parseInt(this.data.firstItemId), 0, "Test firstItemId is 0");
        assert.equal(parseInt(this.data.lastItemId), 0, "Test lastItemId is 0");
      }
    });
    QUnit.test("items", function (assert) {
      assert.equal((typeof this.data.items.find("li") === 'object'), true, "Test items is a object");
      if (this.data.items.find("li").length !== 0) {
        assert.equal(this.data.items.find("li").length !== 0, true, "Test items count is more then 0");
        assert.equal((typeof $.text(this.data.items.find("li time")[0]) === 'string'), true, "Test first li time is string");
        assert.equal((typeof $.text(this.data.items.find("li time[datetime]")[0]) === 'string'), true, "Test first  li time[datetime] is string");
        if (this.data.itemOption == "min") {
          assert.equal((typeof $.text(this.data.items.find("li strong")[0]).trim() === 'string'), true, "Test first li strong is string");
          assert.equal((typeof $.text(this.data.items.find("li em")[0]).trim() === 'string'), true, "Test first li em is string");
          assert.equal(/Joins|Parts|Quits/.test($.text(this.data.items.find("li em")[0]).trim()), true, "Test data.option is 'min' and items[0].action is 'Joins', 'Parts' or 'Quits'");
        }
        if (this.data.itemOption == "talk") {
          assert.equal((typeof $.text(this.data.items.find("li span")[0]).trim() === 'string'), true, "Test first li span is string");
          assert.equal(/<.*>/.test($.text(this.data.items.find("li span")[0]).trim()), true, "Test data.option is 'talk' and items[0].action is 'Talks'");
        }
        if (this.data.itemOption == "all") {
          assert.equal((typeof $.text(this.data.items.find("li span")[0]).trim() === 'string'), true, "Test first li span is string");
          assert.equal(/Joins|Parts|Quits|mode:|<.*>/.test($.text(this.data.items.find("li span")[0]).trim()), true, "Test data.option is 'all' and items[0].action is 'Joins', 'Parts', 'Quits', 'Modes' or 'Talks'");
        }
      }else{
        assert.equal(this.data.items.find("li").length, 0, "Test items count is 0");
      }
    });
    QUnit.test("itemSort", function (assert) {
      assert.equal((typeof this.data.itemSort === 'string'), true, "Test item is a string");
      assert.equal(this.data.itemSort == 'asc' || this.data.itemSort == 'desc', true, "Test item is asc or desc");
    });
    QUnit.test("search", function (assert) {
      assert.equal(((typeof this.data.search === 'string') || this.data.search === false), true, "Test search is false or a sting");
    });
    QUnit.test("itemCount", function (assert) {
      assert.equal((typeof parseInt(this.data.itemCount) === 'number'), true, "Test itemCount is a number");
      assert.equal((parseInt(this.data.itemCount) === this.data.items.find("li").length), true, "Test itemCount is equal count(items)");
    });
    QUnit.test("moreItems", function (assert) {
      assert.equal((this.data.moreItems == 1 || this.data.moreItems == 0), true, "Test moreItems is 0 or 1");
    });
    QUnit.test("itemDate", function (assert) {
      assert.equal((typeof parseInt(this.data.itemDate) === 'number'), true, "Test itemDate is a number");
      assert.equal(this.data.itemDate.length === 8, true, "Test itemDate has a length of 8");
    });
    QUnit.test("firstItemId", function (assert) {
      assert.equal((typeof parseInt(this.data.firstItemId) === 'number'), true, "Test firstItemId is a number");
      if (this.data.items.find("li").length === 0) {
        assert.equal(parseInt(this.data.firstItemId) === 0, true, "Test firstItemId is equal item id first item");
      }else{
        assert.equal(this.data.firstItemId == this.data.items.find("li:first-child").attr("id").split("item")[1], true, "Test firstItemId is equal item id first item");
      }
    });
    QUnit.test("lastItemId", function (assert) {
      assert.equal((typeof parseInt(this.data.lastItemId) === 'number'), true, "Test lastItemId is a number");
      if (this.data.items.find("li").length === 0) {
        assert.equal(parseInt(this.data.lastItemId) === 0, true, "Test lastItemId is equal item id last item");
      }else{
        assert.equal(this.data.lastItemId == this.data.items.find("li:last-child").attr("id").split("item")[1], true, "Test lastItemId is equal item id last item");
      }
    });
    QUnit.test("options set", function (assert) {
      if (typeof this.options === 'object' && !$.isEmptyObject(this.options)) {
        if (this.options.count)  assert.equal(parseInt(this.data.itemCount) <= this.options.count, true, "Test items count is options.count");
        if (this.options.search) assert.equal(this.data.search == this.options.search, true, "Test search is equal options.search");
        if (this.options.sort) assert.equal(this.data.itemSort == this.options.sort, true, "Test sort is equal options.sort");
        if (this.options.item) assert.equal(parseInt(this.data.firstItemId) >= this.options.item, true, "Test firstItemId is equal options.item");
        if (this.options.date) assert.equal(parseInt(this.data.itemDate) == this.options.date, true, "Test itemDate is equal options.date");
        if (this.options.type) assert.equal('html' == this.options.type, true, "Test type is equal 'html'");
      }else{
        assert.equal($.isEmptyObject(this.options), true, "Test this.options is empty");
      }
    });
    QUnit.moduleDone(function( details ) {
      if (CONSOLE_MSG) console.info( "Finished running: ", details.name, "Failed/total: ", details.failed, details.total );
    });
  });
}
function initHtmlTest(name,html,options) {
  if (typeof html !== 'object') html = {};
  if (typeof options !== 'object') options = {};
  if (html.url == 'undefined' || options.type == 'undefined') return false;
  html.data = options;
  setTimeout(function() {
    $.ajax(html).done(function(data) {
      logRequestSuccess('HTML',name,html.url);
      runHtmlTest(name,data,options);
    }).fail(function(data) {
      logRequestError('HTML',name,html.url,data.status,data.statusText);
    });
  },getRandomMS());
}
// get default
initHtmlTest("get",{"type": "get", "url": API_URL},{"type": "html"});
// get date
initHtmlTest("get date",{"type": "get", "url": API_URL},{"type": "html", "date": "20161117", "count": 0});
// get count sort
initHtmlTest("get count.sort",{"type": "get", "dataType": "html", "url": API_URL},{"type": "html", "count": 6, "sort": "desc"});
// get count option htmlp
initHtmlTest("get count",{"type": "get", "url": API_URL},{"type": "html", "count": 4});
// post html sort
initHtmlTest("post sort.option",{"type": "post", "url": API_URL},{"type": "html", "sort": "desc", "option": "all"});
// post count search
initHtmlTest("post count.search",{"type": "post", "url": API_URL},{"type": "html", "search": "join", "count": 5});
// post date
initHtmlTest("post date",{"type": "post", "url": API_URL},{"type": "html", "date": "20161116", "count": 0});
// post default
initHtmlTest("post",{"type": "post", "url": API_URL},{"type": "html"});
// post item option json
initHtmlTest("post item.option",{"type": "post", "url": API_URL},{"type": "html", "item": 6, "option": "talk"});
