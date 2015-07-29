$(function(){
    var show_checkin_result = function(msg, msg_type){
        $("#checkin-result").removeClass("success error").addClass(msg_type).html(msg);
    };
    var show_checkin_info = function(num, msg_type){
        $("#checkin-info").html("共签到 " + num + " 人!")
    }
    var total = store.get("total") | 0;
    show_checkin_info(total)
    $("#checkin-number").bind('keypress',function(event) {
        if (event.keyCode == 13){
            var number = $("#checkin-number").val().trim();
            if(number == "") {
                show_checkin_result("请输入签到码", "error");
                $("#checkin-number").attr("value","");
                return ;
            }else if (number.length != 8){
                show_checkin_result("签到码格式错误", "error");
                $("#checkin-number").attr("value","");
                return ;
            }
            for (var i = Number(total) ; i >= 0; i--) {
                var inStore = store.get(i);
                if (inStore == number) {
                    show_checkin_result("已签到", "error");
                    $("#checkin-number").attr("value","");
                    return;
                }
            };
            if (total) {
                total = Number(total)+ 1;
                store.set("total", total);
            }else{
                total = 1;
                store.set("total", 1);
            }
            var ticket = store.set(total, number);
            show_checkin_result("签到成功", "success");
            $("#checkin-number").attr("value","");
            show_checkin_info(total);
            return ;
        }

        /*var number = $("#checkin-number").val().trim();
        if(number == "") {
            show_checkin_result("请输入签到码", "error");
            return ;
        }
        var lens = store.size()
        var ticket = store.set(lens, number);
        if(ticket){
            var emails = store.get("checkin_donator_emails");
            var text = format("#{name}(#{email})<br/>#{tickets}", {
                'name' : ticket['name'],
                'email' : ticket['email'],
                'tickets' : ticket['tickets'],
            });
            if(emails.search(ticket['email'].trim()) > -1){
                text += "<br/>个人赞助者！";
            }
            ticket['checked'] = 1
            store.set("checkin_ticket_" + number, ticket);
            show_checkin_result(text, "success");
        }else{
            show_checkin_result("无效签到码", "error");
        }*/
    });
    $("#clean-btn").click(function(){
        $("#checkin-number").val("")
    });
});