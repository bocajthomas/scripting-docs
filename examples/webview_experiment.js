// ==SE_module==
// name: webview_experiment
// displayName: WebView Dialog Experiment
// description: A Script that adds custom webview dialogs into snapchat
// version: 1.0.0
// author: bocajthomas
// permissions: unsafe-classloader
// ==/SE_module==

var networking = require("networking");
var messaging = require("messaging");
var config = require("config");
var im = require("interface-manager");
var ipc = require("ipc");
var javaInterfaces = require("java-interfaces");
var hooker = require("hooker");
var events = require("events");

module.onSnapMainActivityCreate = function(activity) {
    const WebViewClass = findClass("android.webkit.WebView", true);
    const AlertDialogBuilderClass = findClass("android.app.AlertDialog$Builder", true);

    if (!WebViewClass || !AlertDialogBuilderClass) {
        console.error("Required classes not found");
        return;
    }

    const ContextClass = findClass("android.content.Context", true);
    const webViewConstructor = WebViewClass.getConstructor(ContextClass);
    const webView = webViewConstructor.newInstance(activity);
    webView.getSettings().setJavaScriptEnabled(true);
    webView.loadUrl("https://youtu.be/xvFZjo5PgG0");

    const builderConstructor = AlertDialogBuilderClass.getConstructor(ContextClass);
    const builder = builderConstructor.newInstance(activity);
    builder.setView(webView);
    builder.setTitle("Custom Webview Script");
    builder.setPositiveButton("Close", null);

    const dialog = builder.create();
    dialog.show();
};