var io10blogFirebase = new Firebase("https://jianli.firebaseio.com/");
// 明细由当前页面的url表示，将反斜线替换成下划线，并将中文decode出来
var current_url = decodeURI(window.location.pathname.replace(new RegExp('\\/|\\.', 'g'),"_"));
// 获取总数，并将总访问量展示在页面上
io10blogFirebase.child("sum").on("value", function(data) {
  var current_counter = data.val();
  if( $("#sum_counter").length > 0  && current_counter >1 ){
      $("#sum_counter").html(
   	   	"总访问量 <font style='color:#4ACAA8'>"+ current_counter +"</font> 次"
       );
  };
});

// 获取明细，并将明细也展示在页面上
io10blogFirebase.child("detail/"+current_url).on("value", function(data){
	var detail_counter = data.val();
	if($("#detail_counter").length > 0 && detail_counter > 1){
		$("#detail_counter").html(
			" 本页访问量 <font style='color:#4ACAA8'>"+ detail_counter +"</font> 次"
		);
	}
});

// 总数+1
io10blogFirebase.child("sum").transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});
// 明细+1
io10blogFirebase.child("detail/"+current_url).transaction(function (current_counter) {
  return (current_counter || 0) + 1;
});
