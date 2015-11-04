var hasDelivery = "1";

function _init_checkout() {
    $("input[type='submit']").attr("disabled", false);
    $("#delivery").addClass("hidden");
    $("#payment").addClass("hidden");
    $(".lookuphide").addClass("hidden");
    $("#entercard").hide();
    $(".nextbtn").hide();
    $(".nonus").removeClass("hidden");
    $(".usonly").addClass("hidden");
    $("#billing .sametickholder").show();

    hasDelivery = $("#hasDelivery").val();
    if (hasDelivery != "0") { hasDelivery = "1"; }

    if ($("select[name='country']").val() != "GB" && $("select[name='country']").val() != "") {
        hnName_hide("");
        $("#billing .lookuphide").removeClass("hidden");
        $("#billingbuttons .manAddr").hide();
        $("#billingbuttons .nextbtn").show();
        $("#billing .usonly").addClass("hidden");
        $("#billing .nonus").removeClass("hidden");
        if ($("select[name='country']").val() == "US") {
            $("#billing .usonly").removeClass("hidden");
            $("#billing .nonus").addClass("hidden");
        }
    } else {
        if ($("select[name='country']").val() == "GB") {
            hnName_show("");
            $("input[name='houseno']").addClass("required");
            $("input[name='houseno']").parent("div").removeClass("hidden");
        }
        $("#billingbuttons .manAddr").show();
        $("#billing .usonly").addClass("hidden");
        $("#billing .nonus").removeClass("hidden");
    }

    if (hasDelivery == "1") {
        if ($("select[name='country_1']").val() != "GB" && $("select[name='country_1']").val() != "") {
            hnName_hide("_1");
            $("#delivery .lookuphide").removeClass("hidden");
            $("#deliverybuttons .manAddr").hide();
            $("#deliverybuttons .nextbtn").show();
            $("#delivery .usonly").addClass("hidden");
            $("#delivery .nonus").removeClass("hidden");
            if ($("select[name='country_1']").val() == "US") {
                $("#delivery .usonly").removeClass("hidden");
                $("#delivery .nonus").addClass("hidden");
            }
        } else {
            if ($("select[name='country_1']").val() == "GB") {
                hnName_show("_1");
                $("input[name='houseno_1']").addClass("required");
                $("input[name='houseno_1']").parent("div").removeClass("hidden");
            }
            $("#deliverybuttons .manAddr").show();
            $("#delivery .usonly").addClass("hidden");
            $("#delivery .nonus").removeClass("hidden");
        }
    } else {
        $("#billing .sametickholder").hide();
    }

    if ($("input[name='city']").val() != "") {
        $("#billingbuttons .nextbtn").hide();
        hnName_hide("");
        $("#billing .lookuphide").removeClass("hidden");
        if (hasDelivery == "1") {
            $("#delivery").removeClass("hidden");
        } else {
            $("#billing .sametickholder").hide();
            $("#payment").removeClass("hidden");

            $('input').attr('title', '');
            $('.error').removeClass('error');
            $('.ttError').remove();


            $("#billingbuttons .nextbtn").hide();
            $("input[type='submit']").show();
        }
    } else {
        if ($("select[name='country']").val() == "GB") {
            $("#billing .lookuphide").addClass("hidden");
        }
    }

    if (hasDelivery == "1") {
        $('input').attr('title', '');
        $('.error').removeClass('error');
        $('.ttError').remove();
        if ($("input[name='city_1']").val() != "") {
            $("#deliverybuttons .nextbtn").hide();
            $("#deliverybuttons .manAddr").hide();
            hnName_hide("_1");
            $("#delivery .lookuphide").removeClass("hidden");
            $("#billing .sametickholder").hide();
            $("#payment").removeClass("hidden");
            $("input[type='submit']").show();
            $('input').attr('title', '');
            $('.error').removeClass('error');
            $('.ttError').remove();
        } else {
            if ($("select[name='country_1']").val() == "GB") {
                $("#delivery .lookuphide").addClass("hidden");
            }
        }
    }

    $("select[name='country']").change(function () {
        $("#billing .usonly").addClass("hidden");
        $("#billing .nonus").removeClass("hidden");
        $("#state").val("NONUS");
        canShip();
        if ($("select[name='country']").val() == "GB") {
            hnName_show("");
            $("input[name='houseno']").addClass("required");
            $("input[name='houseno']").parent("div").removeClass("hidden");
            $("#billing .lookuphide").addClass("hidden");
            $("#billingbuttons .nextbtn").hide();
            $("#billingbuttons .manAddr").hide();
            if ($("input[name='city']").val() != "") {
                hnName_hide("");
                $("#billing .lookuphide").removeClass("hidden");
                $("#billingbuttons .manAddr").hide();
                $("#billingbuttons .nextbtn").show();
            }
        } else {
            hnName_hide("");
            $("#billing .lookuphide").removeClass("hidden");
            $("#billingbuttons .manAddr").hide();
            $("#billingbuttons .nextbtn").show();
            if ($("select[name='country']").val() == "US") {
                $("#billing .usonly").removeClass("hidden");
                $("#billing .nonus").addClass("hidden");
                $("#state").val("");
            }
        }
    });

    if (hasDelivery == "1") {
        $("select[name='country_1']").change(function () {
            $("#delivery .usonly").addClass("hidden");
            $("#delivery .nonus").removeClass("hidden");
            $("#state_1").val("NONUS");
            canShip();
            if ($("select[name='country_1']").val() == "GB") {
                hnName_show("_1");
                $("input[name='houseno_1']").addClass("required");
                $("input[name='houseno_1']").parent("div").removeClass("hidden");
                $("#delivery .lookuphide").addClass("hidden");
                $("#billingbuttons .nextbtn").hide();
                if ($("input[name='city_1']").val() != "") {
                    hnName_hide("_1");
                    $("#delivery .lookuphide").removeClass("hidden");
                    $("#billingbuttons .manAddr").hide();
                    $("#billingbuttons .nextbtn").show();
                }
            } else {
                hnName_hide("_1");
                $("#delivery .lookuphide").removeClass("hidden");
                $("#billingbuttons .manAddr").hide();
                $("#billingbuttons .nextbtn").show();
                if ($("select[name='country_1']").val() == "US") {
                    $("#delivery .usonly").removeClass("hidden");
                    $("#delivery .nonus").addClass("hidden");
                    $("#state_1").val("");
                }
            }
        });
    }

    $(".manAddr").click(function () {
        $('input').attr('title', '');
        $('.error').removeClass('error');
        $('.ttError').remove();
        if ($(this).hasClass("Billing")) {
            $("#billing .lookuphide").removeClass("hidden");
            $("#billingbuttons .manAddr").hide();
            if ($("#houseno").val() != "") {
                $("#street").val($("#houseno").val() + $("#street").val());
            }
            hnName_hide("");
            $("#billingbuttons .nextbtn").show();
        }
        if ($(this).hasClass("Delivery")) {
            $("#delivery .lookuphide").removeClass("hidden");
            $("#billing .sametickholder").hide();
            $("#deliverybuttons .manAddr").hide();
            if ($("#houseno_1").val() != "") {
                $("#street_1").val($("#houseno_1").val() + $("#street_1").val());
            }
            hnName_hide("_1");

            $("#deliverybuttons .nextbtn").show();
            $("#billingbuttons .nextbtn").hide();
        }
    });

    $(".findAddr").click(function () {
        $('input').attr('title', '');
        $('.error').removeClass('error');
        $('.ttError').remove();
        if ($(this).hasClass("Billing")) {
            //$("#ckform").validate();
            var HouseNo = $("input[name='houseno']").val();
            var Postcode = $("input[name='postalcode']").val();
            if ($("input[name='houseno']").valid() && $("input[name='postalcode']").valid() && _isValidDetails()) {
                $("#billing .lookuphide").removeClass("hidden");
                hnName_hide("");
                $("#billingbuttons .manAddr").hide();
                $("#billingbuttons .nextbtn").show();
                _getAddress(HouseNo, Postcode, "")
            }
        }
        if ($(this).hasClass("Delivery")) {
            //$("#ckform").validate();
            var HouseNo = $("input[name='houseno_1']").val();
            var Postcode = $("input[name='postalcode_1']").val();
            if ($("input[name='houseno_1']").valid() && $("input[name='postalcode_1']").valid()) {
                $("#delivery .lookuphide").removeClass("hidden");
                $("#billing .sametickholder").hide();
                hnName_hide("_1");
                $("#deliverybuttons .manAddr").hide();
                $("#deliverybuttons .nextbtn").show();
                $("#billingbuttons .nextbtn").hide();
                _getAddress(HouseNo, Postcode, "_1")
            }
        }
    });

    function _isValidDetails() {
        console.clear();
        $('input').attr('title', '');
        $('.error').removeClass('error');
        $('.ttError').remove();
        $("#ckform").validate();
        var isValid = true;
        $("#details .text-box").each(function () {
            if ($(this).is(":visible")) {
                if (!$(this).hasClass("usonly")) {
                    if (!$(this).valid() && isValid) { isValid = false; }
                }
                if ($("select[name='country']").val() == "US" && $(this).hasClass("usonly")) {
                    if (!$(this).valid() && isValid) { isValid = false; }
                }
            //    console.log($(this).attr("id") + " : " + $(this).valid());
            }
        });
        if (isValid) {
            $("#details select").each(function () {
                if ($(this).is(":visible")) {
                    if (!$(this).hasClass("usonly")) {
                        if (!$(this).valid() && isValid) { isValid = false; }
                    }
                    if ($("select[name='country']").val() == "US" && $(this).hasClass("usonly")) {
                        if (!$(this).valid() && isValid) { isValid = false; }
                    }
              //      console.log($(this).attr("id") + " : " + $(this).valid());
                }
            });
        }
        if (isValid) {
            $('input').attr('title', '');
            $('.error').removeClass('error');
            $('.ttError').remove();
        }
        return isValid;
    }

    function _isValidBilling() {
        console.clear();
        $('input').attr('title', '');
        $('.error').removeClass('error');
        $('.ttError').remove();
        $("#ckform").validate();
        var isValid = true;
        $("#billing .text-box").each(function () {
            if ($(this).is(":visible")) {
                if (!$(this).hasClass("usonly")) {
                    if (!$(this).valid() && isValid) { isValid = false; }
                }
                if ($("select[name='country']").val() == "US" && $(this).hasClass("usonly")) {
                    if (!$(this).valid() && isValid) { isValid = false; }
                }
             //   console.log($(this).attr("id")+" : "+$(this).valid());
            }
        });
        if (isValid) {
            $("#billing select").each(function () {
                if ($(this).is(":visible")) {
                    if (!$(this).hasClass("usonly")) {
                        if (!$(this).valid() && isValid) { isValid = false; }
                    }
                    if ($("select[name='country']").val() == "US" && $(this).hasClass("usonly")) {
                        if (!$(this).valid() && isValid) { isValid = false; }
                    }
                 //   console.log($(this).attr("id") + " : " + $(this).valid());
                }
            });
        }
        if (isValid) {
            $('input').attr('title', '');
            $('.error').removeClass('error');
            $('.ttError').remove();
        }
        return isValid;
    }

    function _isValidDelivery() {
        console.clear();
        var isValid = true;
        if (hasDelivery == "1") {
            $("#ckform").validate();
            $("#delivery .text-box").each(function () {
                if ($(this).is(":visible")) {
                    if (!$(this).hasClass("usonly")) {
                        if (!$(this).valid() && isValid) { isValid = false; }
                    }
                    if ($("select[name='country_1']").val() == "US" && $(this).hasClass("usonly")) {
                        if (!$(this).valid() && isValid) { isValid = false; }
                    }
                   // console.log($(this).attr("id") + " : " + $(this).valid());
                }
            });
            if (isValid) {
                $("#delivery select").each(function () {
                    if ($(this).is(":visible")) {
                        if (!$(this).hasClass("usonly")) {
                            if (!$(this).valid() && isValid) { isValid = false; }
                        }
                        if ($("select[name='country_1']").val() == "US" && $(this).hasClass("usonly")) {
                            if (!$(this).valid() && isValid) { isValid = false; }
                        }
                       // console.log($(this).attr("id") + " : " + $(this).valid());
                    }
                });
            }
        }
        if (isValid) {
            $('input').attr('title', '');
            $('.error').removeClass('error');
            $('.ttError').remove();
        }
        return isValid;
    }

    $(".nextbtn").click(function () {
        $('input').attr('title', '');
        $('.error').removeClass('error');
        $('.ttError').remove();
        if ($(this).hasClass("Billing")) {
            if (_isValidBilling() && _isValidDetails()) {
                $("#delivery").addClass("sectionComplete");
                $("#delivery").removeClass("hidden");
                if ($("select[name='country']").val() == "GB") {
                    hnName_show("_1");
                }
                $("#deliverybuttons .manAddr").show();
                $("#billingbuttons .nextbtn").hide();
                canShip();
                console.log("here");

                if ($("input[name='sameaddress']").prop("checked")) {
                    $("input[name='title_1']").val($("input[name='title']").val());

                    try
                    {
                        $("#title_1").val($("#title").val());
                        //$("#title_1").selectmenu('refresh');
                    }
                    catch(ex)
                    {
                        console.log(ex);
                    }

                    $("input[name='firstname_1']").val($("input[name='firstname']").val());
                    $("input[name='lastname_1']").val($("input[name='lastname']").val());
                    $("input[name='CompanyName_1']").val($("input[name='CompanyName']").val());
                    $("input[name='houseno_1']").val($("input[name='houseno']").val());
                    $("input[name='street_1']").val($("input[name='street']").val());
                    $("input[name='district_1']").val($("input[name='district']").val());
                    $("input[name='city_1']").val($("input[name='city']").val());
                    $("input[name='county_1']").val($("input[name='county']").val());
                    $("input[name='postalcode_1']").val($("input[name='postalcode']").val());
                    $("select[name='country_1']").val($("select[name='country']").val());
                    $("select[name='state_1']").val($("select[name='state']").val());
                    $("#delivery .lookuphide").removeClass("hidden");
                    hnName_hide("_1");
                    $("#deliverybuttons .manAddr").hide();
                    $("#billingbuttons .nextbtn").hide();
                    $("#payment").removeClass("hidden");
                }

                $("input[type='submit']").show();
                $('input').attr('title', '');
                $('.error').removeClass('error');
                $('.ttError').remove();

                $("#billing .sametickholder").hide();
            }
        }

        if ($(this).hasClass("Delivery") || hasDelivery == "0") {
            $('input').attr('title', '');
            $('.error').removeClass('error');
            //$('#payment .error').removeClass('error');
            $('.ttError').remove();
            if (_isValidDelivery()) {
                $("#billingbuttons .manAddr").hide();
                $("#billingbuttons .nextbtn").hide();
                $("#deliverybuttons .manAddr").hide();
                $("#deliverybuttons .nextbtn").hide();
                $("#payment").addClass("sectionComplete");
                $("#payment").removeClass("hidden");
                
            }
        }
    });

    $("input[name='sameaddress']").click(function (e) {
        console.log("sameaddress ticked");
       // if ($(this).is(":checked")) {
            canShip();
        //}
    });

    canShip();

    $("#tc").click(function () {
        if ($(this).is(":checked")) {
            $("#tc").attr("title", "");
            $("#tc").parent('div').removeClass('error');
        }
    });

    $.extend($.validator.messages, {
        required: 'This field is required.',
        email: 'Please enter a valid email address.',
        equalTo: 'Email addresses do not match.'
    });

    var validator = $("#ckform").bind("invalid-form.validate", function () {
        //$('input').attr('title', '');
        //$('.error').removeClass('error');
        //$('.ttError').remove();
    }).validate({
        debug: true,
        errorPlacement: function (error, element) {
            $(element).attr('title', error.text());
            element.tooltip(
            {
                position: { my: "left top+5", at: "left bottom", collision: "flipfit" },
                tooltipClass: "ttError"
            });
        },
        success: function (element) {
            $(element).attr('title', '');
            $(element).parent('div').removeClass('error');
        },
        highlight: function (element) {
            $(element).parent('div').addClass('error');
        },
        unhighlight: function (element) {
            $(element).parent('div').removeClass('error');
        },
        submitHandler: function (form) {
            $("input[type='submit']").attr("disabled",true);
            form.submit();
        }
    });

    $("#EmailConfirm").rules("add", {
        email: true,
        required: true,
        onkeyup: false,
        equalTo: '#email',
        messages: {
            required: 'This field is required.',
            equalTo: 'Email addresses do not match.'
        }
    });

    $("#tc").rules("add", {
        required: true,
        messages: {
            required: 'You must accept our terms and conditions.'
        }
    });
    

    //$("#ckform").validate();
    //$("input[type='text']").each(function () {
    //    if (($(this).val() != "") && ($(this).val() != " ")) {
    //        if (!$(this).valid()) { }
    //    }
    //});
    //$("select").each(function () {
    //    if (($(this).val() != "") && ($(this).val() != " ")) {
    //        if (!$(this).valid()) { }
    //    }
    //});

}

