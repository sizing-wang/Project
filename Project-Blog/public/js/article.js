(function ($) {
    ClassicEditor
        .create( document.querySelector( '#content' ), {
            language: "zh-cn",
            ckfinder:{
                uploadUrl:'/article/uploadImg' // 发送路由请求
            }
        } )
        .catch( error => {
            console.log( error );
        } );
})(jQuery);