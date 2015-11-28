var args = arguments[0] || {};
// console.log("[detail] ", args.data);
_.each(args.data.attributes, function(item, index, list) {
    if(!(typeof item === 'object' || typeof index === 'object'))
        $.detailList.add(Ti.UI.createLabel({
            top : 5,
            bottom : 5,
            left : 5,
            height : Ti.UI.SIZE,
            textAlign : Titanium.UI.TEXT_ALIGNMENT_LEFT,
            color : 'black',
            text : index.toString() + " : " + item.toString()
        }));
    // console.log(index + " : " + item);
});

$.win.title = args.parentTab.title + " Item";
$.win.addEventListener('open', function(e) {
    if (OS_ANDROID) {
        // for android actionbar
        var activity = detailController.getView().getActivity();
        if (activity != undefined && activity.actionBar != undefined) {
            activity.actionBar.displayHomeAsUp = true;
        }

        activity.actionBar.onHomeIconItemSelected = function() {
            Ti.API.info("Home clicked!");
            $.win.close();
        };
    }
});
