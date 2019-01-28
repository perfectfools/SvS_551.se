var event, resultJson
var forecast = false

$( document ).ready(function() {
	moment.locale('sv');  
	today = moment().format('dddd D MMM YYYY');
	$("#today").html(today)
});

function init_551(){
	event = "stryktipset"
	reset()
	url = '<a href="//www.552.se">Fördelning 552</a> <span style="padding-left:80px;"><a href="//www.550.se">550</a></span>'
	getData("data.php?page=551", drawCoupon)
	getData("data.php?page=590", drawSportkrysset)



	$("#main").append('<div class="nav" id="nav"><table class="tableNav" id="tableNav" cellspacing="0"></table></div>')
	$("#tableNav").html('</tr><tr class="nav"><td colspan="7">'+url+'</td></tr>')
}

function init_552(){
	reset()
	url = '<a href="//www.551.se">Resultat 551</a> <span style="padding-left:80px;"><a href="//www.550.se">550</a></span>'
	getData("data.php?page=552", drawCoupon_552)
	getData("data.php?page=554", drawCoupon_552)

	$("#main").append('<div class="nav" id="nav"><table class="tableNav" id="tableNav" cellspacing="0"></table></div>')
	$("#tableNav").html('</tr><tr class="nav"><td colspan="7">'+url+'</td></tr>')
}


function init_553(){
	event = "europatipset"
	reset()
	url = '<a href="//www.552.se">Fördelning 552</a> <span style="padding-left:80px;"><a href="//www.550.se">550</a></span>'
	getData("data.php?page=553", drawCoupon)

	$("#main").append('<div class="nav" id="nav"><table class="tableNav" id="tableNav" cellspacing="0"></table></div>')
	$("#tableNav").html('</tr><tr class="nav"><td colspan="7">'+url+'</td></tr>')

	$(".tableMid").css("background-color", "#0F0").css("color", "#000")
	$(".result").css("background-color", "#0F0").css("color", "#000")
	$(".tableResult").css("background-color", "#0F0").css("color", "#000")
}

function init_550(){
	reset()
	$("#main").append('<div class="tableMid" id="tableMid"></div>') 
	$("#main").append('<table class="tableScore" id="tableScore" cellspacing="0"></table>')

	$("#tableMid").html('<span style="color:yellow">TIPSET I SvS TEXT</span>') 
	$("#tableScore").html('<tr><td class="menu_1">Resultat</td><tr>')
	$("#tableScore").append('<tr><td class="menu_2"><a href="//www.551.se" style="color:yellow">STRYKTIPSET........................551<a></td><tr>') 
	$("#tableScore").append('<tr><td class="menu_2"><a href="//www.553.se" style="color:yellow">EUROPATIPSET.......................553<a></td><tr>') 
	$("#tableScore").append('<tr><td class="menu_1">Kommande omgångar</td><tr>')
	$("#tableScore").append('<tr><td class="menu_2"><a href="//www.552.se" style="color:yellow">STRYKTIPSET och EUROPATIPSET.......552<a></td><tr>')
	$("#tableScore").append('<tr><td class="menu_info">Från och med 1 januari 2019 tar SVT bort samtliga spelsidor ur sändning på grund av nya regler.</td><tr>') 
}


function drawTopptipset(json){
	console.log(json)
	game = '<tr><td class="correct">Topptipset</td>'
	game += '<td class="sum">'+json.distribution[0].amount.replace(",00","")+' kr</td>'
	game += '<td class="sum">('+numberWithCommas(json.distribution[0].winners)+' st)</td></tr>'
	$("#tableResult").append(game)
	$("#tableOms tr").append('<td style="padding-left:40px;">Topptipset: '+ (parseInt(json.turnover)/1000000).toFixed(1)+' mkr</td>')
}


function drawCoupon(json){
	console.log(json)
	$("#main").append('<div class="tableMid" id="tableMid_'+ json.productName+'">'+ json.productName+' '+ moment( json.closeTime).format('D/MM')+'</div>') 
	$("#main").append('<table class="tableScore" id="tableScore_'+ json.productName+'"" cellspacing="0"></table>')
	$("#main").append('<div class="result" id="result"><table class="tableResult" id="tableResult" cellspacing="0"></table></div>')
	$("#main").append('<div class="oms" id="oms"><table class="tableOms" id="tableOms" cellspacing="0"></table></div>')
	for(i in json.events){
		r1 = ""
		rx = ""
	    r2 = ""
		color = (json.events[i].outcomeScore != undefined )? "#0FF":"#FFF"
		color = (json.events[i].isFinished == true)? "#0FF":"#FFF"

		team = json.events[i].description.split('-')

		switch(json.events[i].outcome) {
	  		case "1":
	    		r1 = "1"
	    		break;
	    	case "X":
	    		rx = "x"
	    		break;
	    	case "2":
	    		r2 = "2"
	    		break;
		}

		outCome = (json.events[i].outcomeScore != undefined)? json.events[i].outcomeScore:'0-0'
		outCome =  (json.events[i].cancelled == true)? 'Lottad':outCome

		game = '<tr><td class="game">'+json.events[i].eventNumber+'.</td>'
		game += '<td class="home">'+team[0].substring(0, 10)+'</td>'
		game += '<td class="diff">-</td>'
		game += '<td class="away">'+team[1].substring(0, 10)+'</td>'
		game += '<td class="score" style="color:'+color+' !important">'+outCome+'</td>'
		game += '<td class="t_1">'+r1+'</td>'
		game += '<td class="t_x">'+rx+'</td>'
		game += '<td class="t_2">'+r2+'</td></tr>'
		$("#tableScore_"+ json.productName).append(game)
	}
	drawResult(json)
	if(json.events[i].distribution == undefined){
		if( json.productName == "stryktipset")
			getData("data.php?page=888", drawTopptipset)
		else
			getData("data.php?page=999", drawTopptipset)
	}
}

