var isWebviewFlag;

function setWebViewFlag() {
	isWebviewFlag = true;
};

function loadURL(url) {
	var iFrame;
	iFrame = document.createElement("iframe");
	iFrame.setAttribute("src", url);
	iFrame.setAttribute("style", "display:none;");
	iFrame.setAttribute("height", "0px");
	iFrame.setAttribute("width", "0px");
	iFrame.setAttribute("frameborder", "0");
	document.body.appendChild(iFrame);
	iFrame.parentNode.removeChild(iFrame);
	iFrame = null;
};

function exec(funName, args) {
	var commend = {
		functionName : funName,
		arguments : args
	};
	var jsonStr = JSON.stringify(commend);
	var url = "umeng:" + jsonStr;
	loadURL(url);
};

var MobclickAgent = {
	getDeviceId : function(callBack) {
		if (isWebviewFlag) {
			exec("getDeviceId", [ callBack.name ]);
		}
	},
	onCCEvent : function(evenArray, evenValue, eventLabel) {
		if (isWebviewFlag) {
			exec("onCCEvent", [ evenArray, evenValue, eventLabel ]);
		}
	},
	onEvent : function(eventId) {
		if (isWebviewFlag) {
			exec("onEvent", [ eventId ]);
		}
	},
	onEventWithLabel : function(eventId, eventLabel) {
		if (isWebviewFlag) {
			exec("onEventWithLabel", [ eventId, eventLabel ]);
		}
	},
	onEventWithParameters : function(eventId, eventData) {
		if (isWebviewFlag) {
			exec("onEventWithParameters", [ eventId, eventData ]);
		}
	},
	onEventWithCounter : function(eventId, eventData, eventNum) {
		if (isWebviewFlag) {
			exec("onEventWithCounter", [ eventId, eventData, eventNum ]);
		}
	},
	onPageBegin : function(pageName) {
		if (isWebviewFlag) {
			exec("onPageBegin", [ pageName ]);
		}
	},
	onPageEnd : function(pageName) {
		if (isWebviewFlag) {
			exec("onPageEnd", [ pageName ]);
		}
	},
	profileSignInWithPUID : function(UID) {
		if (isWebviewFlag) {
			exec("profileSignInWithPUID", [ UID ]);
		}
	},
	profileSignInWithPUIDWithProvider : function(provider, UID) {
		if (isWebviewFlag) {
			exec("profileSignInWithPUIDWithProvider", [ provider, UID ]);
		}
	},
	profileSignOff : function() {
		if (isWebviewFlag) {
			exec("profileSignOff", []);
		}
	},
	setUserLevelId : function(level) {
		if (isWebviewFlag) {
			exec("setUserLevelId", [ level ]);
		}
	},
	startLevel : function(level) {
		if (isWebviewFlag) {
			exec("startLevel", [ level ]);
		}
	},
	finishLevel : function(level) {
		if (isWebviewFlag) {
			exec("finishLevel", [ level ]);
		}
	},
	failLevel : function(level) {
		if (isWebviewFlag) {
			exec("failLevel", [ level ]);
		}
	},
	exchange : function(currencyAmount, currencyType, virtualAmount, channel,
			orderId) {
		if (isWebviewFlag) {
			exec("exchange", [ currencyAmount, currencyType, virtualAmount,
					channel, orderId ]);
		}
	},
	pay : function(money, coin, source) {
		if (isWebviewFlag) {
			exec("pay", [ money, coin, source ]);
		}
	},
	payWithItem : function(money, item, number, price, source) {
		if (isWebviewFlag) {
			exec("payWithItem", [ money, item, number, price, source ]);
		}
	},
	buy : function(item, number, price) {
		if (isWebviewFlag) {
			exec("buy", [ item, number, price ]);
		}
	},
	use : function(item, number, price) {
		if (isWebviewFlag) {
			exec("use", [ item, number, price ]);
		}
	},
	bonusWithItem : function(item, number, price, source) {
		if (isWebviewFlag) {
			exec("bonusWithItem", [ item, number, price, source ]);
		}
	},
	bonus : function(coin, source) {
		if (isWebviewFlag) {
			exec("bonus", [ coin, source ]);
		}
	}

};
