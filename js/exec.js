var $ = jQuery;

function fillForm(form) {
    $.each(form.items, function (index, item) {
        $('[name="' + item.name + '"]').each(function () {
            if ($(this).closest('form').is(':visible')) {
                $(this).focus().val(item.value).blur();
            }
        });
    });
}


window[action](params);