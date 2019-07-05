/*валидация формы*/
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    };
    console.log('ee')
    $.extend(setings, options);
    var $form = $(form);
    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });
        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
                if (!validator.numberOfInvalids())  return;
                $('html, body').animate({
                    scrollTop: $(validator.errorList[0].element).offset().top - 50
                }, 500);
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.js-form_input'));
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.js-form_row').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.js-form_row').is('.error')){
                    $(element).closest('.js-form_row').removeClass('error').addClass('valid');
                }
                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });
        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "Field is required"
                }
            });
        });
        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
                {
                    messages: {
                        email: "Invalid email"
                    }
                });
        }
    }
}

$(document).on('change', '.js-input-file', function () {
    $(this).closest('.form__file').find('.form__file-name').text($(this).val().split('\\').pop());
});
$(document).ready(function () {
    validate('#form', {});
});