/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./sw.js",['./workbox-1a4a986e'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts("worker-development.js");
  workbox.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "/_next/static/runtime/amp.js",
    "revision": "2402d9faa492321238c6fb742a20fb51"
  }, {
    "url": "/_next/static/runtime/amp.js.map",
    "revision": "340448f78a90c6e7903b07bcb0c6956f"
  }, {
    "url": "/_next/static/runtime/main.js",
<<<<<<< HEAD
<<<<<<< HEAD
    "revision": "03913c1130b8718bdd68c20a33ed0c71"
  }, {
    "url": "/_next/static/runtime/main.js.map",
    "revision": "aafe9521ad7869a4313c34fbe5ce9c99"
=======
    "revision": "e28596810df6e5160bf80491bbb471d8"
  }, {
    "url": "/_next/static/runtime/main.js.map",
    "revision": "cef1eb429dcf01508c0ef63e81282ec4"
>>>>>>> a5da37b153a872584fbd9981d590840cc6bf2358
=======
    "revision": "77d1a262e01148936350d786f12e44b4"
  }, {
    "url": "/_next/static/runtime/main.js.map",
    "revision": "9a0fe8708c5ecbec7f7a06cff5a0c2fe"
>>>>>>> 9dbee5aa7787f21eaa1455d9f8919806f03c91cc
  }, {
    "url": "/_next/static/runtime/polyfills.js",
    "revision": "cf6f4b12f4634f8f79378d41f3a855a4"
  }, {
    "url": "/_next/static/runtime/polyfills.js.map",
    "revision": "82dca635a629d8ab38c3ad85b2ad65a2"
  }, {
    "url": "/_next/static/runtime/webpack.js",
<<<<<<< HEAD
<<<<<<< HEAD
    "revision": "5bf5f4ce6bc4092c7eb444b285300ba7"
  }, {
    "url": "/_next/static/runtime/webpack.js.map",
    "revision": "26f8ef174adec5059d2dd6d96286a60d"
=======
    "revision": "c5e4f44235845f89e8ee99a413ab77d5"
  }, {
    "url": "/_next/static/runtime/webpack.js.map",
    "revision": "b54c8ae339b7fb7632273a03e658d392"
>>>>>>> a5da37b153a872584fbd9981d590840cc6bf2358
=======
    "revision": "ddca7d4c748c873d81307fd226939205"
  }, {
    "url": "/_next/static/runtime/webpack.js.map",
    "revision": "45cdd8c3e89b8c360fdfddacd4c177ec"
>>>>>>> 9dbee5aa7787f21eaa1455d9f8919806f03c91cc
  }], {
    "ignoreURLParametersMatching": [/ts/]
  });
  workbox.cleanupOutdatedCaches();

});
//# sourceMappingURL=sw.js.map
