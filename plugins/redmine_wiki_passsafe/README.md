# PassSafe Redmine Wiki Plugin

Include the browser based PassSafe into your Redmine Wikis.

## Installation
1. Copy all files to `/plugins/redmine_wiki_passsafe`
2. run `rake redmine:plugins:migrate RAILS_ENV=production`
3. restart your Redmine
4. Use `{{passsafe}}` macro on any wiki page.

## Build
If you want to build a new version from the sources use `grunt redmine`


License: http://www.gnu.org/licenses/lgpl-3.0.html LGPL <br>
Author: [4ward.media](http://www.4wardmedia.de)