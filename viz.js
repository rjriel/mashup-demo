var config = {
    host: "10.76.224.76",
    port: 80,
    prefix: "/",
    isSecure: false
};
require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require(["js/qlik"], function (qlik) {
    qlik.setOnError(function (error) {
        console.log(error)
        $("#error span").html(error.message);
        $("#error").show();
        $("#closeerror").on("qv-activate", function () {
            $("#error").hide();
        });
    });

    var app = qlik.openApp("381a4a76-9f48-47fc-94a4-78743f642581", config);

    var barCreated = false;
    window.createBar = function () {
        if (!barCreated) {
            barCreated = true;
            app.visualization.create('barchart', [
                "Shape",
                { qDef: { qDef: "=Count([PostedDate])", qLabel: "Sighting Count" } }])
                .then(function (vis) {
                    vis.show("vizBasicDiv");

                });
        }
    }

    var extCreated = false;
    window.createExt = function () {
        if (!extCreated) {
            extCreated = true;
            app.visualization.create('senseui-barchart', [
                "State",
                { qDef: { qDef: "=Count(State)", qLabel: "Sighting Count" } }])
                .then(function (vis) {
                    vis.show("vizExtDiv");
                });
        }
    }

    var getCreated = false;
    window.createGet = function () {
        if (!getCreated) {
            getCreated = true;
            app.visualization.get('CCapKa')
                .then(function (vis) {
                    vis.show("vizGetDiv");
                });
        }
    }
})