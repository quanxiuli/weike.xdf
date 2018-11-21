var obj={
  formList:[
    {
      group:group,//基础组件还是非基础组件
      label: namevalue,//组件名字
      type:type,//组件类型
      placeholder:'',
      required:false,//是否必选，默认非必选
      ProvinceAppoint:"",//默认指定省份
      cityAppoint:"",//指定市
      values:[],//数据列表
      picked:"",//默认选中
    }
  ]
};
var typeList={
  input:["姓名","手机号","邮箱","微信","qq"],
  selectPMC:"行政区",
  sex:"性别",
  dateBirth:"出生日期",
  selectoptions:"年龄",
  selectoptionsXQ:"校区",
  radioandcheckbox:"年级",
  selectoptionsdynamic:"基础类组件下拉框",
  dateTime:"日期",
  describe:"描述",
  multiElection:"多选"
};
