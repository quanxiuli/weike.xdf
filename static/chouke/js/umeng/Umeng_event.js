/**************课程详情页操作****************/
//.点击课程二维码名片
$(document).on('touchend', '.x20_conteng1', function () {
	MobclickAgent.onEvent('click_course_QRCode');
});
//.点击收藏课程
$(document).on('touchend', '.x20_left a:eq(0)', function () {
	MobclickAgent.onEvent('click_course_collection');
});
//.点击立即购买
$(document).on('touchend', '.x20_qwe', function () {
	MobclickAgent.onEvent('cilck_buybtn');
});
//.点击教师头像
$(document).on('touchend', '.hdimg-layer', function () {
	MobclickAgent.onEvent('click_teacher');
});
//.点击课程描述
$(document).on('touchend', '.x20_conteng', function () {
	MobclickAgent.onEvent('click_course_describe');
});

/**************热点相关操作****************/
//.点击某一专题
$(document).on('touchend', '#imgId', function () {
	MobclickAgent.onEvent('open_redianclub');
});
//.点击专题内某一文章
$(document).on('touchend', '.x20-project-news li:eq(0)', function () {
	MobclickAgent.onEvent('enter_redianclub');
});











