import 'styles/globals.css'
import React from "react";
import Head from "next/head";
import 'github-markdown-css'
import 'highlight.js/styles/atom-one-dark.css';
import marked from "marked";
import hljs from "highlight.js";

marked.setOptions({
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    },
})

function MyApp({Component, pageProps}) {
    return (
        <div>
            <Head>
                <title>李晨的博客</title>
                <meta name="viewport"
                      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
            </Head>
            <Component {...pageProps} />
        </div>
    )

}

export default MyApp
