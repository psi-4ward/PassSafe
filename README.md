# Browser based Password Safe

De-/encrypt you're stored passwords inside your browser and transfer only the ciphertext to the server.
This is nice to embend into existing systems like Wikis.

**Demo** with localStorage adapter: http://embed.plnkr.co/NWioHV83hmlzFpiI6TFg/preview


## Adapters:

Adapters are responsible to store and retrieve the ciphertext from any persistent storage.
You could easily implement your adapter and imeplement a `loader()` and `saver(ciphertext)` method.

Available adapters:

* localstorage
* [redmine wiki](plugins/redmine_wiki_passsafe/README.md)


## Notes
Crypt algorithmus: http://bitwiseshiftleft.github.io/sjcl/

License: http://www.gnu.org/licenses/lgpl-3.0.html LGPL <br>
Author: [4ward.media](http://www.4wardmedia.de)