function canShip() {
    var exists = false;
    $('select[name="country_1"] option').each(function () {
        if (this.value == $('select[name="country"]').val()) {
            $("input[name = 'sameaddress']").attr("title", "");
            exists = true;
            return false;
        }
    });
    if (!exists) {
        $("input[name = 'sameaddress']").prop("checked", false);
        $("input[name = 'sameaddress']").attr("title", "Shipping is unavailable to your billing address");
    }
}

function _getAddress(a, b, c) {
    if (c == null) { c = ""; }
    var obj = {};
    obj["houseno"] = a;
    obj["postCode"] = b;
    var params = buildParams(obj);
    var http = new XMLHttpRequest();
    http.open("POST", "/Checkout/QueryAddress/", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.setRequestHeader("Content-length", params.length);
    http.setRequestHeader("Connection", "close");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var o = $.parseJSON(http.responseText);
            if (o.HouseNo == "") {
                o.HouseNo = $("input[name='houseno" + c + "']").val();
            } else {
                $("input[name='houseno" + c + "']").val(o.HouseNo);
            }
            $("input[name='houseno" + c + "']").removeClass("required");
            $("input[name='houseno" + c + "']").attr("required", false);
            $("input[name='street" + c + "']").val(o.HouseNo + " " + o.Address1);
            $("input[name='district" + c + "']").val(o.Address2);
            $("input[name='city" + c + "']").val(o.Town);
            $("input[name='county" + c + "']").val(o.County);
            $("input[name='postalcode" + c + "']").val(o.PostCode);
            $("select[name='country" + c + "']").val("GB");
            $("select[name='state" + c + "']").val("NONUS");
            hnName_hide(c);
            $('input').attr('title', '');
            $('.error').removeClass('error');
            $('.ttError').remove();
        }
    }
    http.send(params);
}

function hnName_hide(c) {
    if (c == "_1") {
        $("#deliverybuttons .findAddr").hide();
    } else {
        $("#billingbuttons .findAddr").hide();
    }
    $("input[name='houseno" + c + "']").removeClass("required");
    $("input[name='houseno" + c + "']").parent("div").addClass("hidden");
    $("input[name='houseno" + c + "']").val(" ");
}

function hnName_show(c) {
    if (c == "_1") {
        $("#deliverybuttons .findAddr").show();
    } else {
        $("#billingbuttons .findAddr").show();
    }
    $("input[name='houseno" + c + "']").addClass("required");
    $("input[name='houseno" + c + "']").parent("div").removeClass("hidden");
    $("input[name='houseno" + c + "']").val(" ");
}

function buildParams(obj) {
    var keys = 0;
    var params = "";
    for (var propertyName in obj) {
        if (keys > 0) { params += "&"; }
        params += propertyName + "=" + encodeURIComponent(obj[propertyName]);
        keys++;
    }
    return params;
}

$('.checkout *').change(function () {
    $('.lookuphide').each(function () {
        if ($(this).is(":visible")) {
            $(this).css('display', 'table');
        }
    });
});
