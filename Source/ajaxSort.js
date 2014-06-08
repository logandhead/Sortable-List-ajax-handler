var sortlist = function (container, items, startCallback) {
    var ul = container,
        sortItemModel = {},
        result = [],
        sortList,
        url,
        successCallback = null,
        errorCallback = null;
    var registerEvents = function (sl) {
        $(sl).on("sortupdate", function () {
            result = []; //empty out
            $(this).find('li').each(function () {
                sortItemModel = {};
                sortItemModel.Id = parseInt($(this).data("model-id"));
                sortItemModel.Priority = ($(this).index() + 1);
                result.push(sortItemModel);
            });
            updateOrder();

        });
    };
    var updateOrder = function () {
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(result),
            contentType: "application/json",
            dataType: "json",
            success: function (data) {
                if (successCallback != null)
                    successCallback();
            },
            error: function (data) {
                alert("An error has occurred, please contact administrator.");
            }
        });
    };
    var init = function () {
        sortList = $(ul).sortable({ items: items || "> li" });
        url = $(ul).data('sortable-url') || "/somepath";
        registerEvents(sortList);
        if (startCallback != null)
            startCallback();
    };
    init();
    return {
        success: function (callback) { successCallback = callback; },
        error: function (callback) { errorCallback = callback; }
    };
};
