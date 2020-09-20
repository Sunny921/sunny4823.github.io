---
    layout: compress

# The list to be cached by PWA
# Chirpy v2.2
# https://github.com/cotes2020/jekyll-theme-chirpy
# © 2020 Cotes Chung
# MIT Licensed
---

const include = [];

const exclude = [
  {%- if site.google_analytics.pv.proxy_url and site.google_analytics.pv.enabled -%}
'{{ site.google_analytics.pv.proxy_url }}',
{%- endif -%}
'/assets/js/data/pageviews.json',
    '/img.shields.io/'
];
