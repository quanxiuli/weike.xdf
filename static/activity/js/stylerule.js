var styleRule={
    insertRule:function(amt){
        var style = document.styleSheets[0];
        style.insertRule(amt, 0);
    },
    deleteRule:function(ruleName){
        var style = document.styleSheets[0];
        var cssRules=document.styleSheets[0].cssRules;
        for (var i = 0; i < cssRules.length; i++) {
            var obj = cssRules[i];
            if(obj.name==ruleName){
                document.styleSheets[0].deleteRule(i);
            }
        }
    }
};