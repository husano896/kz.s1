var app = new Vue({
  el: '#app1',
  data: {
    titlemsg : "(2018) 107年 11-12月",
	特別獎 : "88515559",
	特獎 : "47551146",
	頭獎 : ["83513656", "85250862", "61472404"],
	六獎 : ["185", "079", "442"],
	張數 : 0,
	金額 : 0,
	輸入過 : [],
	發票中獎金額 : [0,0,0,200,1000,4000,10000,40000,200000],
	發票中獎字串 : ["","","","六","五","四","三","二","頭"],
	InNumber : ""
  },
  methods: {
    check: function () {
	  n = this.InNumber;
	  
	  //輸入過處理
	  index = this.輸入過.findIndex((obj)=>obj.number == n);
	  if (index != -1) {
		alert(n + "已經在第" + (index+1) + "張輸入過了！");
		this.InNumber = "";
		return
	  }
	  this.張數 += 1;
	  
	  //中獎號碼處理
	  m = 0
	  //歐洲人
	  if (n == this.特別獎) {
		m = 10000000
	    alert("中特別獎了！！！")
		
	  } 
	  else if (n == this.特獎) {
		m = 2000000
		alert("中特獎了！！！")
	  }  
	  //頭獎號碼
	  else {
		COUNT = 0
	    for (var num of this.頭獎) {
		  for (var i=0;i<8;i+=1) {
		    j = 7-i;
			if (num[j] != n[j]) {
			  COUNT = Math.max(i, COUNT)
			  break;
			}
			else if (j == 0) {
			  COUNT = 8
			}
		  }
		}
		if (COUNT >= 3) {
		  m += this.發票中獎金額[COUNT]
		  alert("中了" + this.發票中獎字串[COUNT] + "獎！！")
		}
		else {
		  //六獎
		  for (var num of this.六獎) {
			if (num == n) {
	　　　　  m += 200
	          alert("中了六獎！")
	        }
		  }
		}
	  }
	 
	  //完成後處理
	  this.輸入過.push({number: n, price: m});
	  this.金額 += m;
      this.InNumber = "";
    },
	isNumberInvaild: function () {
		return this.InNumber.length != 8 || !(/^\d+$/.test(this.InNumber));
	},
	addNumber: function(a) {
		this.InNumber += String(a);
	},
	removeNumber: function() {
		this.InNumber = this.InNumber.substring(0, this.InNumber.length-1)
	},
	removeAllNumber: function() {
		this.InNumber = "";
	},
	class_Button_Obj: function() {
		return {
			"positive" : !this.isNumberInvaild(),
			"negative" : this.isNumberInvaild()
		}
	},
	class_Bingo_Obj: function() {
		return {
			"bingoClr" : this.金額 > 0,
		}
	},
	class_BingoItem_Obj: function(a) {
		return {
			"bingoClr" : a > 0,
		}
	},	
  }
})