function drawSportkrysset(json){
	console.log(json)
	$("#main").append('<div class="tableMid" id="tableMid_'+ json.productName+'">'+ json.productName+' '+ moment( json.closeTime).format('D/MM')+'</div>') 
	$("#main").append('<table class="tableScore" id="tableScore_'+ json.productName+'"" cellspacing="0"></table>')
	$("#main").append('<div class="result" id="result_krysset"><table class="tableResult" id="tableResult_krysset" cellspacing="0"></table></div>')
	$("#main").append('<div class="oms" id="oms"><table class="tableOms" id="tableOms_kryss" cellspacing="0"></table></div>')
	
	console.log(json.drawResult[0].items[0].numbers)
	str ="<tr><td class='sportResult'>"
	for(i in json.drawResult[0].items[0].numbers){
		console.log(json.drawResult[0].items[0].numbers[i])
		str += json.drawResult[0].items[0].numbers[i] + "-"
	}
		str = str.slice(0, -1)
		str += "</td></tr>"
	$("#tableScore_"+ json.productName).append(str)
	dist = json.distribution[0].items
	for(i in dist){

		game = '<tr><td class="correct">'+ dist[i].name+'</td>'
		game += '<td class="sum">'+dist[i].amount.replace(",00","")+' kr</td>'
		game += '<td class="sum">('+numberWithCommas(dist[i].winners)+' st)</td></tr>'
		$("#tableResult_krysset").append(game)
	}
		$("#tableOms_kryss").html('<tr><td>Oms: '+ (parseInt(json.turnover)/1000000).toFixed(1)+' mkr</td></tr>') 
	
	
}


function drawCoupon_552(json){
	console.log(json)
	
	if (json.length == 0)
		return
	
	$("#main").append('<div class="tableMid" id="tableMid_'+json.productName+'">'+json.productName+' '+ moment(json.closeTime).format('D/MM')+'</div>') 
	$("#main").append('<table class="tableScore" id="tableScore_'+json.productName+'"" cellspacing="0"><tr><td colspan=4>Uppdaterat '+moment().format('HH.mm')+'</td><td colspan=3>Fördelning</td></tr><tr><td colspan=4></td><td>1</td><td>X</td><td>2</td></tr></table>')
	$("#main").append('<div class="oms" id="oms"><table class="tableOms" id="tableOms" cellspacing="0"></table></div>')
	
	for(i in json.events){
		team = json.events[i].description.split('-')
		game = '<tr><td class="game">'+json.events[i].eventNumber+'.</td>'
		game += '<td class="home">'+team[0].substring(0, 10)+'</td>'
		game += '<td class="diff">-</td>'
		game += '<td class="away">'+team[1].substring(0, 10)+'</td>'
		game += '<td class="r_1">'+json.events[i].distribution.home+'</td>'
		game += '<td class="r_x">'+json.events[i].distribution.draw+'</td>'
		game += '<td class="r_2">'+json.events[i].distribution.away+'</td></tr>'
		$("#tableScore_"+json.productName).append(game)
	}
	
	$("#tableScore_"+json.productName).append('<tr><td class="oms_552" colspan="7">Omsättning: '+numberWithCommas(json.turnover)+' kr</td></tr>')

	if(json.productName == "Europatipset"){
		$("#tableMid_"+json.productName).css("background-color", "#0F0").css("color", "#000")
		$(".result").css("background-color", "#0F0").css("color", "#000")
		$(".tableResult").css("background-color", "#0F0").css("color", "#000")
	}
}

function drawResult(json){
	for(i in json.distribution){

		game = '<tr><td class="correct">'+json.distribution[i].name+'</td>'
		game += '<td class="sum">'+json.distribution[i].amount.replace(",00","")+' kr</td>'
		game += '<td class="sum">('+numberWithCommas(json.distribution[i].winners)+' st)</td></tr>'
		$("#tableResult").append(game)
	}
		$("#tableOms").html('<tr><td>Oms: '+ (parseInt(json.turnover)/1000000).toFixed(1)+' mkr</td></tr>') 
		$("#tableNav").html('</tr><tr class="nav"><td colspan="7">'+url+'</td></tr>')
}


function getData(call, func) {
    $.ajax({
        type: 'GET',
        url: call,
        async: false,
        contentType: "application/json",
        dataType: 'json',
        success: function(json) {
            func(json)
        },
        error: function(e) {
            console.log(e)
            console.log("Opps, thats not a valid request. Try again.")
        }
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}


function reset(){
	$("#main").html('')
}
