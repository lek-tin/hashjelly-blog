var s, app = {
    settings: {
        jpm: {}
    },
    init: function() {
        s = this.settings, this.initalizers(), this.bindUiActions()
    },
    bindUiActions: function() {
        var t = this;
        $(".select-posts,.select-categories").on("click", function() {
            t.homePostsCatSwitch()
        }), $(".social-icon").on("click", function() {
            t.socialIconClick($(this))
        })
    },
    initalizers: function() {
        // this.jpm(), FastClick.attach(document.body), $("body").css({
        //     "background-color": "#333337"
        // })
    },
    homePostsCatSwitch: function() {
        $(".home-page-posts").toggleClass("hide"), $(".home-page-categories").toggleClass("hide"), $(".select-posts").toggleClass("active"), $(".select-categories").toggleClass("active"), $(".home-footer").toggleClass("hide")
    },
    socialIconClick: function(t) {
        var e = t.data("platform"),
            i = t.data("message"),
            o = t.data("url");
        return "mail" == e ? !0 : (this.popItUp(e, i, o), !1)
    },
    popItUp: function(t, e, i) {
        var o, s;
        return "twitter" == t ? o = "http://twitter.com/home?status=" + encodeURI(e) + "+" + i : "facebook" == t && (o = "http://www.facebook.com/share.php?u" + i + "&title=" + encodeURI(e)), s = window.open(o, "name", "height=500,width=600"), window.focus && s.focus(), !1
    },
    jpm: function() {
        s.jpm = $.jPanelMenu({
            menu: "#menu-target",
            trigger: ".menu-trigger",
            animated: !1,
            beforeOpen: function() {
                matchMedia("only screen and (min-width: 992px)").matches && $(".sidebar").css("left", "250px")
            },
            beforeClose: function() {
                $(".sidebar").css("left", "0"), $(".writer-icon, .side-writer-icon").removeClass("fadeOutUp")
            }
        }), s.jpm.on()
    }
};
$(document).ready(function() {
    hljs.initHighlightingOnLoad();
    app.init()
});